# Crypto Price Tracker

This project contains the Python Flask implementation of the Cryptocurrency Market Updates App, structured using the MVC pattern.

## Prerequisites

- Python 3.8+
- `pip` (Python package installer)

## Setup

1.  Navigate to this directory:
    ```bash
    cd using_python
    ```

2.  (Optional but recommended) Create and activate a virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Running the Application

Start the Flask development server:

```bash
python run.py
```

The server will start at `http://localhost:5000`.

## Running Tests

To run the unit tests, verify the API endpoints:

```bash
# Ensure you are in the workspace root or set PYTHONPATH
export PYTHONPATH=$PYTHONPATH:$(pwd)
python tests.py
```

## API Endpoints

-   `GET /api/health`: Check if the API and CoinGecko service are reachable.
-   `GET /api/categories`: List coin categories.
-   `GET /api/coins`: List coins (supports `page` and `per_page` query params).
-   `GET /api/market`: Get market data for coins.
    -   Query Params:
        -   `ids`: Comma-separated list of coin IDs (e.g., `bitcoin,ethereum`).
        -   `category`: Category ID.
    -   Returns merged data with `current_price_inr`, `current_price_cad`, etc.

## Structure

-   `run.py`: Application entry point.
-   `app/`: Main application directory.
    -   `__init__.py`: App factory and blueprint registration.
    -   `controllers/`: Request handlers (Controllers).
        -   `main_controller.py`: API routes.
    -   `services/`: Business logic (Services).
        -   `coingecko_service.py`: Interaction with CoinGecko API.
-   `tests.py`: Unit tests.
-   `requirements.txt`: Project dependencies.
