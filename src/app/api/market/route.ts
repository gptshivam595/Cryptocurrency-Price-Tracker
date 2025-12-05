import { NextResponse } from 'next/server';
import { fetchMarketData } from '@/lib/coingecko';

/**
 * @swagger
 * /api/market:
 *   get:
 *     description: Returns market data for specific coins or categories
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: string
 *         description: Comma-separated list of coin IDs
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Market data
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids') || undefined;
    const category = searchParams.get('category') || undefined;

    if (!ids && !category) {
        return NextResponse.json({ error: 'Please provide ids or category query parameter' }, { status: 400 });
    }

    try {
        const data = await fetchMarketData(ids, category);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching market data:', error);
        return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
    }
}
