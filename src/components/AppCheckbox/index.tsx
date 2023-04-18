import { Checkbox } from "@chakra-ui/react";
import { Path, FieldValues, Control, useController } from "react-hook-form";

interface IAppCheckboxProps<IForm extends FieldValues> {
  control: Control<IForm, string>;
  label: string;
  name: Path<IForm>;
}

export function AppCheckbox<IForm extends FieldValues>({
  label,
  control,
  name,
}: IAppCheckboxProps<IForm>) {
  const {
    field: { onChange: onControlChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <Checkbox
      colorScheme="green"
      isChecked={value}
      onChange={(elem) => onControlChange(name, elem.target.checked)}
    >
      {label}
    </Checkbox>
  );
}
