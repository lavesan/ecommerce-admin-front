import { OrderStatus } from "@enums/OrderStatus.enum";
import { PaymentType } from "@enums/PaymentType.enum";

export const paymentTypeOptions = [
  { label: "Maquininha crédito", value: PaymentType.CREDIT_CARD_MACHINE },
  { label: "Maquininha débito", value: PaymentType.DEBIT_CARD_MACHINE },
  { label: "Dinheiro", value: PaymentType.MONEY },
];

export const orderStatusOptions = [
  { label: "Cancelada", value: OrderStatus.CANCELED },
  { label: "Deletada", value: OrderStatus.DELETED },
  { label: "Fazendo", value: OrderStatus.DOING },
  { label: "Concluída", value: OrderStatus.DONE },
  { label: "Enviando", value: OrderStatus.SENDING },
  { label: "A Aprovar", value: OrderStatus.TO_APPROVE },
];
