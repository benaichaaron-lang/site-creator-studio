import { useEffect, useRef, useState, ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

const LazySection = forwardRef<HTMLDivElement, LazySectionProps>(({ 
  children, 
  className = "", 
  threshold = 0.1,
  rootMargin = "100px"
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      ) : (
        <div className="min-h-[200px]" />
      )}
    </div>
  );
});

LazySection.displayName = "LazySection";

export default LazySection;
