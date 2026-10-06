"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { BookingModal } from "./BookingModal";

interface PlanBookingButtonProps {
  planTitle: string;
  ctaLabel: string;
  isFeatured?: boolean;
}

export function PlanBookingButton({
  planTitle,
  ctaLabel,
  isFeatured = false,
}: PlanBookingButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={isFeatured ? "btn-primary" : "btn-outline"}
        style={{ width: "100%", justifyContent: "center", padding: "0.85rem" }}
      >
        <Calendar size={16} /> {ctaLabel}
      </button>
      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        preSelectedPlan={planTitle}
      />
    </>
  );
}
