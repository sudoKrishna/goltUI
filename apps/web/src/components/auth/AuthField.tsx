interface AuthFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
}

export function AuthField({ label, id, type = "text", placeholder, description, required }: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border border-white/15 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-white/30"
      />
      {description && <p className="text-xs text-zinc-500">{description}</p>}
    </div>
  );
}
