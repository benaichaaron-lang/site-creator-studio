import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Award, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

interface Pack {
  id: string;
  name: string;
  price: number;
  currency: string;
  is_active: boolean;
}

interface Order {
  id: string;
  pack_id: string | null;
  total_amount: number;
  status: string;
  created_at: string;
}

interface PackPerformanceCardProps {
  packs: Pack[];
  orders: Order[];
}

const PackPerformanceCard: React.FC<PackPerformanceCardProps> = ({ packs, orders }) => {
  const { t, language } = useLanguage();

  // Calculate performance for each pack
  const packPerformance = packs.map(pack => {
    const packOrders = orders.filter(o => o.pack_id === pack.id);
    const revenue = packOrders.reduce((sum, o) => sum + o.total_amount, 0);
    const salesCount = packOrders.length;
    
    return {
      ...pack,
      salesCount,
      revenue,
    };
  });

  // Sort by revenue to find best/worst performers
  const sortedByRevenue = [...packPerformance].sort((a, b) => b.revenue - a.revenue);
  const bestSellerId = sortedByRevenue[0]?.id;
  const totalRevenue = sortedByRevenue.reduce((sum, p) => sum + p.revenue, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          {t('packPerformance.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {packPerformance.map((pack, index) => {
            const revenuePercent = totalRevenue > 0 
              ? Math.round((pack.revenue / totalRevenue) * 100) 
              : 0;
            const isBestSeller = pack.id === bestSellerId && pack.salesCount > 0;
            const isLowPerformance = pack.salesCount === 0 && pack.is_active;

            return (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-muted/50 rounded-lg space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{pack.name}</span>
                    {isBestSeller && (
                      <Badge variant="default" className="gap-1 bg-amber-500 hover:bg-amber-600">
                        <Award className="h-3 w-3" />
                        {t('packPerformance.bestSeller')}
                      </Badge>
                    )}
                    {isLowPerformance && (
                      <Badge variant="outline" className="gap-1 text-amber-500 border-amber-500/50">
                        <AlertTriangle className="h-3 w-3" />
                        {t('packPerformance.lowPerformance')}
                      </Badge>
                    )}
                    {!pack.is_active && (
                      <Badge variant="secondary">
                        {t('packPerformance.inactive')}
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(pack.price)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-semibold">{pack.salesCount}</span>
                      <span className="text-muted-foreground ml-1">{t('packPerformance.sales')}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-semibold">{formatCurrency(pack.revenue)}</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{t('packPerformance.revenueShare')}</span>
                    <span className="font-medium">{revenuePercent}%</span>
                  </div>
                  <Progress value={revenuePercent} className="h-1.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PackPerformanceCard;
