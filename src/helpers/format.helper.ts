import { OrderStatus } from "@enums/OrderStatus.enum";
import { PaymentType } from "@enums/PaymentType.enum";
import { WeekDay } from "@enums/WeekDay.enum";

export const maskCnpj = (cnpj: string) => {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};

export const maskCpf = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

/**
 * @description money is an integer number
 * @param {number} money
 */
export const maskMoney = (money: number) => {
  return (money / 100).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

const handleOrderStatus = {
  [OrderStatus.CANCELED]: {
    label: "Cancelada",
    scheme: "red",
  },
  [OrderStatus.DELETED]: {
    label: "Deletada",
    scheme: "red",
  },
  [OrderStatus.DOING]: {
    label: "Fazendo",
    scheme: "yellow",
  },
  [OrderStatus.DONE]: {
    label: "Concluída",
    scheme: "green",
  },
  [OrderStatus.SENDING]: {
    label: "Enviando",
    scheme: "yellow",
  },
  [OrderStatus.TO_APPROVE]: {
    label: "A Aprovar",
    scheme: "purple",
  },
};

export const translateOrderStatus = (status: OrderStatus) => {
  return handleOrderStatus[status];
};

const handlePaymentType = {
  [PaymentType.CREDIT_CARD_MACHINE]: "Maquininha débito",
  [PaymentType.DEBIT_CARD_MACHINE]: "Maquininha crédito",
  [PaymentType.MONEY]: "Dinheiro",
};

export const translatePaymentType = (paymentType: PaymentType) => {
  return handlePaymentType[paymentType];
};

const handleWeekDay = {
  [WeekDay.DOM]: "Domingo",
  [WeekDay.SEG]: "Segunda",
  [WeekDay.TER]: "Terça",
  [WeekDay.QUA]: "Quarta",
  [WeekDay.QUI]: "Quinta",
  [WeekDay.SEX]: "Sexta",
  [WeekDay.SAB]: "Sábado",
};

export const translateWeekDay = (weekDay: WeekDay) => {
  return handleWeekDay[weekDay];
};
