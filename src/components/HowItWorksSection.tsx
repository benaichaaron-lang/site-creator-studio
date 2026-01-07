import { MousePointerClick, FileText, Wallet, Truck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MousePointerClick,
    number: "01",
    title: "Choose",
    fullTitle: "Choose your plan",
    description: "Pack or custom offer",
  },
  {
    icon: FileText,
    number: "02",
    title: "Brief",
    fullTitle: "Fill in the brief",
    description: "Quick questionnaire",
  },
  {
    icon: Wallet,
    number: "03",
    title: "Pay",
    fullTitle: "Crypto payment",
    description: "ETH, BTC, USDC, USDT",
  },
  {
    icon: Truck,
    number: "04",
    title: "Receive",
    fullTitle: "Delivery",
    description: "Ready in 5-10 days",
  },
  {
    icon: RefreshCw,
    number: "05",
    title: "Revise",
    fullTitle: "Revisions",
    description: "Based on your plan",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-28 relative bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header - compact */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">Process</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-4 mb-2 sm:mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Simple process from brief to delivery.
          </p>
        </motion.div>

        {/* Steps - horizontal scroll on mobile, grid on desktop */}
        <div className="max-w-5xl mx-auto">
          {/* Mobile: Compact 5-column grid */}
          <div className="grid grid-cols-5 gap-2 sm:hidden">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="relative mb-2">
                  <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shadow-sm">
                    <step.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-[10px] font-bold">{index + 1}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-[10px] leading-tight mb-0.5">{step.title}</h3>
                <p className="text-muted-foreground text-[9px] leading-tight hidden xs:block">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Tablet/Desktop: Full grid */}
          <div className="hidden sm:block relative">
            {/* Connection Line */}
            <div className="absolute top-12 left-0 right-0 hidden lg:block">
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
            
            <div className="grid grid-cols-5 gap-4 lg:gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="relative mb-4">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl glass flex items-center justify-center">
                      <step.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-bold">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-sm lg:text-base mb-1">{step.fullTitle}</h3>
                  <p className="text-muted-foreground text-xs lg:text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Human team reassurance - more compact */}
          <motion.div
            className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-foreground font-medium text-sm sm:text-base mb-1">
              Real human team on every project.
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm">
              No templates. Experienced developers only.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
