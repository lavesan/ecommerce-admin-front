import { CurrencyInput } from "react-currency-mask";
import {
  Input,
  Text,
  StyleProps,
  FormLabel,
  Collapse,
  FormControl,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Path, FieldValues, Control, useController } from "react-hook-form";

interface ICurrencyInputProps<IForm extends FieldValues> {
  control: Control<IForm, string>;
  label: string;
  name: Path<IForm>;
  style?: StyleProps;
}

export function AppCurrencyInput<IForm extends FieldValues>({
  label,
  control,
  style = {},
  name,
}: ICurrencyInputProps<IForm>) {
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

  return (
    <FormControl isInvalid={!!errorMsg} {...style}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <CurrencyInput
        value={value}
        onChangeValue={(event, originalValue, maskedValue) =>
          onControlChange(originalValue)
        }
        InputElement={<Input id={name} />}
      />
      <Collapse in={!!errorMsg} animateOpacity>
        <Text color="red.500" fontSize="sm">
          {errorMsg || aliasErrorMsg}
        </Text>
      </Collapse>
    </FormControl>
  );
}
