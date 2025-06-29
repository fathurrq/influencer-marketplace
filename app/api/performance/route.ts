import { NextRequest, NextResponse } from 'next/server';

// Mock performance data
const mockPerformanceData = {
  totalViews: 232000,
  totalClicks: 9700,
  totalConversions: 450,
  ctr: 4.18,
  conversionRate: 4.64,
  campaignPerformance: [
    {
      campaignId: '1',
      title: 'Promosi Produk Kecantikan Herbal',
      views: 65000,
      clicks: 2800,
      conversions: 180,
      spend: 2500000,
      revenue: 8500000,
      roi: 240,
    },
    {
      campaignId: '2',
      title: 'Launch Produk Fashion Ramah Lingkungan',
      views: 25000,
      clicks: 950,
      conversions: 45,
      spend: 1200000,
      revenue: 2800000,
      roi: 133,
    },
    {
      campaignId: '3',
      title: 'Promosi Aplikasi Fintech',
      views: 142000,
      clicks: 5950,
      conversions: 225,
      spend: 8500000,
      revenue: 15200000,
      roi: 79,
    },
  ],
  dailyMetrics: [
    { date: '2025-01-20', views: 12500, clicks: 520, conversions: 25 },
    { date: '2025-01-21', views: 15200, clicks: 680, conversions: 32 },
    { date: '2025-01-22', views: 18900, clicks: 790, conversions: 38 },
    { date: '2025-01-23', views: 16800, clicks: 720, conversions: 35 },
    { date: '2025-01-24', views: 21300, clicks: 890, conversions: 42 },
    { date: '2025-01-25', views: 19600, clicks: 820, conversions: 39 },
    { date: '2025-01-26', views: 22100, clicks: 950, conversions: 45 },
  ],
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');
    const dateRange = searchParams.get('dateRange') || '7d';
    
    let responseData = mockPerformanceData;
    
    // Filter by campaign if specified
    if (campaignId) {
      const campaignPerformance = mockPerformanceData.campaignPerformance.find(
        cp => cp.campaignId === campaignId
      );
      
      if (!campaignPerformance) {
        return NextResponse.json(
          { success: false, error: 'Campaign not found' },
          { status: 404 }
        );
      }
      
      responseData = {
        ...mockPerformanceData,
        campaignPerformance: [campaignPerformance],
      };
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      meta: {
        dateRange,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch performance data' },
      { status: 500 }
    );
  }
}