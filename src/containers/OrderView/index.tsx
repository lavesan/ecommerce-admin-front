import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

import { AppLabelValue } from "@components/AppLabelValue";
import { OrderStatus } from "@enums/OrderStatus.enum";
import {
  maskMoney,
  maskPhone,
  translatePaymentType,
} from "@helpers/format.helper";
import { useAppContext } from "@hooks/useAppContext";
import { IOrder } from "@models/entities/IOrder";
import { OrderService } from "@services/order.service";
import { useAppToast } from "@hooks/useAppToast";

const OrderView = () => {
  const orderService = OrderService.getInstance();

  const { orderId } = useParams();

  const { setIsLoading, showDialog } = useAppContext();

  const { showToast } = useAppToast();

  const [status, setStatus] = useState<OrderStatus>();

  const [order, setOrder] = useState<IOrder>({} as IOrder);

  const disableUpdateStatus = useMemo(() => {
    const activeStatuses = [
      OrderStatus.TO_APPROVE,
      OrderStatus.DOING,
      OrderStatus.SENDING,
    ];

    return !activeStatuses.includes(order.status);
  }, [order.status]);

  const onStatusChange = async (newStatus: OrderStatus) => {
    if (orderId) {
      setIsLoading(true);
      try {
        await orderService.updateStatus(orderId, { status: newStatus });
        await onInit();
      } catch {
        showToast({
          status: "error",
          title: "Aconteceu um erro ao atualizar o status",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const cancelOrderReq = async () => {
    if (orderId) {
      setIsLoading(true);
      await orderService
        .updateStatus(orderId, {
          status: OrderStatus.CANCELED,
        })
        .then(async () => {
          showToast({
            status: "success",
            title: "Pedido cancelado",
          });
          await onInit();
        })
        .catch(() => {
          showToast({
            status: "error",
            title: "Aconteceu um erro ao atualizar o status",
          });
        })
        .finally(() => setIsLoading(false));
    }
  };

  const onShowCancelDialog = () => {
    showDialog({
      title: "Cancelar pedido",
      description: "Esta ação cancelará o pedido, tem certeza?",
      okText: "Efetuar o cancelamento",
      onConfirm: cancelOrderReq,
    });
  };

  const onInit = useCallback(async () => {
    if (orderId) {
      setIsLoading(true);
      const res = await orderService
        .findById(orderId)
        .finally(() => setIsLoading(false));

      setStatus(res.status);
      setOrder(res);
    }
  }, []);

  useEffect(() => {
    onInit();
  }, [onInit]);

  return (
    <>
      <Flex
        justifyContent="space-between"
        flexDirection={["column", "row"]}
        gap={2}
      >
        <Heading as="h1" size="lg" marginBottom={4}>
          Pedido
        </Heading>
        <Button
          colorScheme="red"
          onClick={onShowCancelDialog}
          isDisabled={disableUpdateStatus}
        >
          Cancelar pedido
        </Button>
      </Flex>
      <RadioGroup
        onChange={onStatusChange}
        value={status}
        isDisabled={disableUpdateStatus}
      >
        <Stack direction="row">
          <Radio
            value={OrderStatus.TO_APPROVE}
            isDisabled={status !== OrderStatus.TO_APPROVE}
          >
            A Aprovar
          </Radio>
          <Radio value={OrderStatus.DOING}>Fazendo</Radio>
          <Radio value={OrderStatus.SENDING}>A caminho</Radio>
          <Radio value={OrderStatus.DONE}>Feita</Radio>
        </Stack>
      </RadioGroup>
      <Text fontWeight="bold" textAlign={["center", "start"]} marginBlock={4}>
        {order.id}
      </Text>
      <AppLabelValue label="Cliente" value={order?.client?.name} />
      <AppLabelValue
        label="Número"
        value={maskPhone(order?.client?.phone || "")}
      />
      <AppLabelValue
        label="Valor"
        value={maskMoney(order.freightValue + order.productsValue)}
      />
      <AppLabelValue
        label="Tipo de pagamento"
        value={translatePaymentType(order.paymentType)}
      />
      {order.moneyExchange && (
        <AppLabelValue label="Troco para" value={order.moneyExchange} />
      )}

      <Heading as="h2" size="md" marginBlock={4}>
        Endereço
      </Heading>

      <AppLabelValue label="CEP" value={order.address?.cep} />
      <AppLabelValue label="Cidade" value={order.address?.city} />
      <AppLabelValue label="Rua" value={order.address?.street} />
      <AppLabelValue label="Número" value={order.address?.number} />
      <AppLabelValue label="Complemento" value={order.address?.complement} />

      <Heading as="h2" size="md" marginBlock={4}>
        Produtos
      </Heading>

      {order.orderProducts?.map(({ id, quantity, product, additionals }) => (
        <Card key={id} padding={4}>
          <Text fontWeight="bold">
            {quantity}x {product?.name}
          </Text>
          <Text>Adicionais</Text>
          {additionals?.map(({ quantity, productAdditional }) => (
            <Text>
              {quantity}x {productAdditional?.name}
            </Text>
          ))}
        </Card>
      ))}
    </>
  );
};

export default OrderView;
