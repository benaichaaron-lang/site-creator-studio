import { ExternalLink, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const examples = [
  {
    title: "GreenTech Solutions",
    industry: "SaaS / Technology",
    outcome: "Lead gen landing page • 40% conversion increase",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    description: "A modern SaaS landing page designed to convert visitors into qualified leads. Features include animated hero section, pricing tables, and integrated contact forms.",
    deliveryTime: "7 days",
    pack: "Business",
  },
  {
    title: "Artisan Boutique",
    industry: "E-commerce / Retail",
    outcome: "Online store • 150+ products launched",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    description: "Full e-commerce solution with product catalog, shopping cart, secure checkout, and inventory management. Mobile-first responsive design.",
    deliveryTime: "10 days",
    pack: "Premium",
  },
  {
    title: "Urban Architecture",
    industry: "Architecture / Design",
    outcome: "Portfolio showcase • Premium brand positioning",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
    description: "Elegant portfolio website showcasing architectural projects with high-resolution galleries, project case studies, and contact integration.",
    deliveryTime: "5 days",
    pack: "Starter",
  },
  {
    title: "Wellness Center",
    industry: "Health & Wellness",
    outcome: "Booking system • 200+ monthly appointments",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop",
    description: "Health and wellness business site with online booking system, service catalog, practitioner profiles, and blog section.",
    deliveryTime: "7 days",
    pack: "Business",
  },
  {
    title: "Legal Partners LLP",
    industry: "Legal / Professional Services",
    outcome: "Corporate website • Professional credibility",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
    description: "Professional law firm website with team profiles, practice areas, case results, and secure client portal integration.",
    deliveryTime: "7 days",
    pack: "Business",
  },
  {
    title: "Crypto Exchange",
    industry: "Fintech / Blockchain",
    outcome: "Web application • Real-time data integration",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    description: "Cryptocurrency platform interface with live price tracking, wallet integration, and secure transaction history. Built with Web3 compatibility.",
    deliveryTime: "10 days",
    pack: "Premium",
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
    <section id="portfolio" className="py-24 relative">
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
            Real results for
            <br />
            <span className="text-gradient">real businesses</span>
          </h2>
          <p className="text-muted-foreground">
            Every project is unique. Here are some examples of what we've delivered.
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
          {examples.map((example) => (
            <motion.div
              key={example.title}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden glass"
            >
              {/* Image */}
              <div className="aspect-[3/2] overflow-hidden">
                <motion.img
                  src={example.image}
                  alt={example.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary text-xs font-medium bg-primary/10 px-2 py-1 rounded-full">
                    {example.industry}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold mb-1">{example.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{example.outcome}</p>
                
                {/* View Details Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full group-hover:border-primary transition-colors">
                      <Eye className="w-4 h-4 mr-2" />
                      View details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">{example.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <img 
                        src={example.image} 
                        alt={example.title}
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                      <div className="flex gap-2">
                        <span className="text-primary text-xs font-medium bg-primary/10 px-2 py-1 rounded-full">
                          {example.industry}
                        </span>
                        <span className="text-muted-foreground text-xs bg-secondary px-2 py-1 rounded-full">
                          {example.pack} Pack
                        </span>
                        <span className="text-muted-foreground text-xs bg-secondary px-2 py-1 rounded-full">
                          {example.deliveryTime}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-primary">{example.outcome}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {example.description}
                      </p>
                      <Button 
                        className="w-full"
                        onClick={() => {
                          document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Start a similar project
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExamplesSection;