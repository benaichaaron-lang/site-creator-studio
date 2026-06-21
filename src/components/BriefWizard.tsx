import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Loader2,
  Send,
  Sparkles,
  Palette,
  Layout,
  Type,
  Globe,
  Target,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface BriefData {
  // Step 1: Identité
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Step 2: Activité
  businessName: string;
  businessType: string;
  businessDescription: string;
  // Step 3: Objectif du site
  websiteGoal: string;
  targetAudience: string;
  // Step 4: Style & Design
  designStyle: string;
  colorPreference: string;
  referenceWebsites: string;
  // Step 5: Contenu & Pages
  pagesNeeded: string[];
  hasLogo: string;
  hasContent: string;
  // Step 6: Budget & Délai
  budget: string;
  timeline: string;
  additionalNotes: string;
}

const INITIAL_DATA: BriefData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  businessName: "",
  businessType: "",
  businessDescription: "",
  websiteGoal: "",
  targetAudience: "",
  designStyle: "",
  colorPreference: "",
  referenceWebsites: "",
  pagesNeeded: [],
  hasLogo: "",
  hasContent: "",
  budget: "",
  timeline: "",
  additionalNotes: "",
};

const TOTAL_STEPS = 6;

// ─── Pages Options ─────────────────────────────────────────────────────────────
const PAGE_OPTIONS = [
  { id: "accueil", label: "Accueil", labelEn: "Home" },
  { id: "about", label: "À propos", labelEn: "About" },
  { id: "services", label: "Services", labelEn: "Services" },
  { id: "portfolio", label: "Portfolio / Réalisations", labelEn: "Portfolio" },
  { id: "blog", label: "Blog / Actualités", labelEn: "Blog / News" },
  { id: "contact", label: "Contact", labelEn: "Contact" },
  { id: "shop", label: "Boutique en ligne", labelEn: "Online Shop" },
  { id: "booking", label: "Réservation / RDV", labelEn: "Booking" },
  { id: "faq", label: "FAQ", labelEn: "FAQ" },
  { id: "testimonials", label: "Témoignages", labelEn: "Testimonials" },
];

// ─── Component ─────────────────────────────────────────────────────────────────
const BriefWizard = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BriefData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isFr = language === "fr";

  // ─── Validation ────────────────────────────────────────────────────────────────
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!data.firstName.trim()) newErrors.firstName = isFr ? "Prénom requis" : "First name required";
        if (!data.lastName.trim()) newErrors.lastName = isFr ? "Nom requis" : "Last name required";
        if (!data.email.trim()) newErrors.email = isFr ? "Email requis" : "Email required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = isFr ? "Email invalide" : "Invalid email";
        if (!data.phone.trim()) newErrors.phone = isFr ? "Téléphone requis" : "Phone required";
        break;
      case 2:
        if (!data.businessName.trim()) newErrors.businessName = isFr ? "Nom d'activité requis" : "Business name required";
        if (!data.businessType) newErrors.businessType = isFr ? "Type d'activité requis" : "Business type required";
        if (!data.businessDescription.trim()) newErrors.businessDescription = isFr ? "Description requise" : "Description required";
        break;
      case 3:
        if (!data.websiteGoal) newErrors.websiteGoal = isFr ? "Objectif requis" : "Goal required";
        if (!data.targetAudience.trim()) newErrors.targetAudience = isFr ? "Audience cible requise" : "Target audience required";
        break;
      case 4:
        if (!data.designStyle) newErrors.designStyle = isFr ? "Style requis" : "Style required";
        break;
      case 5:
        if (data.pagesNeeded.length === 0) newErrors.pagesNeeded = isFr ? "Sélectionnez au moins 1 page" : "Select at least 1 page";
        break;
      case 6:
        if (!data.budget) newErrors.budget = isFr ? "Budget requis" : "Budget required";
        if (!data.timeline) newErrors.timeline = isFr ? "Délai requis" : "Timeline required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Navigation ────────────────────────────────────────────────────────────────
  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  // ─── Toggle Page ───────────────────────────────────────────────────────────────
  const togglePage = (pageId: string) => {
    setData((prev) => ({
      ...prev,
      pagesNeeded: prev.pagesNeeded.includes(pageId)
        ? prev.pagesNeeded.filter((p) => p !== pageId)
        : [...prev.pagesNeeded, pageId],
    }));
    setErrors((prev) => ({ ...prev, pagesNeeded: "" }));
  };

  // ─── Submit ────────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    try {
      // Build the prompt-ready brief
      const briefSummary = generateBriefSummary(data);

      // Save to Supabase leads table
      const { error: dbError } = await supabase.from("leads").insert({
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        website_type: data.businessType,
        budget: data.budget,
        timeline: data.timeline,
        recommendation: briefSummary,
        source: "brief_wizard",
        status: "new",
      });

      if (dbError) {
        console.error("DB error:", dbError);
      }

      // Send to Formspree (backup)
      await fetch("https://formspree.io/f/xvzgebre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          businessName: data.businessName.trim(),
          businessType: data.businessType,
          businessDescription: data.businessDescription.trim(),
          websiteGoal: data.websiteGoal,
          targetAudience: data.targetAudience.trim(),
          designStyle: data.designStyle,
          colorPreference: data.colorPreference.trim(),
          referenceWebsites: data.referenceWebsites.trim(),
          pagesNeeded: data.pagesNeeded.join(", "),
          hasLogo: data.hasLogo,
          hasContent: data.hasContent,
          budget: data.budget,
          timeline: data.timeline,
          additionalNotes: data.additionalNotes.trim(),
          briefSummary,
        }),
      });

      // Send confirmation email
      try {
        await supabase.functions.invoke("send-brief-confirmation", {
          body: {
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            email: data.email.trim(),
            phone: data.phone.trim(),
            projectType: data.businessType,
            budget: data.budget,
            timeline: data.timeline,
            language: isFr ? "fr" : "en",
          },
        });
      } catch (emailErr) {
        console.error("Email error:", emailErr);
      }

      setIsSubmitted(true);
      toast({
        title: isFr ? "Demande envoyée !" : "Request sent!",
        description: isFr
          ? "Nous reviendrons vers vous sous 24h."
          : "We'll get back to you within 24h.",
      });
    } catch (err) {
      toast({
        title: isFr ? "Erreur" : "Error",
        description: isFr
          ? "Une erreur est survenue. Veuillez réessayer."
          : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Generate Brief Summary (for prompt generation) ────────────────────────────
  const generateBriefSummary = (d: BriefData): string => {
    const pages = d.pagesNeeded
      .map((id) => PAGE_OPTIONS.find((p) => p.id === id)?.label || id)
      .join(", ");

    return `
=== BRIEF CLIENT - ${d.businessName} ===
Client: ${d.firstName} ${d.lastName}
Email: ${d.email} | Tél: ${d.phone}

ACTIVITÉ:
- Nom: ${d.businessName}
- Type: ${d.businessType}
- Description: ${d.businessDescription}

OBJECTIF DU SITE:
- But principal: ${d.websiteGoal}
- Audience cible: ${d.targetAudience}

DESIGN:
- Style souhaité: ${d.designStyle}
- Couleurs préférées: ${d.colorPreference || "Pas de préférence"}
- Sites de référence: ${d.referenceWebsites || "Aucun"}

STRUCTURE:
- Pages souhaitées: ${pages}
- Logo existant: ${d.hasLogo || "Non précisé"}
- Contenu prêt: ${d.hasContent || "Non précisé"}

BUDGET & DÉLAI:
- Budget: ${d.budget}
- Délai: ${d.timeline}

NOTES ADDITIONNELLES:
${d.additionalNotes || "Aucune"}
`.trim();
  };

  // ─── Step Indicators ───────────────────────────────────────────────────────────
  const stepIcons = [
    <UserPlus key="1" className="w-4 h-4" />,
    <Globe key="2" className="w-4 h-4" />,
    <Target key="3" className="w-4 h-4" />,
    <Palette key="4" className="w-4 h-4" />,
    <Layout key="5" className="w-4 h-4" />,
    <Sparkles key="6" className="w-4 h-4" />,
  ];

  const stepLabels = isFr
    ? ["Identité", "Activité", "Objectif", "Design", "Pages", "Finalisation"]
    : ["Identity", "Business", "Goal", "Design", "Pages", "Finalize"];

  // ─── Render Steps ──────────────────────────────────────────────────────────────
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">
              {isFr ? "Vos coordonnées" : "Your contact info"}
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {isFr ? "Pour que nous puissions vous recontacter." : "So we can get back to you."}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-white/80">{isFr ? "Prénom" : "First name"} *</label>
                <Input
                  placeholder={isFr ? "Jean" : "John"}
                  value={data.firstName}
                  onChange={(e) => { setData({ ...data, firstName: e.target.value }); setErrors((p) => ({ ...p, firstName: "" })); }}
                  className={`bg-white/5 border-white/10 text-white ${errors.firstName ? "border-red-400" : ""}`}
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-white/80">{isFr ? "Nom" : "Last name"} *</label>
                <Input
                  placeholder={isFr ? "Dupont" : "Doe"}
                  value={data.lastName}
                  onChange={(e) => { setData({ ...data, lastName: e.target.value }); setErrors((p) => ({ ...p, lastName: "" })); }}
                  className={`bg-white/5 border-white/10 text-white ${errors.lastName ? "border-red-400" : ""}`}
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-white/80">Email *</label>
              <Input
                type="email"
                placeholder="jean@exemple.com"
                value={data.email}
                onChange={(e) => { setData({ ...data, email: e.target.value }); setErrors((p) => ({ ...p, email: "" })); }}
                className={`bg-white/5 border-white/10 text-white ${errors.email ? "border-red-400" : ""}`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-white/80">{isFr ? "Téléphone" : "Phone"} *</label>
              <Input
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={data.phone}
                onChange={(e) => { setData({ ...data, phone: e.target.value }); setErrors((p) => ({ ...p, phone: "" })); }}
                className={`bg-white/5 border-white/10 text-white ${errors.phone ? "border-red-400" : ""}`}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">
              {isFr ? "Votre activité" : "Your business"}
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {isFr ? "Décrivez votre entreprise ou projet." : "Describe your business or project."}
            </p>
            <div>
              <label className="text-sm font-medium mb-1 block text-white/80">
                {isFr ? "Nom de l'entreprise / projet" : "Business / project name"} *
              </label>
              <Input
                placeholder={isFr ? "Mon Entreprise" : "My Business"}
                value={data.businessName}
                onChange={(e) => { setData({ ...data, businessName: e.target.value }); setErrors((p) => ({ ...p, businessName: "" })); }}
                className={`bg-white/5 border-white/10 text-white ${errors.businessName ? "border-red-400" : ""}`}
              />
              {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-white/80">
                {isFr ? "Secteur d'activité" : "Industry"} *
              </label>
              <Select value={data.businessType} onValueChange={(v) => { setData({ ...data, businessType: v }); setErrors((p) => ({ ...p, businessType: "" })); }}>
                <SelectTrigger className={`bg-white/5 border-white/10 text-white ${errors.businessType ? "border-red-400" : ""}`}>
                  <SelectValue placeholder={isFr ? "Choisir..." : "Select..."} />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="ecommerce">{isFr ? "E-commerce / Boutique" : "E-commerce / Shop"}</SelectItem>
                  <SelectItem value="restaurant">{isFr ? "Restaurant / Food" : "Restaurant / Food"}</SelectItem>
                  <SelectItem value="immobilier">{isFr ? "Immobilier" : "Real Estate"}</SelectItem>
                  <SelectItem value="sante">{isFr ? "Santé / Bien-être" : "Health / Wellness"}</SelectItem>
                  <SelectItem value="tech">{isFr ? "Tech / SaaS" : "Tech / SaaS"}</SelectItem>
                  <SelectItem value="mode">{isFr ? "Mode / Beauté" : "Fashion / Beauty"}</SelectItem>
                  <SelectItem value="education">{isFr ? "Éducation / Formation" : "Education / Training"}</SelectItem>
                  <SelectItem value="artisan">{isFr ? "Artisan / Services" : "Craftsman / Services"}</SelectItem>
                  <SelectItem value="agence">{isFr ? "Agence / Consulting" : "Agency / Consulting"}</SelectItem>
                  <SelectItem value="crypto">{isFr ? "Crypto / Web3" : "Crypto / Web3"}</SelectItem>
                  <SelectItem value="autre">{isFr ? "Autre" : "Other"}</SelectItem>
                </SelectContent>
              </Select>
              {errors.businessType && <p className="text-red-400 text-xs mt-1">{errors.businessType}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-white/80">
                {isFr ? "Décrivez votre activité en quelques phrases" : "Describe your business in a few sentences"} *
              </label>
              <Textarea
                placeholder={isFr ? "Ex: Je vends des bijoux artisanaux faits main, principalement à des femmes de 25-45 ans..." : "Ex: I sell handmade artisan jewelry, mainly to women aged 25-45..."}
                value={data.businessDescription}
                onChange={(e) => { setData({ ...data, businessDescription: e.target.value }); setErrors((p) => ({ ...p, businessDescription: "" })); }}
                className={`bg-white/5 border-white/10 text-white min-h-[100px] ${errors.businessDescription ? "border-red-400" : ""}`}
              />
              {errors.businessDescription && <p className="text-red-400 text-xs mt-1">{errors.businessDescription}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">
              {isFr ? "L'objectif de votre site" : "Your website goal"}
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {isFr ? "Que doit accomplir votre site ?" : "What should your website achieve?"}
            </p>
            <div>
              <label className="text-sm font-medium mb-1 block text-white/80">
                {isFr ? "Objectif principal" : "Main goal"} *
              </label>
              <Select value={data.websiteGoal} onValueChange={(v) => { setData({ ...data, websiteGoal: v }); setErrors((p) => ({ ...p, websiteGoal: "" })); }}>
                <SelectTrigger className={`bg-white/5 border-white/10 text-white ${errors.websiteGoal ? "border-red-400" : ""}`}>
                  <SelectValue placeholder={isFr ? "Choisir..." : "Select..."} />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="vendre">{isFr ? "Vendre des produits / services en ligne" : "Sell products / services online"}</SelectItem>
                  <SelectItem value="presenter">{isFr ? "Présenter mon activité (vitrine)" : "Showcase my business"}</SelectItem>
                  <SelectItem value="generer_leads">{isFr ? "Générer des demandes de contact" : "Generate leads / inquiries"}</SelectItem>
                  <SelectItem value="reservation">{isFr ? "Permettre des réservations / RDV" : "Enable bookings / appointments"}</SelectItem>
                  <SelectItem value="portfolio">{isFr ? "Montrer mes réalisations (portfolio)" : "Show my work (portfolio)"}</SelectItem>
                  <SelectItem value="blog">{isFr ? "Partager du contenu (blog / média)" : "Share content (blog / media)"}</SelectItem>
                  <SelectItem value="communaute">{isFr ? "Créer une communauté" : "Build a community"}</SelectItem>
                  <SelectItem value="autre">{isFr ? "Autre" : "Other"}</SelectItem>
                </SelectContent>
              </Select>
              {errors.websiteGoal && <p className="text-red-400 text-xs mt-1">{errors.websiteGoal}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-white/80">
                {isFr ? "Qui est votre client idéal / audience cible ?" : "Who is your ideal customer / target audience?"} *
              </label>
              <Textarea
                placeholder={isFr ? "Ex: Entrepreneurs de 30-50 ans qui cherchent un site professionnel rapidement..." : "Ex: Entrepreneurs aged 30-50 looking for a professional website quickly..."}
                value={data.targetAudience}
                onChange={(e) => { setData({ ...data, targetAudience: e.target.value }); setErrors((p) => ({ ...p, targetAudience: "" })); }}
                className={`bg-white/5 border-white/10 text-white min-h-[80px] ${errors.targetAudience ? "border-red-400" : ""}`}
              />
              {errors.targetAudience && <p className="text-red-400 text-xs mt-1">{errors.targetAudience}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">
              {isFr ? "Style & Design" : "Style & Design"}
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {isFr ? "Quel look voulez-vous pour votre site ?" : "What look do you want for your site?"}
            </p>
            <div>
              <label className="text-sm font-medium mb-1 block text-white/80">
                {isFr ? "Style visuel souhaité" : "Desired visual style"} *
              </label>
              <Select value={data.designStyle} onValueChange={(v) => { setData({ ...data, designStyle: v }); setErrors((p) => ({ ...p, designStyle: "" })); }}>
                <SelectTrigger className={`bg-white/5 border-white/10 text-white ${errors.designStyle ? "border-red-400" : ""}`}>
                  <SelectValue placeholder={isFr ? "Choisir..." : "Select..."} />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="moderne_minimaliste">{isFr ? "Moderne & Minimaliste" : "Modern & Minimalist"}</SelectItem>
                  <SelectItem value="bold_colore">{isFr ? "Bold & Coloré" : "Bold & Colorful"}</SelectItem>
                  <SelectItem value="elegant_luxe">{isFr ? "Élégant & Luxe" : "Elegant & Luxury"}</SelectItem>
                  <SelectItem value="fun_creatif">{isFr ? "Fun & Créatif" : "Fun & Creative"}</SelectItem>
                  <SelectItem value="corporate_pro">{isFr ? "Corporate & Professionnel" : "Corporate & Professional"}</SelectItem>
                  <SelectItem value="dark_tech">{isFr ? "Dark & Tech" : "Dark & Tech"}</SelectItem>
                  <SelectItem value="nature_organique">{isFr ? "Nature & Organique" : "Nature & Organic"}</SelectItem>
                  <SelectItem value="pas_sure">{isFr ? "Je ne sais pas encore" : "Not sure yet"}</SelectItem>
                </SelectContent>
              </Select>
              {errors.designStyle && <p className="text-red-400 text-xs mt-1">{errors.designStyle}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-white/80">
                {isFr ? "Couleurs préférées" : "Preferred colors"} <span className="text-white/40">({isFr ? "optionnel" : "optional"})</span>
              </label>
              <Input
                placeholder={isFr ? "Ex: Bleu marine, or, blanc" : "Ex: Navy blue, gold, white"}
                value={data.colorPreference}
                onChange={(e) => setData({ ...data, colorPreference: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-white/80">
                {isFr ? "Sites web que vous aimez (références)" : "Websites you like (references)"} <span className="text-white/40">({isFr ? "optionnel" : "optional"})</span>
              </label>
              <Textarea
                placeholder={isFr ? "Ex: apple.com, stripe.com, notion.so..." : "Ex: apple.com, stripe.com, notion.so..."}
                value={data.referenceWebsites}
                onChange={(e) => setData({ ...data, referenceWebsites: e.target.value })}
                className="bg-white/5 border-white/10 text-white min-h-[70px]"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">
              {isFr ? "Pages & Contenu" : "Pages & Content"}
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {isFr ? "Quelles pages souhaitez-vous sur votre site ?" : "Which pages do you want on your site?"}
            </p>
            <div>
              <label className="text-sm font-medium mb-2 block text-white/80">
                {isFr ? "Pages souhaitées" : "Desired pages"} * <span className="text-white/40">({isFr ? "cliquez pour sélectionner" : "click to select"})</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PAGE_OPTIONS.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => togglePage(page.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                      data.pagesNeeded.includes(page.id)
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {isFr ? page.label : page.labelEn}
                  </button>
                ))}
              </div>
              {errors.pagesNeeded && <p className="text-red-400 text-xs mt-1">{errors.pagesNeeded}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-white/80">
                  {isFr ? "Avez-vous un logo ?" : "Do you have a logo?"}
                </label>
                <Select value={data.hasLogo} onValueChange={(v) => setData({ ...data, hasLogo: v })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder={isFr ? "Choisir..." : "Select..."} />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="oui">{isFr ? "Oui, j'en ai un" : "Yes, I have one"}</SelectItem>
                    <SelectItem value="non">{isFr ? "Non, j'en ai besoin" : "No, I need one"}</SelectItem>
                    <SelectItem value="refaire">{isFr ? "Oui, mais à refaire" : "Yes, but needs redesign"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-white/80">
                  {isFr ? "Contenu (textes, images) prêt ?" : "Content (texts, images) ready?"}
                </label>
                <Select value={data.hasContent} onValueChange={(v) => setData({ ...data, hasContent: v })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder={isFr ? "Choisir..." : "Select..."} />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="oui">{isFr ? "Oui, tout est prêt" : "Yes, everything is ready"}</SelectItem>
                    <SelectItem value="partiel">{isFr ? "Partiellement" : "Partially"}</SelectItem>
                    <SelectItem value="non">{isFr ? "Non, j'ai besoin d'aide" : "No, I need help"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">
              {isFr ? "Finalisation" : "Finalize"}
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {isFr ? "Dernières infos pour lancer votre projet !" : "Last details to launch your project!"}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-white/80">{isFr ? "Budget" : "Budget"} *</label>
                <Select value={data.budget} onValueChange={(v) => { setData({ ...data, budget: v }); setErrors((p) => ({ ...p, budget: "" })); }}>
                  <SelectTrigger className={`bg-white/5 border-white/10 text-white ${errors.budget ? "border-red-400" : ""}`}>
                    <SelectValue placeholder={isFr ? "Choisir..." : "Select..."} />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="starter">Starter (500-1000€)</SelectItem>
                    <SelectItem value="business">Business (1000-3000€)</SelectItem>
                    <SelectItem value="premium">Premium (3000€+)</SelectItem>
                    <SelectItem value="unsure">{isFr ? "Pas encore défini" : "Not defined yet"}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-white/80">{isFr ? "Délai souhaité" : "Desired timeline"} *</label>
                <Select value={data.timeline} onValueChange={(v) => { setData({ ...data, timeline: v }); setErrors((p) => ({ ...p, timeline: "" })); }}>
                  <SelectTrigger className={`bg-white/5 border-white/10 text-white ${errors.timeline ? "border-red-400" : ""}`}>
                    <SelectValue placeholder={isFr ? "Choisir..." : "Select..."} />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="asap">{isFr ? "Le plus vite possible" : "ASAP"}</SelectItem>
                    <SelectItem value="1week">{isFr ? "Sous 1 semaine" : "Within 1 week"}</SelectItem>
                    <SelectItem value="2weeks">{isFr ? "Sous 2 semaines" : "Within 2 weeks"}</SelectItem>
                    <SelectItem value="flexible">{isFr ? "Flexible / Pas pressé" : "Flexible / No rush"}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.timeline && <p className="text-red-400 text-xs mt-1">{errors.timeline}</p>}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-white/80">
                {isFr ? "Notes ou demandes spéciales" : "Additional notes or special requests"} <span className="text-white/40">({isFr ? "optionnel" : "optional"})</span>
              </label>
              <Textarea
                placeholder={isFr ? "Ex: J'aimerais un chatbot, une intégration avec mon CRM, des animations..." : "Ex: I'd like a chatbot, CRM integration, animations..."}
                value={data.additionalNotes}
                onChange={(e) => setData({ ...data, additionalNotes: e.target.value })}
                className="bg-white/5 border-white/10 text-white min-h-[80px]"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ─── Success Screen ────────────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[400px] text-center p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-10 h-10 text-primary" />
        </motion.div>
        <h3 className="font-bebas text-2xl text-white mb-2">
          {isFr ? "Demande envoyée avec succès !" : "Request sent successfully!"}
        </h3>
        <p className="text-white/60 mb-6 font-heebo max-w-md">
          {isFr
            ? "Merci ! Nous avons bien reçu votre brief. Notre équipe va l'analyser et vous recontacter sous 24h avec une proposition."
            : "Thank you! We received your brief. Our team will analyze it and get back to you within 24h with a proposal."}
        </p>
        <div className="w-full max-w-sm border-t border-white/10 pt-6">
          <p className="text-sm text-white/60 mb-4 font-heebo">
            {isFr ? "Créez un compte pour suivre votre projet :" : "Create an account to track your project:"}
          </p>
          <Button
            onClick={() => navigate("/auth", { state: { firstName: data.firstName, lastName: data.lastName, phone: data.phone } })}
            className="w-full"
            variant="outline"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {isFr ? "Créer mon compte" : "Create my account"}
          </Button>
        </div>
      </motion.div>
    );
  }

  // ─── Main Render ───────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i + 1 <= step
                    ? "bg-primary text-white"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {i + 1 <= step ? stepIcons[i] : i + 1}
              </div>
              <span className={`text-[10px] mt-1 hidden sm:block ${i + 1 <= step ? "text-primary" : "text-white/40"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5">
          <motion.div
            className="bg-primary h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
        <Button
          type="button"
          variant="ghost"
          onClick={prevStep}
          disabled={step === 1}
          className="text-white/60 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {isFr ? "Retour" : "Back"}
        </Button>

        {step < TOTAL_STEPS ? (
          <Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary/90">
            {isFr ? "Suivant" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isFr ? "Envoi..." : "Sending..."}
              </>
            ) : (
              <>
                {isFr ? "Envoyer mon brief" : "Send my brief"}
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BriefWizard;
