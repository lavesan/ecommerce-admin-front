import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from "@hooks/useAppContext";
import { useAppToast } from "@hooks/useSuccessToast";
import { IUser } from "@models/entities/IUser";
import { IUserCreateOrEditForm } from "@models/forms/IUserCreateOrEditForm";
import { UserService } from "@services/user.service";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { validationSchema } from "./validations";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { AppCheckbox } from "@components/AppCheckbox";
import { AppInput } from "@components/AppInput";

const UserCreateOrEdit = () => {
  const userService = UserService.getInstance();

  const { userId } = useParams();

  const { setIsLoading } = useAppContext();
  const { showToast } = useAppToast();

  const [user, setUser] = useState<IUser>({} as IUser);

  const enterpriseForm = useMemo<IUserCreateOrEditForm>(() => {
    const { name, email, isAdmin } = user;

    return {
      name,
      email,
      isAdmin: isAdmin ? isAdmin : false,
      password: "",
    };
  }, [user]);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IUserCreateOrEditForm>({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: enterpriseForm,
  });

  const mountBody = (body: IUserCreateOrEditForm) => body;

  const onSubmit = handleSubmit(async (values) => {
    let successMsg = "";

    if (userId) {
      await userService
        .update(userId, mountBody(values))
        .finally(() => setIsLoading(false));

      successMsg = "Usuário editada";
    } else {
      await userService
        .create(mountBody(values))
        .finally(() => setIsLoading(false));

      successMsg = "Usuário criada";
    }
    showToast({ title: successMsg, status: "success" });
  });

  const onInit = useCallback(async () => {
    if (userId) {
      const res = await userService
        .findById(userId)
        .finally(() => setIsLoading(false));

      setUser(res);
    }
  }, []);

  useEffect(() => {
    onInit();
  }, [onInit]);

  useEffect(() => {
    reset(enterpriseForm);
  }, [enterpriseForm]);

  return (
    <>
      <Heading as="h2" size="lg">
        {userId ? "Editar" : "Criar"} usuário
      </Heading>
      <Flex marginBottom={8} marginTop={4}>
        <AppCheckbox<IUserCreateOrEditForm>
          label="É admin"
          control={control}
          name="isAdmin"
        />
      </Flex>
      <Flex as="form" flexDir="column" onSubmit={onSubmit}>
        <Flex flexDir={["column", "row"]} width="100%" marginBottom={[0, 4]}>
          <AppInput
            aria-label="name"
            label="Nome"
            {...register("name")}
            errorMsg={errors.name?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
          <AppInput
            aria-label="email"
            label="Email"
            {...register("email")}
            type="email"
            errorMsg={errors.email?.message}
            style={{ marginBottom: [4, 0], marginRight: [0, 4] }}
          />
        </Flex>
        <AppInput
          aria-label="password"
          label="Nova senha"
          {...register("password")}
          type="password"
          errorMsg={errors.password?.message}
          style={{ marginBottom: 4 }}
        />
        <Button colorScheme="green" type="submit">
          Salvar
        </Button>
      </Flex>
    </>
  );
};

export default UserCreateOrEdit;
