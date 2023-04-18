import { useParams } from "react-router-dom";

const PromotionCreateOrEdit = () => {
  const { promotionId } = useParams();

  return (
    <h1>
      {promotionId ? "Editar" : "Criar"} {promotionId}
    </h1>
  );
};

export default PromotionCreateOrEdit;
