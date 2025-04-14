import { ChangeEvent, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

interface Option {
    value: string;
    label: string;
}

interface FloatingLabelProps {
    label: string;
    name: string;
    isPassword?: boolean;
    isNumber?: boolean;
    isDate?: boolean;
    isSelect?: boolean;
    isTextarea?: boolean;
    options?: Option[];
    labelBgColor?: string;
    value?: string | number;
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    disabled?: boolean;
    className?: string;
}

export default function FloatingLabel({
                                          label,
                                          name,
                                          isPassword = false,
                                          isDate = false,
                                          isSelect = false,
                                          isTextarea = false,
                                          isNumber = false,
                                          options = [],
                                          labelBgColor = "var(--gray-dark)",
                                          value = "",
                                          onChange,
                                          disabled = false,
                                          className = ""
                                      }: FloatingLabelProps) {
    const [showPassword, setShowPassword] = useState(false);
    // Asegúrate de que el valor es string para los controles
    const stringValue = typeof value === 'number' ? value.toString() : value;
    const hasContent = stringValue.length > 0;

    const baseClasses = "peer block w-full px-2.5 pb-2.5 pt-4 text-sm bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0";
    const enabledClasses = "text-[var(--gray-light)] border-[var(--gray-light)] focus:border-[var(--primary)]";
    const disabledClasses = "text-[var(--gray-medium)] border-[var(--gray-medium)] cursor-not-allowed";
    const inputClasses = `${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${hasContent ? "text-lg" : ""} ${className}`;

    return (
        <div className={`relative w-full ${disabled ? "opacity-80" : ""}`}>
            {isSelect ? (
                <select
                    id={`floating_${name}`}
                    className={inputClasses}
                    value={stringValue} // Usa el valor convertido a string
                    onChange={onChange}
                    name={name}
                    disabled={disabled}
                >
                    {options.map((option, index) => (
                        <option
                            key={index}
                            value={option.value}
                            className="bg-[var(--black)] text-[var(--white)]"
                            disabled={option.value === "" ? false : undefined}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : isTextarea ? (
                <textarea
                    id={`floating_${name}`}
                    className={`${inputClasses} min-h-[100px] resize-y`}
                    placeholder=" "
                    value={stringValue}
                    onChange={onChange}
                    name={name}
                    disabled={disabled}
                />
            ) : (
                <input
                    type={
                        isPassword
                            ? showPassword
                                ? "text"
                                : "password"
                            : isDate
                                ? "date"
                                : isNumber
                                    ? "number"
                                    : "text"
                    }
                    step={isNumber ? "any" : undefined}
                    id={`floating_${name}`}
                    className={inputClasses}
                    placeholder=" "
                    value={stringValue}
                    onChange={onChange}
                    name={name}
                    disabled={disabled}
                />
            )}

            <label
                htmlFor={`floating_${name}`}
                className={`absolute start-1 text-lg duration-300 transform -translate-y-5 scale-80 top-1 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:px-2 ${
                    disabled
                        ? "text-[var(--gray-medium)]"
                        : "text-[var(--gray-light)] peer-focus:text-[var(--primary)]"
                }`}
                style={{ backgroundColor: labelBgColor }}
            >
                {label}
            </label>

            {isPassword && (
                <button
                    type="button"
                    className={`absolute right-4 top-3 ${
                        disabled ? "text-[var(--gray-medium)]" : "text-[var(--primary)] hover:text-[var(--primary-dark)]"
                    }`}
                    onClick={() => !disabled && setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    disabled={disabled}
                >
                    {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                        <EyeIcon className="h-5 w-5" />
                    )}
                </button>
            )}
        </div>
    );
}