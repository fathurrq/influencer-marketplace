import { NextRequest, NextResponse } from 'next/server';

// Mock campaigns data
const mockCampaigns = [
  {
    id: '1',
    title: 'Promosi Produk Kecantikan Herbal',
    description: 'Campaign untuk mempromosikan produk skincare herbal dengan target audience wanita 20-35 tahun',
    pricingModel: 'PPC',
    budget: 5000000,
    spent: 2500000,
    targetViews: 100000,
    currentViews: 65000,
    targetClicks: 5000,
    currentClicks: 2800,
    status: 'active',
    proposals: 12,
    approvedInfluencers: 5,
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    businessId: '1',
  },
  {
    id: '2',
    title: 'Launch Produk Fashion Ramah Lingkungan',
    description: 'Kampanye peluncuran koleksi fashion sustainable dengan focus pada gen Z',
    pricingModel: 'PPV',
    budget: 8000000,
    spent: 1200000,
    targetViews: 200000,
    currentViews: 25000,
    status: 'active',
    proposals: 8,
    approvedInfluencers: 3,
    startDate: '2025-01-15',
    endDate: '2025-02-14',
    businessId: '1',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('businessId');
    
    // Filter campaigns by business ID if provided
    let campaigns = mockCampaigns;
    if (businessId) {
      campaigns = mockCampaigns.filter(campaign => campaign.businessId === businessId);
    }

    return NextResponse.json({
      success: true,
      data: campaigns,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'pricingModel', 'budget', 'targetViews'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new campaign
    const newCampaign = {
      id: Date.now().toString(),
      ...body,
      spent: 0,
      currentViews: 0,
      currentClicks: 0,
      status: 'draft',
      proposals: 0,
      approvedInfluencers: 0,
      createdAt: new Date().toISOString(),
    };

    // In a real app, save to database
    mockCampaigns.push(newCampaign);

    return NextResponse.json({
      success: true,
      data: newCampaign,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}