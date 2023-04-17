import {
  Text,
  StyleProps,
  FormLabel,
  Collapse,
  Select,
  Flex,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  useEffect,
  useState,
} from "react";

interface IInputProps {
  label?: string;
  errorMsg?: string;
  style?: StyleProps;
  data: { label: string; value: string | number }[];
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
  placeholder?: string;
  setValue: any;
}

export const AppSelect = forwardRef<HTMLSelectElement, IInputProps>(
  (
    { label, errorMsg, style = {}, data, setValue, ...input },
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    const [aliasErrorMsg, setAliasErrorMsg] = useState("");

    useEffect(() => {
      if (errorMsg) setAliasErrorMsg(errorMsg);

      if (!errorMsg)
        setTimeout(() => {
          setAliasErrorMsg("");
        }, 2000);
    }, [errorMsg, setAliasErrorMsg]);

    const onChange = (elem: any) => {
      setValue(input.name, elem.target.value);
    };

    return (
      <Flex flexDir="column" {...style}>
        {label && <FormLabel htmlFor={input.name}>{label}</FormLabel>}
        <Select
          id={input.name}
          {...input}
          isInvalid={!!errorMsg}
          onChange={onChange}
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
);
