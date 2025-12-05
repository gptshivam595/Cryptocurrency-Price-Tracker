'use client';

import { useEffect, useState } from 'react';

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
        .then(res => res.json())
        .then(data => setCoins(data));
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">API IS WORKING!</h1>
    </div>
  );
}