import { ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { motion } from 'motion/react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <section className="relative overflow-hidden bg-slate-50 border-b border-slate-100 py-16 lg:py-24 px-4 lg:px-8">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e120_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e120_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Heading, Slogan, and CTAs */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          {/* Tagline Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-100/60"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>{COMPANY_INFO.tagline}</span>
          </motion.div>

          {/* Main Display Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.1]"
          >
            Complete Financial & <br className="hidden sm:inline" />
            <span className="text-emerald-600 relative">
              Taxation Solutions
              <span className="absolute bottom-1.5 left-0 w-full h-2 bg-emerald-100 -z-10 rounded-full" />
            </span>
          </motion.h1>

          {/* Slogan & Supporting Description */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 max-w-2xl mx-auto lg:mx-0"
          >
            <p className="text-lg font-medium text-slate-800 leading-relaxed font-serif italic border-l-4 border-emerald-500 pl-4 py-1 bg-white/40 shadow-xs rounded-r-lg">
              &ldquo;{COMPANY_INFO.slogans[1]}&rdquo;
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We provide professional accounting, ledger auditing, tax return filings, 
              and municipal license assistance tailored specifically for business owners. 
              Our commitment is high precision compliance and <span className="text-emerald-700 font-semibold">{COMPANY_INFO.slogans[0].toLowerCase().replace('.', '')}</span>.
            </p>
          </motion.div>

          {/* Action Callouts */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2"
          >
            <button 
              onClick={() => scrollToSection('estimator')}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-800 font-semibold py-3.5 px-8 rounded-xl border border-slate-200 shadow-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View 14 Services</span>
            </button>
          </motion.div>

          {/* Quick trust bullet points */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-4 text-xs font-semibold text-slate-600 uppercase tracking-wider"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Accounts Finalization</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>GST & Income Tax Filings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Municipal Licenses & Levies</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Key Focus Card and Stats Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/80 border border-slate-100">
            {/* Top Badge */}
            <div className="absolute -top-3.5 right-6 bg-slate-900 text-emerald-400 font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Firm</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-800 text-lg leading-tight">Regulatory Trust Desk</h3>
                  <p className="text-xs text-slate-500">Fast-tracked compliance processing</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Core Competencies</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block font-serif text-2xl font-bold text-slate-900">100%</span>
                    <span className="text-[11px] font-medium text-slate-500 block leading-tight mt-1">Accuracy in Balance Sheets</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block font-serif text-2xl font-bold text-slate-900">Prompt</span>
                    <span className="text-[11px] font-medium text-slate-500 block leading-tight mt-1">E-Waybills & E-Invoicing</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block font-serif text-2xl font-bold text-slate-900">Custom</span>
                    <span className="text-[11px] font-medium text-slate-500 block leading-tight mt-1">GST & Tax Planning</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block font-serif text-2xl font-bold text-slate-900">Local</span>
                    <span className="text-[11px] font-medium text-slate-500 block leading-tight mt-1">West Bengal Land & Prop Tax</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/40 text-center">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Need immediate support with <span className="font-semibold text-slate-800">Income Tax ITR</span> or <span className="font-semibold text-slate-800">Trade License</span>?
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="mt-2.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 mx-auto transition-colors cursor-pointer"
                >
                  <span>Chat With Our Tax Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
