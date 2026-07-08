"use client";

type Props = {
  onConfirm: () => void;
};

export default function HumanConfirm({ onConfirm }: Props) {
  return (
    <div className="max-w-md space-y-4 rounded border p-6">
      <h2 className="text-lg font-semibold">
        Confirm you are a human being
      </h2>

      <p className="text-sm text-muted">
        This space is built for real people.
        Please confirm before entering.
      </p>

      <button
        onClick={onConfirm}
        className="btn-primary w-full"
      >
        I confirm I am a human being
      </button>
    </div>
  );
}
