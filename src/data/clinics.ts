export interface ClinicLocation {
  id: string;
  name: string;
  shortName: string;
  hospitalGroup: string;
  address: string;
  city: string;
  timings: string;
  phone: string;
  emergencyPhone: string;
  googleMapsUrl: string;
  facilities: string[];
  isPrimary?: boolean;
}

export const clinicLocations: ClinicLocation[] = [
  {
    id: "loc-fortis-fmri",
    name: "Fortis Memorial Research Institute (FMRI)",
    shortName: "Fortis FMRI, Sector 44",
    hospitalGroup: "Atrius Cardiac Care & Fortis",
    address: "Sector 44, Opposite HUDA City Centre Metro Station, Gurugram, Haryana 122002",
    city: "Gurugram",
    timings: "Mon – Sat: 10:00 AM – 4:00 PM (By Appointment)",
    phone: "+91-8130370096",
    emergencyPhone: "+91 124 4921030",
    googleMapsUrl: "https://maps.google.com/?q=Fortis+Memorial+Research+Institute+Gurgaon",
    facilities: ["24/7 Advanced Dual-Plane Cath Lab", "TAVR / TAVI Hybrid Operating Suite", "Cardiac ICU & Telemetry", "CT Coronary Angiography"],
    isPrimary: true
  },
  {
    id: "loc-kalyani-gurugram",
    name: "Kalyani Hospital",
    shortName: "Kalyani Hospital, Sector 14",
    hospitalGroup: "Atrius Cardiac Care",
    address: "Mehrauli-Gurgaon Rd, Sector 14, Gurugram, Haryana 122001",
    city: "Gurugram",
    timings: "Mon – Sat: 5:00 PM – 7:00 PM",
    phone: "+91-8130370096",
    emergencyPhone: "+91 124 2322415",
    googleMapsUrl: "https://maps.google.com/?q=Kalyani+Hospital+Sector+14+Gurgaon",
    facilities: ["OPD Cardiology Consultations", "2D/3D Echocardiography", "Holter Monitoring & TMT"]
  },
  {
    id: "loc-fortis-manesar",
    name: "Fortis Hospital, Manesar",
    shortName: "Fortis Manesar, Sector 5",
    hospitalGroup: "Atrius Cardiac Care & Fortis",
    address: "Plot No. 2, Sector 5, IMT Manesar, Gurugram, Haryana 122051",
    city: "Manesar",
    timings: "Tue & Thu: 11:00 AM – 2:00 PM",
    phone: "+91-8130370096",
    emergencyPhone: "+91 124 7132222",
    googleMapsUrl: "https://maps.google.com/?q=Fortis+Hospital+Manesar",
    facilities: ["Emergency Acute Chest Pain Unit", "24/7 Primary PCI Angioplasty", "Cardiac Care Unit"]
  },
  {
    id: "loc-fortis-vasant-kunj",
    name: "Fortis Hospital, Vasant Kunj",
    shortName: "Fortis Vasant Kunj, Delhi",
    hospitalGroup: "Atrius Cardiac Care & Fortis",
    address: "Sector B, Pocket 1, Aruna Asaf Ali Marg, Vasant Kunj, New Delhi 110070",
    city: "New Delhi",
    timings: "Wed & Fri: 2:00 PM – 5:00 PM",
    phone: "+91-8130370096",
    emergencyPhone: "+91 11 42776222",
    googleMapsUrl: "https://maps.google.com/?q=Fortis+Hospital+Vasant+Kunj+New+Delhi",
    facilities: ["Full Interventional Cath Lab Suite", "Electrophysiology & Pacemaker Clinic", "Non-Invasive Diagnostic Center"]
  }
];
