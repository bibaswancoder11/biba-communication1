import { useState, useEffect } from 'react';
import { Phone, Mail, Clock, Menu, X, Briefcase, FileText, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* Top Info Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 items-center">
            <a href={`mailto:${COMPANY_INFO.contacts.email}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{COMPANY_INFO.contacts.email}</span>
            </a>
            <div className="hidden md:block w-px h-3 bg-slate-700" />
            <a href={`tel:${COMPANY_INFO.contacts.phones[0].replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{COMPANY_INFO.contacts.phones[0]}</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Mon - Sat: 10:00 AM - 8:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full py-4 px-4 lg:px-8 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 border-b border-slate-100' 
          : 'bg-white border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/30">
              <Briefcase className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 block leading-tight">
                BIBA
              </span>
              <span className="font-sans text-xs tracking-widest font-semibold text-emerald-600 block uppercase leading-none mt-0.5">
                Communication
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-slate-600 hover:text-emerald-600 font-medium transition-colors cursor-pointer text-sm"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-slate-600 hover:text-emerald-600 font-medium transition-colors cursor-pointer text-sm"
            >
              Our Services
            </button>
            <button 
              onClick={() => scrollToSection('estimator')} 
              className="text-slate-600 hover:text-emerald-600 font-medium transition-colors cursor-pointer text-sm"
            >
              Quote Planner
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-slate-600 hover:text-emerald-600 font-medium transition-colors cursor-pointer text-sm"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-slate-600 hover:text-emerald-600 font-medium transition-colors cursor-pointer text-sm"
            >
              Contact
            </button>
          </div>

          {/* Right Header Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('estimator')} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm shadow-emerald-600/10 hover:shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get Free Quote</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a 
              href={`tel:${COMPANY_INFO.contacts.phones[0].replace(/\s+/g, '')}`}
              className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all mr-1"
              aria-label="Call Biba Communication"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-all border border-slate-200 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-slate-100 mt-4 overflow-hidden"
            >
              <div className="flex flex-col gap-4 py-4 px-2">
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-700 hover:text-emerald-600 font-medium transition-colors text-sm"
                >
                  About Us
                </button>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-700 hover:text-emerald-600 font-medium transition-colors text-sm"
                >
                  Our Services
                </button>
                <button 
                  onClick={() => scrollToSection('estimator')} 
                  className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-700 hover:text-emerald-600 font-medium transition-colors text-sm"
                >
                  Quote Planner
                </button>
                <button 
                  onClick={() => scrollToSection('faq')} 
                  className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-700 hover:text-emerald-600 font-medium transition-colors text-sm"
                >
                  FAQ
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-700 hover:text-emerald-600 font-medium transition-colors text-sm"
                >
                  Contact
                </button>
                <div className="border-t border-slate-100 pt-4 flex flex-col gap-2.5">
                  <div className="px-3 py-1 text-xs text-slate-400 uppercase tracking-widest font-semibold">
                    Direct Contacts
                  </div>
                  {COMPANY_INFO.contacts.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="flex items-center gap-2.5 py-1 px-3 text-slate-600 hover:text-emerald-600 text-sm transition-colors"
                    >
                      <Phone className="w-4 h-4 text-emerald-500" />
                      <span>{phone}</span>
                    </a>
                  ))}
                  <a
                    href={`mailto:${COMPANY_INFO.contacts.email}`}
                    className="flex items-center gap-2.5 py-1 px-3 text-slate-600 hover:text-emerald-600 text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4 text-emerald-500" />
                    <span>{COMPANY_INFO.contacts.email}</span>
                  </a>
                  <button 
                    onClick={() => scrollToSection('estimator')} 
                    className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
                  >
                    Get Free Quote
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Spacer to push content below the fixed bar when scrolled */}
      {isScrolled && <div className="h-[73px]" />}
    </header>
  );
}
