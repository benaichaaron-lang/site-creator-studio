import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
}

const AnimatedStat = ({ value, suffix = "", prefix = "", label, delay = 0 }: StatProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, value, {
        duration: 2,
        delay,
        ease: "easeOut",
      });
      
      count.on("change", (latest) => {
        setDisplayValue(Math.round(latest));
      });

      return animation.stop;
    }
  }, [isInView, value, count, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="font-bebas text-5xl md:text-7xl lg:text-8xl text-white mb-2">
        {prefix}{displayValue}{suffix}
      </div>
      <p className="font-montserrat text-sm md:text-base uppercase tracking-widest text-white/50">
        {label}
      </p>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 150, suffix: "+", label: "Projets livrés", delay: 0 },
    { value: 5, suffix: "-10", label: "Jours de livraison", delay: 0.2 },
    { value: 100, suffix: "%", label: "Satisfaction client", delay: 0.4 },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(217,91%,50%,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(217,91%,50%,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
