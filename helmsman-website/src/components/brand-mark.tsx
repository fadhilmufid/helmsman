import { Icon } from "@/components/icons";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid place-items-center rounded-lg bg-zinc-900 text-zinc-50 ${className}`}
    >
      <Icon name="compass" width={18} height={18} strokeWidth={1.8} />
    </span>
  );
}
