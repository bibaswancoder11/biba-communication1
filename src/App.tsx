import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import InteractiveEstimator from './components/InteractiveEstimator';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  // Toggle single service in the workspace
  const handleToggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Clear workspace items
  const handleClearServices = () => {
    setSelectedServiceIds([]);
  };

  // Select a predefined bundle of services
  const handleSelectPredefinedBundle = (serviceIds: string[]) => {
    // Check if they are already fully selected
    const isAllSelected = serviceIds.every((id) => selectedServiceIds.includes(id));
    
    if (isAllSelected) {
      // Unselect all bundle items
      setSelectedServiceIds((prev) => prev.filter((id) => !serviceIds.includes(id)));
    } else {
      // Add any missing bundle items
      setSelectedServiceIds((prev) => {
        const next = [...prev];
        serviceIds.forEach((id) => {
          if (!next.includes(id)) {
            next.push(id);
          }
        });
        return next;
      });
    }
  };

  const handleNavigateToPlanner = () => {
    const element = document.getElementById('estimator');
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
    <div id="app-root" className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white flex flex-col justify-between">
      <div>
        <Header />
        
        <main>
          <Hero />
          
          <About />
          
          <Services 
            selectedServiceIds={selectedServiceIds}
            onToggleService={handleToggleService}
            onNavigateToPlanner={handleNavigateToPlanner}
          />
          
          <InteractiveEstimator 
            selectedServiceIds={selectedServiceIds}
            onToggleService={handleToggleService}
            onClearServices={handleClearServices}
            onSelectPredefinedBundle={handleSelectPredefinedBundle}
          />
          
          <FAQ />
          
          <ContactForm 
            selectedServiceIds={selectedServiceIds}
            onToggleService={handleToggleService}
          />
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
