import { Briefcase, Phone, Mail, Clock, MapPin, ExternalLink, ArrowUp } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 pt-16 pb-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Segment */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-tight text-white block leading-tight">
                  BIBA
                </span>
                <span className="font-sans text-[10px] tracking-widest font-semibold text-emerald-500 block uppercase leading-none mt-0.5">
                  Communication
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              We provide accurate accounting, accounts finalization, and corporate tax fillings. 
              Our service packages are affordable, precise, and completely aligned with local and state standards.
            </p>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-900 text-xs text-slate-400 italic">
              {"“"}{COMPANY_INFO.slogans[0]}{"”"}
            </div>
          </div>

          {/* Quick links col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-white text-xs uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors block">About Our Desk</a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors block">14 Portfolio Services</a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-emerald-400 transition-colors block">Inquiry & Quote Planner</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors block">Frequently Asked Questions</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors block">Contact Consultation Desk</a>
              </li>
            </ul>
          </div>

          {/* Business Hours & Contacts */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif font-bold text-white text-xs uppercase tracking-widest">Contact Desk</h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500" />
                <div className="flex flex-col">
                  {COMPANY_INFO.contacts.phones.map((phone, i) => (
                    <a key={i} href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500" />
                <a href={`mailto:${COMPANY_INFO.contacts.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.contacts.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>{COMPANY_INFO.contacts.address}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 mt-0.5" />
                <div>
                  <span className="block text-slate-300">{COMPANY_INFO.contacts.officeHours}</span>
                  <span className="block text-slate-500 mt-0.5">{COMPANY_INFO.contacts.consultationHours}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Segment */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div>
            <p className="text-slate-500">
              © {currentYear} <strong>Biba Communication</strong>. All rights reserved. Registered Consulting Firm in West Bengal.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-950 transition-all flex items-center gap-1 cursor-pointer font-bold uppercase tracking-wider text-[10px]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
