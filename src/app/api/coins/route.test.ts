import { GET } from './route';
import { fetchCoins } from '@/lib/coingecko';

jest.mock('@/lib/coingecko');
// Mock NextResponse to inspect the returned value
jest.mock('next/server', () => {
    const originalModule = jest.requireActual('next/server');
    return {
        ...originalModule,
        NextResponse: {
            json: jest.fn((data, init) => ({ data, init })),
        },
    };
});

describe('GET /api/coins', () => {
    it('should return coins', async () => {
        (fetchCoins as jest.Mock).mockResolvedValue([{ id: 'bitcoin', name: 'Bitcoin' }]);
        const request = new Request('http://localhost/api/coins');
        const response = await GET(request);
        // @ts-ignore
        expect(response.data).toEqual([{ id: 'bitcoin', name: 'Bitcoin' }]);
    });

    it('should handle errors', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        (fetchCoins as jest.Mock).mockRejectedValue(new Error('Failed'));
        const request = new Request('http://localhost/api/coins');
        const response = await GET(request);
        // @ts-ignore
        expect(response.data).toEqual({ error: 'Failed to fetch coins' });
        // @ts-ignore
        expect(response.init).toEqual({ status: 500 });
        consoleSpy.mockRestore();
    });
});
