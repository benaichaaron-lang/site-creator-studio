import React from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Play, 
  RefreshCw, 
  CheckCircle, 
  Clock,
  Truck
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface OrderTimelineProps {
  currentStatus: string;
  progress: number;
  className?: string;
  compact?: boolean;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ 
  currentStatus, 
  progress, 
  className,
  compact = false 
}) => {
  const { t } = useLanguage();

  const steps = [
    { 
      id: 'pending', 
      label: t("orderTimeline.steps.payment"),
      icon: CreditCard,
      description: t("orderTimeline.steps.paymentDesc")
    },
    { 
      id: 'in_progress', 
      label: t("orderTimeline.steps.inProgress"),
      icon: Play,
      description: t("orderTimeline.steps.inProgressDesc")
    },
    { 
      id: 'review', 
      label: t("orderTimeline.steps.review"),
      icon: RefreshCw,
      description: t("orderTimeline.steps.reviewDesc")
    },
    { 
      id: 'completed', 
      label: t("orderTimeline.steps.delivery"),
      icon: Truck,
      description: t("orderTimeline.steps.deliveryDesc")
    },
  ];

  const getStepIndex = (status: string) => {
    const index = steps.findIndex(s => s.id === status);
    return index >= 0 ? index : 0;
  };

  const currentIndex = getStepIndex(currentStatus);

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  if (compact) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                  status === 'completed' && "bg-primary text-primary-foreground",
                  status === 'current' && "bg-primary/20 text-primary border-2 border-primary",
                  status === 'upcoming' && "bg-muted text-muted-foreground"
                )}
              >
                {status === 'completed' ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <step.icon className="h-3 w-3" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "w-4 h-0.5",
                    status === 'completed' ? "bg-primary" : "bg-muted"
                  )} 
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const StepIcon = step.icon;
          
          return (
            <React.Fragment key={step.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <div
                  className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300",
                    status === 'completed' && "bg-primary text-primary-foreground shadow-lg",
                    status === 'current' && "bg-primary/20 text-primary border-2 border-primary animate-pulse",
                    status === 'upcoming' && "bg-muted text-muted-foreground"
                  )}
                >
                  {status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6" />
                  ) : (
                    <StepIcon className="h-5 w-5 md:h-6 md:w-6" />
                  )}
                </div>
                <div className="text-center">
                  <p className={cn(
                    "text-xs md:text-sm font-medium",
                    status === 'current' && "text-primary",
                    status === 'upcoming' && "text-muted-foreground"
                  )}>
                    {step.label}
                  </p>
                  <p className="text-[10px] md:text-xs text-muted-foreground hidden md:block">
                    {step.description}
                  </p>
                </div>
              </motion.div>
              {index < steps.length - 1 && (
                <div className="flex-shrink-0 w-8 md:w-16 h-0.5 relative -mt-8 md:-mt-10">
                  <div className="absolute inset-0 bg-muted rounded-full" />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ 
                      width: status === 'completed' ? '100%' : '0%' 
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="absolute inset-y-0 left-0 bg-primary rounded-full"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Progress indicator */}
      <div className="pt-2">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>{t("orderTimeline.overallProgress")}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
