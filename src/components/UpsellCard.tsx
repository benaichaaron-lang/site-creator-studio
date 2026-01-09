import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp, Headphones, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface UpsellCardProps {
  type: 'maintenance' | 'seo' | 'priority_support';
  onDismiss?: () => void;
  onAction?: () => void;
}

const UpsellCard: React.FC<UpsellCardProps> = ({ type, onDismiss, onAction }) => {
  const { t } = useLanguage();

  const upsellConfig = {
    maintenance: {
      icon: Shield,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      gradient: 'from-emerald-500/10 to-emerald-500/5',
    },
    seo: {
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      gradient: 'from-blue-500/10 to-blue-500/5',
    },
    priority_support: {
      icon: Headphones,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      gradient: 'from-purple-500/10 to-purple-500/5',
    },
  };

  const config = upsellConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`overflow-hidden border ${config.borderColor} bg-gradient-to-r ${config.gradient}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${config.bgColor} flex-shrink-0`}>
              <Icon className={`h-5 w-5 ${config.color}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-medium text-sm">
                    {t(`upsells.${type}.title`)}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t(`upsells.${type}.description`)}
                  </p>
                </div>
                
                {onDismiss && (
                  <button
                    onClick={onDismiss}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 -mt-1 -mr-1"
                    aria-label="Dismiss"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-3 mt-3">
                <span className="text-sm font-semibold">
                  {t(`upsells.${type}.price`)}
                </span>
                <Button 
                  size="sm" 
                  variant="outline"
                  className={`text-xs h-7 ${config.borderColor}`}
                  onClick={onAction}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {t('upsells.learnMore')}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UpsellCard;
