import { OrderStatus } from "@enums/OrderStatus.enum";
import { PaymentType } from "@enums/PaymentType.enum";
import { WeekDay } from "@enums/WeekDay.enum";

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

export const weekDayOptions = [
  { label: "Domingo", value: WeekDay.DOM },
  { label: "Segunda", value: WeekDay.SEG },
  { label: "Terça", value: WeekDay.TER },
  { label: "Quarta", value: WeekDay.QUA },
  { label: "Quinta", value: WeekDay.QUI },
  { label: "Sexta", value: WeekDay.SEX },
  { label: "Sábado", value: WeekDay.SAB },
];
