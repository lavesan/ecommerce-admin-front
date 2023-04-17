import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { Flex, Card, Input, Button } from "@chakra-ui/react";

import { IUserLoginRequest } from "@models/IUserLoginRequest";
import { UserService } from "@services/user.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTokenCookies } from "@hooks/useTokenCookies";

import { validationSchema } from "./validations";
import { AppInput } from "@components/AppInput";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@hooks/useAppContext";

const Login = () => {
  const userService = UserService.getInstance();
  const { setToken } = useTokenCookies();
  const { setIsLoading } = useAppContext();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUserLoginRequest>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async (form) => {
    const res = await userService.login(form);
    setIsLoading(false);

    setToken(res.accessToken);
    navigate("/");
  });

  return (
    <>
      <Card as="form" onSubmit={onSubmit} padding={4}>
        <AppInput
          aria-label="email"
          label="Email"
          {...register("email")}
          errorMsg={errors.email?.message}
          style={{ marginBottom: 4 }}
        />
        <AppInput
          aria-label="password"
          label="Senha"
          {...register("password")}
          errorMsg={errors.password?.message}
          style={{ marginBottom: 4 }}
        />
        <Button type="submit">Entrar</Button>
      </Card>
    </>
  );
};

export default Login;
