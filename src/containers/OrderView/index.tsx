import { Card, Heading, Text } from "@chakra-ui/react";
import { AppLabelValue } from "@components/AppLabelValue";
import {
  dbNumberMoneyToNumber,
  maskMoney,
  maskPhone,
  translatePaymentType,
} from "@helpers/format.helper";
import { useAppContext } from "@hooks/useAppContext";
import { IOrder } from "@models/entities/IOrder";
import { OrderService } from "@services/order.service";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderView = () => {
  const orderService = OrderService.getInstance();

  const { orderId } = useParams();

  const { setIsLoading } = useAppContext();

  const [order, setOrder] = useState<IOrder>({} as IOrder);

  const onInit = useCallback(async () => {
    if (orderId) {
      const res = await orderService
        .findById(orderId)
        .finally(() => setIsLoading(false));

      setOrder(res);
    }
  }, []);

  useEffect(() => {
    onInit();
  }, [onInit]);

  return (
    <>
      <Heading as="h1" size="lg">
        Pedido
      </Heading>
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
        value={maskMoney(
          dbNumberMoneyToNumber(order.freightValue + order.productsValue)
        )}
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
