import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  DollarSign,
  CreditCard,
  ShoppingCart,
  MessageSquare,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface Order {
  id: string;
  status: string;
  total_amount: number;
  currency: string;
  created_at: string;
}

interface Ticket {
  id: string;
  status: string;
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  payment_status: string;
  created_at: string;
}

interface AdminKPICardsProps {
  orders: Order[];
  tickets: Ticket[];
  payments?: Payment[];
}

const AdminKPICards: React.FC<AdminKPICardsProps> = ({ orders, tickets, payments = [] }) => {
  const { t, language } = useLanguage();

  // Calculate KPIs
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const ordersToday = orders.filter(o => new Date(o.created_at) >= today);
  const ordersThisMonth = orders.filter(o => new Date(o.created_at) >= thisMonth);
  
  const revenueToday = ordersToday.reduce((sum, o) => sum + o.total_amount, 0);
  const revenueMonth = ordersThisMonth.reduce((sum, o) => sum + o.total_amount, 0);
  const revenueTotal = orders.reduce((sum, o) => sum + o.total_amount, 0);

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const inProgressOrders = orders.filter(o => o.status === 'in_progress');
  const completedOrders = orders.filter(o => o.status === 'completed');
  
  const openTickets = tickets.filter(t => t.status === 'open');
  const pendingPayments = payments.filter(p => p.payment_status === 'pending' || p.payment_status === 'confirming');
  const pendingPaymentsAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  // Alerts
  const hasAlerts = pendingOrders.length > 0 || openTickets.length > 3 || pendingPayments.length > 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const kpiCards = [
    {
      title: t("adminKPI.revenueToday"),
      value: formatCurrency(revenueToday),
      icon: DollarSign,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      subValue: `${ordersToday.length} ${t("adminKPI.orders")}`
    },
    {
      title: t("adminKPI.revenueMonth"),
      value: formatCurrency(revenueMonth),
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
      subValue: `${ordersThisMonth.length} ${t("adminKPI.orders")}`
    },
    {
      title: t("adminKPI.ordersInProgress"),
      value: inProgressOrders.length.toString(),
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      subValue: `${completedOrders.length} ${t("adminKPI.completed")}`
    },
    {
      title: t("adminKPI.openTickets"),
      value: openTickets.length.toString(),
      icon: MessageSquare,
      color: openTickets.length > 3 ? "text-destructive" : "text-blue-500",
      bgColor: openTickets.length > 3 ? "bg-destructive/10" : "bg-blue-500/10",
      subValue: t("adminKPI.needsAttention"),
      alert: openTickets.length > 3
    }
  ];

  return (
    <div className="space-y-6">
      {/* Alerts Section */}
      {hasAlerts && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold text-amber-500">{t("adminKPI.alerts.title")}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {pendingOrders.length > 0 && (
              <Badge variant="outline" className="border-amber-500/50 text-amber-500">
                {pendingOrders.length} {t("adminKPI.alerts.pendingOrders")}
              </Badge>
            )}
            {openTickets.length > 0 && (
              <Badge variant="outline" className="border-amber-500/50 text-amber-500">
                {openTickets.length} {t("adminKPI.alerts.openTickets")}
              </Badge>
            )}
            {pendingPayments.length > 0 && (
              <Badge variant="outline" className="border-amber-500/50 text-amber-500">
                {formatCurrency(pendingPaymentsAmount)} {t("adminKPI.alerts.pendingPayments")}
              </Badge>
            )}
          </div>
        </motion.div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={kpi.alert ? "border-destructive/50" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {kpi.title}
                    </p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <p className="text-xs text-muted-foreground">{kpi.subValue}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Total Revenue Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t("adminKPI.totalRevenue")}</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(revenueTotal)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {orders.length} {t("adminKPI.totalOrders")}
              </p>
            </div>
            <div className="p-4 bg-primary/20 rounded-full">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminKPICards;
