'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  Eye, 
  MousePointer, 
  ShoppingCart, 
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  Users,
  TrendingUp,
  Wallet
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DashboardLayout } from '@/components/dashboard/layout';
import { CreateCampaignDialog } from '@/components/dashboard/create-campaign-dialog';
import Link from 'next/link';

// Mock campaigns data with more detailed information
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
    declinedProposals: 3,
    pendingProposals: 4,
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    category: 'Beauty',
    createdAt: '2024-12-15',
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
    declinedProposals: 2,
    pendingProposals: 3,
    startDate: '2025-01-15',
    endDate: '2025-02-14',
    category: 'Fashion',
    createdAt: '2025-01-10',
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
    declinedProposals: 4,
    pendingProposals: 0,
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    category: 'Technology',
    createdAt: '2024-11-20',
  },
  {
    id: '4',
    title: 'Review Produk Makanan Sehat',
    description: 'Campaign untuk mereview dan mempromosikan produk makanan organik',
    pricingModel: 'PPC' as const,
    budget: 3500000,
    spent: 800000,
    targetViews: 75000,
    currentViews: 18000,
    targetClicks: 3000,
    currentClicks: 720,
    status: 'paused' as const,
    proposals: 6,
    approvedInfluencers: 2,
    declinedProposals: 1,
    pendingProposals: 3,
    startDate: '2025-01-20',
    endDate: '2025-02-20',
    category: 'Food',
    createdAt: '2025-01-15',
  },
  {
    id: '5',
    title: 'Gaming Gear Review Campaign',
    description: 'Campaign untuk review gaming accessories dan peripheral',
    pricingModel: 'PPV' as const,
    budget: 6000000,
    spent: 0,
    targetViews: 120000,
    currentViews: 0,
    status: 'draft' as const,
    proposals: 0,
    approvedInfluencers: 0,
    declinedProposals: 0,
    pendingProposals: 0,
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    category: 'Gaming',
    createdAt: '2025-01-25',
  },
  {
    id: '6',
    title: 'Travel Destination Promotion',
    description: 'Campaign untuk mempromosikan destinasi wisata lokal Indonesia',
    pricingModel: 'PPC' as const,
    budget: 9000000,
    spent: 4200000,
    targetViews: 180000,
    currentViews: 95000,
    targetClicks: 8000,
    currentClicks: 4200,
    status: 'active' as const,
    proposals: 10,
    approvedInfluencers: 6,
    declinedProposals: 2,
    pendingProposals: 2,
    startDate: '2025-01-10',
    endDate: '2025-03-10',
    category: 'Travel',
    createdAt: '2025-01-05',
  },
];

export default function CampaignsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [createCampaignOpen, setCreateCampaignOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPricingModelColor = (model: string) => {
    switch (model) {
      case 'PPV':
        return 'bg-purple-100 text-purple-800';
      case 'PPC':
        return 'bg-teal-100 text-teal-800';
      case 'PPS':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPricingIcon = (model: string) => {
    switch (model) {
      case 'PPV': return Eye;
      case 'PPC': return MousePointer;
      case 'PPS': return ShoppingCart;
      default: return Eye;
    }
  };

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || campaign.status === statusFilter;
    const matchesCategory = !categoryFilter || campaign.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setCategoryFilter('');
  };

  // Calculate stats
  const totalBudget = mockCampaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = mockCampaigns.reduce((sum, c) => sum + c.spent, 0);
  const activeCampaigns = mockCampaigns.filter(c => c.status === 'active').length;
  const totalProposals = mockCampaigns.reduce((sum, c) => sum + c.proposals, 0);

  return (
    <DashboardLayout userType="business">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Kampanye</h1>
            <p className="text-gray-600">Pantau dan kelola semua kampanye influencer marketing Anda</p>
          </div>
          <Button 
            className="gradient-purple text-white"
            onClick={() => setCreateCampaignOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Buat Kampanye Baru
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Kampanye</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockCampaigns.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeCampaigns} aktif
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp {(totalBudget / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">
                Rp {(totalSpent / 1000000).toFixed(1)}M terpakai
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProposals}</div>
              <p className="text-xs text-muted-foreground">
                Dari semua kampanye
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Performance</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((mockCampaigns.reduce((sum, c) => sum + (c.currentViews / c.targetViews), 0) / mockCampaigns.length) * 100).toFixed(0)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Target completion
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Kampanye
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari kampanye..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="paused">Dijeda</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Kategori</SelectItem>
                  <SelectItem value="Beauty">Beauty</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={resetFilters}>
                Reset Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCampaigns.map((campaign) => {
            const PricingIcon = getPricingIcon(campaign.pricingModel);
            const viewsProgress = (campaign.currentViews / campaign.targetViews) * 100;
            const budgetProgress = (campaign.spent / campaign.budget) * 100;
            
            return (
              <Card key={campaign.id} className="hover:shadow-lg transition-all duration-200 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                        <Badge variant="outline" className={getPricingModelColor(campaign.pricingModel)}>
                          <PricingIcon className="h-3 w-3 mr-1" />
                          {campaign.pricingModel}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {campaign.title}
                      </CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/business/campaigns/${campaign.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        {campaign.status === 'active' && (
                          <DropdownMenuItem>Pause Campaign</DropdownMenuItem>
                        )}
                        {campaign.status === 'paused' && (
                          <DropdownMenuItem>Resume Campaign</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="text-sm line-clamp-2">
                    {campaign.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Indicators */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Views Progress</span>
                        <span>{viewsProgress.toFixed(0)}%</span>
                      </div>
                      <Progress value={viewsProgress} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Budget Used</span>
                        <span>{budgetProgress.toFixed(0)}%</span>
                      </div>
                      <Progress value={budgetProgress} className="h-1.5" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground text-xs">Budget</div>
                      <div className="font-semibold">Rp {(campaign.budget / 1000000).toFixed(1)}M</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Proposals</div>
                      <div className="font-semibold">{campaign.proposals}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Views</div>
                      <div className="font-semibold">{(campaign.currentViews / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Approved</div>
                      <div className="font-semibold text-green-600">{campaign.approvedInfluencers}</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(campaign.endDate).toLocaleDateString('id-ID')}
                      </div>
                      <Link href={`/dashboard/business/campaigns/${campaign.id}`}>
                        <Button variant="outline" size="sm" className="text-xs">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCampaigns.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                Tidak ada kampanye yang sesuai dengan filter Anda
              </div>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filter
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <CreateCampaignDialog 
        open={createCampaignOpen} 
        onOpenChange={setCreateCampaignOpen} 
      />
    </DashboardLayout>
  );
}