import { useMemo } from 'react';
import { SERVICES_DATA } from '../data';
import { 
  Calculator, 
  Trash2, 
  FileCheck, 
  Clock, 
  HelpCircle, 
  CheckCircle, 
  ChevronRight, 
  Sparkles,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveEstimatorProps {
  selectedServiceIds: string[];
  onToggleService: (id: string) => void;
  onClearServices: () => void;
  onSelectPredefinedBundle: (ids: string[]) => void;
}

export default function InteractiveEstimator({ 
  selectedServiceIds, 
  onToggleService, 
  onClearServices,
  onSelectPredefinedBundle
}: InteractiveEstimatorProps) {

  // Selected Services objects
  const selectedServices = useMemo(() => {
    return SERVICES_DATA.filter(s => selectedServiceIds.includes(s.id));
  }, [selectedServiceIds]);

  // Combined documents required - deduplicated
  const consolidatedDocuments = useMemo(() => {
    const docsSet = new Set<string>();
    selectedServices.forEach(s => {
      s.documentsRequired.forEach(d => docsSet.add(d));
    });
    return Array.from(docsSet);
  }, [selectedServices]);

  // Predefined combination bundles
  const bundles = [
    {
      name: "Startup Launch Essentials",
      description: "Ideal for new businesses looking to register and operate road-legal.",
      services: ['trade-licence', 'pan-card', 'accounting-services'],
      badge: "Popular"
    },
    {
      name: "Corporate Year-End Prep",
      description: "Consolidate trial balances, prepare corporate balance sheets, and coordinate audits.",
      services: ['accounts-finalization', 'balance-sheet', 'audit-work'],
      badge: "Enterprise"
    },
    {
      name: "Regular Tax Compliance",
      description: "Stay perfectly on track with monthly/quarterly GST returns and quarterly TDS filings.",
      services: ['gst-return', 'tds-returns', 'e-invoicing-e-waybill'],
      badge: "Tax Pack"
    }
  ];

  // Dynamic complexity scoring
  const complexityLevel = useMemo(() => {
    if (selectedServices.length === 0) return 'None';
    const count = selectedServices.length;
    if (count <= 2) return 'Standard';
    if (count <= 5) return 'Moderate Compliance';
    return 'Comprehensive Corporate Portfolio';
  }, [selectedServices]);

  // Dynamic estimated timeline calculation
  const calculatedTimeline = useMemo(() => {
    if (selectedServices.length === 0) return '0 Days';
    // Find the longest estimate as the critical path
    let maxDays = 1;
    selectedServices.forEach(s => {
      const match = s.timeline.match(/(\d+)/);
      if (match) {
        const days = parseInt(match[1]);
        if (days > maxDays) maxDays = days;
      }
    });
    return `${maxDays}-${maxDays + 2} Business Days (Critical Path estimate)`;
  }, [selectedServices]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
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
    <section id="estimator" className="py-20 bg-slate-50 border-b border-slate-100 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Dynamic Planner
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Compliance & Quote Planner
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Select one of our popular predefined bundles or click services above. 
            We automatically calculate logistics, combine your required document list, and prepare a custom inquiry package.
          </p>
        </div>

        {/* Quick Bundles Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {bundles.map((bundle, idx) => {
            const isAllSelected = bundle.services.every(id => selectedServiceIds.includes(id));
            return (
              <div 
                key={idx} 
                className={`bg-white rounded-xl p-5 border transition-all duration-200 relative flex flex-col justify-between ${
                  isAllSelected 
                    ? 'border-emerald-500 ring-2 ring-emerald-500/5 shadow-md' 
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {bundle.badge}
                </div>
                <div className="space-y-2 pr-12">
                  <h3 className="font-serif font-bold text-slate-900 text-base">{bundle.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{bundle.description}</p>
                </div>
                <button
                  onClick={() => onSelectPredefinedBundle(bundle.services)}
                  className={`mt-4 w-full py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isAllSelected 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {isAllSelected ? '✓ Active Bundle Selected' : 'Select This Bundle'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Dynamic Calculator Workspace */}
        <div className="grid lg:grid-cols-12 gap-8 pt-4">
          
          {/* Selected items column (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-serif font-bold text-slate-900 text-lg">Your Workspace</h3>
                </div>
                {selectedServices.length > 0 && (
                  <button
                    onClick={onClearServices}
                    className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear All ({selectedServices.length})</span>
                  </button>
                )}
              </div>

              <AnimatePresence mode="popLayout">
                {selectedServices.length > 0 ? (
                  <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                    {selectedServices.map((service) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between gap-4 group"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                            {service.category}
                          </span>
                          <h4 className="font-serif font-bold text-slate-800 text-sm">{service.name}</h4>
                        </div>
                        <button
                          onClick={() => onToggleService(service.id)}
                          className="p-1 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-5/10 transition-colors cursor-pointer"
                          title="Remove service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 px-4 space-y-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100">
                      <Calculator className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-800">No Services Selected</p>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Your workspace is currently empty. Scroll to the Services portfolio above or choose a predefined bundle.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const servicesSection = document.getElementById('services');
                        if (servicesSection) servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded-lg text-xs cursor-pointer"
                    >
                      Browse Services Directory
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Logistics Summary column (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg border border-slate-800 relative overflow-hidden">
              {/* Abstract glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

              <h3 className="font-serif font-bold text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>Estimated Logistics Plan</span>
              </h3>

              {/* Specs Stack */}
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2.5 border-b border-slate-800">
                  <span className="text-slate-400 text-xs">Compliance Density</span>
                  <span className={`font-semibold px-2.5 py-0.5 rounded-full text-xs ${
                    selectedServices.length === 0 
                      ? 'bg-slate-800 text-slate-500' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20'
                  }`}>
                    {complexityLevel}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-slate-800">
                  <span className="text-slate-400 text-xs">Estimated Critical Path</span>
                  <span className="font-bold font-mono text-xs text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {calculatedTimeline}
                  </span>
                </div>
              </div>

              {/* Dynamic Unified Documents List */}
              {consolidatedDocuments.length > 0 && (
                <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>Documents to Gather ({consolidatedDocuments.length})</span>
                  </h4>
                  <ul className="grid gap-1.5 text-xs text-slate-400 max-h-[120px] overflow-y-auto pr-1">
                    {consolidatedDocuments.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-slate-500 leading-tight italic">
                    *We deduplicated lists across all selected services to save you paperwork efforts.
                  </p>
                </div>
              )}

              {/* CTA & Quote Disclaimer */}
              <div className="space-y-4 pt-2">
                <div className="bg-emerald-950/30 border border-emerald-900/30 rounded-xl p-3.5 text-center">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 inline mr-1" />
                    Biba Communication maintains extremely reasonable base costs for small businesses. Submit your plan for an exact fee quote.
                  </p>
                </div>

                <button
                  disabled={selectedServices.length === 0}
                  onClick={scrollToContact}
                  className={`w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    selectedServices.length === 0
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/10'
                  }`}
                >
                  <span>Submit Selected Plan to Forms</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
