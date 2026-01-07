import { useState } from "react";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSwitcherProps {
  hasScrolled?: boolean;
  isOpen?: boolean;
}

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

const LanguageSwitcher = ({ hasScrolled = false, isOpen = false }: LanguageSwitcherProps) => {
  const [currentLang, setCurrentLang] = useState("en");

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    // For now, this is a visual-only feature
    // Full i18n implementation would require a translation library
  };

  const currentLanguage = languages.find(l => l.code === currentLang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors text-sm font-medium ${
            hasScrolled || isOpen
              ? "text-muted-foreground hover:text-foreground hover:bg-secondary"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage?.flag}</span>
          <span className="text-xs">{currentLang.toUpperCase()}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </span>
            {currentLang === lang.code && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
