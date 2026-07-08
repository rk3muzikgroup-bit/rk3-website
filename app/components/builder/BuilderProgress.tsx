"use client";

type StepId = 0 | 1 | 2;

type Props = {
  step: StepId;
};

const STEPS = [
  { id: 0 as StepId, label: "Intent" },
  { id: 1 as StepId, label: "Flow" },
  { id: 2 as StepId, label: "Review" },
] as const;

export default function BuilderProgress({ step }: Props) {
  return (
    <div
      className="flex items-center gap-4"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={STEPS.length - 1}
      aria-valuenow={step}
    >
      {STEPS.map((s, index) => {
        const isActive = step === s.id;
        const isCompleted = step > s.id;

        return (
          <div
            key={s.id}
            className="flex items-center gap-2"
          >
            {/* CIRCLE */}
            <div
              aria-current={isActive ? "step" : undefined}
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium transition
                ${
                  isCompleted
                    ? "bg-primary text-white"
                    : isActive
                    ? "border-primary text-primary"
                    : "border-muted text-muted"
                }
              `}
            >
              {index + 1}
            </div>

            {/* LABEL */}
            <div
              className={`text-sm transition ${
                isActive
                  ? "font-medium"
                  : "text-muted"
              }`}
            >
              {s.label}
            </div>

            {/* CONNECTOR */}
            {index < STEPS.length - 1 && (
              <div
                className={`h-px w-8 transition ${
                  step > s.id
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
