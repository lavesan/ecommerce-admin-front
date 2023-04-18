import { CurrencyInput } from "react-currency-mask";
import {
  Input,
  Text,
  StyleProps,
  FormLabel,
  Collapse,
  FormControl,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  ForwardedRef,
  HTMLInputTypeAttribute,
  forwardRef,
  useEffect,
  useState,
} from "react";

interface ICurrencyInputProps {
  label?: string;
  errorMsg?: string;
  style?: StyleProps;
  onChange: ChangeEventHandler;
  onBlur: ChangeEventHandler;
  name: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  setValue: any;
  getValues: any;
}

export const AppCurrencyInput = forwardRef<
  HTMLInputElement,
  ICurrencyInputProps
>(
  (
    { label, errorMsg, style = {}, setValue, getValues, ...input },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [aliasErrorMsg, setAliasErrorMsg] = useState("");

    useEffect(() => {
      if (errorMsg) setAliasErrorMsg(errorMsg);

      if (!errorMsg)
        setTimeout(() => {
          setAliasErrorMsg("");
        }, 2000);
    }, [errorMsg, setAliasErrorMsg]);

    return (
      <FormControl isInvalid={!!errorMsg} {...style}>
        {label && <FormLabel htmlFor={input.name}>{label}</FormLabel>}
        <CurrencyInput
          ref={ref}
          value={getValues(input.name)}
          onChangeValue={(event, originalValue, maskedValue) => {
            setValue(input.name, originalValue);
            console.log(event, originalValue, maskedValue);
          }}
          InputElement={<Input id={input.name} />}
        />
        <Collapse in={!!errorMsg} animateOpacity>
          <Text color="red.500" fontSize="sm">
            {errorMsg || aliasErrorMsg}
          </Text>
        </Collapse>
      </FormControl>
    );
  }
);
