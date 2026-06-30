import { ShieldCheck, Target, Award, Coins, FileCheck2, UserCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { motion } from 'motion/react';

export default function About() {
  const coreValues = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: "Regulatory Accuracy",
      desc: "Zero-tolerance for balance sheet or return errors. We thoroughly cross-examine Form 26AS, AIS/TIS, and ITC ledgers."
    },
    {
      icon: <Coins className="w-6 h-6 text-emerald-600" />,
      title: "Reasonable & Clear Costs",
      desc: "True to our core slogan: We provide premium-tier regulatory assistance at a fraction of the cost of large corporate agencies."
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-emerald-600" />,
      title: "Dedicated Local Focus",
      desc: "Specialized in municipal rules, trade license filings, local property taxes, and regional land revenue (Khajna) laws."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-100 px-4 lg:px-8 relative overflow-hidden">
      {/* Abstract Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e110_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e110_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Layout Split: Title + Stats block */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Column A: Text content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Corporate Dossier
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
              A Highly Accountable Compliance Partner for Your Business
            </h2>
            
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Biba Communication is an independent financial services and regulatory compliance consultancy firm based in Kolkata. 
              Our mission is simple: to manage the heavy operational burden of government tax, accounts audits, state levies, 
              and trade registrations so that local entrepreneurs can direct 100% of their energy to business success.
            </p>

            <div className="border-l-4 border-emerald-500 bg-slate-50 p-4 rounded-r-xl italic text-slate-700 text-sm">
              &ldquo;We believe that premium professional bookkeeping and timely tax filings should not be a luxury reserved only for giant corporations. Small and midsize businesses deserve absolute precision, too.&rdquo;
            </div>

            <div className="pt-2">
              <h4 className="font-serif font-bold text-slate-800 text-sm uppercase tracking-wider mb-3">Our Core Objectives</h4>
              <div className="grid sm:grid-cols-2 gap-3.5 text-xs text-slate-600 font-semibold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Audit-Ready Records 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Proactive Return Deadlines</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Hassle-Free License Approvals</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Transparent State Payment Filing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column B: Visual Values Grid */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs relative">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-slate-800 text-lg">Our Service Pillars</h3>
                <p className="text-xs text-slate-400">What shapes the Biba standard</p>
              </div>

              <div className="space-y-5">
                {coreValues.map((val, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs text-emerald-600 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors shrink-0">
                      {val.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                        {val.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
