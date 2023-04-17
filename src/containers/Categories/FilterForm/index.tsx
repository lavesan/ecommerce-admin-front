import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validations";
import { Button, Flex } from "@chakra-ui/react";
import { AppInput } from "@components/AppInput";

export interface IForm {
  name: string;
}

interface IFilterFormProps {
  onFilter: (values: IForm) => void;
}

export const FilterForm = ({ onFilter }: IFilterFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(({ name }) => {
    onFilter({
      name: name?.trim(),
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
      <Button type="submit" paddingInline={8}>
        Filtrar
      </Button>
    </Flex>
  );
};
