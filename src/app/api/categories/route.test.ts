import { GET } from './route';
import { fetchCategories } from '@/lib/coingecko';

jest.mock('@/lib/coingecko');
jest.mock('next/server', () => {
    const originalModule = jest.requireActual('next/server');
    return {
        ...originalModule,
        NextResponse: {
            json: jest.fn((data, init) => ({ data, init })),
        },
    };
});

describe('GET /api/categories', () => {
    it('should return categories', async () => {
        (fetchCategories as jest.Mock).mockResolvedValue([{ id: 'cat1', name: 'Category 1' }]);
        const response = await GET();
        // @ts-ignore
        expect(response.data).toEqual([{ id: 'cat1', name: 'Category 1' }]);
    });
});
