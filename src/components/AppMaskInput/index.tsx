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
import InputMask from "react-input-mask";

interface IInputMaskProps {
  mask: string;
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
  value: any;
}

export const AppMaskInput = forwardRef<HTMLInputElement, IInputMaskProps>(
  (
    { label, errorMsg, style = {}, mask, setValue, value, ...input },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [aliasErrorMsg, setAliasErrorMsg] = useState("");
    const [maskValue, setMaskValue] = useState("");

    useEffect(() => {
      setMaskValue(value);
    }, [value]);

    useEffect(() => {
      setValue(input.name, maskValue);
    }, [maskValue]);

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
        <InputMask
          mask={mask}
          id={input.name}
          {...input}
          value={maskValue}
          onChange={(elem) => setMaskValue(elem.target.value)}
        >
          {/* @ts-ignore */}
          {(inputProps) => <Input ref={ref} {...inputProps} />}
        </InputMask>
        <Collapse in={!!errorMsg} animateOpacity>
          <Text color="red.500" fontSize="sm">
            {errorMsg || aliasErrorMsg}
          </Text>
        </Collapse>
      </FormControl>
    );
  }
);
