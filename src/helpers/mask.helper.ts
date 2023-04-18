export const phoneMask = "(99) 99999-9999";
export const cnpjMask = "99.999.999/9999-99";
export const cpfMask = "999.999.999-99";

export const unmask = (value: string) => value.replace(/\D/g, "");
