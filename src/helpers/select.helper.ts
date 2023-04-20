import { getCities } from "@brazilian-utils/brazilian-utils";
import { OrderStatus } from "@enums/OrderStatus.enum";
import { PaymentType } from "@enums/PaymentType.enum";
import { ProductAdditionalType } from "@enums/ProductAdditionalType.enum";
import { ScheduleRelation } from "@enums/ScheduleRelation";
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

export const citiesOptions = getCities("PE").map((city) => ({
  label: city,
  value: city,
}));

const districts = [
  "Boa esperança",
  "Boa Vista",
  "Alto do Cardeal",
  "Centro",
  "Cidade Jardim",
  "Cohab",
  "Cohab",
  "Coliseu",
  "Condomínio Morada do sol",
  "Conjunto novo Arcoverde",
  "Coronel Siqueira Campos",
  "Cruzeiro",
  "Loteamento Anchieta dali",
  "Loteamento arco íris",
  "LOTEAMENTO JARDIM DA SERRA",
  "Loteamento Arcoville",
  "Loteamento Petrópolis",
  "Loteamento Petrópolis 2",
  "Loteamento Rocha",
  "Loteamento Teresópolis",
  "Loteamento Veraneio",
  "Maria de Fátima",
  "Por do sol",
  "RESIDENCIAL DIVINA MISERICÓRDIA",
  "Santa Luzia",
  "Santos Drumond",
  "São Cristóvão",
  "são Geraldo",
  "São Miguel",
  "Sucupira",
  "Tamboril",
  "Vila cardeal arcoverde",
];

export const districtOptions = districts.map((district) => ({
  label: district,
  value: district,
}));

const handleScheduleRelation = {
  [ScheduleRelation.FROM]: "De",
  [ScheduleRelation.TO]: "Até",
};

export const scheduleRelationOptions = Object.values(ScheduleRelation).map(
  (schedule) => ({
    label: handleScheduleRelation[schedule],
    value: schedule,
  })
);

export const additionaCategoryTypeOptions = [
  { label: "Selecionar um", value: ProductAdditionalType.ONE_SELECT },
  {
    label: "Selecionar vários",
    value: ProductAdditionalType.MORE_THAN_ONE_SELECT,
  },
];
