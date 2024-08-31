import { useMemo } from "react";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type Props = {
  onChange: (value?: string | string[]) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string | string[] | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};

export const Select = ({
  onChange,
  onCreate,
  options = [],
  value,
  disabled,
  placeholder,
}: Props) => {
  const onSelect = (option: MultiValue<{ label: string; value: string }>) => {
    onChange(option ? option.map((item) => item.value) : undefined);
  };

  const formattedValue = useMemo(() => {
    if (Array.isArray(value)) {
      return options.filter((option) => value.includes(option.value));
    } else if (value) {
      return options.find((option) => option.value === value);
    }
    return [];
  }, [options, value]);

  return (
    <CreatableSelect
      isMulti
      placeholder={placeholder}
      className="text-sm h-10"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0",
          ":hover": { borderColor: "#e2e8f0" },
        }),
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
    />
  );
};
