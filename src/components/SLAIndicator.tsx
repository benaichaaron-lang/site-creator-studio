import React from 'react';
import { Clock, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface SLAIndicatorProps {
  createdAt: string;
  status: string;
}

const SLAIndicator: React.FC<SLAIndicatorProps> = ({ createdAt, status }) => {
  const { t, language } = useLanguage();

  // Calculate hours since ticket creation
  const created = new Date(createdAt);
  const now = new Date();
  const hoursElapsed = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60));

  // SLA thresholds (in hours)
  const SLA_TARGET = 24; // Target response within 24h
  const SLA_WARNING = 12; // Warning at 12h

  // If ticket is closed/resolved, show completion badge
  if (status === 'closed' || status === 'resolved') {
    return (
      <Badge variant="outline" className="gap-1 text-emerald-500 border-emerald-500/50">
        <CheckCircle className="h-3 w-3" />
        {t('sla.resolved')}
      </Badge>
    );
  }

  // Determine SLA status
  let icon: React.ElementType;
  let colorClass: string;
  let label: string;

  if (hoursElapsed > SLA_TARGET) {
    // Exceeded SLA
    icon = AlertCircle;
    colorClass = "text-destructive border-destructive/50";
    label = t('sla.exceeded');
  } else if (hoursElapsed > SLA_WARNING) {
    // Approaching SLA limit
    icon = AlertTriangle;
    colorClass = "text-amber-500 border-amber-500/50";
    label = t('sla.warning');
  } else {
    // Within SLA
    icon = Clock;
    colorClass = "text-emerald-500 border-emerald-500/50";
    label = t('sla.onTrack');
  }

  const Icon = icon;

  // Format time remaining or elapsed
  const formatTime = () => {
    if (hoursElapsed < 1) {
      const minutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
      return language === 'fr' ? `${minutes}min` : `${minutes}m`;
    }
    if (hoursElapsed < 24) {
      return language === 'fr' ? `${hoursElapsed}h` : `${hoursElapsed}h`;
    }
    const days = Math.floor(hoursElapsed / 24);
    return language === 'fr' ? `${days}j` : `${days}d`;
  };

  return (
    <Badge variant="outline" className={`gap-1 ${colorClass}`}>
      <Icon className="h-3 w-3" />
      <span className="font-normal">{formatTime()}</span>
      <span className="hidden sm:inline">• {label}</span>
    </Badge>
  );
};

export default SLAIndicator;
