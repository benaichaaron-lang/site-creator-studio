import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FileText, MessageSquare, Paintbrush, Rocket } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: FileText,
    title: "Soumettez votre brief",
    description: "Décrivez votre projet en quelques minutes.",
    visual: "brief",
  },
  {
    id: 2,
    icon: MessageSquare,
    title: "Nous analysons & validons",
    description: "Nous confirmons le périmètre, délai et tarif.",
    visual: "proposal",
  },
  {
    id: 3,
    icon: Paintbrush,
    title: "Design & développement",
    description: "Notre équipe conçoit et développe votre site.",
    visual: "design",
  },
  {
    id: 4,
    icon: Rocket,
    title: "Livraison",
    description: "Votre site est livré en 5-10 jours, prêt à l'emploi.",
    visual: "delivery",
  },
];

// Mockup Components
const BriefMockup = () => (
  <div className="bg-card rounded-2xl shadow-elevated p-6 w-full max-w-md">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <FileText className="w-5 h-5 text-primary" />
      </div>
      <div>
        <div className="text-sm font-medium text-foreground">Nouveau brief</div>
        <div className="text-xs text-muted-foreground">mysitesfactory.com</div>
      </div>
    </div>
    <div className="space-y-4">
      <div>
        <div className="text-xs text-muted-foreground mb-1.5">Type de site</div>
        <div className="h-10 bg-muted/50 rounded-lg flex items-center px-3 text-sm text-foreground">
          Site vitrine professionnel
        </div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground mb-1.5">Budget</div>
        <div className="h-10 bg-muted/50 rounded-lg flex items-center px-3 text-sm text-foreground">
          1 500€ - 3 000€
        </div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground mb-1.5">Délai souhaité</div>
        <div className="h-10 bg-muted/50 rounded-lg flex items-center px-3 text-sm text-foreground">
          2-3 semaines
        </div>
      </div>
      <motion.div 
        className="h-11 bg-primary rounded-lg flex items-center justify-center text-sm font-medium text-primary-foreground mt-6"
        whileHover={{ scale: 1.02 }}
      >
        Envoyer mon brief →
      </motion.div>
    </div>
  </div>
);

const ProposalMockup = () => (
  <div className="bg-card rounded-2xl shadow-elevated p-6 w-full max-w-md">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-success" />
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">Proposition validée</div>
          <div className="text-xs text-muted-foreground">Il y a 2 heures</div>
        </div>
      </div>
      <div className="px-2.5 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
        Confirmé
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex justify-between items-center py-3 border-b border-border">
        <span className="text-sm text-muted-foreground">Projet</span>
        <span className="text-sm font-medium text-foreground">Site vitrine PME</span>
      </div>
      <div className="flex justify-between items-center py-3 border-b border-border">
        <span className="text-sm text-muted-foreground">Délai</span>
        <span className="text-sm font-medium text-foreground">10 jours ouvrés</span>
      </div>
      <div className="flex justify-between items-center py-3 border-b border-border">
        <span className="text-sm text-muted-foreground">Tarif</span>
        <span className="text-sm font-medium text-foreground">2 490€ HT</span>
      </div>
      <div className="flex justify-between items-center py-3">
        <span className="text-sm text-muted-foreground">Début prévu</span>
        <span className="text-sm font-medium text-foreground">Lundi 13 janvier</span>
      </div>
    </div>
  </div>
);

const DesignMockup = () => (
  <div className="relative w-full max-w-lg">
    {/* Desktop mockup */}
    <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
      <div className="h-8 bg-muted/50 flex items-center gap-2 px-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-4 bg-muted rounded-md max-w-[200px] mx-auto" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="h-4 w-32 bg-foreground/20 rounded mx-auto mb-2" />
            <div className="h-3 w-24 bg-foreground/10 rounded mx-auto" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-16 bg-muted/50 rounded-lg" />
          <div className="h-16 bg-muted/50 rounded-lg" />
          <div className="h-16 bg-muted/50 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-muted/50 rounded w-full" />
          <div className="h-3 bg-muted/50 rounded w-4/5" />
        </div>
      </div>
    </div>
    {/* Mobile mockup */}
    <motion.div 
      className="absolute -right-4 -bottom-4 w-28 bg-card rounded-2xl shadow-elevated overflow-hidden border-4 border-background"
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="h-4 bg-muted/50 flex items-center justify-center">
        <div className="w-8 h-1.5 bg-muted rounded-full" />
      </div>
      <div className="p-2 space-y-2">
        <div className="h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg" />
        <div className="h-2 bg-muted/50 rounded w-full" />
        <div className="h-2 bg-muted/50 rounded w-3/4" />
        <div className="grid grid-cols-2 gap-1">
          <div className="h-6 bg-muted/50 rounded" />
          <div className="h-6 bg-muted/50 rounded" />
        </div>
      </div>
    </motion.div>
    {/* Progress indicator */}
    <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-card rounded-xl shadow-elevated p-3">
      <div className="flex items-center gap-2 mb-2">
        <Paintbrush className="w-4 h-4 text-primary" />
        <span className="text-xs font-medium text-foreground">En cours</span>
      </div>
      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary rounded-full"
          initial={{ width: "0%" }}
          whileInView={{ width: "65%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
      <div className="text-xs text-muted-foreground mt-1">65% complété</div>
    </div>
  </div>
);

const DeliveryMockup = () => (
  <div className="relative w-full max-w-lg">
    <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
      <div className="h-8 bg-muted/50 flex items-center gap-2 px-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-4 bg-success/20 rounded-md max-w-[180px] mx-auto flex items-center justify-center">
            <span className="text-[10px] text-success font-medium">votresite.com</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="h-28 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMjAgMjBtLTEgMGExIDEgMCAxIDAgMiAwYTEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-50" />
          <div className="text-center relative z-10">
            <div className="h-5 w-36 bg-foreground/30 rounded mx-auto mb-2" />
            <div className="h-3 w-28 bg-foreground/20 rounded mx-auto mb-3" />
            <div className="h-7 w-24 bg-primary rounded-lg mx-auto" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-14 bg-muted/30 rounded-lg p-2">
            <div className="w-6 h-6 bg-primary/20 rounded-lg mb-1" />
            <div className="h-2 bg-muted/50 rounded w-full" />
          </div>
          <div className="h-14 bg-muted/30 rounded-lg p-2">
            <div className="w-6 h-6 bg-accent/20 rounded-lg mb-1" />
            <div className="h-2 bg-muted/50 rounded w-full" />
          </div>
          <div className="h-14 bg-muted/30 rounded-lg p-2">
            <div className="w-6 h-6 bg-success/20 rounded-lg mb-1" />
            <div className="h-2 bg-muted/50 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
    {/* Success badge */}
    <motion.div 
      className="absolute -right-6 -top-4 bg-success text-success-foreground rounded-full p-3 shadow-elevated"
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
    >
      <Rocket className="w-5 h-5" />
    </motion.div>
    {/* Delivery card */}
    <motion.div 
      className="absolute -left-6 bottom-4 bg-card rounded-xl shadow-elevated p-4"
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
            <svg className="w-3 h-3 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">Site livré !</div>
          <div className="text-xs text-muted-foreground">Prêt à être publié</div>
        </div>
      </div>
    </motion.div>
  </div>
);

const VisualMockup = ({ type }: { type: string }) => {
  switch (type) {
    case "brief":
      return <BriefMockup />;
    case "proposal":
      return <ProposalMockup />;
    case "design":
      return <DesignMockup />;
    case "delivery":
      return <DeliveryMockup />;
    default:
      return null;
  }
};

const ServiceDemoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      id="demo" 
      className="py-16 lg:py-28 bg-muted/30 relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.03),transparent_50%)]" />
      
      <motion.div style={{ opacity }} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Notre processus
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Comment ça fonctionne
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Un processus simple et transparent, du brief à la livraison.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-16 lg:space-y-32">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onViewportEnter={() => setActiveStep(index)}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text content */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-primary">
                      Étape {step.id}
                    </span>
                    <div className="h-px w-8 bg-border" />
                    <span className="text-sm text-muted-foreground">
                      {step.id}/4
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                {/* Progress dots */}
                <div className="flex gap-2 mt-8">
                  {steps.map((_, dotIndex) => (
                    <div
                      key={dotIndex}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        dotIndex === index
                          ? "w-8 bg-primary"
                          : dotIndex < index
                          ? "w-4 bg-primary/40"
                          : "w-4 bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Visual mockup */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""} flex justify-center`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <VisualMockup type={step.visual} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16 lg:mt-24"
        >
          <p className="text-muted-foreground mb-6">
            Prêt à démarrer votre projet ?
          </p>
          <motion.a
            href="#hero"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Commencer mon brief
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServiceDemoSection;
