'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, MousePointer, ShoppingCart, Calendar, Building2, Filter, Search, Check, Clock, Star } from 'lucide-react';
import { toast } from 'sonner';

// Mock marketplace campaigns with more detailed data
const mockMarketplaceCampaigns = [
  {
    id: '1',
    title: 'Review Produk Kecantikan Korea Terbaru',
    businessName: 'K-Beauty Store Indonesia',
    description: 'Campaign untuk mereview produk skincare Korea terbaru dengan target audience wanita 18-30 tahun. Produk yang akan direview adalah serum vitamin C dan moisturizer anti-aging.',
    pricingModel: 'PPC' as const,
    rate: 2000,
    budget: 8000000,
    targetViews: 150000,
    targetClicks: 6000,
    deadline: '2025-02-28',
    niche: 'Beauty',
    minFollowers: 50000,
    requirements: ['Instagram & YouTube', 'Engagement rate min 5%', 'Niche beauty/lifestyle', 'Konten dalam Bahasa Indonesia'],
    isUrgent: false,
    businessRating: 4.8,
    totalCampaigns: 12,
    estimatedEarnings: 12000000,
    contentType: ['Video Review', 'Instagram Story', 'Feed Post'],
    deliverables: 3,
  },
  {
    id: '2',
    title: 'Promosi Aplikasi E-Commerce Generasi Z',
    businessName: 'ShopTech Indonesia',
    description: 'Campaign untuk mempromosikan aplikasi e-commerce baru dengan focus pada generasi Z. Highlight fitur-fitur unik seperti AR try-on dan social shopping.',
    pricingModel: 'PPV' as const,
    rate: 250,
    budget: 15000000,
    targetViews: 300000,
    deadline: '2025-02-15',
    niche: 'Technology',
    minFollowers: 25000,
    requirements: ['TikTok & Instagram', 'Creative content', 'Target Gen Z', 'Viral potential'],
    isUrgent: true,
    businessRating: 4.6,
    totalCampaigns: 8,
    estimatedEarnings: 7500000,
    contentType: ['TikTok Video', 'Instagram Reels', 'Stories'],
    deliverables: 5,
  },
  {
    id: '3',
    title: 'Launch Produk Fashion Sustainable',
    businessName: 'EcoFashion Brand',
    description: 'Peluncuran koleksi fashion ramah lingkungan dengan edukasi tentang sustainability. Campaign ini fokus pada awareness tentang fast fashion dan alternatif eco-friendly.',
    pricingModel: 'PPS' as const,
    rate: 75000,
    budget: 12000000,
    targetViews: 100000,
    targetClicks: 4000,
    deadline: '2025-03-15',
    niche: 'Fashion',
    minFollowers: 30000,
    requirements: ['Authentic storytelling', 'Sustainability advocate', 'High engagement', 'Long-form content'],
    isUrgent: false,
    businessRating: 4.9,
    totalCampaigns: 15,
    estimatedEarnings: 15000000,
    contentType: ['YouTube Video', 'Blog Post', 'Instagram Carousel'],
    deliverables: 4,
  },
  {
    id: '4',
    title: 'Campaign Makanan Sehat & Organik',
    businessName: 'Healthy Life Co',
    description: 'Promosi produk makanan sehat dan organik untuk lifestyle conscious audience. Focus pada manfaat kesehatan dan cara mengintegrasikan ke daily routine.',
    pricingModel: 'PPC' as const,
    rate: 1800,
    budget: 6000000,
    targetViews: 80000,
    targetClicks: 3200,
    deadline: '2025-02-20',
    niche: 'Food',
    minFollowers: 40000,
    requirements: ['Health & wellness niche', 'Recipe creation', 'Nutritional knowledge', 'Instagram & TikTok'],
    isUrgent: false,
    businessRating: 4.7,
    totalCampaigns: 6,
    estimatedEarnings: 5760000,
    contentType: ['Recipe Video', 'Health Tips', 'Before/After'],
    deliverables: 3,
  },
  {
    id: '5',
    title: 'Gaming Gear & Accessories Review',
    businessName: 'GameZone Indonesia',
    description: 'Review gaming gear terbaru termasuk mechanical keyboard, gaming mouse, dan headset. Target audience adalah gamers dan tech enthusiasts.',
    pricingModel: 'PPV' as const,
    rate: 300,
    budget: 10000000,
    targetViews: 200000,
    deadline: '2025-03-01',
    niche: 'Gaming',
    minFollowers: 35000,
    requirements: ['Gaming content creator', 'Tech review experience', 'YouTube channel', 'Male audience 16-25'],
    isUrgent: true,
    businessRating: 4.5,
    totalCampaigns: 10,
    estimatedEarnings: 6000000,
    contentType: ['Unboxing Video', 'Gaming Session', 'Tech Review'],
    deliverables: 4,
  },
];

export function CampaignMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [selectedPricing, setSelectedPricing] = useState('');
  const [appliedCampaigns, setAppliedCampaigns] = useState<string[]>([]);

  const handleApply = (campaignId: string) => {
    if (appliedCampaigns.includes(campaignId)) {
      toast.info('Anda sudah apply untuk campaign ini');
      return;
    }
    
    setAppliedCampaigns([...appliedCampaigns, campaignId]);
    toast.success('Proposal berhasil dikirim!');
  };

  const filteredCampaigns = mockMarketplaceCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiche = !selectedNiche || campaign.niche === selectedNiche;
    const matchesPricing = !selectedPricing || campaign.pricingModel === selectedPricing;
    
    return matchesSearch && matchesNiche && matchesPricing;
  });

  const getPricingIcon = (model: string) => {
    switch (model) {
      case 'PPV': return Eye;
      case 'PPC': return MousePointer;
      case 'PPS': return ShoppingCart;
      default: return Eye;
    }
  };

  const getPricingColor = (model: string) => {
    switch (model) {
      case 'PPV': return 'bg-purple-100 text-purple-800';
      case 'PPC': return 'bg-teal-100 text-teal-800';
      case 'PPS': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedNiche('');
    setSelectedPricing('');
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{mockMarketplaceCampaigns.length}</div>
            <p className="text-xs text-muted-foreground">Total Campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {mockMarketplaceCampaigns.filter(c => c.isUrgent).length}
            </div>
            <p className="text-xs text-muted-foreground">Urgent Campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{appliedCampaigns.length}</div>
            <p className="text-xs text-muted-foreground">Applied Campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">
              Rp {(mockMarketplaceCampaigns.reduce((sum, c) => sum + c.estimatedEarnings, 0) / 1000000).toFixed(0)}M
            </div>
            <p className="text-xs text-muted-foreground">Total Potential Earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Campaign
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari campaign..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedNiche} onValueChange={setSelectedNiche}>
              <SelectTrigger>
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Beauty">Beauty & Skincare</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Food">Food & Beverage</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPricing} onValueChange={setSelectedPricing}>
              <SelectTrigger>
                <SelectValue placeholder="Model Pricing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Model</SelectItem>
                <SelectItem value="PPV">Pay Per View</SelectItem>
                <SelectItem value="PPC">Pay Per Click</SelectItem>
                <SelectItem value="PPS">Pay Per Sale</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={resetFilters}>
              Reset Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Grid */}
      <div className="grid gap-6">
        {filteredCampaigns.map((campaign) => {
          const PricingIcon = getPricingIcon(campaign.pricingModel);
          const isApplied = appliedCampaigns.includes(campaign.id);
          
          return (
            <Card key={campaign.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{campaign.title}</CardTitle>
                      {campaign.isUrgent && (
                        <Badge className="bg-red-100 text-red-800 animate-pulse">
                          <Clock className="h-3 w-3 mr-1" />
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{campaign.businessName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{campaign.businessRating}</span>
                        <span className="text-xs text-muted-foreground">({campaign.totalCampaigns} campaigns)</span>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {campaign.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getPricingColor(campaign.pricingModel)}>
                      <PricingIcon className="h-3 w-3 mr-1" />
                      {campaign.pricingModel}
                    </Badge>
                    <Badge variant="outline">{campaign.niche}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Campaign Stats */}
                  <div className="grid md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Rate</div>
                      <div className="font-semibold text-primary">
                        Rp {campaign.rate.toLocaleString('id-ID')}
                        <span className="text-xs text-muted-foreground">
                          /{campaign.pricingModel === 'PPV' ? '1K views' : campaign.pricingModel === 'PPC' ? 'click' : 'sale'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Budget</div>
                      <div className="font-semibold">Rp {(campaign.budget / 1000000).toFixed(1)}M</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Target Views</div>
                      <div className="font-semibold">{campaign.targetViews.toLocaleString('id-ID')}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Min Followers</div>
                      <div className="font-semibold">{(campaign.minFollowers / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Est. Earnings</div>
                      <div className="font-semibold text-green-600">
                        Rp {(campaign.estimatedEarnings / 1000000).toFixed(1)}M
                      </div>
                    </div>
                  </div>

                  {/* Content Types */}
                  <div>
                    <div className="text-sm font-medium mb-2">Content Deliverables ({campaign.deliverables}):</div>
                    <div className="flex flex-wrap gap-2">
                      {campaign.contentType.map((type, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <div className="text-sm font-medium mb-2">Requirements:</div>
                    <div className="flex flex-wrap gap-2">
                      {campaign.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Deadline: {new Date(campaign.deadline).toLocaleDateString('id-ID')}
                      </div>
                      <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} hari tersisa
                      </div>
                    </div>
                    
                    {isApplied ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-md">
                        <Check className="h-4 w-4" />
                        <span className="font-medium">Applied</span>
                      </div>
                    ) : (
                      <Button 
                        className="gradient-teal text-white"
                        onClick={() => handleApply(campaign.id)}
                      >
                        Apply Campaign
                      </Button>
                    )}
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
              Tidak ada campaign yang sesuai dengan filter Anda
            </div>
            <Button variant="outline" onClick={resetFilters}>
              Reset Filter
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}