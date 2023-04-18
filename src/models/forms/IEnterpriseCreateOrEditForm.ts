export interface IEnterpriseCreateOrEditForm {
  name: string;
  email: string;
  description: string;
  cnpj: string;
  phone: string;
  cep: string;
  street: string;
  complement: string;
  number: string;
  district: string;
  city: string;
  freights?: {
    freightId?: string | undefined;
    addressKey: string;
    addressValue: string;
    value: number;
  }[];
}
