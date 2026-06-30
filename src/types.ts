export interface ServiceItem {
  id: string;
  index: number;
  name: string;
  category: 'Accounting & Finance' | 'Taxation & Returns' | 'Registrations & Licences' | 'Payments & Levies';
  description: string;
  detailedDescription: string;
  documentsRequired: string[];
  timeline: string;
  pricingModel: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email';
  selectedServiceIds: string[];
  message: string;
  submittedAt: string;
  status: 'Pending' | 'Contacted' | 'Completed';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  text: string;
  rating: number;
}
