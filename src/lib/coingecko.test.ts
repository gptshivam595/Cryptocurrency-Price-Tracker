import { fetchCoins, fetchCategories, fetchMarketData } from './coingecko';

global.fetch = jest.fn();

describe('CoinGecko Helper', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    describe('fetchCoins', () => {
        it('should fetch coins with default parameters', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => [{ id: 'bitcoin' }],
            });

            const coins = await fetchCoins();
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('per_page=10&page=1'));
            expect(coins).toEqual([{ id: 'bitcoin' }]);
        });

        it('should throw error on failure', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: 'Not Found',
            });

            await expect(fetchCoins()).rejects.toThrow('Failed to fetch coins: Not Found');
        });
    });

    describe('fetchCategories', () => {
        it('should fetch categories', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => [{ id: 'cat1' }],
            });

            const categories = await fetchCategories();
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/coins/categories/list'));
            expect(categories).toEqual([{ id: 'cat1' }]);
        });

        it('should throw error on failure', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: 'Server Error',
            });

            await expect(fetchCategories()).rejects.toThrow('Failed to fetch categories: Server Error');
        });
    });

    describe('fetchMarketData', () => {
        it('should fetch and merge market data', async () => {
            (global.fetch as jest.Mock)
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => [{ id: 'bitcoin', current_price: 5000000, market_cap: 100000000 }],
                })
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => [{ id: 'bitcoin', current_price: 80000, market_cap: 1600000 }],
                });

            const data = await fetchMarketData('bitcoin');

            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(data).toHaveLength(1);
            expect(data[0].current_price_inr).toBe(5000000);
            expect(data[0].current_price_cad).toBe(80000);
        });

        it('should throw error if one fetch fails', async () => {
            (global.fetch as jest.Mock)
                .mockResolvedValueOnce({ ok: true })
                .mockResolvedValueOnce({ ok: false });

            await expect(fetchMarketData('bitcoin')).rejects.toThrow('Failed to fetch market data');
        });
    });
});
