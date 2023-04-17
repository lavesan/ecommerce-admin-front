import { useParams } from "react-router-dom";

const EnterpriseCreate = () => {
  const { id } = useParams();

  return (
    <h1>
      {id ? "Editar" : "Criar"} empresa {id}
    </h1>
  );
};

export default EnterpriseCreate;
