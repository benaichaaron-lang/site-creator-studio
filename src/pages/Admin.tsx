import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  LogOut,
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Menu,
  X,
  Save,
  Loader2,
  Send,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type TabType = 'overview' | 'users' | 'orders' | 'packs' | 'tickets';

interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  created_at: string;
}

interface Order {
  id: string;
  user_id: string;
  status: string;
  progress: number;
  total_amount: number;
  currency: string;
  created_at: string;
  notes: string | null;
  pack: { name: string } | null;
  profile?: { first_name: string | null; last_name: string | null; email: string } | null;
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
  is_active: boolean;
}

interface Ticket {
  id: string;
  user_id: string;
  subject: string;
  status: string;
  created_at: string;
  profile?: { first_name: string | null; last_name: string | null; email: string } | null;
}

interface TicketMessage {
  id: string;
  message: string;
  is_admin: boolean;
  created_at: string;
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  payment_status: string;
  created_at: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // User detail view
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [userPayments, setUserPayments] = useState<Payment[]>([]);
  const [userTickets, setUserTickets] = useState<Ticket[]>([]);
  
  // Order editing
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [orderProgress, setOrderProgress] = useState(0);
  const [orderNotes, setOrderNotes] = useState('');
  const [savingOrder, setSavingOrder] = useState(false);
  
  // Pack editing
  const [editingPack, setEditingPack] = useState<Pack | null>(null);
  const [packForm, setPackForm] = useState({
    name: '',
    description: '',
    price: 0,
    pack_type: 'one_time',
    duration_months: 1,
    features: '',
    is_active: true
  });
  const [savingPack, setSavingPack] = useState(false);
  
  // Ticket handling
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketMessages, setTicketMessages] = useState<TicketMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [user, isAdmin, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all profiles
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      setUsers(profilesData || []);

      // Fetch all orders with relationships
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*, pack:packs(name)')
        .order('created_at', { ascending: false });
      setOrders((ordersData || []) as any);

      // Fetch all packs
      const { data: packsData } = await supabase
        .from('packs')
        .select('*')
        .order('created_at', { ascending: false });
      setPacks((packsData || []).map(pack => ({
        ...pack,
        features: Array.isArray(pack.features) ? pack.features : JSON.parse(pack.features as string || '[]')
      })));

      // Fetch all tickets
      const { data: ticketsData } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });
      setTickets((ticketsData || []) as any);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userProfile: UserProfile) => {
    setSelectedUser(userProfile);
    
    // Fetch user's orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*, pack:packs(name)')
      .eq('user_id', userProfile.user_id)
      .order('created_at', { ascending: false });
    setUserOrders((ordersData || []) as any);

    // Fetch user's payments
    const { data: paymentsData } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userProfile.user_id)
      .order('created_at', { ascending: false });
    setUserPayments(paymentsData || []);

    // Fetch user's tickets
    const { data: ticketsData } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', userProfile.user_id)
      .order('created_at', { ascending: false });
    setUserTickets((ticketsData || []) as any);
  };

  const handleUpdateOrder = async () => {
    if (!editingOrder) return;
    
    setSavingOrder(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          status: orderStatus as any,
          progress: orderProgress,
          notes: orderNotes
        })
        .eq('id', editingOrder.id);

      if (error) throw error;

      toast({ title: t("admin.orders.toasts.updated") });
      setEditingOrder(null);
      fetchData();
    } catch (error) {
      toast({ title: t("admin.orders.toasts.error"), description: t("admin.orders.toasts.cantUpdate"), variant: "destructive" });
    } finally {
      setSavingOrder(false);
    }
  };

  const handleSavePack = async () => {
    setSavingPack(true);
    try {
      const packData = {
        name: packForm.name,
        description: packForm.description,
        price: packForm.price,
        pack_type: packForm.pack_type as 'one_time' | 'subscription',
        duration_months: packForm.pack_type === 'subscription' ? packForm.duration_months : null,
        features: packForm.features.split('\n').filter(f => f.trim()),
        is_active: packForm.is_active
      };

      if (editingPack) {
        const { error } = await supabase
          .from('packs')
          .update(packData)
          .eq('id', editingPack.id);
        if (error) throw error;
        toast({ title: t("admin.packs.toasts.updated") });
      } else {
        const { error } = await supabase
          .from('packs')
          .insert(packData);
        if (error) throw error;
        toast({ title: t("admin.packs.toasts.created") });
      }

      setEditingPack(null);
      resetPackForm();
      fetchData();
    } catch (error) {
      toast({ title: t("admin.packs.toasts.error"), description: t("admin.packs.toasts.cantSave"), variant: "destructive" });
    } finally {
      setSavingPack(false);
    }
  };

  const resetPackForm = () => {
    setPackForm({
      name: '',
      description: '',
      price: 0,
      pack_type: 'one_time',
      duration_months: 1,
      features: '',
      is_active: true
    });
  };

  const openPackEditor = (pack?: Pack) => {
    if (pack) {
      setEditingPack(pack);
      setPackForm({
        name: pack.name,
        description: pack.description || '',
        price: pack.price,
        pack_type: pack.pack_type,
        duration_months: pack.duration_months || 1,
        features: pack.features.join('\n'),
        is_active: pack.is_active
      });
    } else {
      setEditingPack(null);
      resetPackForm();
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
          is_admin: true
        });

      if (error) throw error;
      
      setNewMessage('');
      fetchTicketMessages(selectedTicket.id);
    } catch (error) {
      toast({ title: t("admin.tickets.toasts.error"), description: t("admin.tickets.toasts.cantSend"), variant: "destructive" });
    } finally {
      setSendingMessage(false);
    }
  };

  const handleUpdateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ status: status as any })
        .eq('id', ticketId);
      
      if (error) throw error;
      toast({ title: t("admin.tickets.toasts.statusUpdated") });
      fetchData();
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket({ ...selectedTicket, status });
      }
    } catch (error) {
      toast({ title: t("admin.tickets.toasts.error"), variant: "destructive" });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { labelKey: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { labelKey: 'admin.status.pending', variant: 'secondary' },
      in_progress: { labelKey: 'admin.status.in_progress', variant: 'default' },
      review: { labelKey: 'admin.status.review', variant: 'outline' },
      completed: { labelKey: 'admin.status.completed', variant: 'default' },
      cancelled: { labelKey: 'admin.status.cancelled', variant: 'destructive' },
      confirming: { labelKey: 'admin.status.confirming', variant: 'secondary' },
      confirmed: { labelKey: 'admin.status.confirmed', variant: 'default' },
      failed: { labelKey: 'admin.status.failed', variant: 'destructive' },
      open: { labelKey: 'admin.status.open', variant: 'default' },
      resolved: { labelKey: 'admin.status.resolved', variant: 'secondary' },
      closed: { labelKey: 'admin.status.closed', variant: 'outline' }
    };
    const config = statusConfig[status] || { labelKey: status, variant: 'secondary' as const };
    return <Badge variant={config.variant}>{t(config.labelKey)}</Badge>;
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.first_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (u.last_name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const menuItems = [
    { id: 'overview' as TabType, labelKey: 'admin.menu.overview', icon: LayoutDashboard },
    { id: 'users' as TabType, labelKey: 'admin.menu.users', icon: Users },
    { id: 'orders' as TabType, labelKey: 'admin.menu.orders', icon: ShoppingCart },
    { id: 'packs' as TabType, labelKey: 'admin.menu.packs', icon: Package },
    { id: 'tickets' as TabType, labelKey: 'admin.menu.tickets', icon: MessageSquare },
  ];

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
            <h1 className="text-xl font-bold text-foreground">{t("admin.title")}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t("admin.subtitle")}</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                  setSelectedUser(null);
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
                {t(item.labelKey)}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="h-5 w-5" />
              {t("admin.signOut")}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8 overflow-auto">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">{t("admin.menu.overview")}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("admin.stats.users")}</p>
                      <p className="text-2xl font-bold">{users.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <ShoppingCart className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("admin.stats.orders")}</p>
                      <p className="text-2xl font-bold">{orders.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-success/10 rounded-lg">
                      <Package className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("admin.stats.activePacks")}</p>
                      <p className="text-2xl font-bold">{packs.filter(p => p.is_active).length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-destructive/10 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("admin.stats.openTickets")}</p>
                      <p className="text-2xl font-bold">{tickets.filter(t => t.status === 'open').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent orders */}
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.recentOrders")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.table.client")}</TableHead>
                      <TableHead>{t("admin.table.pack")}</TableHead>
                      <TableHead>{t("admin.table.status")}</TableHead>
                      <TableHead>{t("admin.table.amount")}</TableHead>
                      <TableHead>{t("admin.table.date")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.slice(0, 5).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          {order.profile?.first_name} {order.profile?.last_name}
                        </TableCell>
                        <TableCell>{order.pack?.name || '-'}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>{order.total_amount} {order.currency}</TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'users' && !selectedUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{t("admin.users.title")}</h2>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("admin.users.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.table.name")}</TableHead>
                      <TableHead>{t("admin.table.email")}</TableHead>
                      <TableHead>{t("admin.table.phone")}</TableHead>
                      <TableHead>{t("admin.table.registration")}</TableHead>
                      <TableHead>{t("admin.table.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((userProfile) => (
                      <TableRow key={userProfile.id}>
                        <TableCell>{userProfile.first_name} {userProfile.last_name}</TableCell>
                        <TableCell>{userProfile.email}</TableCell>
                        <TableCell>{userProfile.phone || '-'}</TableCell>
                        <TableCell>{new Date(userProfile.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => fetchUserDetails(userProfile)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'users' && selectedUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Button variant="ghost" onClick={() => setSelectedUser(null)}>
              {t("admin.users.backToList")}
            </Button>

            <Card>
              <CardHeader>
                <CardTitle>{selectedUser.first_name} {selectedUser.last_name}</CardTitle>
                <CardDescription>{selectedUser.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("admin.table.phone")}</p>
                    <p className="font-medium">{selectedUser.phone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("admin.table.registration")}</p>
                    <p className="font-medium">{new Date(selectedUser.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.users.orders")} ({userOrders.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {userOrders.length === 0 ? (
                    <p className="text-muted-foreground">{t("admin.users.noOrders")}</p>
                  ) : (
                    <div className="space-y-3">
                      {userOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium">{order.pack?.name || t("admin.stats.orders")}</p>
                            <p className="text-sm text-muted-foreground">{order.total_amount} {order.currency}</p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.users.payments")} ({userPayments.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {userPayments.length === 0 ? (
                    <p className="text-muted-foreground">{t("admin.users.noPayments")}</p>
                  ) : (
                    <div className="space-y-3">
                      {userPayments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium">{payment.amount} {payment.currency}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(payment.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                            </p>
                          </div>
                          {getStatusBadge(payment.payment_status)}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{t("admin.users.tickets")} ({userTickets.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {userTickets.length === 0 ? (
                    <p className="text-muted-foreground">{t("admin.users.noTickets")}</p>
                  ) : (
                    <div className="space-y-3">
                      {userTickets.map((ticket) => (
                        <div key={ticket.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <p className="font-medium">{ticket.subject}</p>
                          {getStatusBadge(ticket.status)}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">{t("admin.orders.title")}</h2>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.table.client")}</TableHead>
                      <TableHead>{t("admin.table.pack")}</TableHead>
                      <TableHead>{t("admin.table.status")}</TableHead>
                      <TableHead>{t("admin.table.progress")}</TableHead>
                      <TableHead>{t("admin.table.amount")}</TableHead>
                      <TableHead>{t("admin.table.date")}</TableHead>
                      <TableHead>{t("admin.table.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.profile?.first_name} {order.profile?.last_name}</TableCell>
                        <TableCell>{order.pack?.name || '-'}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={order.progress} className="w-16 h-2" />
                            <span className="text-sm">{order.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{order.total_amount} {order.currency}</TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingOrder(order);
                                  setOrderStatus(order.status);
                                  setOrderProgress(order.progress);
                                  setOrderNotes(order.notes || '');
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{t("admin.orders.edit")}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                <div>
                                  <label className="text-sm font-medium">{t("admin.orders.status")}</label>
                                  <Select value={orderStatus} onValueChange={setOrderStatus}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">{t("admin.orders.statusOptions.pending")}</SelectItem>
                                      <SelectItem value="in_progress">{t("admin.orders.statusOptions.in_progress")}</SelectItem>
                                      <SelectItem value="review">{t("admin.orders.statusOptions.review")}</SelectItem>
                                      <SelectItem value="completed">{t("admin.orders.statusOptions.completed")}</SelectItem>
                                      <SelectItem value="cancelled">{t("admin.orders.statusOptions.cancelled")}</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">{t("admin.orders.progress")} ({orderProgress}%)</label>
                                  <Input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={orderProgress}
                                    onChange={(e) => setOrderProgress(parseInt(e.target.value))}
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">{t("admin.orders.notes")}</label>
                                  <Textarea
                                    value={orderNotes}
                                    onChange={(e) => setOrderNotes(e.target.value)}
                                    placeholder={t("admin.orders.notesPlaceholder")}
                                    rows={3}
                                  />
                                </div>
                                <Button onClick={handleUpdateOrder} disabled={savingOrder} className="w-full">
                                  {savingOrder ? <Loader2 className="h-4 w-4 animate-spin" /> : t("admin.orders.save")}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'packs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{t("admin.packs.title")}</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => openPackEditor()}>
                    <Plus className="mr-2 h-4 w-4" />
                    {t("admin.packs.newPack")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{editingPack ? t("admin.packs.editPack") : t("admin.packs.newPack")}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium">{t("admin.packs.name")}</label>
                      <Input
                        value={packForm.name}
                        onChange={(e) => setPackForm({ ...packForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t("admin.packs.description")}</label>
                      <Textarea
                        value={packForm.description}
                        onChange={(e) => setPackForm({ ...packForm, description: e.target.value })}
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">{t("admin.packs.price")}</label>
                        <Input
                          type="number"
                          value={packForm.price}
                          onChange={(e) => setPackForm({ ...packForm, price: parseFloat(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">{t("admin.packs.type")}</label>
                        <Select 
                          value={packForm.pack_type} 
                          onValueChange={(v) => setPackForm({ ...packForm, pack_type: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="one_time">{t("admin.packs.typeOptions.one_time")}</SelectItem>
                            <SelectItem value="subscription">{t("admin.packs.typeOptions.subscription")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {packForm.pack_type === 'subscription' && (
                      <div>
                        <label className="text-sm font-medium">{t("admin.packs.duration")}</label>
                        <Input
                          type="number"
                          value={packForm.duration_months}
                          onChange={(e) => setPackForm({ ...packForm, duration_months: parseInt(e.target.value) })}
                        />
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium">{t("admin.packs.features")}</label>
                      <Textarea
                        value={packForm.features}
                        onChange={(e) => setPackForm({ ...packForm, features: e.target.value })}
                        rows={4}
                        placeholder="Design responsive&#10;5 pages&#10;SEO de base"
                      />
                    </div>
                    <Button onClick={handleSavePack} disabled={savingPack} className="w-full">
                      {savingPack ? <Loader2 className="h-4 w-4 animate-spin" /> : t("admin.packs.save")}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packs.map((pack) => (
                <Card key={pack.id} className={!pack.is_active ? 'opacity-50' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant={pack.pack_type === 'subscription' ? 'default' : 'secondary'}>
                        {pack.pack_type === 'subscription' ? t("admin.packs.typeOptions.subscription") : t("admin.packs.typeOptions.one_time")}
                      </Badge>
                      {!pack.is_active && <Badge variant="outline">{t("admin.packs.inactive")}</Badge>}
                    </div>
                    <CardTitle className="mt-2">{pack.name}</CardTitle>
                    <CardDescription>{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold mb-4">
                      {pack.price} {pack.currency}
                      {pack.pack_type === 'subscription' && <span className="text-sm font-normal">/{pack.duration_months}m</span>}
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full" onClick={() => openPackEditor(pack)}>
                          <Edit className="mr-2 h-4 w-4" />
                          {t("admin.packs.editPack")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>{t("admin.packs.editPack")}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="text-sm font-medium">{t("admin.packs.name")}</label>
                            <Input
                              value={packForm.name}
                              onChange={(e) => setPackForm({ ...packForm, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">{t("admin.packs.description")}</label>
                            <Textarea
                              value={packForm.description}
                              onChange={(e) => setPackForm({ ...packForm, description: e.target.value })}
                              rows={2}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">{t("admin.packs.price")}</label>
                              <Input
                                type="number"
                                value={packForm.price}
                                onChange={(e) => setPackForm({ ...packForm, price: parseFloat(e.target.value) })}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">{t("admin.packs.type")}</label>
                              <Select 
                                value={packForm.pack_type} 
                                onValueChange={(v) => setPackForm({ ...packForm, pack_type: v })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="one_time">{t("admin.packs.typeOptions.one_time")}</SelectItem>
                                  <SelectItem value="subscription">{t("admin.packs.typeOptions.subscription")}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          {packForm.pack_type === 'subscription' && (
                            <div>
                              <label className="text-sm font-medium">{t("admin.packs.duration")}</label>
                              <Input
                                type="number"
                                value={packForm.duration_months}
                                onChange={(e) => setPackForm({ ...packForm, duration_months: parseInt(e.target.value) })}
                              />
                            </div>
                          )}
                          <div>
                            <label className="text-sm font-medium">{t("admin.packs.features")}</label>
                            <Textarea
                              value={packForm.features}
                              onChange={(e) => setPackForm({ ...packForm, features: e.target.value })}
                              rows={4}
                            />
                          </div>
                          <Button onClick={handleSavePack} disabled={savingPack} className="w-full">
                            {savingPack ? <Loader2 className="h-4 w-4 animate-spin" /> : t("admin.packs.save")}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
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
            <h2 className="text-2xl font-bold">{t("admin.tickets.title")}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tickets list */}
              <Card className="lg:max-h-[700px] overflow-hidden">
                <CardHeader>
                  <CardTitle>{t("admin.users.tickets")} ({tickets.filter(t => t.status === 'open').length} {t("admin.tickets.statusOptions.open").toLowerCase()})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y max-h-[600px] overflow-y-auto">
                    {tickets.map((ticket) => (
                      <button
                        key={ticket.id}
                        onClick={() => handleSelectTicket(ticket)}
                        className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                          selectedTicket?.id === ticket.id ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">{ticket.subject}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {ticket.profile?.first_name} {ticket.profile?.last_name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(ticket.status)}
                          <span className="text-xs text-muted-foreground">
                            {new Date(ticket.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Messages */}
              <Card className="lg:max-h-[700px] flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {selectedTicket ? selectedTicket.subject : t("admin.tickets.selectTicket")}
                    </CardTitle>
                    {selectedTicket && (
                      <Select 
                        value={selectedTicket.status} 
                        onValueChange={(v) => handleUpdateTicketStatus(selectedTicket.id, v)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">{t("admin.tickets.statusOptions.open")}</SelectItem>
                          <SelectItem value="in_progress">{t("admin.tickets.statusOptions.in_progress")}</SelectItem>
                          <SelectItem value="resolved">{t("admin.tickets.statusOptions.resolved")}</SelectItem>
                          <SelectItem value="closed">{t("admin.tickets.statusOptions.closed")}</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden flex flex-col">
                  {selectedTicket ? (
                    <>
                      <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[450px]">
                        {ticketMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`p-3 rounded-lg ${
                              msg.is_admin 
                                ? 'bg-primary text-primary-foreground ml-8 mr-0' 
                                : 'bg-muted ml-0 mr-8'
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.is_admin ? 'opacity-70' : 'text-muted-foreground'}`}>
                              {msg.is_admin ? 'Support' : 'Client'} • {new Date(msg.created_at).toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US')}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder={t("admin.tickets.writeReply")}
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
                      {t("admin.tickets.selectTicket")}
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

export default Admin;
