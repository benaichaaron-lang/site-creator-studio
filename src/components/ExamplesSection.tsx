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
    deliveryTime: "7 jours",
    pack: "Business",
  },
  {
    title: "Artisan Boutique",
    industry: "E-commerce",
    outcome: "150+ produits",
    fullOutcome: "Boutique en ligne • 150+ produits lancés",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&fm=webp&q=80",
    description: "Solution e-commerce complète avec catalogue produits et paiement sécurisé.",
    deliveryTime: "10 jours",
    pack: "Premium",
  },
  {
    title: "Urban Architecture",
    industry: "Architecture",
    outcome: "Image premium",
    fullOutcome: "Portfolio • Positionnement haut de gamme",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop&fm=webp&q=80",
    description: "Portfolio élégant avec galeries haute résolution.",
    deliveryTime: "5 jours",
    pack: "Starter",
  },
  {
    title: "Wellness Center",
    industry: "Santé",
    outcome: "200+ RDV/mois",
    fullOutcome: "Système de réservation • 200+ rendez-vous mensuels",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop&fm=webp&q=80",
    description: "Site santé et bien-être avec système de réservation en ligne.",
    deliveryTime: "7 jours",
    pack: "Business",
  },
  {
    title: "Legal Partners",
    industry: "Juridique",
    outcome: "Crédibilité pro",
    fullOutcome: "Site corporate • Crédibilité professionnelle",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop&fm=webp&q=80",
    description: "Site cabinet d'avocats avec profils d'équipe.",
    deliveryTime: "7 jours",
    pack: "Business",
  },
  {
    title: "Crypto Exchange",
    industry: "Fintech",
    outcome: "Données live",
    fullOutcome: "Application web • Intégration données temps réel",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop&fm=webp&q=80",
    description: "Plateforme crypto avec suivi des prix en direct.",
    deliveryTime: "10 jours",
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
    <section id="portfolio" className="py-16 md:py-24 lg:py-32 relative bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(217,91%,50%,0.05),transparent_60%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-montserrat text-primary text-xs md:text-sm uppercase tracking-widest">Portfolio</span>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-4">
            Projets récents
          </h2>
          <p className="text-white/50 font-heebo">
            Sites livrés dans différents secteurs.
          </p>
        </motion.div>

        {/* Mobile: Horizontal swipe */}
        <div className="sm:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {examples.map((example) => (
                <div key={example.title} className="flex-[0_0_85%] min-w-0 pl-3 first:pl-0">
                  <div className="rounded-xl overflow-hidden bg-white/[0.02] border border-white/10">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={example.image} alt={example.title} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-primary font-medium font-montserrat">{example.industry}</span>
                        <span className="text-white/20">•</span>
                        <span className="text-xs text-white/40 font-heebo">{example.pack}</span>
                      </div>
                      <h3 className="font-bebas text-xl text-white mb-1">{example.title}</h3>
                      <p className="text-white/50 text-sm font-heebo mb-3">{example.outcome}</p>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full h-9 border-white/20 text-white hover:bg-white/10">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir détails
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg bg-black border-white/10">
                          <DialogHeader>
                            <DialogTitle className="font-bebas text-2xl text-white">{example.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <img src={example.image} alt={example.title} className="w-full aspect-video object-cover rounded-lg" />
                            <div className="flex flex-wrap gap-2">
                              <span className="text-primary text-xs font-medium bg-primary/10 px-2 py-1 rounded-full">{example.industry}</span>
                              <span className="text-white/60 text-xs bg-white/5 px-2 py-1 rounded-full">{example.pack} Pack</span>
                              <span className="text-white/60 text-xs bg-white/5 px-2 py-1 rounded-full">{example.deliveryTime}</span>
                            </div>
                            <p className="text-sm font-medium text-primary">{example.fullOutcome}</p>
                            <p className="text-white/50 text-sm font-heebo">{example.description}</p>
                            <Button className="w-full" onClick={() => document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' })}>
                              Lancer un projet similaire
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
          
          {/* Indicators */}
          <div className="flex justify-center gap-1 mt-4">
            {examples.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? "w-5 bg-primary" : "w-1.5 bg-white/20"}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {examples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              className="group rounded-xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-primary/50 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={example.image} alt={example.title} loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-5">
                  <div className="text-white w-full">
                    <p className="text-sm font-medium font-montserrat mb-2">{example.industry}</p>
                    <div className="flex items-center gap-2 text-xs text-white/80 font-heebo">
                      <span>{example.deliveryTime}</span>
                      <span>•</span>
                      <span>{example.pack} Pack</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-primary font-medium font-montserrat">{example.industry}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs text-white/40 font-heebo">{example.pack}</span>
                </div>
                <h3 className="font-bebas text-2xl text-white mb-1">{example.title}</h3>
                <p className="text-white/50 text-sm font-heebo mb-4">{example.fullOutcome}</p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/10">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir le projet
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg bg-black border-white/10">
                    <DialogHeader>
                      <DialogTitle className="font-bebas text-2xl text-white">{example.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <img src={example.image} alt={example.title} className="w-full aspect-video object-cover rounded-lg" />
                      <div className="flex flex-wrap gap-2">
                        <span className="text-primary text-xs font-medium bg-primary/10 px-2 py-1 rounded-full">{example.industry}</span>
                        <span className="text-white/60 text-xs bg-white/5 px-2 py-1 rounded-full">{example.pack} Pack</span>
                        <span className="text-white/60 text-xs bg-white/5 px-2 py-1 rounded-full">{example.deliveryTime}</span>
                      </div>
                      <p className="text-sm font-medium text-primary">{example.fullOutcome}</p>
                      <p className="text-white/50 text-sm font-heebo">{example.description}</p>
                      <Button className="w-full" onClick={() => document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' })}>
                        Lancer un projet similaire
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
