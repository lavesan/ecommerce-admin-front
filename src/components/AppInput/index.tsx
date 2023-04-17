import {
  Flex,
  Input,
  Text,
  StyleProps,
  FormLabel,
  FormErrorMessage,
  Collapse,
  FormControl,
} from "@chakra-ui/react";
import { ChangeEventHandler, forwardRef, useEffect, useState } from "react";

interface IInputProps {
  label: string;
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
}

export const AppInput = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, errorMsg, style = {}, ...input }, ref) => {
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
        <FormLabel htmlFor={input.name}>{label}</FormLabel>
        <Input ref={ref} id={input.name} {...input} />
        <Collapse in={!!errorMsg} animateOpacity>
          <Text color="red.500" fontSize="sm">
            {errorMsg || aliasErrorMsg}
          </Text>
        </Collapse>
      </FormControl>
    );
  }
);
