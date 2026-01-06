import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const examples = [
  {
    title: "Creative Studio",
    category: "Agency",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop",
  },
  {
    title: "Fashion E-commerce",
    category: "Store",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
  },
  {
    title: "Fine Dining Restaurant",
    category: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
  },
  {
    title: "Medical Clinic",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
  },
  {
    title: "Tech Startup",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    title: "Artist Portfolio",
    category: "Creative",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const ExamplesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Portfolio</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Examples that
            <br />
            <span className="text-gradient">inspire</span>
          </h2>
          <p className="text-muted-foreground">
            Discover what we can create for you. Each project is unique.
          </p>
        </motion.div>

        {/* Examples Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {examples.map((example, index) => (
            <motion.div
              key={example.title}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <div className="aspect-[3/2] overflow-hidden">
                <motion.img
                  src={example.image}
                  alt={example.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
              </div>

              {/* Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <motion.div 
                className="absolute inset-0 flex flex-col justify-end p-6"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-primary text-sm font-medium">{example.category}</span>
                <h3 className="font-display text-xl font-bold">{example.title}</h3>
              </motion.div>

              {/* Link Icon */}
              <motion.div 
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ExternalLink className="w-5 h-5 text-foreground" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExamplesSection;
