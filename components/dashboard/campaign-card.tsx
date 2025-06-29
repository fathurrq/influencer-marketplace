'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Eye, MousePointer, Users, Calendar, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Campaign {
  id: string;
  title: string;
  description: string;
  pricingModel: 'PPV' | 'PPC' | 'PPS';
  budget: number;
  spent: number;
  targetViews: number;
  currentViews: number;
  targetClicks?: number;
  currentClicks?: number;
  conversions?: number;
  status: 'active' | 'paused' | 'completed' | 'draft';
  proposals: number;
  approvedInfluencers: number;
  startDate: string;
  endDate: string;
}

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const getStatusColor = (status: Campaign['status']) => {
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

  const getPricingModelColor = (model: Campaign['pricingModel']) => {
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

  const viewsProgress = (campaign.currentViews / campaign.targetViews) * 100;
  const clicksProgress = campaign.targetClicks 
    ? ((campaign.currentClicks || 0) / campaign.targetClicks) * 100 
    : 0;
  const budgetProgress = (campaign.spent / campaign.budget) * 100;

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{campaign.title}</CardTitle>
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status}
              </Badge>
              <Badge variant="outline" className={getPricingModelColor(campaign.pricingModel)}>
                {campaign.pricingModel}
              </Badge>
            </div>
            <CardDescription className="text-sm">
              {campaign.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Pause Campaign</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress Bars */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  Views
                </span>
                <span className="font-medium">
                  {campaign.currentViews.toLocaleString('id-ID')} / {campaign.targetViews.toLocaleString('id-ID')}
                </span>
              </div>
              <Progress value={viewsProgress} className="h-2" />
            </div>

            {campaign.targetClicks && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <MousePointer className="h-4 w-4" />
                    Clicks
                  </span>
                  <span className="font-medium">
                    {(campaign.currentClicks || 0).toLocaleString('id-ID')} / {campaign.targetClicks.toLocaleString('id-ID')}
                  </span>
                </div>
                <Progress value={clicksProgress} className="h-2" />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Budget Used</span>
                <span className="font-medium">
                  Rp {(campaign.spent / 1000000).toFixed(1)}M / Rp {(campaign.budget / 1000000).toFixed(1)}M
                </span>
              </div>
              <Progress value={budgetProgress} className="h-2" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{campaign.proposals}</div>
              <div className="text-xs text-muted-foreground">Proposals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{campaign.approvedInfluencers}</div>
              <div className="text-xs text-muted-foreground">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {campaign.conversions || 0}
              </div>
              <div className="text-xs text-muted-foreground">Conversions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {campaign.currentClicks && campaign.currentViews 
                  ? ((campaign.currentClicks / campaign.currentViews) * 100).toFixed(1)
                  : '0.0'
                }%
              </div>
              <div className="text-xs text-muted-foreground">CTR</div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(campaign.startDate).toLocaleDateString('id-ID')} - {new Date(campaign.endDate).toLocaleDateString('id-ID')}
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}