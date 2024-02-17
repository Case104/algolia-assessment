type LabeledInputProps = {
    id: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  export const LabeledInput: React.FC<LabeledInputProps> = ({ id, label, value, onChange }) => (
    <div className="w-full max-w-xs">
      <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );