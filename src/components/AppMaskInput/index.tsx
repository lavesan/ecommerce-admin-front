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
import InputMask from "react-input-mask";

interface IInputMaskProps<IForm extends FieldValues> {
  mask: string;
  control: Control<IForm, string>;
  label: string;
  name: Path<IForm>;
  style?: StyleProps;
  errorMsg?: string;
}

export function AppMaskInput<IForm extends FieldValues>({
  label,
  name,
  control,
  style,
  mask,
  errorMsg,
}: IInputMaskProps<IForm>) {
  const {
    field: { onChange: onControlChange, value },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const [aliasErrorMsg, setAliasErrorMsg] = useState("");

  useEffect(() => {
    console.log("errors: ", errors);
  }, [errors]);

  // const errorMsg = useMemo<string>(
  //   () => errors[name]?.message?.toString() || "",
  //   [errors]
  // );

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
      <InputMask
        mask={mask}
        id={name}
        value={value}
        onChange={(elem) => onControlChange(elem.target.value)}
      >
        {/* @ts-ignore */}
        {(inputProps) => <Input {...inputProps} />}
      </InputMask>
      <Collapse in={!!errorMsg} animateOpacity>
        <Text color="red.500" fontSize="sm">
          {errorMsg || aliasErrorMsg}
        </Text>
      </Collapse>
    </FormControl>
  );
}
