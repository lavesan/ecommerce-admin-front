import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validations";
import { AppImageInput } from "@components/AppImageInput";
import { AppSelect } from "@components/AppSelect";
import { AppInput } from "@components/AppInput";
import { useAppContext } from "@hooks/useAppContext";
import { useAppToast } from "@hooks/useSuccessToast";
import {
  additionaCategoryTypeOptions,
  citiesOptions,
  districtOptions,
  scheduleRelationOptions,
  weekDayOptions,
} from "@helpers/select.helper";
import { IProductCreateOrEditForm } from "@models/forms/IProductCreateOrEditForm";
import { IEnterprise } from "@models/entities/IEnterprise";
import { useUser } from "@hooks/useUser";
import { AppMaskInput } from "@components/AppMaskInput";
import {
  cnpjMask,
  onlyNumberMask,
  phoneMask,
  timeMask,
  unmask,
} from "@helpers/mask.helper";
import { AppCurrencyInput } from "@components/AppCurrencyInput";
import {
  dbNumberMoneyToNumber,
  numberToNumberMoneyDb,
} from "@helpers/format.helper";
import { WeekDay } from "@enums/WeekDay.enum";
import { ScheduleRelation } from "@enums/ScheduleRelation";
import { useGetImageRequest } from "@hooks/useGetImageRequest";
import { extractTimeFromDate, timeStringToDate } from "@helpers/date.helper";
import { AppCheckbox } from "@components/AppCheckbox";
import { useSaveImage } from "@hooks/useSaveImage";
import { ProductService } from "@services/product.service";
import { IProduct } from "@models/entities/IProduct";
import { ProductAdditionalType } from "@enums/ProductAdditionalType.enum";
import { AdditionalFields } from "./AdditionalFields";

const ProductCreateOrEdit = () => {
  const productService = ProductService.getInstance();

  const { categoryId, productId } = useParams();

  const { setIsLoading } = useAppContext();
  const { showToast } = useAppToast();

  const [imageKey, setImageKey] = useState("");

  const { data: savedImage } = useGetImageRequest(imageKey);
  const { saveImage } = useSaveImage();

  const [product, setProduct] = useState<IProduct>({} as IProduct);

  const enterpriseForm = useMemo<IProductCreateOrEditForm>(() => {
    const {
      name,
      description,
      boldDescription,
      value,
      imageKey,
      sellPoints,
      givenPoints,
      isDisabled,
      productAdditionalCategory,
    } = product;

    return {
      name,
      description,
      boldDescription,
      value,
      imageKey,
      sellPoints,
      givenPoints,
      isDisabled,
      productAdditionalCategory:
        productAdditionalCategory?.map(
          ({
            id,
            isDisabled,
            description,
            isOptional,
            limit,
            name,
            type,
            productAdditionals,
          }) => ({
            additionalCategoryId: id,
            isDisabled,
            description,
            isOptional,
            limit,
            name,
            type,
            productAdditionals:
              productAdditionals?.map(
                ({ id, isDisabled, name, value, imageKey }) => ({
                  additionalId: id,
                  isDisabled,
                  name,
                  value,
                  imageKey,
                })
              ) || [],
          })
        ) || [],
    };
  }, [product]);

  const [image, setImage] = useState<File>();
  const [imageChanged, setImageChanged] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IProductCreateOrEditForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: enterpriseForm,
  });

  const {
    fields: additionalCategoryFields,
    append: appendAdditionalCategory,
    remove: removeAdditionalCategory,
  } = useFieldArray({
    control,
    name: "productAdditionalCategory",
  });

  // const {
  //   fields: scheduleFields,
  //   append: appendSchedule,
  //   remove: removeSchedule,
  // } = useFieldArray({
  //   control,
  //   name: "schedules",
  // });

  const onImageChange = (file: File) => {
    setImageChanged(true);
    setImage(file);
  };

  const mountBody = ({
    productAdditionalCategory,
    ...body
  }: IProductCreateOrEditForm) => ({
    ...body,
    imageKey,
    categoryId: categoryId || "",
    productAdditionalCategory:
      productAdditionalCategory?.map(
        ({
          productAdditionals,
          additionalCategoryId,
          ...additionalCategory
        }) => ({
          ...additionalCategory,
          id: additionalCategoryId,
          productAdditionals:
            productAdditionals.map(({ additionalId, ...additional }) => ({
              ...additional,
              id: additionalId,
            })) || [],
        })
      ) || [],
  });

  const onSubmit = handleSubmit(async (values) => {
    let imageKey = product.imageKey;

    if ((imageChanged && !image) || (!imageKey && !productId && !image)) {
      return showToast({ title: "Faça o upload da imagem", status: "error" });
    }

    if (imageChanged && image) {
      imageKey = await saveImage({
        oldImageKey: imageKey,
        preffix: "product",
        file: image,
      });
    }

    let successMsg = "";

    if (productId) {
      await productService
        .update(productId, mountBody(values))
        .finally(() => setIsLoading(false));

      successMsg = "Produto editado";
    } else {
      await productService
        .create(mountBody(values))
        .finally(() => setIsLoading(false));

      successMsg = "Produto criado";
    }
    showToast({ title: successMsg, status: "success" });
  });

  const onInit = useCallback(async () => {
    if (productId) {
      const res = await productService
        .findById(productId)
        .finally(() => setIsLoading(false));

      setProduct(res);
      setImageKey(res.imageKey);
    }
  }, []);

  useEffect(() => {
    onInit();
  }, [onInit]);

  useEffect(() => {
    reset(enterpriseForm);
  }, [enterpriseForm]);

  return (
    <>
      <Heading as="h2" size="lg">
        {productId ? "Editar" : "Criar"} produto
      </Heading>
      <Flex width={["100%", "300px"]} marginBlock={4}>
        <AppImageInput imageSrc={savedImage} onImageChange={onImageChange} />
      </Flex>
      <Flex marginBottom={8} marginTop={4}>
        <AppCheckbox<IProductCreateOrEditForm>
          label="Desabilitar"
          control={control}
          name="isDisabled"
        />
      </Flex>
      <Flex as="form" flexDir="column" onSubmit={onSubmit}>
        <Flex flexDir={["column", "row"]} width="100%" marginBottom={[0, 4]}>
          <AppInput
            aria-label="description"
            label="Descrição"
            {...register("description")}
            errorMsg={errors.description?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
          <AppInput
            aria-label="boldDescription"
            label="Descrição em negrito"
            {...register("boldDescription")}
            errorMsg={errors.boldDescription?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
        </Flex>
        <Flex flexDir={["column", "row"]} width="100%" marginBottom={[0, 4]}>
          <AppInput
            aria-label="givenPoints"
            label="Pontos que dá"
            type="number"
            {...register("givenPoints")}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
            errorMsg={errors.givenPoints?.message}
          />
          <AppInput
            aria-label="sellPoints"
            label="Pontos que vende"
            type="number"
            {...register("sellPoints")}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
            errorMsg={errors.sellPoints?.message}
          />
        </Flex>
        <Flex flexDir={["column", "row"]} width="100%" marginBottom={[0, 4]}>
          <AppCurrencyInput<IProductCreateOrEditForm>
            label="Descrição"
            control={control}
            name="value"
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
        </Flex>
        <Flex
          flexDir={["column", "row"]}
          justify="space-between"
          marginBottom={4}
        >
          <Heading as="h3" size="lg" marginBottom={4}>
            Categorias de adicionais
          </Heading>
          <Button
            onClick={() =>
              appendAdditionalCategory({
                description: "",
                isDisabled: false,
                isOptional: true,
                limit: 0,
                name: "",
                type: ProductAdditionalType.ONE_SELECT,
                productAdditionals:
                  getValues().productAdditionalCategory[
                    additionalCategoryFields.length - 1
                  ].productAdditionals || [],
                additionalCategoryId:
                  getValues().productAdditionalCategory[
                    additionalCategoryFields.length - 1
                  ].additionalCategoryId,
              })
            }
            type="button"
          >
            Adicionar nova
          </Button>
        </Flex>
        {additionalCategoryFields.map((addtionalCategory, index) => (
          <Card key={addtionalCategory.id} padding={4} marginBottom={4}>
            <Flex flexDir="row" justify="flex-end">
              <Button
                colorScheme="red"
                onClick={() => removeAdditionalCategory(index)}
                type="button"
              >
                Remover
              </Button>
            </Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem colSpan={[3, 1]}>
                <AppInput
                  aria-labe={`productAdditionalCategory.${index}.name`}
                  label="Nome"
                  {...register(`productAdditionalCategory.${index}.name`)}
                  errorMsg={
                    errors.productAdditionalCategory &&
                    errors.productAdditionalCategory[index]?.name?.message
                  }
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                />
              </GridItem>
              <GridItem colSpan={[3, 1]}>
                <AppInput
                  aria-labe={`productAdditionalCategory.${index}.description`}
                  label="Descrição"
                  {...register(
                    `productAdditionalCategory.${index}.description`
                  )}
                  errorMsg={
                    errors.productAdditionalCategory &&
                    errors.productAdditionalCategory[index]?.description
                      ?.message
                  }
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                />
              </GridItem>
              <GridItem colSpan={[3, 1]}>
                <AppInput
                  aria-labe={`productAdditionalCategory.${index}.limit`}
                  label="Limite de seleção"
                  {...register(`productAdditionalCategory.${index}.limit`)}
                  type="number"
                  errorMsg={
                    errors.productAdditionalCategory &&
                    errors.productAdditionalCategory[index]?.limit?.message
                  }
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                />
              </GridItem>
              <GridItem colSpan={[3, 1]}>
                <AppSelect<IProductCreateOrEditForm>
                  data={additionaCategoryTypeOptions}
                  label="Tipo"
                  name={`productAdditionalCategory.${index}.type`}
                  control={control}
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                />
              </GridItem>
              <GridItem colSpan={[3, 1]}>
                <AppCheckbox<IProductCreateOrEditForm>
                  label="É opcional"
                  name={`productAdditionalCategory.${index}.isOptional`}
                  control={control}
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                />
              </GridItem>
              <GridItem colSpan={[3, 1]}>
                <AppCheckbox<IProductCreateOrEditForm>
                  label="Desabilitar"
                  name={`productAdditionalCategory.${index}.isDisabled`}
                  control={control}
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                />
              </GridItem>
            </Grid>
            <AdditionalFields<IProductCreateOrEditForm>
              control={control}
              name={`productAdditionalCategory.${index}.productAdditionals`}
              width="100%"
              marginBottom={[0, 4]}
              getValues={getValues}
              setValue={setValue}
            />
          </Card>
        ))}
        <Button colorScheme="green" type="submit">
          Salvar
        </Button>
      </Flex>
    </>
  );
};

export default ProductCreateOrEdit;
