import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validations";
import { AppInput } from "@components/AppInput";
import { useAppContext } from "@hooks/useAppContext";
import { useAppToast } from "@hooks/useAppToast";
import { AppCheckbox } from "@components/AppCheckbox";
import { ICategoryCreateOrEditForm } from "@models/forms/ICategoryCreateOrEditForm";
import { ICategory } from "@models/entities/ICategory";
import { CategoryService } from "@services/category.service";

const CategoryCreateOrEdit = () => {
  const categoryService = CategoryService.getInstance();

  const { id: enterpriseId, categoryId } = useParams();

  const { setIsLoading } = useAppContext();
  const { showToast } = useAppToast();

  const [category, setCategory] = useState<ICategory>({} as ICategory);

  const categoryForm = useMemo<ICategoryCreateOrEditForm>(() => {
    const { name, description, isDisabled } = category;

    return {
      name,
      description,
      isDisabled: isDisabled ? isDisabled : false,
    };
  }, [category]);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ICategoryCreateOrEditForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: categoryForm,
  });

  const mountBody = ({ ...body }: ICategoryCreateOrEditForm) => ({
    ...body,
    enterpriseId: enterpriseId || "",
  });

  const onSubmit = handleSubmit(async (values) => {
    let successMsg = "";

    if (categoryId) {
      await categoryService
        .update(categoryId, mountBody(values))
        .finally(() => setIsLoading(false));

      successMsg = "Categoria editada";
    } else {
      await categoryService
        .create(mountBody(values))
        .finally(() => setIsLoading(false));

      successMsg = "Categoria criada";
    }
    showToast({ title: successMsg, status: "success" });
  });

  const onInit = useCallback(async () => {
    if (categoryId) {
      const res = await categoryService
        .findById(categoryId)
        .finally(() => setIsLoading(false));

      setCategory(res);
    }
  }, []);

  useEffect(() => {
    onInit();
  }, [onInit]);

  useEffect(() => {
    reset(categoryForm);
  }, [categoryForm]);

  return (
    <>
      <Heading as="h2" size="lg">
        {categoryId ? "Editar" : "Criar"} categoria
      </Heading>
      <Flex marginBottom={8} marginTop={4}>
        <AppCheckbox<ICategoryCreateOrEditForm>
          label="Desabilitar"
          control={control}
          name="isDisabled"
        />
      </Flex>
      <Flex as="form" flexDir="column" onSubmit={onSubmit}>
        <Flex flexDir={["column", "row"]} width="100%" marginBottom={[0, 4]}>
          <AppInput
            aria-label="name"
            label="Nome"
            {...register("name")}
            errorMsg={errors.name?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
          <AppInput
            aria-label="description"
            label="Descrição"
            {...register("description")}
            errorMsg={errors.description?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
        </Flex>
        <Button colorScheme="green" type="submit">
          Salvar
        </Button>
      </Flex>
    </>
  );
};

export default CategoryCreateOrEdit;
