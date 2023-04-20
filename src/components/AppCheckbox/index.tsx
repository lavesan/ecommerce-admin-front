import { Checkbox, StyleProps } from "@chakra-ui/react";
import { Path, FieldValues, Control, useController } from "react-hook-form";

interface IAppCheckboxProps<IForm extends FieldValues> {
  control: Control<IForm, string>;
  label: string;
  name: Path<IForm>;
  style?: StyleProps;
}

export function AppCheckbox<IForm extends FieldValues>({
  label,
  control,
  name,
  style,
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
      onChange={() => onControlChange(!value)}
      {...style}
    >
      {label}
    </Checkbox>
  );
}
