import { GET } from './route';
import { fetchMarketData } from '@/lib/coingecko';

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

describe('GET /api/market', () => {
    it('should return market data', async () => {
        (fetchMarketData as jest.Mock).mockResolvedValue([{ id: 'bitcoin', current_price_inr: 100 }]);
        const request = new Request('http://localhost/api/market?ids=bitcoin');
        const response = await GET(request);
        // @ts-ignore
        expect(response.data).toEqual([{ id: 'bitcoin', current_price_inr: 100 }]);
    });

    it('should return 400 if no params', async () => {
        const request = new Request('http://localhost/api/market');
        const response = await GET(request);
        // @ts-ignore
        expect(response.data).toEqual({ error: 'Please provide ids or category query parameter' });
        // @ts-ignore
        expect(response.init).toEqual({ status: 400 });
    });
});
