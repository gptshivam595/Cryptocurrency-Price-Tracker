import { NextResponse } from 'next/server';
import { fetchCoins } from '@/lib/coingecko';

/**
 * @swagger
 * /api/coins:
 *   get:
 *     description: Returns a list of coins
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: per_page
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of coins
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '10');

    try {
        const coins = await fetchCoins(page, perPage);
        return NextResponse.json(coins);
    } catch (error) {
        console.error('Error fetching coins:', error);
        return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });
    }
}
