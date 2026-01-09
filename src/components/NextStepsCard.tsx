import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Shield, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import OrderTimeline from './OrderTimeline';

interface NextStepsCardProps {
  hasActiveOrder: boolean;
  currentOrder?: {
    status: string;
    progress: number;
    packName?: string;
  };
  onViewPacks: () => void;
  onContactSupport: () => void;
}

const NextStepsCard: React.FC<NextStepsCardProps> = ({
  hasActiveOrder,
  currentOrder,
  onViewPacks,
  onContactSupport
}) => {
  const { t } = useLanguage();

  if (hasActiveOrder && currentOrder) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              {t("nextSteps.activeOrder.title")}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentOrder.packName}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timeline */}
            <OrderTimeline 
              currentStatus={currentOrder.status}
              progress={currentOrder.progress}
            />
            
            {/* Reassurance message */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-sm text-center">
                <Shield className="h-4 w-4 inline mr-2 text-primary" />
                {t("nextSteps.reassurance")}
              </p>
            </div>

            {/* Support CTA */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onContactSupport}
            >
              <Headphones className="mr-2 h-4 w-4" />
              {t("nextSteps.contactAboutOrder")}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-muted via-muted/80 to-muted/60" />
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-muted-foreground" />
            {t("nextSteps.noOrder.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t("nextSteps.noOrder.description")}
          </p>
          
          {/* Workflow steps */}
          <div className="space-y-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  {step}
                </div>
                <span className="text-muted-foreground">
                  {t(`nextSteps.workflow.step${step}`)}
                </span>
              </div>
            ))}
          </div>

          <Button className="w-full mt-4" onClick={onViewPacks}>
            {t("nextSteps.startProject")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NextStepsCard;
