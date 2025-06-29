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
  Youtube, 
  Instagram, 
  Wallet, 
  TrendingUp, 
  Users, 
  Eye,
  MousePointer,
  Calendar,
  Star,
  CheckCircle,
  Clock
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { InfluencerTierBadge } from '@/components/dashboard/influencer-tier-badge';
import { CampaignMarketplace } from '@/components/dashboard/campaign-marketplace';
import { EarningsTracker } from '@/components/dashboard/earnings-tracker';

// Mock data
const mockInfluencerProfile = {
  name: 'Sarah Content Creator',
  tier: 'micro' as const,
  followersYoutube: 125000,
  followersInstagram: 89000,
  followersTotal: 214000,
  engagementRate: 8.5,
  completedCampaigns: 24,
  totalEarnings: 85000000,
  pendingPayouts: 12500000,
  rating: 4.8,
  isVerified: true,
  niche: ['Beauty', 'Lifestyle', 'Fashion'],
};

const mockActiveCampaigns = [
  {
    id: '1',
    title: 'Promosi Produk Kecantikan Herbal',
    businessName: 'Beauty Natural Indonesia',
    pricingModel: 'PPC' as const,
    rate: 1500,
    deadline: '2025-01-31',
    status: 'in_progress' as const,
    targetViews: 25000,
    currentViews: 18500,
    targetClicks: 1250,
    currentClicks: 892,
    earnings: 1338000,
  },
  {
    id: '2',
    title: 'Review Aplikasi Fintech',
    businessName: 'FinTech Solution',
    pricingModel: 'PPV' as const,
    rate: 150,
    deadline: '2025-02-15',
    status: 'pending_approval' as const,
    targetViews: 50000,
    currentViews: 0,
    earnings: 0,
  },
];

export default function InfluencerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  return (
    <DashboardLayout userType="influencer">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Influencer</h1>
            <p className="text-gray-600">Kelola campaign dan earnings Anda</p>
          </div>
          <InfluencerTierBadge tier={mockInfluencerProfile.tier} />
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(mockInfluencerProfile.followersTotal / 1000).toFixed(0)}K
              </div>
              <p className="text-xs text-muted-foreground">
                Engagement: {mockInfluencerProfile.engagementRate}%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campaign Selesai</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockInfluencerProfile.completedCampaigns}</div>
              <p className="text-xs text-muted-foreground">
                Rating: {mockInfluencerProfile.rating} ⭐
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {(mockInfluencerProfile.totalEarnings / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">
                +15% dari bulan lalu
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {(mockInfluencerProfile.pendingPayouts / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">
                Tersedia untuk withdraw
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Social Accounts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-600" />
                YouTube Channel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Subscribers</span>
                  <span className="font-semibold">
                    {mockInfluencerProfile.followersYoutube.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Verified ✓
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-pink-600" />
                Instagram Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Followers</span>
                  <span className="font-semibold">
                    {mockInfluencerProfile.followersInstagram.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Verified ✓
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Campaign Aktif</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid gap-6">
              {mockActiveCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{campaign.title}</CardTitle>
                        <CardDescription>{campaign.businessName}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={campaign.status === 'in_progress' ? 'default' : 'secondary'}
                          className={
                            campaign.status === 'in_progress' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {campaign.status === 'in_progress' ? 'In Progress' : 'Pending Approval'}
                        </Badge>
                        <Badge variant="outline">
                          {campaign.pricingModel}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaign.status === 'in_progress' && (
                        <>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress Views</span>
                              <span>{campaign.currentViews?.toLocaleString('id-ID')} / {campaign.targetViews.toLocaleString('id-ID')}</span>
                            </div>
                            <Progress value={(campaign.currentViews! / campaign.targetViews) * 100} />
                          </div>
                          
                          {campaign.targetClicks && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress Clicks</span>
                                <span>{campaign.currentClicks?.toLocaleString('id-ID')} / {campaign.targetClicks.toLocaleString('id-ID')}</span>
                              </div>
                              <Progress value={(campaign.currentClicks! / campaign.targetClicks) * 100} />
                            </div>
                          )}
                        </>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Deadline: {new Date(campaign.deadline).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-primary">
                            Rp {campaign.earnings.toLocaleString('id-ID')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Rate: Rp {campaign.rate.toLocaleString('id-ID')}/{campaign.pricingModel === 'PPV' ? '1K views' : 'click'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <CampaignMarketplace />
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <EarningsTracker 
              totalEarnings={mockInfluencerProfile.totalEarnings}
              pendingPayouts={mockInfluencerProfile.pendingPayouts}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}