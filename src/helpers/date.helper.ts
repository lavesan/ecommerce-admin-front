import { format, parse } from "date-fns";

export const maskDate = (dateString: any): string => {
  if (!dateString) return "";
  const onlyDate = dateString.match(/\d{4}-\d{2}-\d{2}/g);
  if (!onlyDate?.length) return "";
  const parsedDate = parse(onlyDate[0], "yyyy-MM-dd", new Date());
  return format(parsedDate, "dd/MM/yyyy");
};

const addDigits = (digits: number) => {
  return digits.toString().length > 1 ? digits : `0${digits}`;
};

export const maskDateTime = (dateString: any): string => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return `${addDigits(date.getDate())}/${addDigits(
    date.getMonth() + 1
  )}/${date.getFullYear()} ${addDigits(date.getHours())}:${addDigits(
    date.getMinutes()
  )}h`;
};
