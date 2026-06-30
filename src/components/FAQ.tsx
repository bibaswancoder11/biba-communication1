import { useState } from 'react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 px-4 lg:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: FAQs Accordion */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Common Queries
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Have questions about tax compliance cycles, land tax (Khajna) regulations, or bookkeeping workflows? Find quick answers from our professional knowledge base below.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  >
                    <span className="font-serif font-bold text-slate-800 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-md bg-slate-100 text-slate-500">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Client Success Stories / Testimonials */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Success Stories
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We take pride in empowering West Bengal based business owners with worry-free regulatory filings.
            </p>
          </div>

          <div className="space-y-6">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id} 
                className="bg-white rounded-2xl p-6 border border-slate-150 shadow-sm relative space-y-4"
              >
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold font-serif text-sm">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-slate-900 text-sm">{t.name}</h4>
                    <span className="text-slate-400 text-xs font-medium block">
                      {t.role} {t.company && `at ${t.company}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
