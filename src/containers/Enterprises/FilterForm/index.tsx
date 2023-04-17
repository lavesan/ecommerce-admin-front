import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validations";
import { Button, Flex } from "@chakra-ui/react";
import { IPaginateEnterpriseFilter } from "@models/IPaginateEnterpriseFilter";
import { AppInput } from "@components/AppInput";

interface IFilterFormProps {
  onFilter: (values: IPaginateEnterpriseFilter) => void;
}

export const FilterForm = ({ onFilter }: IFilterFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IPaginateEnterpriseFilter>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(({ cnpj, ...values }) => {
    onFilter({
      ...values,
      cnpj: cnpj.replace(/\D/g, ""),
    });
  });

  return (
    <Flex as="form" flexDir={["column", "row"]} onSubmit={onSubmit}>
      <AppInput
        aria-label="name"
        placeholder="Nome"
        {...register("name")}
        errorMsg={errors.name?.message}
        style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
      />
      <AppInput
        aria-label="cnpj"
        placeholder="CNPJ"
        {...register("cnpj")}
        errorMsg={errors.cnpj?.message}
        style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
      />
      <Button type="submit" paddingInline={8}>
        Filtrar
      </Button>
    </Flex>
  );
};
