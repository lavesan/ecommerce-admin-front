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
