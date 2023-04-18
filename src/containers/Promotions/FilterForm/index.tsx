import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validations";
import { Button, Flex, StyleProps } from "@chakra-ui/react";
import { AppSelect } from "@components/AppSelect";
import { weekDayOptions } from "@helpers/select.helper";
import { WeekDay } from "@enums/WeekDay.enum";
import { AppInput } from "@components/AppInput";
import { IPaginatePromotionfilter } from "@models/IPaginatePromotionFilter";

interface IForm {
  name: string;
  weekDay: WeekDay;
}

interface IFilterFormProps extends StyleProps {
  onFilter: (values: IPaginatePromotionfilter) => void;
}

export const FilterForm = ({ onFilter, ...style }: IFilterFormProps) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(({ name, ...values }) => {
    onFilter({
      ...values,
      name: name.trim(),
    });
  });

  return (
    <Flex as="form" flexDir={["column", "row"]} onSubmit={onSubmit} {...style}>
      <AppInput
        aria-label="name"
        placeholder="Nome"
        {...register("name")}
        errorMsg={errors.name?.message}
        style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
      />
      <AppSelect<IForm>
        control={control}
        data={weekDayOptions}
        name="weekDay"
        placeholder="Tipo de pagamento"
        style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
      />
      <Button type="submit" paddingInline={8}>
        Filtrar
      </Button>
    </Flex>
  );
};
