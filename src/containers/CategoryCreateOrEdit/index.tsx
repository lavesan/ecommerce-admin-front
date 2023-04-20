import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validations";
import { AppImageInput } from "@components/AppImageInput";
import { AppSelect } from "@components/AppSelect";
import { AppInput } from "@components/AppInput";
import { EnterpriseService } from "@services/enterprise.service";
import { useAppContext } from "@hooks/useAppContext";
import { useAppToast } from "@hooks/useSuccessToast";
import {
  citiesOptions,
  districtOptions,
  scheduleRelationOptions,
  weekDayOptions,
} from "@helpers/select.helper";
import { useUser } from "@hooks/useUser";
import { AppMaskInput } from "@components/AppMaskInput";
import { cnpjMask, phoneMask, timeMask, unmask } from "@helpers/mask.helper";
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
import { ICategoryCreateOrEditForm } from "@models/forms/ICategoryCreateOrEditForm";
import { ICategory } from "@models/entities/ICategory";
import { CategoryService } from "@services/category.service";

const CategoryCreateOrEdit = () => {
  const categoryService = CategoryService.getInstance();

  const { id: enterpriseId, categoryId } = useParams();

  const { setIsLoading } = useAppContext();
  const { id: userId } = useUser();
  const { showToast } = useAppToast();

  const [imageKey, setImageKey] = useState("");

  const { data: savedImage } = useGetImageRequest(imageKey);
  const { saveImage } = useSaveImage();

  const [category, setCategory] = useState<ICategory>({} as ICategory);

  const enterpriseForm = useMemo<ICategoryCreateOrEditForm>(() => {
    const { name, description, isDisabled } = category;

    return {
      name,
      description,
      isDisabled,
    };
  }, [category]);

  const [image, setImage] = useState<File>();
  const [imageChanged, setImageChanged] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ICategoryCreateOrEditForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: enterpriseForm,
  });

  const onImageChange = (file: File) => {
    setImageChanged(true);
    setImage(file);
  };

  const mountBody = (
    { ...body }: ICategoryCreateOrEditForm,
    imageKey: string
  ) => ({
    ...body,
    imageKey,
    enterpriseId: enterpriseId || "",
  });

  const onSubmit = handleSubmit(async (values) => {
    let imageKey = category.imageKey;

    if ((imageChanged && !image) || (!imageKey && !categoryId && !image)) {
      return showToast({ title: "Faça o upload da imagem", status: "error" });
    }

    if (imageChanged && image) {
      imageKey = await saveImage({
        oldImageKey: imageKey,
        preffix: "enterprise",
        file: image,
      });
    }

    let successMsg = "";

    if (categoryId) {
      await categoryService
        .update(categoryId, mountBody(values, imageKey))
        .finally(() => setIsLoading(false));

      successMsg = "Categoria editada";
    } else {
      await categoryService
        .create(mountBody(values, imageKey))
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
        {categoryId ? "Editar" : "Criar"} categoria
      </Heading>
      <Flex width={["100%", "300px"]} marginBlock={4}>
        <AppImageInput imageSrc={savedImage} onImageChange={onImageChange} />
      </Flex>
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
