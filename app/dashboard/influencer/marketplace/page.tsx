'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/layout';
import { CampaignMarketplace } from '@/components/dashboard/campaign-marketplace';

export default function MarketplacePage() {
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Marketplace</h1>
          <p className="text-gray-600">Temukan dan apply untuk campaign yang sesuai dengan niche Anda</p>
        </div>
        
        <CampaignMarketplace />
      </div>
    </DashboardLayout>
  );
}