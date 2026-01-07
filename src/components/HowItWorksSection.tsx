import { MousePointerClick, FileText, Wallet, Truck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MousePointerClick,
    number: "01",
    title: "Choose your plan",
    description: "Pack or custom, select the offer that matches your needs.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Fill in the brief",
    description: "A simple questionnaire to understand your project, goals, and preferences.",
  },
  {
    icon: Wallet,
    number: "03",
    title: "Crypto payment",
    description: "Pay securely with your wallet. ETH, BTC, USDC, USDT accepted.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Delivery",
    description: "Receive your turnkey website within the announced deadline, ready to use.",
  },
  {
    icon: RefreshCw,
    number: "05",
    title: "Revisions",
    description: "Request adjustments based on your plan. We perfect it together.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-28 relative bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Process</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-5">
            How it works
          </h2>
          <p className="text-muted-foreground">
            A straightforward process from brief to delivery.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0">
            <motion.div 
              className="h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            {/* Connector dots */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-[10%]">
              {[1, 2, 3, 4].map((_, index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 rounded-full bg-primary/40"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                />
              ))}
            </div>
          </div>
          
          {/* Mobile Connection Line */}
          <div className="lg:hidden absolute left-8 top-24 bottom-24 w-0.5 bg-gradient-to-b from-primary/30 via-primary/20 to-primary/30" />
          
          <div className="grid md:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="flex flex-col items-center text-center group lg:items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Icon Container */}
                <motion.div 
                  className="relative mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:glow-primary transition-all duration-500"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  {/* Number Badge */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  >
                    <span className="text-primary-foreground text-xs font-bold">{step.number}</span>
                  </motion.div>
                </motion.div>

                {/* Content */}
                <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Human team reassurance - calm and clear */}
          <motion.div
            className="text-center mt-14 pt-10 border-t border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-foreground font-medium mb-2">
              Every project is handled by a real human team.
            </p>
            <p className="text-muted-foreground text-sm">
              No automated websites. No templates. Just experienced developers working on your project.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;