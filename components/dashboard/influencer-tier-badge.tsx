'use client';

import { Badge } from '@/components/ui/badge';
import { Star, Users, TrendingUp } from 'lucide-react';

interface InfluencerTierBadgeProps {
  tier: 'nano' | 'micro' | 'macro';
  size?: 'sm' | 'md' | 'lg';
}

export function InfluencerTierBadge({ tier, size = 'md' }: InfluencerTierBadgeProps) {
  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'nano':
        return {
          label: 'Nano Influencer',
          followers: '1K - 10K',
          className: 'tier-nano text-white',
          icon: Star,
        };
      case 'micro':
        return {
          label: 'Micro Influencer',
          followers: '10K - 100K',
          className: 'tier-micro text-white',
          icon: Users,
        };
      case 'macro':
        return {
          label: 'Macro Influencer',
          followers: '100K+',
          className: 'tier-macro text-white',
          icon: TrendingUp,
        };
      default:
        return {
          label: 'Influencer',
          followers: '',
          className: 'bg-gray-100 text-gray-800',
          icon: Users,
        };
    }
  };

  const config = getTierConfig(tier);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <Badge className={`${config.className} ${sizeClasses[size]} font-medium`}>
      <Icon className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} mr-1`} />
      {config.label}
      {config.followers && size !== 'sm' && (
        <span className="ml-2 opacity-90">({config.followers})</span>
      )}
    </Badge>
  );
}