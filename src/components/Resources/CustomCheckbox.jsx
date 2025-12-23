import { Check } from "lucide-react";

export function CustomCheckbox({ checked, onCheckedChange, className = "" }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`size-4 shrink-0 rounded border transition-all ${
        checked
          ? "bg-blue-600 border-blue-600"
          : "bg-white border-gray-300 hover:border-gray-400"
      } ${className}`}
    >
      {checked && <Check className="size-3.5 text-white" />}
    </button>
  );
}
