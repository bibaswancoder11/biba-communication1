import { useState, useMemo } from 'react';
import { SERVICES_DATA } from '../data';
import { ServiceItem } from '../types';
import { 
  Search, 
  BookOpen, 
  FileCheck, 
  HelpCircle, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  ChevronRight, 
  Scale, 
  Landmark,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesProps {
  selectedServiceIds: string[];
  onToggleService: (id: string) => void;
  onNavigateToPlanner: () => void;
}

export default function Services({ selectedServiceIds, onToggleService, onNavigateToPlanner }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = useMemo(() => {
    return ['All', 'Accounting & Finance', 'Taxation & Returns', 'Registrations & Licences', 'Payments & Levies'];
  }, []);

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter(service => {
      const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            service.detailedDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Map category to aesthetic icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Accounting & Finance':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'Taxation & Returns':
        return <FileCheck className="w-4 h-4 text-emerald-600" />;
      case 'Registrations & Licences':
        return <Scale className="w-4 h-4 text-emerald-600" />;
      case 'Payments & Levies':
        return <Landmark className="w-4 h-4 text-emerald-600" />;
      default:
        return <Briefcase className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-100 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Our Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Comprehensive Corporate & Personal Services
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            From monthly bookkeeping to state-level land revenue, we manage 14 distinct professional compliance tasks at highly reasonable rates. Click any service to view required documents.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-100 space-y-4 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
              <input
                type="text"
                placeholder="Search services (e.g., GST, Pan, balance sheet)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder-slate-400 font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Selected Count Indicator */}
            {selectedServiceIds.length > 0 && (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-4 py-2 rounded-xl border border-emerald-100 flex items-center justify-between gap-3"
              >
                <span>{selectedServiceIds.length} services selected for your quote plan</span>
                <button 
                  onClick={onNavigateToPlanner}
                  className="text-emerald-700 hover:text-emerald-900 underline font-bold cursor-pointer"
                >
                  Configure Quote &rarr;
                </button>
              </motion.div>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const isSelected = selectedServiceIds.includes(service.id);
              return (
                <motion.div
                  layout
                  key={service.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className={`bg-white rounded-xl border p-6 flex flex-col justify-between transition-all duration-300 relative group ${
                    isSelected 
                      ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-md bg-emerald-50/5' 
                      : 'border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Service Index & Icon */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="p-3 bg-slate-50 group-hover:bg-emerald-50 rounded-xl transition-colors">
                      {getCategoryIcon(service.category)}
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-emerald-500/40 transition-colors">
                      #{String(service.index).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title & Short Desc */}
                  <div className="space-y-2 flex-1">
                    <h3 className="font-serif font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-lg leading-tight">
                      {service.name}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Actions & Specs */}
                  <div className="border-t border-slate-50 pt-4 mt-5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-bold text-slate-600 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Required Docs & Specs</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onToggleService(service.id)}
                      className={`p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                        isSelected 
                          ? 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-100' 
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100'
                      }`}
                      title={isSelected ? "Remove from planner" : "Add to quote planner"}
                    >
                      {isSelected ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredServices.length === 0 && (
            <div className="col-span-full py-16 text-center bg-slate-50 rounded-xl border border-slate-100 space-y-3">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-slate-700 font-semibold">No services match your filters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Detailed Service Specs Modal Overlay */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative max-h-[90vh] flex flex-col"
              >
                {/* Modal Title & Category */}
                <div className="bg-slate-900 text-white p-6 relative">
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="space-y-1 pr-8">
                    <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md">
                      {selectedService.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight pt-1.5">
                      {selectedService.name}
                    </h3>
                  </div>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-600">
                  <div className="space-y-2">
                    <h4 className="font-serif font-bold text-slate-800 text-sm uppercase tracking-wider">Service Overview</h4>
                    <p className="leading-relaxed text-slate-600">{selectedService.detailedDescription}</p>
                  </div>

                  {/* Required Documents Section */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                    <h4 className="font-serif font-bold text-slate-800 text-xs uppercase tracking-widest flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>Required Documents Checklist</span>
                    </h4>
                    <ul className="grid gap-2 text-xs">
                      {selectedService.documentsRequired.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meta Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 text-xs border-t border-slate-100 pt-4">
                    <div>
                      <span className="block text-slate-400 font-semibold uppercase tracking-wider">Estimated Delivery</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1 mt-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        {selectedService.timeline}
                      </span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-semibold uppercase tracking-wider">Pricing Model</span>
                      <span className="font-bold text-slate-800 block mt-1">
                        {selectedService.pricingModel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Close Specs
                  </button>

                  <button
                    onClick={() => {
                      onToggleService(selectedService.id);
                      setSelectedService(null);
                    }}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedServiceIds.includes(selectedService.id)
                        ? 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-100'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {selectedServiceIds.includes(selectedService.id) ? 'Remove Selection' : 'Select for Quote'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
