"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AppointmentForm } from "./AppointmentForm";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedPlan?: string;
}
export function BookingModal({
  isOpen,
  onClose,
  preSelectedPlan,
}: BookingModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!isOpen || !element) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <dialog
      ref={dialog}
      className="booking-dialog"
      aria-labelledby="booking-title"
      onCancel={onClose}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex="0"]',
          ),
        ).filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="dialog-close icon-button"
        onClick={onClose}
        aria-label="Close appointment form"
      >
        <X size={20} />
      </button>
      <span className="eyebrow-pill">LET’S PLAN YOUR VISIT</span>
      <h2 id="booking-title">Book appointment</h2>
      <p className="dialog-intro">
        With Dr. Manjinder Sandhu, at a location that works for you.
      </p>
      <AppointmentForm preSelectedPlan={preSelectedPlan} />
    </dialog>
  );
}
