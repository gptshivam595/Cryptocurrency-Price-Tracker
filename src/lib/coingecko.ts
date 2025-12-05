const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export interface CoinMarket {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: null | {
        times: number;
        currency: string;
        percentage: number;
    };
    last_updated: string;
}

export const fetchCoins = async (page: number = 1, perPage: number = 10) => {
    const res = await fetch(`${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`);
    if (!res.ok) {
        throw new Error(`Failed to fetch coins: ${res.statusText}`);
    }
    return res.json();
};

export const fetchCategories = async () => {
    const res = await fetch(`${COINGECKO_API_BASE}/coins/categories/list`);
    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }
    return res.json();
};

export const fetchMarketData = async (ids?: string, category?: string) => {
    const params = new URLSearchParams();
    if (ids) params.append('ids', ids);
    if (category) params.append('category', category);

    // We need both INR and CAD. CoinGecko /coins/markets only supports one vs_currency at a time.
    // We will fetch both and merge.

    const [inrRes, cadRes] = await Promise.all([
        fetch(`${COINGECKO_API_BASE}/coins/markets?vs_currency=inr&${params.toString()}`),
        fetch(`${COINGECKO_API_BASE}/coins/markets?vs_currency=cad&${params.toString()}`)
    ]);

    if (!inrRes.ok || !cadRes.ok) {
        throw new Error('Failed to fetch market data');
    }

    const inrData: CoinMarket[] = await inrRes.json();
    const cadData: CoinMarket[] = await cadRes.json();

    // Merge data
    // Assuming the order and items are roughly the same or we map by ID.
    // Map CAD data by ID for easy lookup
    const cadMap = new Map(cadData.map((coin) => [coin.id, coin] as [string, CoinMarket]));

    const merged = inrData.map((coin) => {
        const cadCoin = cadMap.get(coin.id);
        return {
            ...coin,
            current_price_inr: coin.current_price,
            current_price_cad: cadCoin?.current_price,
            market_cap_inr: coin.market_cap,
            market_cap_cad: cadCoin?.market_cap,
            // Add other fields as needed, or just keep the structure and add specific currency fields
        };
    });

    return merged;
};
