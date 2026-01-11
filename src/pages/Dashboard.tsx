import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  LogOut,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  ChevronRight,
  Menu,
  X,
  Plus,
  Send,
  Loader2,
  Sparkles,
  Shield,
  Headphones,
  Star,
  Zap,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import OrderTimeline from '@/components/OrderTimeline';
import NextStepsCard from '@/components/NextStepsCard';
import EmptyState from '@/components/EmptyState';
import UpsellCard from '@/components/UpsellCard';
import { BitcoinIcon, EthereumIcon, USDCIcon } from '@/components/CryptoBadge';

type TabType = 'overview' | 'orders' | 'packs' | 'tickets';

interface Order {
  id: string;
  status: string;
  progress: number;
  total_amount: number;
  currency: string;
  created_at: string;
  notes: string | null;
  pack: { name: string } | null;
}

interface Pack {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  pack_type: string;
  duration_months: number | null;
  features: string[];
}

interface Ticket {
  id: string;
  subject: string;
  status: string;
  created_at: string;
  order_id: string | null;
}

interface TicketMessage {
  id: string;
  message: string;
  is_admin: boolean;
  created_at: string;
}

interface Profile {
  first_name: string | null;
  last_name: string | null;
  email: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketMessages, setTicketMessages] = useState<TicketMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [creatingTicket, setCreatingTicket] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (isAdmin) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [user, isAdmin, navigate]);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('first_name, last_name, email')
        .eq('user_id', user.id)
        .single();
      setProfile(profileData);

      // Fetch orders with pack info
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*, pack:packs(name)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setOrders(ordersData || []);

      // Fetch packs
      const { data: packsData } = await supabase
        .from('packs')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });
      setPacks((packsData || []).map(pack => ({
        ...pack,
        features: Array.isArray(pack.features) ? pack.features : JSON.parse(pack.features as string || '[]')
      })));

      // Fetch tickets
      const { data: ticketsData } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setTickets(ticketsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTicketMessages = async (ticketId: string) => {
    const { data } = await supabase
      .from('ticket_messages')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });
    setTicketMessages(data || []);
  };

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    fetchTicketMessages(ticket.id);
  };

  const handleSendMessage = async () => {
    if (!selectedTicket || !newMessage.trim() || !user) return;
    
    setSendingMessage(true);
    try {
      const { error } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: selectedTicket.id,
          sender_id: user.id,
          message: newMessage.trim(),
          is_admin: false
        });

      if (error) throw error;
      
      setNewMessage('');
      fetchTicketMessages(selectedTicket.id);
    } catch (error) {
      toast({
        title: t("dashboard.toasts.error"),
        description: t("dashboard.toasts.cantSend"),
        variant: "destructive"
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const handleCreateTicket = async () => {
    if (!newTicketSubject.trim() || !newTicketMessage.trim() || !user) return;
    
    setCreatingTicket(true);
    try {
      // Create ticket
      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          user_id: user.id,
          subject: newTicketSubject.trim(),
          status: 'open'
        })
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Create first message
      const { error: messageError } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: ticketData.id,
          sender_id: user.id,
          message: newTicketMessage.trim(),
          is_admin: false
        });

      if (messageError) throw messageError;

      toast({
        title: t("dashboard.toasts.ticketCreated"),
        description: t("dashboard.toasts.ticketSent")
      });

      setNewTicketSubject('');
      setNewTicketMessage('');
      setTicketDialogOpen(false);
      fetchData();
    } catch (error) {
      toast({
        title: t("dashboard.toasts.error"),
        description: t("dashboard.toasts.cantCreate"),
        variant: "destructive"
      });
    } finally {
      setCreatingTicket(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: t("dashboard.status.pending"), variant: 'secondary' },
      in_progress: { label: t("dashboard.status.in_progress"), variant: 'default' },
      review: { label: t("dashboard.status.review"), variant: 'outline' },
      completed: { label: t("dashboard.status.completed"), variant: 'default' },
      cancelled: { label: t("dashboard.status.cancelled"), variant: 'destructive' },
      open: { label: t("dashboard.status.open"), variant: 'default' },
      resolved: { label: t("dashboard.status.resolved"), variant: 'secondary' },
      closed: { label: t("dashboard.status.closed"), variant: 'outline' }
    };
    const config = statusConfig[status] || { label: status, variant: 'secondary' as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const menuItems = [
    { id: 'overview' as TabType, label: t("dashboard.menu.overview"), icon: LayoutDashboard },
    { id: 'orders' as TabType, label: t("dashboard.menu.orders"), icon: ShoppingCart },
    { id: 'packs' as TabType, label: t("dashboard.menu.packs"), icon: Package },
    { id: 'tickets' as TabType, label: t("dashboard.menu.tickets"), icon: MessageSquare },
  ];

  const handleNavigateToProfile = () => {
    navigate('/profile');
  };

  const dateLocale = language === 'fr' ? 'fr-FR' : 'en-US';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("dashboardUX.welcome.morning");
    if (hour < 18) return t("dashboardUX.welcome.afternoon");
    return t("dashboardUX.welcome.evening");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-card border-r border-border
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-bold text-foreground">{t("dashboard.mySpace")}</h1>
            {profile && (
              <button 
                onClick={handleNavigateToProfile}
                className="text-sm text-muted-foreground mt-1 hover:text-primary transition-colors flex items-center gap-1"
              >
                <User className="h-3 w-3" />
                {profile.first_name} {profile.last_name}
              </button>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors text-left
                  ${activeTab === item.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
                `}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border space-y-2">
            <button
              onClick={handleNavigateToProfile}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <User className="h-5 w-5" />
              {t("dashboard.menu.profile") || "Profil"}
            </button>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="h-5 w-5" />
              {t("dashboard.signOut")}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Welcome Section with Dynamic Greeting */}
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">
                {getGreeting()}, {profile?.first_name || t("dashboard.client")} !
              </h2>
              <p className="text-muted-foreground">
                {t("dashboardUX.reassurance")}
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <ShoppingCart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("dashboard.stats.orders")}</p>
                      <p className="text-2xl font-bold">{orders.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("dashboard.stats.completed")}</p>
                      <p className="text-2xl font-bold">
                        {orders.filter(o => o.status === 'completed').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("dashboard.stats.tickets")}</p>
                      <p className="text-2xl font-bold">
                        {tickets.filter(t => t.status === 'open').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Steps Card */}
            <NextStepsCard
              hasActiveOrder={orders.length > 0 && orders[0].status !== 'completed'}
              currentOrder={orders.length > 0 && orders[0].status !== 'completed' ? {
                status: orders[0].status,
                progress: orders[0].progress,
                packName: orders[0].pack?.name || 'Pack'
              } : undefined}
              onViewPacks={() => setActiveTab('packs')}
              onContactSupport={() => {
                setActiveTab('tickets');
                setTicketDialogOpen(true);
              }}
            />

            {/* Recent Order with Enhanced Timeline */}
            {orders.length > 0 && orders[0].status !== 'completed' && (
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      {t("dashboard.currentOrder")}
                    </CardTitle>
                    {getStatusBadge(orders[0].status)}
                  </div>
                  <CardDescription>
                    {orders[0].pack?.name || 'Pack'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <OrderTimeline 
                    currentStatus={orders[0].status}
                    progress={orders[0].progress}
                  />
                  
                  {orders[0].notes && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">{orders[0].notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Contextual Upsell - Show maintenance after completed order */}
            {orders.some(o => o.status === 'completed') && (
              <UpsellCard
                type="maintenance"
                onAction={() => window.open('mailto:contact@mysitefactory.com?subject=Pack%20Maintenance', '_blank')}
              />
            )}

            {/* Reassurance Banner */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{t("emptyStates.support.avgResponse")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("emptyStates.support.prioritySupport")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">{t("dashboard.myOrders")}</h2>
            
            {orders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">{t("dashboard.noOrders")}</p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setActiveTab('packs')}
                  >
                    {t("dashboard.discoverPacks")}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{order.pack?.name || t("dashboard.stats.orders")}</h3>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString(dateLocale)}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold">{order.total_amount} {order.currency}</p>
                            <p className="text-sm text-muted-foreground">{t("dashboard.progression")}: {order.progress}%</p>
                          </div>
                          <Progress value={order.progress} className="w-24 h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'packs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">{t("dashboard.ourPacks")}</h2>
            
            {/* Crypto Payment Banner */}
            <Card className="bg-gradient-to-r from-amber-500/10 via-primary/10 to-blue-500/10 border-amber-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Wallet className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{t("dashboard.cryptoPayment.title")}</p>
                      <p className="text-xs text-muted-foreground">{t("dashboard.cryptoPayment.subtitle")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BitcoinIcon className="w-5 h-5" />
                    <EthereumIcon className="w-5 h-5" />
                    <USDCIcon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packs.map((pack) => (
                <Card key={pack.id} className="card-hover relative overflow-hidden">
                  {/* Crypto Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-amber-500/10 border-amber-500/30 text-amber-500 text-xs">
                      <BitcoinIcon className="w-3 h-3 mr-1" />
                      Crypto OK
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant={pack.pack_type === 'subscription' ? 'default' : 'secondary'}>
                        {pack.pack_type === 'subscription' ? t("dashboard.packType.subscription") : t("dashboard.packType.oneTime")}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{pack.name}</CardTitle>
                    <CardDescription>{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{pack.price}</span>
                      <span className="text-muted-foreground"> {pack.currency}</span>
                      {pack.pack_type === 'subscription' && pack.duration_months && (
                        <span className="text-muted-foreground">
                          /{pack.duration_months === 1 ? t("dashboard.perMonth") : `${pack.duration_months} ${t("dashboard.perMonths")}`}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {pack.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        onClick={() => navigate(`/checkout/${pack.id}`)}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        {t("dashboard.subscribe")}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                        <BitcoinIcon className="w-3 h-3" />
                        <EthereumIcon className="w-3 h-3" />
                        {t("dashboard.cryptoPayment.orCrypto")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'tickets' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{t("dashboard.support")}</h2>
              <Dialog open={ticketDialogOpen} onOpenChange={setTicketDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    {t("dashboard.newTicket")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("dashboard.createTicket")}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium">{t("dashboard.ticketSubject")}</label>
                      <Input
                        value={newTicketSubject}
                        onChange={(e) => setNewTicketSubject(e.target.value)}
                        placeholder={t("dashboard.selectTicketPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t("dashboard.ticketMessage")}</label>
                      <Textarea
                        value={newTicketMessage}
                        onChange={(e) => setNewTicketMessage(e.target.value)}
                        placeholder={t("dashboard.detailRequest")}
                        rows={4}
                      />
                    </div>
                    <Button 
                      onClick={handleCreateTicket} 
                      disabled={creatingTicket || !newTicketSubject.trim() || !newTicketMessage.trim()}
                      className="w-full"
                    >
                      {creatingTicket ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        t("dashboard.send")
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tickets list */}
              <Card className="lg:max-h-[600px] overflow-hidden">
                <CardHeader>
                  <CardTitle>{t("dashboard.myTickets")}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y max-h-[500px] overflow-y-auto">
                    {tickets.length === 0 ? (
                      <div className="p-6 text-center text-muted-foreground">
                        {t("dashboard.noTickets")}
                      </div>
                    ) : (
                      tickets.map((ticket) => (
                        <button
                          key={ticket.id}
                          onClick={() => handleSelectTicket(ticket)}
                          className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                            selectedTicket?.id === ticket.id ? 'bg-muted' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">{ticket.subject}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(ticket.status)}
                            <span className="text-xs text-muted-foreground">
                              {new Date(ticket.created_at).toLocaleDateString(dateLocale)}
                            </span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Messages */}
              <Card className="lg:max-h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle>
                    {selectedTicket ? selectedTicket.subject : t("dashboard.selectTicket")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden flex flex-col">
                  {selectedTicket ? (
                    <>
                      <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[350px]">
                        {ticketMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`p-3 rounded-lg ${
                              msg.is_admin 
                                ? 'bg-muted ml-0 mr-8' 
                                : 'bg-primary text-primary-foreground ml-8 mr-0'
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.is_admin ? 'text-muted-foreground' : 'opacity-70'}`}>
                              {new Date(msg.created_at).toLocaleString(dateLocale)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder={t("dashboard.writeMessage")}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button onClick={handleSendMessage} disabled={sendingMessage}>
                          {sendingMessage ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                      {t("dashboard.selectTicket")}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;