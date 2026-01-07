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
    industry: "SaaS",
    outcome: "+40% conversion",
    fullOutcome: "Lead gen landing page • 40% conversion increase",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&fm=webp&q=80",
    imageSrcSet: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=267&fit=crop&fm=webp&q=75 400w, https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&fm=webp&q=80 600w",
    description: "A modern SaaS landing page designed to convert visitors into qualified leads. Features include animated hero section, pricing tables, and integrated contact forms.",
    deliveryTime: "7 days",
    pack: "Business",
    location: "United States",
  },
  {
    title: "Artisan Boutique",
    industry: "E-commerce",
    outcome: "150+ products",
    fullOutcome: "Online store • 150+ products launched",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&fm=webp&q=80",
    imageSrcSet: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=267&fit=crop&fm=webp&q=75 400w, https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&fm=webp&q=80 600w",
    description: "Full e-commerce solution with product catalog, shopping cart, secure checkout, and inventory management. Mobile-first responsive design.",
    deliveryTime: "10 days",
    pack: "Premium",
    location: "France",
  },
  {
    title: "Urban Architecture",
    industry: "Architecture",
    outcome: "Premium brand",
    fullOutcome: "Portfolio showcase • Premium brand positioning",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop&fm=webp&q=80",
    imageSrcSet: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=267&fit=crop&fm=webp&q=75 400w, https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop&fm=webp&q=80 600w",
    description: "Elegant portfolio website showcasing architectural projects with high-resolution galleries, project case studies, and contact integration.",
    deliveryTime: "5 days",
    pack: "Starter",
    location: "Germany",
  },
  {
    title: "Wellness Center",
    industry: "Health",
    outcome: "200+ bookings/mo",
    fullOutcome: "Booking system • 200+ monthly appointments",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop&fm=webp&q=80",
    imageSrcSet: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=267&fit=crop&fm=webp&q=75 400w, https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop&fm=webp&q=80 600w",
    description: "Health and wellness business site with online booking system, service catalog, practitioner profiles, and blog section.",
    deliveryTime: "7 days",
    pack: "Business",
    location: "United Kingdom",
  },
  {
    title: "Legal Partners",
    industry: "Legal",
    outcome: "Pro credibility",
    fullOutcome: "Corporate website • Professional credibility",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop&fm=webp&q=80",
    imageSrcSet: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=267&fit=crop&fm=webp&q=75 400w, https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop&fm=webp&q=80 600w",
    description: "Professional law firm website with team profiles, practice areas, case results, and secure client portal integration.",
    deliveryTime: "7 days",
    pack: "Business",
    location: "Canada",
  },
  {
    title: "Crypto Exchange",
    industry: "Fintech",
    outcome: "Real-time data",
    fullOutcome: "Web application • Real-time data integration",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop&fm=webp&q=80",
    imageSrcSet: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=267&fit=crop&fm=webp&q=75 400w, https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop&fm=webp&q=80 600w",
    description: "Cryptocurrency platform interface with live price tracking, wallet integration, and secure transaction history. Built with Web3 compatibility.",
    deliveryTime: "10 days",
    pack: "Premium",
    location: "Singapore",
  },
];

const ExamplesSection = () => {
  return (
    <section id="portfolio" className="py-12 sm:py-16 lg:py-28 relative bg-background">
      <div className="container mx-auto px-4">
        {/* Header - compact */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">Portfolio</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-4 mb-2 sm:mb-4">
            Recent projects
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Websites delivered across industries.
          </p>
        </motion.div>

        {/* Examples Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">
          {examples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group rounded-lg sm:rounded-xl overflow-hidden bg-card border border-border/40"
            >
              {/* Image - smaller aspect ratio on mobile */}
              <div className="aspect-[4/3] sm:aspect-[4/3] overflow-hidden relative">
                <img
                  src={example.image}
                  srcSet={example.imageSrcSet}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  alt={example.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content - compact on mobile */}
              <div className="p-2.5 sm:p-4">
                <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                  <span className="text-[10px] sm:text-xs text-primary font-medium">{example.industry}</span>
                  <span className="text-muted-foreground/40 hidden sm:inline">•</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">{example.pack}</span>
                </div>
                <h3 className="font-semibold text-xs sm:text-sm lg:text-base mb-1 truncate">{example.title}</h3>
                <p className="text-muted-foreground text-[10px] sm:text-xs mb-2 sm:mb-3 line-clamp-1">
                  <span className="sm:hidden">{example.outcome}</span>
                  <span className="hidden sm:inline">{example.fullOutcome}</span>
                </p>
                
                {/* View Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full h-7 sm:h-8 text-[10px] sm:text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      <span className="sm:hidden">View</span>
                      <span className="hidden sm:inline">View case study</span>
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
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                      <div className="flex flex-wrap gap-2">
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
                      <p className="text-sm font-medium text-primary">{example.fullOutcome}</p>
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
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;
