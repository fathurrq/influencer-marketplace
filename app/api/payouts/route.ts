import { NextRequest, NextResponse } from 'next/server';

// Mock payout data
const mockPayouts = [
  {
    id: '1',
    influencerId: '1',
    campaignId: '1',
    amount: 3500000,
    status: 'completed',
    requestedAt: '2025-01-10T10:00:00Z',
    processedAt: '2025-01-12T14:30:00Z',
    bankAccount: 'BCA - 1234567890',
    transactionId: 'TXN-001',
  },
  {
    id: '2',
    influencerId: '1',
    campaignId: '2',
    amount: 2800000,
    status: 'pending',
    requestedAt: '2025-01-25T09:15:00Z',
    bankAccount: 'BCA - 1234567890',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const influencerId = searchParams.get('influencerId');
    const status = searchParams.get('status');
    
    let payouts = mockPayouts;
    
    // Filter by influencer ID
    if (influencerId) {
      payouts = payouts.filter(payout => payout.influencerId === influencerId);
    }
    
    // Filter by status
    if (status) {
      payouts = payouts.filter(payout => payout.status === status);
    }

    return NextResponse.json({
      success: true,
      data: payouts,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payouts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['influencerId', 'amount', 'bankAccount'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate amount
    if (body.amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Create new payout request
    const newPayout = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      requestedAt: new Date().toISOString(),
    };

    // In a real app, save to database and trigger payment processing
    mockPayouts.push(newPayout);

    return NextResponse.json({
      success: true,
      data: newPayout,
      message: 'Payout request submitted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process payout request' },
      { status: 500 }
    );
  }
}