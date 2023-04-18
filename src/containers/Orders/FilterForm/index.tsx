import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validations";
import { Button, Flex, StyleProps } from "@chakra-ui/react";
import { IPaginateOrderFilter } from "@models/IPaginateOrderFilter";
import { OrderStatus } from "@enums/OrderStatus.enum";
import { PaymentType } from "@enums/PaymentType.enum";
import { AppSelect } from "@components/AppSelect";
import { orderStatusOptions, paymentTypeOptions } from "@helpers/select.helper";

interface IForm {
  created_at: string;
  status: OrderStatus;
  paymentType: PaymentType;
}

interface IFilterFormProps extends StyleProps {
  onFilter: (values: IPaginateOrderFilter) => void;
}

export const FilterForm = ({ onFilter, ...style }: IFilterFormProps) => {
  const { control, handleSubmit } = useForm<IForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit((values) => {
    onFilter(values);
  });

  return (
    <Flex as="form" flexDir={["column", "row"]} onSubmit={onSubmit} {...style}>
      <AppSelect<IForm>
        data={orderStatusOptions}
        control={control}
        name="status"
        placeholder="Status"
        style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
      />
      <AppSelect<IForm>
        data={paymentTypeOptions}
        control={control}
        name="paymentType"
        placeholder="Tipo de pagamento"
        style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
      />
      <Button type="submit" paddingInline={8}>
        Filtrar
      </Button>
    </Flex>
  );
};
