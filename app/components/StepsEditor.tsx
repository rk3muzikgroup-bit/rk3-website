"use client";

import { useState, useEffect } from "react";
import { useStepPreview } from "@/hooks/useStepPreview";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/* ───────── TYPES ───────── */

export type Step = {
  id: string;
  src?: string;
  caption?: string;
  frequency?: string;
  duration?: number;
};

type Props = {
  steps: Step[];
  onChange: (steps: Step[]) => void;
};

type SortableStepProps = {
  step: Step;
  index: number;
  isOpen: boolean;
  isPlaying: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
};

/* ───────── SORTABLE STEP ───────── */

function SortableStep({
  step,
  index,
  isOpen,
  isPlaying,
  onToggle,
  children,
}: SortableStepProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border bg-black/40 transition ${
        isPlaying
          ? "border-emerald-400/40 shadow-[0_0_20px_rgba(52,211,153,0.15)]"
          : "border-white/10"
      }`}
    >
      {/* HEADER */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-3 text-left"
      >
        <div className="flex flex-col">
          <span className="text-sm opacity-80 flex items-center gap-2">
            Step {index + 1} — {step.caption || "Untitled"}
            {isPlaying && (
              <span className="text-xs text-emerald-400 animate-pulse">
                ● PLAYING
              </span>
            )}
          </span>

          <span className="text-xs opacity-50">
            {step.frequency || "—"} •{" "}
            {step.duration ? `${step.duration / 1000}s` : "—"}
          </span>
        </div>

        {/* DRAG HANDLE */}
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab select-none opacity-40 hover:opacity-80"
          title="Drag step"
        >
          ⠿
        </span>
      </button>

      {children}
    </div>
  );
}

/* ───────── EDITOR ───────── */

export default function StepsEditor({ steps, onChange }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const preview = useStepPreview();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  /* Stop preview when panel changes */
  useEffect(() => {
    preview.stop();
    setPlayingIndex(null);
    return () => preview.stop();
  }, [openIndex]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    preview.stop();
    setPlayingIndex(null);

    const oldIndex = steps.findIndex(s => s.id === active.id);
    const newIndex = steps.findIndex(s => s.id === over.id);

    const reordered = arrayMove(steps, oldIndex, newIndex);
    onChange(reordered);
    setOpenIndex(newIndex);
  }

  function updateStep(index: number, patch: Partial<Step>) {
    const next = [...steps];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function handlePreview(index: number, src?: string) {
    if (!src) return;
    preview.play(src);
    setPlayingIndex(index);
  }

  function stopPreview() {
    preview.stop();
    setPlayingIndex(null);
  }

  function addStep() {
    onChange([
      ...steps,
      {
        id: crypto.randomUUID(),
        duration: 10000,
      },
    ]);
    setOpenIndex(steps.length);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={steps.map(s => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-white/10 bg-black/60 p-4 space-y-3">
          {steps.map((step, index) => {
            const isOpen = openIndex === index;
            const isPlaying = playingIndex === index;

            return (
              <SortableStep
                key={step.id}
                step={step}
                index={index}
                isOpen={isOpen}
                isPlaying={isPlaying}
                onToggle={() =>
                  setOpenIndex(isOpen ? null : index)
                }
              >
                {isOpen && (
                  <div className="border-t border-white/10 p-4 space-y-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          handlePreview(index, step.src)
                        }
                        className="session-start"
                      >
                        ▶ Preview Step
                      </button>
                      <button
                        onClick={stopPreview}
                        className="session-start opacity-60"
                      >
                        ■ Stop
                      </button>
                    </div>

                    <input
                      placeholder="Voice file URL"
                      value={step.src || ""}
                      onChange={e =>
                        updateStep(index, {
                          src: e.target.value,
                        })
                      }
                      className="w-full rounded bg-black/60 p-2 text-sm border border-white/10"
                    />

                    <input
                      placeholder="Caption"
                      value={step.caption || ""}
                      onChange={e =>
                        updateStep(index, {
                          caption: e.target.value,
                        })
                      }
                      className="w-full rounded bg-black/60 p-2 text-sm border border-white/10"
                    />
                  </div>
                )}
              </SortableStep>
            );
          })}

          <div className="sticky bottom-0 pt-3 bg-black/80 backdrop-blur">
            <button
              onClick={addStep}
              className="session-start w-full"
            >
              + Add Step
            </button>
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}
