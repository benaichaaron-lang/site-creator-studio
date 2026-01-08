import { motion } from "framer-motion";
import { Clock, Users, Headphones } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "+150",
    label: "Projets livrés",
  },
  {
    icon: Clock,
    value: "5-10",
    label: "Jours de livraison",
  },
  {
    icon: Headphones,
    value: "<24h",
    label: "Temps de réponse",
  },
];

const clientLogos = [
  { name: "Client 1", initials: "AB" },
  { name: "Client 2", initials: "CD" },
  { name: "Client 3", initials: "EF" },
  { name: "Client 4", initials: "GH" },
  { name: "Client 5", initials: "IJ" },
];

const TrustSection = () => {
  return (
    <section className="py-12 md:py-16 bg-black border-t border-b border-white/5">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10 md:mb-14">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <stat.icon className="w-5 h-5 text-primary" />
                <span className="font-bebas text-3xl md:text-4xl text-white">{stat.value}</span>
              </div>
              <p className="text-white/50 text-sm font-heebo">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6 font-montserrat">
            Ils nous font confiance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/30 transition-all cursor-default"
              >
                <span className="font-bebas text-lg text-white/60">{client.initials}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
