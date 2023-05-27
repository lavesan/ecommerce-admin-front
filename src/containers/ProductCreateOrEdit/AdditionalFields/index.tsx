import React from "react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  StyleProps,
} from "@chakra-ui/react";
import { IProductCreateOrEditForm } from "@models/forms/IProductCreateOrEditForm";
import {
  useFieldArray,
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { AdditionalFieldImage } from "./AdditionalFieldImage";
import { AppCurrencyInput } from "@components/AppCurrencyInput";
import { AppCheckbox } from "@components/AppCheckbox";
import { AppInput } from "@components/AppInput";

interface IAditionalFieldsProps extends StyleProps {
  control: Control<IProductCreateOrEditForm>;
  additionalCategoryIndex: number;
  setValue: UseFormSetValue<IProductCreateOrEditForm>;
  register: UseFormRegister<IProductCreateOrEditForm>;
  errors: FieldErrors<IProductCreateOrEditForm>;
}

export function AdditionalFields({
  control,
  additionalCategoryIndex,
  errors,
  setValue,
  register,
  ...style
}: IAditionalFieldsProps) {
  const { append, fields, remove } = useFieldArray({
    control,
    name: `productAdditionalCategory.${additionalCategoryIndex}.productAdditionals`,
  });

  return (
    <Flex flexDir="column" {...style}>
      <Flex
        flexDir={["column", "row"]}
        justify="space-between"
        marginBottom={4}
      >
        <Heading as="h4" size="md" marginTop={[4, 0]} marginBottom={4}>
          Adicionais
        </Heading>
        <Button
          onClick={() =>
            append({
              additionalId: "",
              imageKey: "",
              name: "",
              value: 0,
              isDisabled: false,
            })
          }
          type="button"
        >
          Adicionar novo
        </Button>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {fields.map(({ id, imageKey, ...additional }, index) => (
          <React.Fragment key={`additional_${id}`}>
            <GridItem colSpan={2}>
              <Flex justify="flex-end">
                <Button
                  colorScheme="red"
                  onClick={() => remove(index)}
                  type="button"
                >
                  Remover
                </Button>
              </Flex>
            </GridItem>
            <GridItem colSpan={2}>
              <AdditionalFieldImage
                setValue={setValue}
                value={imageKey}
                name={`productAdditionalCategory.${additionalCategoryIndex}.productAdditionals.${index}.imageKey`}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <AppCheckbox<IProductCreateOrEditForm>
                label="Desabilitar"
                control={control}
                name={`productAdditionalCategory.${additionalCategoryIndex}.productAdditionals.${index}.isDisabled`}
              />
            </GridItem>
            <GridItem colSpan={[2, 1]}>
              <AppInput
                label="Nome"
                aria-label={`productAdditionalCategory.${additionalCategoryIndex}.productAdditionals.${index}.name`}
                {...register(
                  `productAdditionalCategory.${additionalCategoryIndex}.productAdditionals.${index}.name`
                )}
              />
            </GridItem>
            <GridItem colSpan={[2, 1]}>
              <AppCurrencyInput<IProductCreateOrEditForm>
                label="Valor"
                control={control}
                name={`productAdditionalCategory.${additionalCategoryIndex}.productAdditionals.${index}.value`}
              />
            </GridItem>
          </React.Fragment>
        ))}
      </Grid>
    </Flex>
  );
}
