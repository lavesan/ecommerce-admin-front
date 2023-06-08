import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from "@hooks/useAppContext";
import { useAppToast } from "@hooks/useAppToast";
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
import { AppSelect } from "@components/AppSelect";
import { useEnterpriseOptions } from "@hooks/useEnterpriseOptions";

const UserCreateOrEdit = () => {
  const userService = UserService.getInstance();

  const { userId } = useParams();

  const { setIsLoading } = useAppContext();
  const { showToast } = useAppToast();

  const { enterpriseOptions } = useEnterpriseOptions();

  const [user, setUser] = useState<IUser>({} as IUser);

  const enterpriseForm = useMemo<IUserCreateOrEditForm>(() => {
    const { name, email, isAdmin, enterprises } = user;

    return {
      name,
      email,
      isAdmin: isAdmin ? isAdmin : false,
      enterpriseId: enterprises?.length ? enterprises[0].id : "",
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

    setIsLoading(true);

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
      setIsLoading(true);
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
        <Flex
          flexDir={["column", "row"]}
          width="100%"
          gap={2}
          marginBottom={[0, 4]}
        >
          <AppInput
            aria-label="name"
            label="Nome"
            {...register("name")}
            errorMsg={errors.name?.message}
            style={{ marginBottom: [4, 0] }}
          />
          <AppInput
            aria-label="email"
            label="Email"
            {...register("email")}
            type="email"
            errorMsg={errors.email?.message}
            style={{ marginBottom: [4, 0] }}
          />
        </Flex>
        <AppSelect<IUserCreateOrEditForm>
          data={enterpriseOptions}
          label="Empresa vinculada"
          name="enterpriseId"
          control={control}
          style={{ marginBottom: 4 }}
        />
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
