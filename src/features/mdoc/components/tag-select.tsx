import CreatableSelect from "react-select/creatable";
export interface TagOption {
  label: string;
  value: string;
}
interface TagSelectProps {
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
}
export const TagSelect = ({ value, options, onChange }: TagSelectProps) => {
  const selectOptions: TagOption[] = options.map((tag) => ({
    label: tag,
    value: tag,
  }));
  const selectedOptions: TagOption[] = value.map((tag) => ({
    label: tag,
    value: tag,
  }));
  return (
    <CreatableSelect
      isMulti
      value={selectedOptions}
      options={selectOptions}
      onChange={(newValue) => onChange(newValue.map((v) => v.value))}
      formatCreateLabel={(input) => `Tao nhan ${input}`}
    />
  );
};
