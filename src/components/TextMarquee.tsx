import { motion } from "framer-motion";

interface TextMarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

const TextMarquee = ({ items, speed = 20, className = "" }: TextMarqueeProps) => {
  const duplicatedItems = [...items, ...items];
  
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{
          x: [0, -50 + "%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="inline-flex items-center">
            <span className="font-montserrat text-sm md:text-lg uppercase tracking-widest text-white/60 px-4 md:px-8">
              {item}
            </span>
            <span className="text-primary text-xs md:text-sm">◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TextMarquee;
