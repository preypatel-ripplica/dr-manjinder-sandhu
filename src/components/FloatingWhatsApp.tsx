import { MessageCircle } from "lucide-react";
export function FloatingWhatsApp() {
  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/918130370096?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20consultation%20with%20Dr.%20Sandhu."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with the appointment desk on WhatsApp"
    >
      <MessageCircle size={23} />
      <span>WhatsApp</span>
    </a>
  );
}
