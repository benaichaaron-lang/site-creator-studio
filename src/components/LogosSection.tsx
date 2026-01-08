import { motion } from "framer-motion";

const technologies = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "🟢" },
  { name: "Supabase", icon: "⚡" },
];

const LogosSection = () => {
  return (
    <section className="py-10 md:py-16 bg-black border-t border-b border-white/5">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/40 text-xs md:text-sm uppercase tracking-widest mb-8 font-montserrat"
        >
          Technologies de confiance
        </motion.p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-default"
            >
              <span className="text-2xl md:text-3xl">{tech.icon}</span>
              <span className="font-montserrat text-sm md:text-base font-medium hidden sm:block">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosSection;
