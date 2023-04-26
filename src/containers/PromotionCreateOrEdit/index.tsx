import { dbNumberMoneyToNumber } from "@helpers/format.helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from "@hooks/useAppContext";
import { useSaveImage } from "@hooks/useSaveImage";
import { useAppToast } from "@hooks/useSuccessToast";
import { IPromotion } from "@models/entities/IPromotion";
import { IPromotionCreateOrEditForm } from "@models/forms/IPromotionCreateOrEditForm";
import { PromotionService } from "@services/promotion.service";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { validationSchema } from "./validations";
import { Button, Card, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { AppImageInput } from "@components/AppImageInput";
import { AppCheckbox } from "@components/AppCheckbox";
import { AppInput } from "@components/AppInput";
import { AppSelect } from "@components/AppSelect";
import { weekDayOptions } from "@helpers/select.helper";
import { useProductOptions } from "@hooks/useProductOptions";
import { AppCurrencyInput } from "@components/AppCurrencyInput";
import { numberToNumberMoneyDb } from "@helpers/format.helper";
import { getImgUrl } from "@helpers/image.helper";

const PromotionCreateOrEdit = () => {
  const promotionService = PromotionService.getInstance();

  const { enterpriseId, promotionId } = useParams();

  const { setIsLoading } = useAppContext();
  const { showToast } = useAppToast();

  const { productsOptions } = useProductOptions(enterpriseId);

  const [imageKey, setImageKey] = useState("");

  const { saveImage } = useSaveImage();

  const [promotion, setPromotion] = useState<IPromotion>({} as IPromotion);

  const promotionForm = useMemo<IPromotionCreateOrEditForm>(() => {
    const { description, name, weekDay, isDisabled, promotionProducts } =
      promotion;

    return {
      name,
      description,
      weekDay,
      isDisabled,
      promotionProducts:
        promotionProducts?.map(({ id, value, product }) => ({
          promotionProductId: id || undefined,
          productId: product?.id || "",
          value: dbNumberMoneyToNumber(value),
        })) || [],
    };
  }, [promotion]);

  const [image, setImage] = useState<File>();
  const [imageChanged, setImageChanged] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IPromotionCreateOrEditForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: promotionForm,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "promotionProducts",
  });

  const onImageChange = (file: File) => {
    setImageChanged(true);
    setImage(file);
  };

  const mountBody = (
    { promotionProducts, ...body }: IPromotionCreateOrEditForm,
    imageKey: string
  ) => ({
    ...body,
    imageKey,
    enterpriseId: enterpriseId || "",
    products: promotionProducts.map(
      ({ promotionProductId, value, ...promotionProduct }) => ({
        ...promotionProduct,
        id: promotionProductId || undefined,
        value: numberToNumberMoneyDb(value),
      })
    ),
  });

  const onSubmit = handleSubmit(async (values) => {
    let imageKey = promotion.imageKey;

    if ((imageChanged && !image) || (!imageKey && !promotionId && !image)) {
      return showToast({ title: "Faça o upload da imagem", status: "error" });
    }

    if (imageChanged && image) {
      imageKey = await saveImage({
        oldImageKey: imageKey,
        preffix: "promotion",
        file: image,
      });
    }

    let successMsg = "";

    if (promotionId) {
      await promotionService
        .update(promotionId, mountBody(values, imageKey))
        .finally(() => setIsLoading(false));

      successMsg = "Promoção editada";
    } else {
      await promotionService
        .create(mountBody(values, imageKey))
        .finally(() => setIsLoading(false));

      successMsg = "Promoção criada";
    }
    showToast({ title: successMsg, status: "success" });
  });

  const onInit = useCallback(async () => {
    if (promotionId) {
      const res = await promotionService
        .findById(promotionId)
        .finally(() => setIsLoading(false));

      setPromotion(res);
      setImageKey(res.imageKey);
    }
  }, []);

  useEffect(() => {
    onInit();
  }, [onInit]);

  useEffect(() => {
    reset(promotionForm);
  }, [promotionForm]);

  return (
    <>
      <Heading as="h2" size="lg">
        {promotionId ? "Editar" : "Criar"} promoção
      </Heading>
      <Flex width={["100%", "300px"]} marginBlock={4}>
        <AppImageInput
          aspect={16 / 9}
          imageSrc={getImgUrl(imageKey)}
          onImageChange={onImageChange}
        />
      </Flex>
      <Flex marginBottom={8} marginTop={4}>
        <AppCheckbox<IPromotionCreateOrEditForm>
          label="Desabilitar"
          control={control}
          name="isDisabled"
        />
      </Flex>
      <Flex as="form" flexDir="column" onSubmit={onSubmit}>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={[2, 1]}>
            <AppInput
              aria-label="name"
              label="Nome"
              {...register("name")}
              errorMsg={errors.name?.message}
              style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
            />
          </GridItem>
          <GridItem colSpan={[2, 1]}>
            <AppInput
              aria-label="description"
              label="Descrição"
              {...register("description")}
              errorMsg={errors.description?.message}
              style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
            />
          </GridItem>
          <GridItem colSpan={[2, 1]}>
            <AppSelect<IPromotionCreateOrEditForm>
              data={weekDayOptions}
              label="Dia da semana"
              name="weekDay"
              control={control}
              style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
            />
          </GridItem>
        </Grid>
        <Flex
          flexDir={["column", "row"]}
          justify="space-between"
          marginBottom={4}
          marginTop={[0, 4]}
        >
          <Heading as="h3" size="lg" marginBottom={4}>
            Produtos
          </Heading>
          <Button
            onClick={() =>
              append({
                productId: "",
                value: 0,
                promotionProductId: "",
              })
            }
            type="button"
          >
            Adicionar novo
          </Button>
        </Flex>
        {fields.map((schedule, index) => (
          <Card key={schedule.id} padding={4} marginBottom={4}>
            <Flex flexDir="row" justify="flex-end">
              <Button
                colorScheme="red"
                onClick={() => remove(index)}
                type="button"
              >
                Remover
              </Button>
            </Flex>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem colSpan={[2, 1]}>
                <AppSelect<IPromotionCreateOrEditForm>
                  data={productsOptions}
                  label="Produto"
                  name={`promotionProducts.${index}.productId`}
                  control={control}
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                />
              </GridItem>
              <GridItem colSpan={[2, 1]}>
                <AppCurrencyInput<IPromotionCreateOrEditForm>
                  label="Valor"
                  name={`promotionProducts.${index}.value`}
                  control={control}
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                />
              </GridItem>
            </Grid>
          </Card>
        ))}
        <Button colorScheme="green" type="submit">
          Salvar
        </Button>
      </Flex>
    </>
  );
};

export default PromotionCreateOrEdit;
