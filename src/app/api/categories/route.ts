import { NextResponse } from 'next/server';
import { fetchCategories } from '@/lib/coingecko';

/**
 * @swagger
 * /api/categories:
 *   get:
 *     description: Returns a list of coin categories
 *     responses:
 *       200:
 *         description: List of categories
 */
export async function GET() {
    try {
        const categories = await fetchCategories();
        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}
