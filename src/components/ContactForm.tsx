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
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

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

    const newInquiry: Inquiry = {
      id: 'inq-' + Date.now(),
      fullName,
      email,
      phone,
      preferredContact,
      selectedServiceIds: [...selectedServiceIds],
      message,
      submittedAt: new Date().toLocaleString(),
      status: 'Pending'
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('biba_inquiries', JSON.stringify(updated));

    // Clear form inputs
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setIsSubmitted(true);

    // Auto close success alert after 5s
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleDeleteInquiry = (id: string) => {
    const filtered = inquiries.filter(i => i.id !== id);
    setInquiries(filtered);
    localStorage.setItem('biba_inquiries', JSON.stringify(filtered));
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
            Fill out the form below. Our certified advisors will review your selected services and get back to you within 2 business hours.
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
                  <div className="bg-red-50 text-red-700 p-3.5 rounded-xl border border-red-100 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                {/* Success Banner */}
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 text-xs sm:text-sm font-semibold flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Inquiry placed into callback queue! We will reach you shortly.</span>
                  </motion.div>
                )}

                {/* Form Fields Grid */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajat Sen"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Preferred Channel</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPreferredContact('phone')}
                        className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                          preferredContact === 'phone'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Phone Call
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreferredContact('email')}
                        className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                          preferredContact === 'email'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
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
                      placeholder="e.g. +91 98300 XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">E-mail Address</label>
                    <input
                      type="email"
                      required={preferredContact === 'email'}
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
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
                            onClick={() => onToggleService(s.id)}
                            className="text-slate-400 hover:text-red-500 font-bold ml-1 cursor-pointer"
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
                    placeholder="Describe your query, business turnover volume, or timing details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs tracking-wider uppercase transition-all duration-200 shadow-md shadow-emerald-600/10 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Callback Queue</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Local storage inquiries tracking queue */}
        {inquiries.length > 0 && (
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-slate-800 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
              <span>Your Submitted Inquiry History ({inquiries.length})</span>
            </h3>
            <p className="text-xs text-slate-500">
              This log is stored locally on your browser cache. You can track the processing status of your callback requests here.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1 pt-1">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-white rounded-xl p-4 border border-slate-200 space-y-3 shadow-xs relative">
                  <button
                    onClick={() => handleDeleteInquiry(inq.id)}
                    className="absolute top-4 right-4 p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-slate-50 transition-all cursor-pointer"
                    title="Remove record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400">{inq.submittedAt}</span>
                    <h4 className="font-serif font-bold text-slate-800 text-sm leading-tight pr-6">{inq.fullName}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 border-t border-b border-slate-100 py-2">
                    <div>
                      <span className="block text-slate-400 uppercase tracking-wider font-semibold">Preferred Channel</span>
                      <span className="font-bold text-slate-700 capitalize">{inq.preferredContact}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 uppercase tracking-wider font-semibold">Inquiry ID</span>
                      <span className="font-mono text-slate-600">{inq.id}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
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

                  <div className="flex justify-between items-center text-xs pt-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping" />
                      <span className="font-bold text-amber-700 text-[11px]">Pending Callback Review</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
