import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  StyleProps,
} from "@chakra-ui/react";
import { AppImageInput } from "@components/AppImageInput";
import { useGetImageRequest } from "@hooks/useGetImageRequest";
import { useState } from "react";
import {
  ArrayPath,
  useFieldArray,
  FieldValues,
  Control,
} from "react-hook-form";

interface IAditionalFieldsProps<IForm extends FieldValues> extends StyleProps {
  control: Control<IForm, string>;
  name: ArrayPath<IForm>;
  getValues: any;
  setValue: any;
}

export function AdditionalFields<IForm extends FieldValues>({
  control,
  name,
  getValues,
  setValue,
  ...style
}: IAditionalFieldsProps<IForm>) {
  const { append, fields, remove } = useFieldArray({
    control,
    name,
  });

  const [image] = useState();

  const {} = useGetImageRequest();

  return (
    <Flex flexDir="column" {...style}>
      <Flex
        flexDir={["column", "row"]}
        justify="space-between"
        marginBottom={4}
      >
        <Heading as="h4" size="md" marginBottom={4}>
          Adicionais
        </Heading>
        <Button
          onClick={() =>
            append({
                // @ts-ignore
              additionalId: getValues(`${name}.additionalId`),
              imageKey: getValues(`${name}.imageKey`),
              name: getValues(`${name}.name`),
              value: getValues(`${name}.value`),
              isDisabled: getValues(`${name}.isDisabled`),
            })
          }
          type="button"
        >
          Adicionar novo
        </Button>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem colSpan={[3, 1]}>
            <AppImageInput onImageChange={(file) => } />
        </GridItem>
      </Grid>
    </Flex>
  );
}
