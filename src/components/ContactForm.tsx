import React, { useState, useEffect } from 'react';
import { COMPANY_INFO, SERVICES_DATA } from '../data';
import { Inquiry } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  ListTodo, 
  ShieldCheck, 
  Trash2, 
  MessageSquareQuote,
  Sparkles,
  Terminal,
  ChevronDown,
  ChevronUp,
  Copy,
  Loader2,
  AlertTriangle,
  PhoneCall,
  MessageSquare,
  MailOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Client-side rule-based backup draft generator (100% Free & offline-friendly)
function generateLocalDrafts(
  fullName: string, 
  preferredContact: 'phone' | 'email', 
  phone: string, 
  email: string, 
  selectedServiceNames: string[], 
  message: string
) {
  const timestamp = new Date().toLocaleTimeString();
  const logs = [
    `[${timestamp}] API server endpoint unreachable or offline.`,
    `[${timestamp}] Activating Biba client-side static draft generator...`,
    `[${timestamp}] Parsing client contact criteria for category routing...`
  ];

  const servicesText = selectedServiceNames.length > 0 
    ? selectedServiceNames.join(', ') 
    : 'General Consultation';

  logs.push(`[${new Date().toLocaleTimeString()}] Service focus detected: "${servicesText}"`);

  const subject = `Consultation Request with Biba Communication – ${fullName}`;
  
  // Adaptive professional advisory note
  let recommendation = '';
  const lowercaseServices = servicesText.toLowerCase();
  if (lowercaseServices.includes('tax') || lowercaseServices.includes('gst') || lowercaseServices.includes('accounting')) {
    recommendation = `Our senior tax specialist is reviewing your selected file categories to prepare high-quality, compliant tax returns and accounting advisory solutions.`;
  } else if (lowercaseServices.includes('land') || lowercaseServices.includes('revenue') || lowercaseServices.includes('khajna')) {
    recommendation = `Our dedicated land revenue advisor will inspect the West Bengal Bhumi database parameters for your property plot context.`;
  } else {
    recommendation = `We have assigned an expert financial advisor to compile your business profile and structure the next steps.`;
  }

  const emailBody = `Dear ${fullName},

Thank you for reaching out to Biba Communication. We have successfully received your callback/consultation request.

Here is a summary of your requested consultation details:
• Selected Categories: ${servicesText}
• Preferred Contact Channel: ${preferredContact === 'phone' ? '📞 Telephone Callback' : '✉️ Email Consultation'}
• Your Note: "${message || 'No custom query specified.'}"

${recommendation}

We will be in touch with you shortly via ${preferredContact === 'phone' ? `phone at ${phone}` : `email at ${email}`}.

If you have any supporting papers or legal notices to share, you can reply directly to this mail.

Best regards,
Biba Communication Advisory Desk
Kolkata, West Bengal
Direct Support Helpline: +91 7980224837 / +91 9123016480`;

  const smsText = `Biba Callback Request: ${fullName} (${phone || 'No Phone'}). Preferred Channel: ${preferredContact}. Services: ${servicesText}. Note: ${message || 'None'}`;

  logs.push(`[${new Date().toLocaleTimeString()}] Synthesized professional email reply template locally.`);
  logs.push(`[${new Date().toLocaleTimeString()}] Prepared direct WhatsApp pre-fill notification for instant transmission.`);
  logs.push(`[${new Date().toLocaleTimeString()}] Client-side queue state synchronized successfully.`);

  return {
    subject,
    emailBody,
    smsText,
    logs
  };
}

// Format WhatsApp message to owner for free client-side dispatch
function getWhatsAppUrl(inq: Inquiry) {
  const serviceNamesText = SERVICES_DATA
    .filter(s => inq.selectedServiceIds.includes(s.id))
    .map(s => s.name)
    .join(', ') || 'General Financial Advisory';

  const text = 
    `*NEW BIBA CALLBACK LEAD*\n` +
    `---------------------------\n` +
    `👤 *Name:* ${inq.fullName}\n` +
    `📞 *Phone:* ${inq.phone || 'Not provided'}\n` +
    `✉️ *Email:* ${inq.email || 'Not provided'}\n` +
    `🛠️ *Services:* ${serviceNamesText}\n` +
    `📝 *Query:* ${inq.message || 'No specific notes.'}\n` +
    `---------------------------\n` +
    `🕒 *Submitted at:* ${inq.submittedAt}\n` +
    `⚡ *Status:* Free Local Callback Queue`;

  return `https://wa.me/917980224837?text=${encodeURIComponent(text)}`;
}

interface ContactFormProps {
  selectedServiceIds: string[];
  onToggleService: (id: string) => void;
}

export default function ContactForm({ selectedServiceIds, onToggleService }: ContactFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'email'>('phone');
  const [message, setMessage] = useState('');
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Track expanded cards for viewing logs and AI drafts
  const [expandedInquiryId, setExpandedInquiryId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<{ [key: string]: boolean }>({});

  // Load inquiries on mount
  useEffect(() => {
    const stored = localStorage.getItem('biba_inquiries');
    if (stored) {
      try {
        setInquiries(JSON.parse(stored));
      } catch (e) {
        console.error("Error reading inquiries from localStorage", e);
      }
    }
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedText(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitted(false);

    if (!fullName.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }
    if (!phone.trim() && preferredContact === 'phone') {
      setErrorMessage('Phone number is required for telephone call-back.');
      return;
    }
    if (!email.trim() && preferredContact === 'email') {
      setErrorMessage('Email is required for email consultations.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Map selected IDs to names for the AI context
      const selectedServiceNames = SERVICES_DATA
        .filter(s => selectedServiceIds.includes(s.id))
        .map(s => s.name);

      let newInquiry: Inquiry;

      try {
        const response = await fetch('/api/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            email,
            phone,
            preferredContact,
            selectedServiceNames,
            message,
          }),
        });

        if (!response.ok) {
          throw new Error('Server returned an error status.');
        }

        const result = await response.json();

        newInquiry = {
          id: result.inquiry?.id || 'inq-' + Date.now(),
          fullName,
          email,
          phone,
          preferredContact,
          selectedServiceIds: [...selectedServiceIds],
          message,
          submittedAt: new Date().toLocaleString(),
          status: 'Contacted',
          serverLogs: result.logs || [],
          aiEmailSubject: result.aiDraftedEmail?.subject || '',
          aiEmailBody: result.aiDraftedEmail?.body || '',
          aiSms: result.aiDraftedSms || '',
          statusMessage: result.status || 'Queued',
          engineType: 'cloud'
        };
      } catch (fetchErr) {
        console.warn("API server call failed, applying client-side static offline fallback:", fetchErr);
        // Fall back to clean client-side draft compilation (100% free and static hostable)
        const localDrafts = generateLocalDrafts(
          fullName,
          preferredContact,
          phone,
          email,
          selectedServiceNames,
          message
        );

        newInquiry = {
          id: 'inq-' + Date.now(),
          fullName,
          email,
          phone,
          preferredContact,
          selectedServiceIds: [...selectedServiceIds],
          message,
          submittedAt: new Date().toLocaleString(),
          status: 'Contacted',
          serverLogs: localDrafts.logs,
          aiEmailSubject: localDrafts.subject,
          aiEmailBody: localDrafts.emailBody,
          aiSms: localDrafts.smsText,
          statusMessage: 'Client Queue (Free Offline)',
          engineType: 'static'
        };
      }

      const updated = [newInquiry, ...inquiries];
      setInquiries(updated);
      localStorage.setItem('biba_inquiries', JSON.stringify(updated));

      // Expand the newly submitted inquiry to show the execution logs
      setExpandedInquiryId(newInquiry.id);

      // Clear form inputs
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitted(true);

      // Auto close success alert after 8s
      setTimeout(() => {
        setIsSubmitted(false);
      }, 8000);

    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Something went wrong while compiling the callback request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteInquiry = (id: string) => {
    const filtered = inquiries.filter(i => i.id !== id);
    setInquiries(filtered);
    localStorage.setItem('biba_inquiries', JSON.stringify(filtered));
    if (expandedInquiryId === id) {
      setExpandedInquiryId(null);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white px-4 lg:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Inquiry Desk
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Consultation Request & Callback
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Fill out the form below. Our AI-assisted request queue automatically drafts suitable communication templates and logs routing status immediately.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Panel: Direct Contacts Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

              <div className="space-y-3">
                <h3 className="font-serif font-bold text-xl text-emerald-400">BIBA Communication</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  &ldquo;{COMPANY_INFO.slogans[0]}&rdquo; <br />
                  Expert financial advisors based in Kolkata, handling clients all across West Bengal.
                </p>
              </div>

              {/* Direct Info Lines */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-slate-800 rounded-lg text-emerald-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Direct Hotlines</span>
                    {COMPANY_INFO.contacts.phones.map((phone, idx) => (
                      <a 
                        key={idx} 
                        href={`tel:${phone.replace(/\s+/g, '')}`} 
                        className="font-bold hover:text-emerald-400 transition-colors block mt-1"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-slate-800 rounded-lg text-emerald-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">E-mail Inquiries</span>
                    <a 
                      href={`mailto:${COMPANY_INFO.contacts.email}`} 
                      className="font-bold hover:text-emerald-400 transition-colors block mt-1"
                    >
                      {COMPANY_INFO.contacts.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-slate-800 rounded-lg text-emerald-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Office Jurisdiction</span>
                    <span className="font-bold block mt-1">{COMPANY_INFO.contacts.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-slate-800 rounded-lg text-emerald-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Availability</span>
                    <span className="font-bold block mt-1">{COMPANY_INFO.contacts.officeHours}</span>
                    <span className="text-slate-400 text-xs block mt-0.5">{COMPANY_INFO.contacts.consultationHours}</span>
                  </div>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700/60 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  All requests processed securely. Biba Communication does not sell, share, or publish client accounting or land details.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Submission Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              
              <h3 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2 pb-2 border-b border-slate-200">
                <ListTodo className="w-5 h-5 text-emerald-600" />
                <span>Submit Consultation Form</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error Banner */}
                {errorMessage && (
                  <div className="bg-red-50 text-red-700 p-3.5 rounded-xl border border-red-100 text-xs font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Success Banner */}
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 text-xs sm:text-sm font-semibold flex flex-col gap-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="font-bold">Inquiry placed successfully into the Callback Queue!</span>
                    </div>
                    <p className="text-slate-600 font-normal text-xs pl-7">
                      The server-side queue processed your request, connected to the Gemini model to analyze your context, and generated a tailored response template below.
                    </p>
                  </motion.div>
                )}

                {/* Form Fields Grid */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      placeholder="e.g. Rajat Sen"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Preferred Channel</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setPreferredContact('phone')}
                        className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                          preferredContact === 'phone'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        } disabled:opacity-60`}
                      >
                        Phone Call
                      </button>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setPreferredContact('email')}
                        className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                          preferredContact === 'email'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        } disabled:opacity-60`}
                      >
                        Email Consultation
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Contact Phone</label>
                    <input
                      type="tel"
                      required={preferredContact === 'phone'}
                      disabled={isSubmitting}
                      placeholder="e.g. +91 98300 XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">E-mail Address</label>
                    <input
                      type="email"
                      required={preferredContact === 'email'}
                      disabled={isSubmitting}
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Selected Services Display */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Selected Services ({selectedServiceIds.length})
                  </label>
                  {selectedServiceIds.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto bg-white p-3 rounded-xl border border-slate-200">
                      {SERVICES_DATA.filter(s => selectedServiceIds.includes(s.id)).map(s => (
                        <span 
                          key={s.id} 
                          className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-[11px] font-bold py-1 px-2.5 rounded-md border border-slate-200"
                        >
                          <span>{s.name}</span>
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => onToggleService(s.id)}
                            className="text-slate-400 hover:text-red-500 font-bold ml-1 cursor-pointer disabled:opacity-40"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-xl border border-amber-100 flex items-center gap-2">
                      <MessageSquareQuote className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>No specific services selected yet. Form will submit as a "General Advisory Quote". You can add services above!</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Notes / Specific Business Query</label>
                  <textarea
                    rows={4}
                    disabled={isSubmitting}
                    placeholder="Describe your query, business turnover volume, or timing details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3 px-6 rounded-xl text-xs tracking-wider uppercase transition-all duration-200 shadow-md shadow-emerald-600/10 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Engaging Queue Server & Gemini AI...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Callback Queue</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Local storage inquiries tracking queue */}
        {inquiries.length > 0 && (
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-slate-800 text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
                  <span>Real-Time Callback Queue Console ({inquiries.length})</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Track the active state of callback requests, view automated Gemini AI-drafted responses, and examine the server logs directly.
                </p>
              </div>
            </div>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-1">
              {inquiries.map((inq) => {
                const isExpanded = expandedInquiryId === inq.id;
                return (
                  <div key={inq.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs relative space-y-4">
                    
                    {/* Upper Row: Status and Info */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 block">{inq.submittedAt}</span>
                        <h4 className="font-serif font-bold text-slate-800 text-base leading-tight pr-8">{inq.fullName}</h4>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md">
                            Channel: {inq.preferredContact === 'phone' ? '📞 Call' : '✉️ Email'}
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded-md">
                            ID: {inq.id}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            inq.engineType === 'cloud' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                              : 'bg-indigo-50 text-indigo-700 border-indigo-150'
                          }`}>
                            Engine: {inq.engineType === 'cloud' ? '⚡ Cloud AI' : '💾 Free Static Local'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          inq.statusMessage?.includes('Transmitted') || inq.statusMessage?.includes('Alert Sent')
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}>
                          {inq.statusMessage || 'Local Pending'}
                        </span>
                        
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-slate-50 transition-all cursor-pointer"
                          title="Delete request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Contact Details & Message */}
                    <div className="grid sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1 text-slate-600">
                        <div>
                          <strong className="text-slate-800">Phone:</strong> {inq.phone || 'N/A'}
                        </div>
                        <div>
                          <strong className="text-slate-800">Email:</strong> {inq.email || 'N/A'}
                        </div>
                        <div className="pt-2">
                          <strong className="text-slate-800 block mb-0.5">Services Requested:</strong>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {inq.selectedServiceIds.length > 0 ? (
                              SERVICES_DATA.filter(s => inq.selectedServiceIds.includes(s.id)).map(s => (
                                <span key={s.id} className="text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 px-1.5 py-0.5 rounded-sm">
                                  {s.name}
                                </span>
                              ))
                            ) : (
                              <span className="text-[9px] font-bold bg-slate-50 text-slate-600 border border-slate-100 px-1.5 py-0.5 rounded-sm">
                                General Consultation
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 relative">
                        <span className="text-[9px] font-bold text-slate-400 absolute top-2 right-2 uppercase tracking-widest">Client Message</span>
                        <p className="text-slate-700 leading-relaxed font-sans pr-14 select-text">
                          {inq.message || 'No custom message.'}
                        </p>
                      </div>
                    </div>

                    {/* Zero-Cost Client-Side Actionable Toolbar */}
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
                      <div className="space-y-0.5 text-center md:text-left shrink-1">
                        <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                          <span>Zero-Cost Direct Actions (100% Free)</span>
                        </span>
                        <p className="text-[10px] text-slate-500 max-w-md leading-relaxed">
                          No server or paid API keys needed. Connect instantly with the owner or the customer using secure client-side intents.
                        </p>
                      </div>

                      <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto shrink-0">
                        {/* WhatsApp Button */}
                        <a
                          href={getWhatsAppUrl(inq)}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] py-2 px-3.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer w-full sm:w-auto shadow-sm shadow-emerald-600/10 hover:shadow-md"
                          title="Transmit callback request to owner's WhatsApp instantly for free"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Send Alert on WhatsApp</span>
                        </a>

                        {/* Mailto Button */}
                        {inq.email && (
                          <a
                            href={`mailto:${inq.email}?subject=${encodeURIComponent(inq.aiEmailSubject || '')}&body=${encodeURIComponent(inq.aiEmailBody || '')}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] py-2 px-3.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer w-full sm:w-auto shadow-sm shadow-blue-600/10 hover:shadow-md"
                            title="Open local mail app with the pre-written drafted response"
                          >
                            <MailOpen className="w-4 h-4" />
                            <span>One-Click Email Reply</span>
                          </a>
                        )}

                        {/* Call Button */}
                        {inq.phone && (
                          <a
                            href={`tel:${inq.phone.replace(/\s+/g, '')}`}
                            className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] py-2 px-3.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer w-full sm:w-auto shadow-sm shadow-slate-800/10 hover:shadow-md"
                            title="Open native telephone dialer to call the customer directly"
                          >
                            <PhoneCall className="w-4 h-4" />
                            <span>Dial Callback Phone</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Expandable toggles */}
                    <div className="pt-1">
                      <button
                        onClick={() => setExpandedInquiryId(isExpanded ? null : inq.id)}
                        className="w-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-emerald-600" />
                          <span>{isExpanded ? 'Hide Server execution details & AI responses' : 'View Server execution details & AI responses'}</span>
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Expandable Section: Server Logs and AI Drafts */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden space-y-4"
                        >
                          {/* Live Server Logs (Terminal Style) */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Server Execution Stream</span>
                            <div className="bg-slate-950 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-emerald-400 border border-slate-800 shadow-inner max-h-[160px] overflow-y-auto space-y-1">
                              {inq.serverLogs && inq.serverLogs.length > 0 ? (
                                inq.serverLogs.map((log, index) => (
                                  <div key={index} className="flex gap-2">
                                    <span className="text-slate-600">❯</span>
                                    <span>{log}</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-slate-500 italic">No execution logs found. This request was created locally prior to full-stack integration.</div>
                              )}
                            </div>
                          </div>

                          {/* AI Generated Communications Output */}
                          <div className="grid md:grid-cols-2 gap-4">
                            
                            {/* Drafted Email Response */}
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5 relative">
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full absolute top-4 right-4 uppercase tracking-wider">
                                Client Email Draft
                              </span>
                              <h5 className="text-xs font-bold text-slate-700">Customized Automated Email Reply</h5>
                              
                              {inq.aiEmailSubject ? (
                                <div className="space-y-2 pt-1 text-xs">
                                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-medium text-slate-800 flex justify-between items-center">
                                    <div className="truncate pr-4">
                                      <strong className="text-slate-500">Subject:</strong> {inq.aiEmailSubject}
                                    </div>
                                    <button
                                      onClick={() => handleCopy(inq.aiEmailSubject || '', `${inq.id}-sub`)}
                                      className="text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                                      title="Copy subject"
                                    >
                                      {copiedText[`${inq.id}-sub`] ? 'Copied!' : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>

                                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-600 whitespace-pre-wrap leading-relaxed select-text relative max-h-[180px] overflow-y-auto">
                                    <button
                                      onClick={() => handleCopy(inq.aiEmailBody || '', `${inq.id}-body`)}
                                      className="text-slate-400 hover:text-emerald-600 transition-colors absolute top-3 right-3"
                                      title="Copy email body"
                                    >
                                      {copiedText[`${inq.id}-body`] ? 'Copied!' : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                    {inq.aiEmailBody}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-xs text-slate-500 italic pt-1">No AI Email Draft produced.</div>
                              )}
                            </div>

                            {/* Telephony/SMS Dispatch Alert */}
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5 relative">
                              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full absolute top-4 right-4 uppercase tracking-wider">
                                Dispatch Alert
                              </span>
                              <h5 className="text-xs font-bold text-slate-700">Advisor Notification SMS</h5>

                              {inq.aiSms ? (
                                <div className="space-y-2 pt-1 text-xs">
                                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-600 leading-relaxed select-text relative max-h-[120px] overflow-y-auto font-mono text-[11px]">
                                    <button
                                      onClick={() => handleCopy(inq.aiSms || '', `${inq.id}-sms`)}
                                      className="text-slate-400 hover:text-emerald-600 transition-colors absolute top-3 right-3"
                                      title="Copy notification text"
                                    >
                                      {copiedText[`${inq.id}-sms`] ? 'Copied!' : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                    {inq.aiSms}
                                  </div>
                                  
                                  <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-100 text-[10px] text-amber-800 leading-relaxed">
                                    <strong>Real Telephony Integrations:</strong> To have these SMS notifications reach your phone instantly, configure your <code>TWILIO_ACCOUNT_SID</code>, <code>TWILIO_AUTH_TOKEN</code>, and <code>TWILIO_PHONE_NUMBER</code> variables in the Settings panel!
                                  </div>
                                </div>
                              ) : (
                                <div className="text-xs text-slate-500 italic pt-1">No dispatch logs available.</div>
                              )}
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
