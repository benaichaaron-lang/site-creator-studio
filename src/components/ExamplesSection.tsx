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
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const examples = [
  {
    title: "GreenTech Solutions",
    industry: "SaaS",
    outcome: "+40% conversion",
    fullOutcome: "Lead gen landing page • 40% conversion increase",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&fm=webp&q=80",
    description: "A modern SaaS landing page designed to convert visitors into qualified leads.",
    deliveryTime: "7 days",
    pack: "Business",
  },
  {
    title: "Artisan Boutique",
    industry: "E-commerce",
    outcome: "150+ products",
    fullOutcome: "Online store • 150+ products launched",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&fm=webp&q=80",
    description: "Full e-commerce solution with product catalog and secure checkout.",
    deliveryTime: "10 days",
    pack: "Premium",
  },
  {
    title: "Urban Architecture",
    industry: "Architecture",
    outcome: "Premium brand",
    fullOutcome: "Portfolio showcase • Premium brand positioning",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop&fm=webp&q=80",
    description: "Elegant portfolio website with high-resolution galleries.",
    deliveryTime: "5 days",
    pack: "Starter",
  },
  {
    title: "Wellness Center",
    industry: "Health",
    outcome: "200+ bookings/mo",
    fullOutcome: "Booking system • 200+ monthly appointments",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop&fm=webp&q=80",
    description: "Health and wellness site with online booking system.",
    deliveryTime: "7 days",
    pack: "Business",
  },
  {
    title: "Legal Partners",
    industry: "Legal",
    outcome: "Pro credibility",
    fullOutcome: "Corporate website • Professional credibility",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop&fm=webp&q=80",
    description: "Professional law firm website with team profiles.",
    deliveryTime: "7 days",
    pack: "Business",
  },
  {
    title: "Crypto Exchange",
    industry: "Fintech",
    outcome: "Real-time data",
    fullOutcome: "Web application • Real-time data integration",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop&fm=webp&q=80",
    description: "Cryptocurrency platform with live price tracking.",
    deliveryTime: "10 days",
    pack: "Premium",
  },
];

const ExamplesSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section id="portfolio" className="py-12 sm:py-16 lg:py-28 relative bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
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

        {/* Mobile: Horizontal swipe carousel */}
        <div className="sm:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {examples.map((example) => (
                <div 
                  key={example.title} 
                  className="flex-[0_0_80%] min-w-0 pl-3 first:pl-0"
                >
                  <div className="rounded-xl overflow-hidden bg-card border border-border/40 shadow-card">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={example.image}
                        alt={example.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-primary font-medium">{example.industry}</span>
                        <span className="text-muted-foreground/40">•</span>
                        <span className="text-xs text-muted-foreground">{example.pack}</span>
                      </div>
                      <h3 className="font-semibold text-base mb-1">{example.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{example.outcome}</p>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full h-9">
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
                            <p className="text-muted-foreground text-sm">{example.description}</p>
                            <Button 
                              className="w-full"
                              onClick={() => document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                              Start a similar project
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Swipe indicators */}
          <div className="flex justify-center gap-1 mt-4">
            {examples.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Tablet/Desktop: Grid */}
        <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {examples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group rounded-xl overflow-hidden bg-card border border-border/40 hover:shadow-lg transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={example.image}
                  alt={example.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <div className="text-white">
                    <p className="text-sm font-medium mb-1">{example.industry}</p>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <span>{example.deliveryTime}</span>
                      <span>•</span>
                      <span>{example.pack} Pack</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-primary font-medium">{example.industry}</span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="text-xs text-muted-foreground">{example.pack}</span>
                </div>
                <h3 className="font-semibold text-base mb-1">{example.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{example.fullOutcome}</p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View case study
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
                      <p className="text-muted-foreground text-sm">{example.description}</p>
                      <Button 
                        className="w-full"
                        onClick={() => document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' })}
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
