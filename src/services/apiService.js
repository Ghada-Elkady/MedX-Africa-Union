/**
 * SETA Centralized API & Service Layer
 * Supports real REST API integration with graceful mock data fallback for live demonstrations.
 */

// Key Storage Constants
export const STORAGE_KEYS = {
  APPOINTMENTS: 'seta_appointments',
  PRESCRIPTIONS: 'seta_prescriptions',
  CART: 'seta_cart',
  RECENT_AI_CHAT: 'seta_recent_ai_chat',
  LAB_REPORTS: 'seta_lab_reports',
};

// Initial Mock Doctors Data
export const MOCK_DOCTORS = [
  {
    id: 1,
    first_name: "Dr. Sarah",
    last_name: "Al-Mansoor",
    name: "Dr. Sarah Al-Mansoor",
    specialization_name: "Cardiology",
    specialty: "Cardiology Physician",
    experience: 12,
    rating: 4.9,
    reviews_count: 128,
    fee: 250,
    currency: "EGP",
    location: "New Cairo, Cairo",
    address: "90th Street, Medical Center, Suite 402",
    verified: true,
    languages: ["English", "Arabic"],
    consultation_types: ["In-Clinic", "Online Consultation"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
    about: "Senior Consultant Cardiologist specializing in preventive cardiology, echocardiography, and hypertension management.",
    available_slots: [
      { date: "2026-08-16", time: "10:00 AM" },
      { date: "2026-08-16", time: "11:30 AM" },
      { date: "2026-08-16", time: "04:00 PM" },
      { date: "2026-08-17", time: "02:00 PM" },
      { date: "2026-08-17", time: "05:30 PM" }
    ]
  },
  {
    id: 2,
    first_name: "Dr. Ahmed",
    last_name: "El-Sayed",
    name: "Dr. Ahmed El-Sayed",
    specialization_name: "Neurology",
    specialty: "Neurology Physician",
    experience: 15,
    rating: 4.8,
    reviews_count: 94,
    fee: 300,
    currency: "EGP",
    location: "Maadi, Cairo",
    address: "Road 9, Maadi Health Hub",
    verified: true,
    languages: ["English", "Arabic", "French"],
    consultation_types: ["In-Clinic", "Online Consultation"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80",
    about: "Expert Neurologist focusing on headache disorders, epilepsy, stroke rehabilitation, and peripheral nerve conditions.",
    available_slots: [
      { date: "2026-08-16", time: "01:00 PM" },
      { date: "2026-08-16", time: "03:00 PM" },
      { date: "2026-08-17", time: "10:00 AM" },
      { date: "2026-08-17", time: "12:00 PM" }
    ]
  },
  {
    id: 3,
    first_name: "Dr. Mona",
    last_name: "Hassan",
    name: "Dr. Mona Hassan",
    specialization_name: "Pediatrics",
    specialty: "Pediatrics Physician",
    experience: 9,
    rating: 4.95,
    reviews_count: 210,
    fee: 200,
    currency: "EGP",
    location: "Heliopolis, Cairo",
    address: "Al-Ahram St, Pediatric Excellence Clinic",
    verified: true,
    languages: ["English", "Arabic"],
    consultation_types: ["In-Clinic"],
    image: "https://images.unsplash.com/photo-1594824813566-78a1ed697f37?auto=format&fit=crop&w=500&q=80",
    about: "Compassionate Pediatrician dedicated to infant development, childhood nutrition, vaccinations, and adolescent healthcare.",
    available_slots: [
      { date: "2026-08-16", time: "05:00 PM" },
      { date: "2026-08-16", time: "06:30 PM" },
      { date: "2026-08-17", time: "04:00 PM" }
    ]
  },
  {
    id: 4,
    first_name: "Dr. Youssef",
    last_name: "Kamel",
    name: "Dr. Youssef Kamel",
    specialization_name: "Orthopedics",
    specialty: "Orthopedics Physician",
    experience: 14,
    rating: 4.7,
    reviews_count: 88,
    fee: 280,
    currency: "EGP",
    location: "Dokki, Giza",
    address: "Tahrir St, Bone & Joint Care Center",
    verified: true,
    languages: ["English", "Arabic"],
    consultation_types: ["In-Clinic", "Online Consultation"],
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=500&q=80",
    about: "Orthopedic Surgeon specializing in sports injuries, arthroscopic surgery, joint replacement, and spinal posture alignment.",
    available_slots: [
      { date: "2026-08-16", time: "11:00 AM" },
      { date: "2026-08-17", time: "01:30 PM" }
    ]
  },
  {
    id: 5,
    first_name: "Dr. Layla",
    last_name: "Fawzy",
    name: "Dr. Layla Fawzy",
    specialization_name: "Dermatology",
    specialty: "Dermatology Physician",
    experience: 8,
    rating: 4.88,
    reviews_count: 165,
    fee: 220,
    currency: "EGP",
    location: "Zamalek, Cairo",
    address: "26th of July St, DermaCare Clinic",
    verified: true,
    languages: ["English", "Arabic", "German"],
    consultation_types: ["In-Clinic", "Online Consultation"],
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=500&q=80",
    about: "Consultant Dermatologist and cosmetic medicine expert, handling chronic skin disorders, acne management, and laser therapies.",
    available_slots: [
      { date: "2026-08-16", time: "02:30 PM" },
      { date: "2026-08-17", time: "03:00 PM" }
    ]
  }
];

// Initial Mock Pharmacies
export const MOCK_PHARMACIES = [
  {
    id: 1,
    name: "El-Ezaby Pharmacy",
    location: "New Cairo & Branches Nationwide",
    phone: "19600",
    delivery_time: "30-45 mins",
    rating: 4.8,
    verified: true,
    address: "Branch 12, Main Street, New Cairo",
    hours: "24/7 Open"
  },
  {
    id: 2,
    name: "Seif Pharmacy",
    location: "Maadi, Cairo",
    phone: "19199",
    delivery_time: "20-35 mins",
    rating: 4.7,
    verified: true,
    address: "Road 9, Maadi",
    hours: "24/7 Open"
  },
  {
    id: 3,
    name: "19011 Pharmacy",
    location: "Nasr City, Cairo",
    phone: "19011",
    delivery_time: "25-40 mins",
    rating: 4.6,
    verified: true,
    address: "Abbas El-Akkad St, Nasr City",
    hours: "24/7 Open"
  }
];

// Initial Mock Pharmacy Products
export const MOCK_MEDICINES = [
  {
    id: 101,
    name: "Panadol Extra (Paracetamol 500mg + Caffeine)",
    category: "Pain Relief",
    price: 45,
    currency: "EGP",
    requires_prescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    description: "Effective relief for headaches, migraines, toothache, and fever reduction.",
    dosage_form: "24 Tablets",
    manufacturer: "GSK"
  },
  {
    id: 102,
    name: "Augmentin 1g (Amoxicillin / Clavulanate)",
    category: "Antibiotics",
    price: 135,
    currency: "EGP",
    requires_prescription: true,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=80",
    description: "Broad-spectrum antibacterial medication for respiratory and ENT infections.",
    dosage_form: "14 Tablets",
    manufacturer: "GSK"
  },
  {
    id: 103,
    name: "Vitamin C 1000mg Effervescent",
    category: "Vitamins & Immunity",
    price: 80,
    currency: "EGP",
    requires_prescription: false,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=400&q=80",
    description: "Immune support dietary supplement with bioflavonoids for daily vitality.",
    dosage_form: "20 Effervescent Tablets",
    manufacturer: "Bayer"
  },
  {
    id: 104,
    name: "Concor 5mg (Bisoprolol Fumarate)",
    category: "Chronic Care",
    price: 95,
    currency: "EGP",
    requires_prescription: true,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=400&q=80",
    description: "Beta-blocker for hypertension, angina pectoris, and heart rate regulation.",
    dosage_form: "30 Tablets",
    manufacturer: "Merck"
  },
  {
    id: 105,
    name: "CeraVe Hydrating Facial Cleanser",
    category: "Skincare",
    price: 320,
    currency: "EGP",
    requires_prescription: false,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
    description: "Dermatologist-developed gentle moisturizing facial cleanser with essential ceramides.",
    dosage_form: "236 ml Bottle",
    manufacturer: "CeraVe"
  }
];

// Initial Mock Laboratories
export const MOCK_LABS = [
  {
    id: 1,
    name: "Al-Borg Laboratories",
    location: "Multiple Branches Across Egypt",
    rating: 4.9,
    phone: "19911",
    verified: true,
    services: [
      "Complete Blood Count (CBC)",
      "HbA1c Diabetes Profile",
      "Comprehensive Lipid Panel",
      "Thyroid Function Tests (T3, T4, TSH)",
      "Liver & Kidney Function Panel",
      "Vitamin D3 & B12 Screening"
    ],
    home_sample_collection: true,
    accreditation: "ISO 15189 Certified"
  },
  {
    id: 2,
    name: "Al-Mokhtabar Diagnostic Labs",
    location: "Over 200 Branches nationwide",
    rating: 4.85,
    phone: "19014",
    verified: true,
    services: [
      "CBC & Differential",
      "Full Metabolic Panel",
      "Cardiac Biomarkers (Troponin, CK-MB)",
      "Allergy Screening",
      "Hormonal Assay Panel"
    ],
    home_sample_collection: true,
    accreditation: "CAP Accredited"
  }
];

// Initial Mock Radiology Centers
export const MOCK_RADIOLOGY = [
  {
    id: 1,
    name: "Scan & Ray Specialized Radiology Center",
    location: "Mohandessin, Giza",
    rating: 4.8,
    phone: "19777",
    verified: true,
    services: [
      "Open MRI 1.5T / High Field 3T",
      "Multidetector CT Scan (128-Slice)",
      "Digital X-Ray & Fluoroscopy",
      "3D/4D Ultrasound & Doppler",
      "Mammography & Bone Densitometry (DEXA)"
    ],
    hours: "09:00 AM - 11:00 PM"
  },
  {
    id: 2,
    name: "Cairo Scan Medical Imaging",
    location: "Heliopolis & New Cairo",
    rating: 4.9,
    phone: "19123",
    verified: true,
    services: [
      "Cardiac MRI & Calcium Scoring",
      "Brain & Spine MRI",
      "CT Angiography",
      "Abdominal & Pelvic Ultrasound"
    ],
    hours: "24/7 Open"
  }
];

// Mock Digital Prescriptions Data
export const MOCK_PRESCRIPTIONS = [
  {
    id: "RX-94021",
    date: "2026-08-14",
    doctor_name: "Dr. Sarah Al-Mansoor",
    doctor_specialty: "Cardiology",
    patient_name: "John Doe",
    patient_age: 34,
    diagnosis: "Primary Hypertension & Mild Dyslipidemia",
    notes: "Patient advised low-sodium diet, regular aerobic exercise 30 mins daily, and follow-up in 4 weeks.",
    medications: [
      {
        name: "Concor 5mg",
        dosage: "1 Tablet",
        frequency: "Once daily in the morning",
        duration: "30 Days",
        instructions: "Take with or without food."
      },
      {
        name: "Atorvastatin 10mg",
        dosage: "1 Tablet",
        frequency: "Once daily at bedtime",
        duration: "30 Days",
        instructions: "Avoid grapefruit juice."
      }
    ],
    verified: true,
    qr_code_id: "SETA-VERIFY-94021"
  }
];

// Helper Functions for Local Storage Management
export const getStoredAppointments = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return data ? JSON.parse(data) : [
      {
        id: "APT-101",
        doctor_id: 1,
        doctor_name: "Dr. Sarah Al-Mansoor",
        specialty: "Cardiology",
        date: "2026-08-18",
        time: "10:00 AM",
        type: "Online Consultation",
        status: "Confirmed",
        fee: 250,
        patient_name: "John Doe",
        notes: "Routine cardiac checkup following blood pressure readings."
      }
    ];
  } catch (e) {
    return [];
  }
};

export const saveAppointment = (appointment) => {
  const current = getStoredAppointments();
  const updated = [appointment, ...current];
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
  return updated;
};

export const getStoredPrescriptions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS);
    return data ? JSON.parse(data) : MOCK_PRESCRIPTIONS;
  } catch (e) {
    return MOCK_PRESCRIPTIONS;
  }
};

export const savePrescription = (rx) => {
  const current = getStoredPrescriptions();
  const updated = [rx, ...current];
  localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(updated));
  return updated;
};
