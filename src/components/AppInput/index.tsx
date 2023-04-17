import {
  Input,
  Text,
  StyleProps,
  FormLabel,
  Collapse,
  FormControl,
  InputRightElement,
  IconButton,
  InputGroup,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  ForwardedRef,
  HTMLInputTypeAttribute,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface IInputProps {
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
}

const HiEyeOffRef = forwardRef((props, ref) => <HiEyeOff {...props} />);

const HiEyeRef = forwardRef((props, ref) => <HiEye {...props} />);

export const AppInput = forwardRef<HTMLInputElement, IInputProps>(
  (
    { label, errorMsg, type, style = {}, ...input },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [aliasErrorMsg, setAliasErrorMsg] = useState("");
    const [showPwd, setShowPwd] = useState(false);

    const inputType = useMemo<HTMLInputTypeAttribute>(() => {
      if (type === "password") {
        if (showPwd) return "text";
        else return "password";
      }

      return type as HTMLInputTypeAttribute;
    }, [type, showPwd]);

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
        <InputGroup>
          <Input ref={ref} id={input.name} type={inputType} {...input} />
          {type === "password" && (
            <InputRightElement>
              {showPwd ? (
                <IconButton
                  as={HiEyeOffRef}
                  aria-label="Hide password"
                  title="Esconder"
                  onClick={() => setShowPwd(false)}
                  size="xs"
                  background="none"
                  cursor="pointer"
                  _hover={{
                    background: "none",
                  }}
                />
              ) : (
                <IconButton
                  as={HiEyeRef}
                  aria-label="show password"
                  title="Mostrar"
                  onClick={() => setShowPwd(true)}
                  size="xs"
                  background="none"
                  cursor="pointer"
                  _hover={{
                    background: "none",
                  }}
                />
              )}
            </InputRightElement>
          )}
        </InputGroup>
        <Collapse in={!!errorMsg} animateOpacity>
          <Text color="red.500" fontSize="sm">
            {errorMsg || aliasErrorMsg}
          </Text>
        </Collapse>
      </FormControl>
    );
  }
);
