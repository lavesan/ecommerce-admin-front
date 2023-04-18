import {
  Text,
  StyleProps,
  FormLabel,
  Collapse,
  Select,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { Path, FieldValues, Control, useController } from "react-hook-form";

interface IInputProps<IForm extends FieldValues> {
  control: Control<IForm, string>;
  label?: string;
  name: Path<IForm>;
  placeholder?: string;
  style?: StyleProps;
  data: { label: string; value: string | number }[];
}

export function AppSelect<IForm extends FieldValues>({
  label,
  control,
  name,
  data,
  style = {},
  ...select
}: IInputProps<IForm>) {
  const {
    field: { onChange: onControlChange, value },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const [aliasErrorMsg, setAliasErrorMsg] = useState("");

  const errorMsg = useMemo<string>(
    () => errors[name]?.message?.toString() || "",
    [errors]
  );

  useEffect(() => {
    if (errorMsg) setAliasErrorMsg(errorMsg);

    if (!errorMsg)
      setTimeout(() => {
        setAliasErrorMsg("");
      }, 2000);
  }, [errorMsg, setAliasErrorMsg]);

  const onChange = (elem: any) => {
    onControlChange(elem.target.value);
  };

  return (
    <Flex flexDir="column" {...style}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Select
        id={name}
        isInvalid={!!errorMsg}
        onChange={onChange}
        value={value}
        {...select}
      >
        {data.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <Collapse in={!!errorMsg} animateOpacity>
        <Text color="red.500" fontSize="sm">
          {errorMsg || aliasErrorMsg}
        </Text>
      </Collapse>
    </Flex>
  );
}
