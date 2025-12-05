# Crypto Price Tracker API

A Next.js-based application that provides a cryptocurrency market data API. It fetches real-time data from CoinGecko and exposes authenticated endpoints with support for pagination and multi-currency conversion (INR & CAD).

## Features

- **List Coins**: Fetch a paginated list of cryptocurrencies.
- **Categories**: Retrieve available cryptocurrency categories.
- **Market Data**: Get real-time market data for specific coins or categories, including current price and market cap in **INR** and **CAD**.
- **Authentication**: Secure API endpoints using an API Key or Bearer Token.
- **Documentation**: Integrated Swagger UI for interactive API exploration.
- **Unit Tests**: Comprehensive test coverage (>90%) using Jest.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Data Source**: [CoinGecko API](https://www.coingecko.com/en/api)
- **Testing**: Jest, React Testing Library
- **Documentation**: Swagger UI (`next-swagger-doc`, `swagger-ui-react`)
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd crypto-price-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory (optional, defaults provided for demo):
   ```env
   API_KEY=secure-token
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## API Documentation

Interactive API documentation is available at:
**[http://localhost:3000/docs](http://localhost:3000/docs)**

### Authentication

All API endpoints (except documentation) require authentication. You must provide one of the following headers:

- **x-api-key**: `secure-token` (or your configured key)
- **Authorization**: `Bearer secure-token`

### Endpoints

#### 1. List Coins
`GET /api/coins`

Parameters:
- `page` (optional, default: 1): Page number.
- `per_page` (optional, default: 10): Items per page.

Example:
```bash
curl -H "x-api-key: secure-token" "http://localhost:3000/api/coins?page=1&per_page=5"
```

#### 2. List Categories
`GET /api/categories`

Example:
```bash
curl -H "x-api-key: secure-token" "http://localhost:3000/api/categories"
```

#### 3. Market Data
`GET /api/market`

Parameters (at least one required):
- `ids`: Comma-separated list of coin IDs (e.g., `bitcoin,ethereum`).
- `category`: Category ID (e.g., `layer-1`).

Response includes `current_price_inr`, `current_price_cad`, `market_cap_inr`, `market_cap_cad`.

Example:
```bash
curl -H "x-api-key: secure-token" "http://localhost:3000/api/market?ids=bitcoin"
```

## Testing

Run the unit tests:

```bash
npm test
```

Check test coverage:

```bash
npm test -- --coverage
```

Current coverage is **>95%**.

## Project Structure

```
src/
├── app/
│   ├── api/            # API Routes (coins, categories, market, docs)
│   ├── docs/           # Swagger UI page
│   └── page.tsx        # Landing page
├── lib/
│   ├── coingecko.ts    # CoinGecko API helper functions
│   └── swagger.ts      # Swagger configuration
├── middleware.ts       # Authentication middleware
```
