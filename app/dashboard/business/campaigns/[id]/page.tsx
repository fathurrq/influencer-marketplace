'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  ArrowLeft,
  Eye, 
  MousePointer, 
  ShoppingCart, 
  Calendar,
  Users,
  TrendingUp,
  Wallet,
  MoreHorizontal,
  Check,
  X,
  Clock,
  Star,
  Youtube,
  Instagram,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { InfluencerTierBadge } from '@/components/dashboard/influencer-tier-badge';
import Link from 'next/link';
import { toast } from 'sonner';

// Mock campaign data
const mockCampaignDetails = {
  '1': {
    id: '1',
    title: 'Promosi Produk Kecantikan Herbal',
    description: 'Campaign untuk mempromosikan produk skincare herbal dengan target audience wanita 20-35 tahun. Produk yang akan dipromosikan meliputi serum vitamin C, moisturizer anti-aging, dan cleanser herbal.',
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
    rate: 1500,
    requirements: [
      'Niche beauty/skincare',
      'Minimum 50K followers',
      'Engagement rate min 5%',
      'Content dalam Bahasa Indonesia',
      'Instagram & YouTube presence'
    ],
    deliverables: [
      '1 Instagram feed post',
      '3 Instagram stories',
      '1 YouTube review video (min 5 menit)',
      'Swipe up/link in bio untuk 7 hari'
    ]
  }
};

// Mock influencer data
const mockInfluencers = {
  approved: [
    {
      id: '1',
      name: 'Sarah Beauty Guru',
      username: '@sarahbeauty',
      avatar: '',
      tier: 'micro' as const,
      followers: {
        instagram: 85000,
        youtube: 120000,
        total: 205000
      },
      engagementRate: 8.2,
      rating: 4.9,
      completedCampaigns: 24,
      allocatedBudget: 750000,
      expectedViews: 15000,
      expectedClicks: 600,
      status: 'in_progress' as const,
      joinedDate: '2025-01-05',
      deliverables: [
        { type: 'Instagram Post', status: 'completed', completedDate: '2025-01-10' },
        { type: 'Instagram Stories', status: 'completed', completedDate: '2025-01-11' },
        { type: 'YouTube Video', status: 'in_progress', dueDate: '2025-01-20' },
        { type: 'Link Promotion', status: 'pending', dueDate: '2025-01-25' }
      ],
      performance: {
        views: 12500,
        clicks: 485,
        engagement: 1025
      }
    },
    {
      id: '2',
      name: 'Maya Skincare Expert',
      username: '@mayaskincare',
      avatar: '',
      tier: 'micro' as const,
      followers: {
        instagram: 95000,
        youtube: 75000,
        total: 170000
      },
      engagementRate: 7.8,
      rating: 4.7,
      completedCampaigns: 18,
      allocatedBudget: 600000,
      expectedViews: 12000,
      expectedClicks: 480,
      status: 'completed' as const,
      joinedDate: '2025-01-03',
      deliverables: [
        { type: 'Instagram Post', status: 'completed', completedDate: '2025-01-08' },
        { type: 'Instagram Stories', status: 'completed', completedDate: '2025-01-09' },
        { type: 'YouTube Video', status: 'completed', completedDate: '2025-01-15' },
        { type: 'Link Promotion', status: 'completed', completedDate: '2025-01-22' }
      ],
      performance: {
        views: 14200,
        clicks: 568,
        engagement: 1136
      }
    },
    {
      id: '3',
      name: 'Rina Natural Beauty',
      username: '@rinanatural',
      avatar: '',
      tier: 'nano' as const,
      followers: {
        instagram: 45000,
        youtube: 35000,
        total: 80000
      },
      engagementRate: 9.1,
      rating: 4.8,
      completedCampaigns: 12,
      allocatedBudget: 450000,
      expectedViews: 8000,
      expectedClicks: 320,
      status: 'in_progress' as const,
      joinedDate: '2025-01-07',
      deliverables: [
        { type: 'Instagram Post', status: 'completed', completedDate: '2025-01-12' },
        { type: 'Instagram Stories', status: 'in_progress', dueDate: '2025-01-18' },
        { type: 'YouTube Video', status: 'pending', dueDate: '2025-01-22' },
        { type: 'Link Promotion', status: 'pending', dueDate: '2025-01-28' }
      ],
      performance: {
        views: 6800,
        clicks: 272,
        engagement: 620
      }
    }
  ],
  pending: [
    {
      id: '4',
      name: 'Lisa Beauty Vlogger',
      username: '@lisabeauty',
      avatar: '',
      tier: 'micro' as const,
      followers: {
        instagram: 125000,
        youtube: 180000,
        total: 305000
      },
      engagementRate: 6.5,
      rating: 4.6,
      completedCampaigns: 32,
      proposalDate: '2025-01-15',
      requestedBudget: 900000,
      proposalMessage: 'Saya tertarik dengan campaign ini karena sesuai dengan niche saya. Saya memiliki audience yang sangat engaged di beauty segment dan sudah berpengalaman dengan produk skincare herbal.'
    },
    {
      id: '5',
      name: 'Dina Skincare Enthusiast',
      username: '@dinaskincare',
      avatar: '',
      tier: 'nano' as const,
      followers: {
        instagram: 35000,
        youtube: 25000,
        total: 60000
      },
      engagementRate: 8.9,
      rating: 4.9,
      completedCampaigns: 8,
      proposalDate: '2025-01-18',
      requestedBudget: 400000,
      proposalMessage: 'Halo! Saya sangat tertarik dengan produk herbal dan sudah lama menggunakan skincare natural. Audience saya sangat trust dengan rekomendasi saya.'
    }
  ],
  declined: [
    {
      id: '6',
      name: 'Sari Beauty Content',
      username: '@saribeauty',
      avatar: '',
      tier: 'micro' as const,
      followers: {
        instagram: 78000,
        youtube: 95000,
        total: 173000
      },
      engagementRate: 5.2,
      rating: 4.3,
      completedCampaigns: 15,
      declinedDate: '2025-01-12',
      declineReason: 'Engagement rate di bawah requirement minimum (5%)',
      requestedBudget: 650000
    },
    {
      id: '7',
      name: 'Tina Lifestyle Blogger',
      username: '@tinalifestyle',
      avatar: '',
      tier: 'macro' as const,
      followers: {
        instagram: 250000,
        youtube: 180000,
        total: 430000
      },
      engagementRate: 7.8,
      rating: 4.7,
      completedCampaigns: 45,
      declinedDate: '2025-01-10',
      declineReason: 'Budget tidak sesuai dengan rate card influencer',
      requestedBudget: 1500000
    }
  ]
};

export default function CampaignDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const campaignId = params.id as string;

  const [activeTab, setActiveTab] = useState('overview');

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

  const campaign = mockCampaignDetails[campaignId as keyof typeof mockCampaignDetails];

  if (!campaign) {
    return (
      <DashboardLayout userType="business">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
          <Link href="/dashboard/business/campaigns">
            <Button>Back to Campaigns</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleApproveInfluencer = (influencerId: string) => {
    toast.success('Influencer approved successfully!');
  };

  const handleDeclineInfluencer = (influencerId: string) => {
    toast.success('Influencer proposal declined.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
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

  const PricingIcon = getPricingIcon(campaign.pricingModel);
  const viewsProgress = (campaign.currentViews / campaign.targetViews) * 100;
  const clicksProgress = campaign.targetClicks ? (campaign.currentClicks / campaign.targetClicks) * 100 : 0;
  const budgetProgress = (campaign.spent / campaign.budget) * 100;

  return (
    <DashboardLayout userType="business">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/business/campaigns">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status}
              </Badge>
              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                <PricingIcon className="h-3 w-3 mr-1" />
                {campaign.pricingModel}
              </Badge>
            </div>
            <p className="text-gray-600">{campaign.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
              <DropdownMenuItem>Duplicate Campaign</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              {campaign.status === 'active' && (
                <DropdownMenuItem>Pause Campaign</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Progress</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {(campaign.spent / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                dari Rp {(campaign.budget / 1000000).toFixed(1)}M
              </p>
              <Progress value={budgetProgress} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Views Progress</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {campaign.currentViews.toLocaleString('id-ID')}
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                dari {campaign.targetViews.toLocaleString('id-ID')} target
              </p>
              <Progress value={viewsProgress} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clicks Progress</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {campaign.currentClicks.toLocaleString('id-ID')}
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                dari {campaign.targetClicks?.toLocaleString('id-ID')} target
              </p>
              <Progress value={clicksProgress} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Influencers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaign.approvedInfluencers}</div>
              <p className="text-xs text-muted-foreground">
                {campaign.pendingProposals} pending, {campaign.declinedProposals} declined
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({mockInfluencers.approved.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({mockInfluencers.pending.length})
            </TabsTrigger>
            <TabsTrigger value="declined">
              Declined ({mockInfluencers.declined.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Category</div>
                      <div className="font-medium">{campaign.category}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Rate</div>
                      <div className="font-medium">
                        Rp {campaign.rate.toLocaleString('id-ID')}/click
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Start Date</div>
                      <div className="font-medium">
                        {new Date(campaign.startDate).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">End Date</div>
                      <div className="font-medium">
                        {new Date(campaign.endDate).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">CTR</div>
                      <div className="font-medium">
                        {((campaign.currentClicks / campaign.currentViews) * 100).toFixed(2)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">CPV</div>
                      <div className="font-medium">
                        Rp {(campaign.spent / campaign.currentViews).toFixed(0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">CPC</div>
                      <div className="font-medium">
                        Rp {(campaign.spent / campaign.currentClicks).toFixed(0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Days Left</div>
                      <div className="font-medium">
                        {Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {campaign.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deliverables</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {campaign.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approved" className="space-y-6">
            <div className="grid gap-6">
              {mockInfluencers.approved.map((influencer) => (
                <Card key={influencer.id} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={influencer.avatar} />
                          <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{influencer.name}</h3>
                            <InfluencerTierBadge tier={influencer.tier} size="sm" />
                            <Badge className={getStatusColor(influencer.status)}>
                              {influencer.status === 'in_progress' ? 'In Progress' : 'Completed'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{influencer.username}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              {influencer.rating}
                            </span>
                            <span>{influencer.completedCampaigns} campaigns</span>
                            <span>{influencer.engagementRate}% engagement</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          Rp {influencer.allocatedBudget.toLocaleString('id-ID')}
                        </div>
                        <div className="text-xs text-muted-foreground">Allocated Budget</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Social Media Stats */}
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-pink-600" />
                          <div>
                            <div className="font-medium">{influencer.followers.instagram.toLocaleString('id-ID')}</div>
                            <div className="text-xs text-muted-foreground">Instagram</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Youtube className="h-4 w-4 text-red-600" />
                          <div>
                            <div className="font-medium">{influencer.followers.youtube.toLocaleString('id-ID')}</div>
                            <div className="text-xs text-muted-foreground">YouTube</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <div>
                            <div className="font-medium">{influencer.followers.total.toLocaleString('id-ID')}</div>
                            <div className="text-xs text-muted-foreground">Total</div>
                          </div>
                        </div>
                      </div>

                      {/* Performance */}
                      <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{influencer.performance.views.toLocaleString('id-ID')}</div>
                          <div className="text-xs text-muted-foreground">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{influencer.performance.clicks.toLocaleString('id-ID')}</div>
                          <div className="text-xs text-muted-foreground">Clicks</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{influencer.performance.engagement.toLocaleString('id-ID')}</div>
                          <div className="text-xs text-muted-foreground">Engagement</div>
                        </div>
                      </div>

                      {/* Deliverables Progress */}
                      <div>
                        <h4 className="font-medium mb-2">Deliverables Progress</h4>
                        <div className="space-y-2">
                          {influencer.deliverables.map((deliverable, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                              <div className="flex items-center gap-2">
                                {deliverable.status === 'completed' && <Check className="h-4 w-4 text-green-600" />}
                                {deliverable.status === 'in_progress' && <Clock className="h-4 w-4 text-yellow-600" />}
                                {deliverable.status === 'pending' && <Clock className="h-4 w-4 text-gray-400" />}
                                <span className="text-sm">{deliverable.type}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {deliverable.status === 'completed' && deliverable.completedDate && 
                                  `Completed: ${new Date(deliverable.completedDate).toLocaleDateString('id-ID')}`
                                }
                                {deliverable.status !== 'completed' && deliverable.dueDate && 
                                  `Due: ${new Date(deliverable.dueDate).toLocaleDateString('id-ID')}`
                                }
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <div className="grid gap-6">
              {mockInfluencers.pending.map((influencer) => (
                <Card key={influencer.id} className="border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={influencer.avatar} />
                          <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{influencer.name}</h3>
                            <InfluencerTierBadge tier={influencer.tier} size="sm" />
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Pending Review
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{influencer.username}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              {influencer.rating}
                            </span>
                            <span>{influencer.completedCampaigns} campaigns</span>
                            <span>{influencer.engagementRate}% engagement</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          Rp {influencer.requestedBudget.toLocaleString('id-ID')}
                        </div>
                        <div className="text-xs text-muted-foreground">Requested Budget</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Social Media Stats */}
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-pink-600" />
                          <div>
                            <div className="font-medium">{influencer.followers.instagram.toLocaleString('id-ID')}</div>
                            <div className="text-xs text-muted-foreground">Instagram</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Youtube className="h-4 w-4 text-red-600" />
                          <div>
                            <div className="font-medium">{influencer.followers.youtube.toLocaleString('id-ID')}</div>
                            <div className="text-xs text-muted-foreground">YouTube</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <div>
                            <div className="font-medium">{influencer.followers.total.toLocaleString('id-ID')}</div>
                            <div className="text-xs text-muted-foreground">Total</div>
                          </div>
                        </div>
                      </div>

                      {/* Proposal Message */}
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">Proposal Message</h4>
                        <p className="text-sm text-blue-800">{influencer.proposalMessage}</p>
                        <div className="text-xs text-blue-600 mt-2">
                          Applied: {new Date(influencer.proposalDate).toLocaleDateString('id-ID')}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleApproveInfluencer(influencer.id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeclineInfluencer(influencer.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="declined" className="space-y-6">
            <div className="grid gap-6">
              {mockInfluencers.declined.map((influencer) => (
                <Card key={influencer.id} className="border-l-4 border-l-red-500 opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={influencer.avatar} />
                          <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{influencer.name}</h3>
                            <InfluencerTierBadge tier={influencer.tier} size="sm" />
                            <Badge className="bg-red-100 text-red-800">
                              Declined
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{influencer.username}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              {influencer.rating}
                            </span>
                            <span>{influencer.completedCampaigns} campaigns</span>
                            <span>{influencer.engagementRate}% engagement</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-500">
                          Rp {influencer.requestedBudget.toLocaleString('id-ID')}
                        </div>
                        <div className="text-xs text-muted-foreground">Requested Budget</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Social Media Stats */}
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-pink-600" />
                          <div>
                            <div className="font-medium">{influencer.followers.instagram.toLocaleString('id-ID')}</div>
                            <div className="text-xs text-muted-foreground">Instagram</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Youtube className="h-4 w-4 text-red-600" />
                          <div>
                            <div className="font-medium">{influencer.followers.youtube.toLocaleString('id-ID')}</div>
                            <div className="text-xs text-muted-foreground">YouTube</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <div>
                            <div className="font-medium">{influencer.followers.total.toLocaleString('id-ID')}</div>
                            <div className="text-xs text-muted-foreground">Total</div>
                          </div>
                        </div>
                      </div>

                      {/* Decline Reason */}
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <h4 className="font-medium text-red-900 mb-2">Decline Reason</h4>
                        <p className="text-sm text-red-800">{influencer.declineReason}</p>
                        <div className="text-xs text-red-600 mt-2">
                          Declined: {new Date(influencer.declinedDate).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}