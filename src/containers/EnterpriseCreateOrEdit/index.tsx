import { Button, Card, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { AppImageInput } from "@components/AppImageInput";
import { useParams } from "react-router-dom";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validations";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { ImageService } from "@services/image.service";
import { IEnterpriseCreateOrEditForm } from "@models/forms/IEnterpriseCreateOrEditForm";
import { IEnterprise } from "@models/entities/IEnterprise";
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
import { generateImageKey } from "@helpers/image.helper";
import { useGetImageRequest } from "@hooks/useGetImageRequest";
import { extractTimeFromDate, timeStringToDate } from "@helpers/date.helper";

const EnterpriseCreate = () => {
  const imageService = ImageService.getInstance();
  const enterpriseService = EnterpriseService.getInstance();

  const { id } = useParams();

  const { setIsLoading } = useAppContext();
  const { id: userId } = useUser();
  const { showToast } = useAppToast();

  const [imageKey, setImageKey] = useState("");

  const { data: savedImage } = useGetImageRequest(imageKey);

  const [enterprise, setEnterprise] = useState<IEnterprise>({} as IEnterprise);

  const enterpriseForm = useMemo<IEnterpriseCreateOrEditForm>(() => {
    const {
      cep,
      city,
      cnpj,
      complement,
      description,
      district,
      email,
      name,
      number,
      phone,
      state,
      street,
      freights,
      schedules,
    } = enterprise;

    return {
      cep,
      city,
      cnpj,
      complement,
      description,
      district,
      email,
      name,
      number,
      phone,
      state,
      street,
      freights:
        freights?.map(({ addressKey, addressValue, value, id }) => ({
          freightId: id,
          addressKey,
          addressValue,
          value: dbNumberMoneyToNumber(value),
        })) || [],
      schedules:
        schedules?.map(({ id, relation, time, weekDay }) => ({
          scheduleId: id,
          relation,
          time: extractTimeFromDate(time),
          weekDay,
        })) || [],
    };
  }, [enterprise]);

  const [image, setImage] = useState<File>();
  const [imageChanged, setImageChanged] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IEnterpriseCreateOrEditForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: enterpriseForm,
  });

  const {
    fields: freightFields,
    append: appendFreight,
    remove: removeFreight,
  } = useFieldArray({
    control,
    name: "freights",
  });

  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control,
    name: "schedules",
  });

  const onImageChange = (file: File) => {
    setImageChanged(true);
    setImage(file);
  };

  const mountBody = (
    { freights, schedules, phone, cnpj, ...body }: IEnterpriseCreateOrEditForm,
    imageKey: string
  ) => ({
    ...body,
    imageKey,
    userId,
    state: "PE",
    phone: unmask(phone),
    cnpj: unmask(cnpj),
    freights:
      freights?.map(({ freightId, value, ...freight }) => ({
        ...freight,
        id: freightId,
        value: numberToNumberMoneyDb(value),
      })) || [],
    schedules:
      schedules?.map(({ scheduleId, time, ...schedule }) => ({
        ...schedule,
        id: scheduleId,
        time: timeStringToDate(time),
      })) || [],
  });

  const onSubmit = handleSubmit(async (values) => {
    let imageKey = enterprise.imageKey;

    if ((imageChanged && !image) || (!imageKey && !id && !image)) {
      return showToast({ title: "Faça o upload da imagem", status: "error" });
    }

    if (imageChanged && image) {
      if (imageKey) {
        await imageService.deleteByKey(imageKey).catch(() => {
          setIsLoading(false);
          throw new Error();
        });
      }

      const imageRes = await imageService
        .save({
          file: image,
          key: generateImageKey("product"),
        })
        .catch(() => {
          setIsLoading(false);
          throw new Error();
        });

      imageKey = imageRes.key;
    }

    let successMsg = "";

    if (id) {
      await enterpriseService
        .update(id, mountBody(values, imageKey))
        .finally(() => setIsLoading(false));

      successMsg = "Empresa editada";
    } else {
      await enterpriseService
        .create(mountBody(values, imageKey))
        .finally(() => setIsLoading(false));

      successMsg = "Empresa criada";
    }
    showToast({ title: successMsg, status: "success" });
  });

  const onInit = useCallback(async () => {
    if (id) {
      const res = await enterpriseService
        .findById(id)
        .finally(() => setIsLoading(false));

      setEnterprise(res);
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
        {id ? "Editar" : "Criar"} empresa
      </Heading>
      <Flex width={["100%", "300px"]} marginBlock={4}>
        <AppImageInput imageSrc={savedImage} onImageChange={onImageChange} />
      </Flex>
      <Flex as="form" flexDir="column" onSubmit={onSubmit}>
        <Flex flexDir={["column", "row"]} width="100%" marginBottom={[0, 4]}>
          <AppInput
            aria-label="email"
            label="Email"
            {...register("email")}
            type="email"
            errorMsg={errors.email?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
          <AppInput
            aria-label="name"
            label="Nome"
            {...register("name")}
            errorMsg={errors.name?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
        </Flex>
        <Flex flexDir={["column", "row"]} width="100%" marginBottom={[0, 4]}>
          <AppMaskInput
            mask={phoneMask}
            aria-label="phone"
            label="Telefone"
            {...register("phone")}
            errorMsg={errors.phone?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
            setValue={setValue}
            value={getValues("phone")}
          />
          <AppMaskInput
            mask={cnpjMask}
            aria-label="cnpj"
            label="CNPJ"
            {...register("cnpj")}
            errorMsg={errors.cnpj?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
            setValue={setValue}
            value={getValues("cnpj")}
          />
        </Flex>
        <Flex flexDir={["column", "row"]} width="100%" marginBottom={[0, 4]}>
          <AppInput
            aria-label="description"
            label="Descrição"
            {...register("description")}
            errorMsg={errors.description?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
        </Flex>
        <Heading as="h3" size="lg" marginBottom={4}>
          Endereço
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={4} width="100%">
          <GridItem colSpan={[2, 1]}>
            <AppInput
              aria-label="cep"
              label="CEP"
              {...register("cep")}
              errorMsg={errors.cep?.message}
              style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
            />
          </GridItem>
          <GridItem colSpan={[2, 1]}>
            <AppSelect
              data={citiesOptions}
              aria-label="city"
              label="Cidade"
              {...register("city")}
              errorMsg={errors.city?.message}
              style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
              setValue={setValue}
              getValues={getValues}
            />
          </GridItem>
        </Grid>
        <Flex flexDir={["column", "row"]} width="100%" marginBottom={[0, 4]}>
          <AppInput
            aria-label="street"
            label="Rua"
            {...register("street")}
            errorMsg={errors.street?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
        </Flex>
        <Flex flexDir={["column", "row"]} width="100%" marginBottom={[0, 4]}>
          <AppInput
            aria-label="number"
            label="Número"
            {...register("number")}
            errorMsg={errors.number?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
          <AppInput
            aria-label="district"
            label="Bairro"
            {...register("district")}
            errorMsg={errors.district?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
        </Flex>
        <Flex flexDir={["column", "row"]} width="100%" marginBottom={[0, 4]}>
          <AppInput
            aria-label="complement"
            label="Complemento"
            {...register("complement")}
            errorMsg={errors.complement?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
        </Flex>
        <Flex
          flexDir={["column", "row"]}
          justify="space-between"
          marginBottom={4}
        >
          <Heading as="h3" size="lg" marginBottom={4}>
            Horários
          </Heading>
          <Button
            onClick={() =>
              appendSchedule({
                weekDay: WeekDay.DOM,
                time: "",
                relation: ScheduleRelation.FROM,
              })
            }
            type="button"
          >
            Adicionar novo
          </Button>
        </Flex>
        {scheduleFields.map((schedule, index) => (
          <Card key={schedule.id} padding={4} marginBottom={4}>
            <Flex flexDir="row" justify="flex-end">
              <Button
                colorScheme="red"
                onClick={() => removeSchedule(index)}
                type="button"
              >
                Remover
              </Button>
            </Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem colSpan={[3, 1]}>
                <AppSelect
                  data={weekDayOptions}
                  aria-label={`schedules.${index}.weekDay`}
                  label="Dia da semana"
                  {...register(`schedules.${index}.weekDay`)}
                  errorMsg={
                    errors.schedules &&
                    errors.schedules[index]?.weekDay?.message
                  }
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                  setValue={setValue}
                  getValues={getValues}
                />
              </GridItem>
              <GridItem colSpan={[3, 1]}>
                <AppSelect
                  data={scheduleRelationOptions}
                  aria-label={`schedules.${index}.relation`}
                  label="Relação"
                  {...register(`schedules.${index}.relation`)}
                  errorMsg={
                    errors.schedules &&
                    errors.schedules[index]?.relation?.message
                  }
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                  setValue={setValue}
                  getValues={getValues}
                />
              </GridItem>
              <GridItem colSpan={[3, 1]}>
                <AppInput
                  aria-label={`schedules.${index}.time`}
                  label="Tempo"
                  {...register(`schedules.${index}.time`)}
                  errorMsg={
                    errors.schedules && errors.schedules[index]?.time?.message
                  }
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                />
              </GridItem>
            </Grid>
            <Flex
              flexDir={["column", "row"]}
              width="100%"
              align="center"
              justify="center"
              marginBottom={[0, 4]}
            ></Flex>
          </Card>
        ))}

        <Flex
          flexDir={["column", "row"]}
          justify="space-between"
          marginBottom={4}
        >
          <Heading as="h3" size="lg" marginBottom={4}>
            Fretes
          </Heading>
          <Button
            onClick={() =>
              appendFreight({
                addressKey: "district",
                addressValue: districtOptions[0].value,
                value: 0,
              })
            }
            type="button"
          >
            Adicionar novo
          </Button>
        </Flex>
        {freightFields.map((freight, index) => (
          <Card key={freight.id} padding={4} marginBottom={4}>
            <Flex flexDir="row" justify="flex-end">
              <Button
                colorScheme="red"
                onClick={() => removeFreight(index)}
                type="button"
              >
                Remover
              </Button>
            </Flex>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem colSpan={[2, 1]}>
                <AppSelect
                  data={districtOptions}
                  aria-label={`freights.${index}.addressValue`}
                  label="Bairro"
                  {...register(`freights.${index}.addressValue`)}
                  errorMsg={
                    errors.freights &&
                    errors.freights[index]?.addressValue?.message
                  }
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                  setValue={setValue}
                  getValues={getValues}
                />
              </GridItem>
              <GridItem colSpan={[2, 1]}>
                <AppCurrencyInput
                  aria-label={`freights.${index}.value`}
                  label="Valor"
                  {...register(`freights.${index}.value`)}
                  errorMsg={
                    errors.freights && errors.freights[index]?.value?.message
                  }
                  style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
                  setValue={setValue}
                  getValues={getValues}
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

export default EnterpriseCreate;
