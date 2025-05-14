import React, {
  FC,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  CSSProperties,
} from "react";

type InputProps = {
  type?: string;
  label?: string;
  labelType?: "type1" | "type2";
  placeholder?: string;
  id: string;
  disabled?: boolean;
  value?: string;
  maxLength?: number;
  ref?: React.Ref<HTMLInputElement>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  parentStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  isHelperTextVisible?: boolean;
  state?: "default" | "error" | "success";
  helperText?: string;
};

const Input: FC<InputProps> = ({
  type = "text",
  label = "",
  labelType = "type2",
  placeholder = "",
  id,
  disabled = false,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  ref,
  maxLength,
  parentStyle,
  inputStyle,
  labelStyle,
  isHelperTextVisible = true,
  state = "default",
  helperText = "",
}) => {
  return (
    <div style={parentStyle} className="">
      {label && (
        <label
          htmlFor={id}
          style={labelStyle}
          className={`block text-sm font-medium leading-6 ${
            labelType === "type1" ? "text-gray-900" : "text-gray-600"
          }`}
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          disabled={disabled}
          style={inputStyle}
          className={`block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-primary sm:text-sm sm:leading-6 ${
            disabled ? "bg-gray-100 cursor-not-allowed" : "text-gray-900"
          }`}
        />
      </div>
      {isHelperTextVisible && helperText && (
        <p
          className={`mt-2 text-sm ${
            state === "error"
              ? "text-red-500"
              : state === "success"
              ? "text-green-500"
              : "text-gray-500"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
