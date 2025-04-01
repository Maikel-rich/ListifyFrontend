import { useState, ChangeEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

interface FloatingLabelProps {
    label: string;
    isPassword?: boolean;
    isDate?: boolean;
    labelBgColor?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

export default function FloatingLabel({
    label,
    isPassword = false,
    isDate = false,
    labelBgColor = "bg-[var(--gray-dark)]",
    value = "",
    onChange,
    name
}: FloatingLabelProps) {
    const [showPassword, setShowPassword] = useState(false);
    const hasContent = value.length > 0;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className="relative w-full">
            <input
                type={isPassword ? (showPassword ? "text" : "password") : isDate ? "date" : "text"}
                id={`floating_${name}`}
                className={`peer block w-full px-2.5 pb-2.5 pt-4 text-sm text-[var(--gray-light)] bg-transparent rounded-lg border border-[var(--gray-light)] appearance-none focus:outline-none focus:ring-0 focus:[var(--primary)] ${
                    hasContent ? "text-lg" : ""
                }`}
                placeholder=" "
                value={value}
                onChange={handleInputChange}
                name={name}
            />
            <label
                htmlFor={`floating_${name}`}
                className="absolute start-1 text-lg text-[var(--gray-light)] duration-300 transform -translate-y-5 scale-80 top-1 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:px-2 peer-focus:text-[var(--primary)] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                style={{ backgroundColor: labelBgColor }}
            >
                {label}
            </label>

            {isPassword && (
                <button
                    type="button"
                    className="absolute right-4 top-3 text-[var(--primary)]"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
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