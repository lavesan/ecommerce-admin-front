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
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit((values) => {
    onFilter(values);
  });

  return (
    <Flex as="form" flexDir={["column", "row"]} onSubmit={onSubmit} {...style}>
      <AppSelect
        data={orderStatusOptions}
        aria-label="status"
        placeholder="Status"
        {...register("status")}
        errorMsg={errors.status?.message}
        style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
        setValue={setValue}
      />
      <AppSelect
        data={paymentTypeOptions}
        aria-label="paymentType"
        placeholder="Tipo de pagamento"
        {...register("paymentType")}
        errorMsg={errors.paymentType?.message}
        style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
        setValue={setValue}
      />
      <Button type="submit" paddingInline={8}>
        Filtrar
      </Button>
    </Flex>
  );
};
