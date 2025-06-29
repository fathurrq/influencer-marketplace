'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Eye, 
  MousePointer, 
  ShoppingCart, 
  Wallet, 
  TrendingUp, 
  Users, 
  Calendar,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { CampaignCard } from '@/components/dashboard/campaign-card';
import { EscrowWidget } from '@/components/dashboard/escrow-widget';
import { CreateCampaignDialog } from '@/components/dashboard/create-campaign-dialog';

// Mock data
const mockCampaigns = [
  {
    id: '1',
    title: 'Promosi Produk Kecantikan Herbal',
    description: 'Campaign untuk mempromosikan produk skincare herbal dengan target audience wanita 20-35 tahun',
    pricingModel: 'PPC' as const,
    budget: 5000000,
    spent: 2500000,
    targetViews: 100000,
    currentViews: 65000,
    targetClicks: 5000,
    currentClicks: 2800,
    status: 'active' as const,
    proposals: 12,
    approvedInfluencers: 5,
    startDate: '2025-01-01',
    endDate: '2025-01-31',
  },
  {
    id: '2',
    title: 'Launch Produk Fashion Ramah Lingkungan',
    description: 'Kampanye peluncuran koleksi fashion sustainable dengan focus pada gen Z',
    pricingModel: 'PPV' as const,
    budget: 8000000,
    spent: 1200000,
    targetViews: 200000,
    currentViews: 25000,
    status: 'active' as const,
    proposals: 8,
    approvedInfluencers: 3,
    startDate: '2025-01-15',
    endDate: '2025-02-14',
  },
  {
    id: '3',
    title: 'Promosi Aplikasi Fintech',
    description: 'Campaign untuk meningkatkan download dan registrasi aplikasi fintech',
    pricingModel: 'PPS' as const,
    budget: 12000000,
    spent: 8500000,
    targetViews: 150000,
    currentViews: 142000,
    targetClicks: 7500,
    currentClicks: 6900,
    conversions: 450,
    status: 'completed' as const,
    proposals: 15,
    approvedInfluencers: 8,
    startDate: '2024-12-01',
    endDate: '2024-12-31',
  },
];

export default function BusinessDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [createCampaignOpen, setCreateCampaignOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const activeCampaigns = mockCampaigns.filter(c => c.status === 'active');
  const totalBudget = mockCampaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = mockCampaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalViews = mockCampaigns.reduce((sum, c) => sum + c.currentViews, 0);
  const totalClicks = mockCampaigns.reduce((sum, c) => sum + c.currentClicks, 0);

  return (
    <DashboardLayout userType="business">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Bisnis</h1>
            <p className="text-gray-600">Kelola kampanye influencer marketing Anda</p>
          </div>
          <Button 
            className="gradient-purple text-white"
            onClick={() => setCreateCampaignOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Buat Kampanye
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kampanye Aktif</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCampaigns.length}</div>
              <p className="text-xs text-muted-foreground">
                dari {mockCampaigns.length} total kampanye
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews.toLocaleString('id-ID')}</div>
              <p className="text-xs text-muted-foreground">
                +12% dari bulan lalu
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClicks.toLocaleString('id-ID')}</div>
              <p className="text-xs text-muted-foreground">
                CTR: {((totalClicks / totalViews) * 100).toFixed(2)}%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Terpakai</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {(totalSpent / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">
                dari Rp {(totalBudget / 1000000).toFixed(1)}M total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Escrow Widget */}
        <EscrowWidget balance={15000000} />

        {/* Main Content */}
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList>
            <TabsTrigger value="campaigns">Kampanye</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="influencers">Influencer</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid gap-6">
              {mockCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>
                    Ringkasan performa kampanye dalam 30 hari terakhir
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Views</span>
                      <span className="text-sm text-muted-foreground">
                        {totalViews.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <Progress value={(totalViews / 300000) * 100} />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Clicks</span>
                      <span className="text-sm text-muted-foreground">
                        {totalClicks.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <Progress value={(totalClicks / 15000) * 100} />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Conversion Rate</span>
                      <span className="text-sm text-muted-foreground">
                        {((totalClicks / totalViews) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <Progress value={((totalClicks / totalViews) * 100) * 10} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="influencers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Influencer Terhubung</CardTitle>
                <CardDescription>
                  Daftar influencer yang sedang atau pernah bekerja sama
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Fitur ini akan tersedia setelah kampanye pertama Anda berjalan
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <CreateCampaignDialog 
        open={createCampaignOpen} 
        onOpenChange={setCreateCampaignOpen} 
      />
    </DashboardLayout>
  );
}