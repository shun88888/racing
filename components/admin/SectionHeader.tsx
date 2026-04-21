import { ReactNode } from "react";

export function SectionHeader({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <div>
        <div className="mb-2 flex items-center gap-3">
          <span className="h-px w-8 bg-racing-red" />
          <span className="font-display text-[10px] tracking-[0.35em] text-racing-red">
            EDIT
          </span>
        </div>
        <h1 className="font-display text-2xl font-bold tracking-wide text-racing-white">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}
