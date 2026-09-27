"use client";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Clock, MapPin, Phone } from "lucide-react";
import { clinicLocations } from "@/data/clinics";
export function ClinicLocations() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="clinic-list">
      {clinicLocations.map((clinic, i) => (
        <article
          className="clinic-location"
          key={clinic.id}
          data-open={openIndex === i}
        >
          <button
            type="button"
            className="clinic-trigger"
            aria-expanded={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          >
            <span>
              <span className="clinic-city">{clinic.city}</span>
              <strong>{clinic.shortName}</strong>
            </span>
            <ChevronDown size={18} aria-hidden="true" />
          </button>
          <div className="clinic-details" inert={openIndex !== i} aria-hidden={openIndex !== i}>
            <div>
              <p>
                <MapPin size={16} />
                <span>{clinic.address}</span>
              </p>
              <p>
                <Clock size={16} />
                <span>{clinic.timings}</span>
              </p>
              <a
                className="text-link"
                href={clinic.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <ArrowUpRight size={16} />
              </a>
              <a
                className="clinic-emergency"
                href={`tel:${clinic.emergencyPhone.replace(/[^+0-9]/g, "")}`}
              >
                <Phone size={14} /> Hospital emergency: {clinic.emergencyPhone}
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
