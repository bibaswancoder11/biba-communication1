import { ServiceItem, FAQItem, TestimonialItem } from './types';

export const COMPANY_INFO = {
  name: 'Biba Communication',
  tagline: 'Professional Accounting & Taxation Partners',
  slogans: [
    'We Provide Good Service At Reasonable Cost.',
    'We are here to help you with all your Accounting needs, so that you can focus on running your Business.'
  ],
  contacts: {
    phones: ['+91 7980224837', '+91 9830214131'],
    email: 'bibacommunication22@gmail.com',
    address: 'Kolkata, West Bengal, India',
    officeHours: 'Monday – Saturday: 10:00 AM – 8:00 PM (IST)',
    consultationHours: 'Sunday: By Appointment Only'
  }
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'accounts-finalization',
    index: 1,
    name: 'Accounts Finalization',
    category: 'Accounting & Finance',
    description: 'Year-end consolidation of books, adjustment entries, and final ledger review to prepare audit-ready accounts.',
    detailedDescription: 'Accounts finalization is the ultimate step in a financial year where we compile trial balances, make necessary depreciation and accrual entries, and reconcile accounts to present a true and fair view of your business financials to stakeholders and regulatory bodies.',
    documentsRequired: ['Trial Balance', 'Bank Reconciliation Statements', 'Purchase & Sales Ledgers', 'Previous Year Balance Sheet', 'Depreciation Schedules'],
    timeline: '5-7 Business Days',
    pricingModel: 'Custom Estimate based on transaction volume'
  },
  {
    id: 'accounting-services',
    index: 2,
    name: 'Accounting Services',
    category: 'Accounting & Finance',
    description: 'Comprehensive financial accounting management tailored for small and medium enterprises (SMEs).',
    detailedDescription: 'End-to-end accounting services designed to keep your business financially healthy and fully compliant. We handle daily recording, account reconciliation, accounts payable/receivable management, and monthly performance reporting.',
    documentsRequired: ['Sales Invoices', 'Purchase Vouchers', 'Bank Statements', 'Cash Expense Bills', 'Credit Card Statements'],
    timeline: 'Ongoing / Monthly Retainer',
    pricingModel: 'Monthly Subscription or Retainer'
  },
  {
    id: 'audit-work',
    index: 3,
    name: 'Audit Work Coordination',
    category: 'Accounting & Finance',
    description: 'Assisting and preparing comprehensive files for external statutory, tax, and internal audits.',
    detailedDescription: 'We streamline the audit process for you. Our team organizes audit schedules, checks internal controls, compiles supporting documentation, and directly coordinates with external auditors to ensure smooth completion with minimal disruption.',
    documentsRequired: ['All ledgers', 'Tax invoices & receipts', 'Bank statements', 'Board resolutions / major contracts', 'Inventory reports'],
    timeline: '1-2 Weeks (depending on audit scope)',
    pricingModel: 'Flat Audit Assistance Fee'
  },
  {
    id: 'balance-sheet',
    index: 4,
    name: 'Balance Sheet Preparation',
    category: 'Accounting & Finance',
    description: 'Drafting structured Balance Sheets and Profit & Loss Statements compliant with corporate law.',
    detailedDescription: 'A Balance Sheet is a crucial snapshot of your business assets, liabilities, and equity. We draft visually professional, formula-verified sheets that present your financial strength accurately for banks, investors, or credit evaluations.',
    documentsRequired: ['Final Trial Balance', 'Inventory Valuation Certificate', 'Creditors & Debtors Ageing List', 'Bank & Cash balances'],
    timeline: '3-4 Business Days',
    pricingModel: 'Flat rate per financial year'
  },
  {
    id: 'bookkeeping',
    index: 5,
    name: 'Bookkeeping',
    category: 'Accounting & Finance',
    description: 'Systematic daily recording of financial transactions to maintain organized ledger records.',
    detailedDescription: 'Bookkeeping is the foundation of sound financial management. We systematically record receipts, payments, purchases, and sales in customized bookkeeping software, keeping your records flawless, tidy, and audit-ready at all times.',
    documentsRequired: ['Daily Sales logs', 'Vendor receipts', 'Bank statements', 'Expense receipts'],
    timeline: 'Ongoing / Weekly updates',
    pricingModel: 'Hourly or Monthly Package'
  },
  {
    id: 'e-invoicing-e-waybill',
    index: 6,
    name: 'E-Invoicing & E-Waybill',
    category: 'Taxation & Returns',
    description: 'Seamless registration, generation, and compliance services for digital commercial transit invoicing.',
    detailedDescription: 'Generate electronic invoices on the GST portal for B2B compliance and generate real-time Electronic Way Bills (E-Way Bills) for safe and legally compliant goods transportation across state borders.',
    documentsRequired: ['Tax Invoice details', 'Consignor & Consignee GSTIN', 'Transporter ID & Vehicle Number', 'Source & Destination PIN codes'],
    timeline: 'Within 1 Hour / Real-time support',
    pricingModel: 'Pay-per-invoice or Monthly package'
  },
  {
    id: 'gst-return',
    index: 7,
    name: 'GST Return (Monthly or Quarterly)',
    category: 'Taxation & Returns',
    description: 'Filing GSTR-1, GSTR-3B, and GSTR-4 returns with precise Input Tax Credit (ITC) reconciliation.',
    detailedDescription: 'Avoid heavy penalties and late fees. We perform thorough GSTR-2B ITC reconciliations to ensure you claim 100% legitimate input tax credits, and file GSTR-1 (Outward Sales) and GSTR-3B (Summary Return) correctly on monthly or quarterly schedules.',
    documentsRequired: ['Sales Register', 'Purchase Register', 'GST Portal Login Credentials', 'ITC Reconciled Ledger'],
    timeline: '2-3 Business Days prior to deadline',
    pricingModel: 'Flat fee per filing session'
  },
  {
    id: 'income-tax-return',
    index: 8,
    name: 'Income Tax Return (ITR)',
    category: 'Taxation & Returns',
    description: 'Personal, professional, and corporate Income Tax Return filing customized to maximize legal deductions.',
    detailedDescription: 'We file ITR-1 to ITR-7 for salaried individuals, self-employed professionals, partnerships, and private companies. We evaluate eligible deductions under Chapter VI-A to minimize tax liability legally.',
    documentsRequired: ['Form 16 / 16A', 'Form 26AS & AIS/TIS', 'Bank Interest Certificates', 'Investment Receipts (80C, 80D, etc.)', 'Capital Gains statement (if any)'],
    timeline: '2-3 Business Days',
    pricingModel: 'Tiered based on ITR form complexity'
  },
  {
    id: 'tds-returns',
    index: 9,
    name: 'TDS Returns Filing',
    category: 'Taxation & Returns',
    description: 'Quarterly filing of Form 24Q, 26Q, and 27Q along with form 16/16A generation.',
    detailedDescription: 'Accurate deduction and timely remittance of Tax Deducted at Source (TDS). We compile TDS sheets, file quarterly statements, and assist in issuing Form 16 (for salaries) or Form 16A (non-salary transactions) without errors.',
    documentsRequired: ['TDS deduction sheet', 'Challan payment receipts (ITNS 281)', 'PAN details of deductees', 'TAN Certificate'],
    timeline: '3-4 Business Days',
    pricingModel: 'Per-quarter flat filing fee'
  },
  {
    id: 'trade-licence',
    index: 10,
    name: 'Trade License Assistance',
    category: 'Registrations & Licences',
    description: 'Assisting businesses in acquiring and renewing local Municipal Trade Licenses.',
    detailedDescription: 'A Trade License is mandatory to run any commercial establishment legally within municipal limits. We draft application files, review safety/commercial compliances, and submit to municipal corporations (such as KMC/HMC) for fast approval.',
    documentsRequired: ['Rent agreement / Property Tax receipt', 'Partnership Deed or Incorporation cert', 'PAN Card of owner/firm', 'Establishment layout sketch'],
    timeline: '7-10 Business Days',
    pricingModel: 'Application coordination fee'
  },
  {
    id: 'pan-card',
    index: 11,
    name: 'New or Correction in PAN Card',
    category: 'Registrations & Licences',
    description: 'Processing fresh Permanent Account Number (PAN) applications or correction of typos and data fields.',
    detailedDescription: 'A hassle-free service to apply for an individual, partnership, or corporate PAN. We verify and submit supporting proof of address/identity to avoid rejections, and process name, DOB, or signature corrections easily.',
    documentsRequired: ['Aadhaar Card', 'Passport-size photographs', 'Proof of Date of Birth', 'Signature authorization'],
    timeline: '5-7 Business Days (e-PAN in 48 hours)',
    pricingModel: 'Fixed processing fee'
  },
  {
    id: 'property-tax',
    index: 12,
    name: 'Property Tax Payment',
    category: 'Payments & Levies',
    description: 'Calculation, assessment, and online payment filing of residential or commercial Municipal Property Taxes.',
    detailedDescription: 'Avoid heavy interest on municipal dues. We analyze annual valuation certificates, calculate tax due including applicable rebates, and pay taxes through authorized municipal payment gateways, delivering legal receipt certificates.',
    documentsRequired: ['Previous Year Tax Receipt', 'Assessee Number / Property ID', 'Mutation Certificate (if new)'],
    timeline: '1-2 Business Days',
    pricingModel: 'Per-payment coordination fee'
  },
  {
    id: 'khajna-payment',
    index: 13,
    name: 'Khajna (Land Revenue) Payment',
    category: 'Payments & Levies',
    description: 'State government land revenue payment and certificate procurement assistance.',
    detailedDescription: 'Khajna is the annual agricultural or commercial land tax paid to the land revenue department. We verify your land deeds on the Banglarbhumi portal, calculate current dues, submit online land revenue payments, and obtain formal receipts.',
    documentsRequired: ['Land Deed (Deed/Khatian/Parcha)', 'Assessee details', 'Previous Khajna payment receipt'],
    timeline: '3-5 Business Days',
    pricingModel: 'Per-plot coordination fee'
  },
  {
    id: 'vehicle-tax',
    index: 14,
    name: 'Vehicle Tax Payment',
    category: 'Payments & Levies',
    description: 'Filing and payment of commercial/personal Motor Vehicle taxes and ecological green taxes.',
    detailedDescription: 'Keep your vehicles road-legal. We check outstanding tax, penalty margins, and green taxes on the national Vahan/Parivahan portals, process the payment securely, and deliver the official tax token instantly.',
    documentsRequired: ['Vehicle Registration Certificate (RC Book)', 'Insurance Certificate', 'Pollution Under Control (PUC) Certificate'],
    timeline: '1 Business Day',
    pricingModel: 'Per-vehicle processing fee'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Why should I choose Biba Communication for my accounting needs?',
    answer: 'We provide exceptionally precise and organized accounting, tax filings, and license coordination under one roof. Our pricing is highly competitive ("Reasonable Cost"), and we prioritize personal attention so you can free up your schedule and fully focus on growing your business.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How do I submit my financial documents to Biba Communication?',
    answer: 'You can share digital scans of your invoices, vouchers, and statements securely via Email or WhatsApp. For local clients in West Bengal/Kolkata, physical document handovers or pick-ups can be arranged if requested.',
    category: 'Operations'
  },
  {
    id: 'faq-3',
    question: 'What is Khajna and why is paying it necessary?',
    answer: 'Khajna is the state land revenue tax (applicable in West Bengal and surrounding regions) paid on land ownership. Keeping your Khajna updated is absolutely essential to avoid legal land disputes, ensure smooth mutation during property sales, and qualify for bank mortgages.',
    category: 'Property & Land'
  },
  {
    id: 'faq-4',
    question: 'What is the frequency of GST Return filings?',
    answer: 'Depending on your business turnover, you can opt for either Monthly or Quarterly return filing under the GST Composition or Regular Schemes. We analyze your ledger size and advise you on the most compliance-friendly schedule.',
    category: 'Taxation'
  },
  {
    id: 'faq-5',
    question: 'How long does it take to apply for or correct a PAN card?',
    answer: 'Fresh applications are processed very fast; an electronic PAN (e-PAN) is generated in 48-72 hours, and the physical card arrives at your registered address in 7-10 business days. Corrections can take slightly longer (5-10 business days) depending on verification.',
    category: 'Licences & PAN'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Suhail Sen',
    role: 'Director',
    company: 'Sen & Co. Logistics',
    text: 'Biba Communication has transformed our bookkeeping and GST returns. Their e-invoicing and e-waybill generation is incredibly fast. They keep our transit trucks moving without regulatory delays.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Ananya Banerjee',
    role: 'Founder',
    company: 'Banerjee Legal & Associates',
    text: 'Accounts finalization was always a stressful time of year until we partnered with Biba. They reconciled our complex client accounts, drafted a flawless balance sheet, and assisted our auditors seamlessly. High-integrity team!',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Siddheshwar Ghosh',
    role: 'Retail Store Owner',
    company: 'Ghosh Enterprise',
    text: 'Highly recommend them for Trade Licenses and PAN corrections. They explained exactly which documents were needed, charged a very reasonable fee, and delivered our approved license ahead of schedule.',
    rating: 5
  }
];
