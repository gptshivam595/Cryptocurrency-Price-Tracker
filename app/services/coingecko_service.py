import requests

COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3'

def fetch_coins(page=1, per_page=10):
    url = f"{COINGECKO_API_BASE}/coins/markets"
    params = {
        'vs_currency': 'usd',
        'order': 'market_cap_desc',
        'per_page': per_page,
        'page': page,
        'sparkline': 'false'
    }
    response = requests.get(url, params=params)
    if not response.ok:
        raise Exception(f"Failed to fetch coins: {response.reason}")
    return response.json()

def fetch_categories():
    url = f"{COINGECKO_API_BASE}/coins/categories/list"
    response = requests.get(url)
    if not response.ok:
        raise Exception(f"Failed to fetch categories: {response.reason}")
    return response.json()

def fetch_market_data(ids=None, category=None):
    """
    Fetches market data for given IDs or category in both INR and CAD.
    Merges the results.
    """
    params = {}
    if ids:
        params['ids'] = ids
    if category:
        params['category'] = category

    # Fetch INR
    params_inr = params.copy()
    params_inr['vs_currency'] = 'inr'
    
    # Fetch CAD
    params_cad = params.copy()
    params_cad['vs_currency'] = 'cad'

    response_inr = requests.get(f"{COINGECKO_API_BASE}/coins/markets", params=params_inr)
    response_cad = requests.get(f"{COINGECKO_API_BASE}/coins/markets", params=params_cad)

    if not response_inr.ok or not response_cad.ok:
         raise Exception('Failed to fetch market data')

    inr_data = response_inr.json()
    cad_data = response_cad.json()

    # Merge data
    cad_map = {coin['id']: coin for coin in cad_data}
    
    merged = []
    for coin in inr_data:
        cad_coin = cad_map.get(coin['id'])
        merged_coin = coin.copy()
        # Add specific fields
        merged_coin['current_price_inr'] = coin.get('current_price')
        merged_coin['current_price_cad'] = cad_coin.get('current_price') if cad_coin else None
        merged_coin['market_cap_inr'] = coin.get('market_cap')
        merged_coin['market_cap_cad'] = cad_coin.get('market_cap') if cad_coin else None
        
        merged.append(merged_coin)
        
    return merged

def fetch_ping():
    try:
        response = requests.get(f"{COINGECKO_API_BASE}/ping")
        return response.ok
    except Exception as e:
        print(f"Error pinging CoinGecko: {e}")
        return False
