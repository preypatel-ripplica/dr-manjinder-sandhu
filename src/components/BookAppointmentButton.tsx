"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { BookingModal } from "./BookingModal";
import { useI18n } from "./I18nProvider";

interface BookAppointmentButtonProps {
  label?: string;
  className?: string;
}

export function BookAppointmentButton({
  label = "Book an appointment",
  className = "btn-primary",
}: BookAppointmentButtonProps) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <>
      <button className={className} onClick={() => setOpen(true)}>
        {t(label)} <ArrowUpRight size={17} />
      </button>
      <BookingModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
