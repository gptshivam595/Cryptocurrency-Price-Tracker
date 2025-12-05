import unittest
from app import create_app
from unittest.mock import patch

class TestCryptoApp(unittest.TestCase):
    def setUp(self):
        self.app_instance = create_app()
        self.app = self.app_instance.test_client()
        self.app.testing = True

    @patch('app.controllers.main_controller.fetch_ping')
    def test_health(self, mock_ping):
        mock_ping.return_value = True
        response = self.app.get('/api/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"status": "ok", "message": "CoinGecko API is reachable"})

    @patch('app.controllers.main_controller.fetch_categories')
    def test_categories(self, mock_categories):
        mock_categories.return_value = [{"id": "layer-1", "name": "Layer 1"}]
        response = self.app.get('/api/categories')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, [{"id": "layer-1", "name": "Layer 1"}])

    @patch('app.controllers.main_controller.fetch_coins')
    def test_coins(self, mock_coins):
        mock_coins.return_value = [{"id": "bitcoin", "name": "Bitcoin"}]
        response = self.app.get('/api/coins?page=1&per_page=1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, [{"id": "bitcoin", "name": "Bitcoin"}])

    @patch('app.controllers.main_controller.fetch_market_data')
    def test_market(self, mock_market):
        mock_market.return_value = [{"id": "bitcoin", "current_price_inr": 5000000}]
        response = self.app.get('/api/market?ids=bitcoin')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, [{"id": "bitcoin", "current_price_inr": 5000000}])

    def test_market_missing_params(self):
        response = self.app.get('/api/market')
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()
