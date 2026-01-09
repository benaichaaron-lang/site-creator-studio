import React from 'react';
import { MessageSquare, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdminQuickRepliesProps {
  onSelectReply: (message: string) => void;
}

const AdminQuickReplies: React.FC<AdminQuickRepliesProps> = ({ onSelectReply }) => {
  const { t, language } = useLanguage();

  const quickReplies = {
    fr: [
      {
        category: "Accusé de réception",
        replies: [
          "Merci pour votre message ! Nous prenons en charge votre demande et reviendrons vers vous très rapidement.",
          "Bien reçu ! Notre équipe examine votre demande et vous tiendra informé(e) de l'avancement.",
        ],
      },
      {
        category: "Mise à jour projet",
        replies: [
          "Votre projet avance bien ! Nous avons terminé [étape] et passons maintenant à [prochaine étape].",
          "Nous avons bien pris en compte vos retours et les intégrons actuellement au projet.",
          "Bonne nouvelle ! Votre projet est presque terminé. Nous procédons aux dernières vérifications.",
        ],
      },
      {
        category: "Demande d'informations",
        replies: [
          "Pour avancer, nous aurions besoin de quelques informations supplémentaires. Pourriez-vous nous préciser [détail] ?",
          "Afin de mieux répondre à votre demande, pourriez-vous nous fournir [information nécessaire] ?",
        ],
      },
      {
        category: "Résolution",
        replies: [
          "Votre demande a été traitée avec succès ! N'hésitez pas à nous recontacter si vous avez d'autres questions.",
          "Le problème a été résolu. Merci de votre patience et bonne continuation avec votre projet !",
        ],
      },
    ],
    en: [
      {
        category: "Acknowledgment",
        replies: [
          "Thank you for your message! We're handling your request and will get back to you very soon.",
          "Got it! Our team is reviewing your request and will keep you updated on the progress.",
        ],
      },
      {
        category: "Project Update",
        replies: [
          "Your project is progressing well! We've completed [step] and are now moving on to [next step].",
          "We've noted your feedback and are currently integrating it into the project.",
          "Good news! Your project is almost complete. We're doing final checks.",
        ],
      },
      {
        category: "Information Request",
        replies: [
          "To proceed, we need some additional information. Could you please specify [detail]?",
          "To better address your request, could you provide [required information]?",
        ],
      },
      {
        category: "Resolution",
        replies: [
          "Your request has been successfully processed! Feel free to contact us again if you have any questions.",
          "The issue has been resolved. Thank you for your patience and enjoy your project!",
        ],
      },
    ],
  };

  const currentReplies = quickReplies[language] || quickReplies.en;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Zap className="h-4 w-4" />
          {t('adminSupport.quickReplies')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80 max-h-96 overflow-y-auto">
        <DropdownMenuLabel className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          {t('adminSupport.selectTemplate')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currentReplies.map((category, catIndex) => (
          <React.Fragment key={catIndex}>
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              {category.category}
            </DropdownMenuLabel>
            {category.replies.map((reply, replyIndex) => (
              <DropdownMenuItem
                key={replyIndex}
                className="cursor-pointer text-xs whitespace-normal py-2"
                onClick={() => onSelectReply(reply)}
              >
                {reply.length > 80 ? `${reply.substring(0, 80)}...` : reply}
              </DropdownMenuItem>
            ))}
            {catIndex < currentReplies.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminQuickReplies;
