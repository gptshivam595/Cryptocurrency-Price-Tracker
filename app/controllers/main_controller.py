from flask import Blueprint, jsonify, request
from app.services.coingecko_service import fetch_ping, fetch_categories, fetch_coins, fetch_market_data

main_bp = Blueprint('main', __name__)

@main_bp.route('/api/health', methods=['GET'])
def health():
    is_alive = fetch_ping()
    if is_alive:
        return jsonify({"status": "ok", "message": "CoinGecko API is reachable"}), 200
    else:
        return jsonify({"status": "error", "message": "CoinGecko API is unreachable"}), 503

@main_bp.route('/api/categories', methods=['GET'])
def categories():
    try:
        data = fetch_categories()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main_bp.route('/api/coins', methods=['GET'])
def coins():
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=10, type=int)
    try:
        data = fetch_coins(page=page, per_page=per_page)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main_bp.route('/api/market', methods=['GET'])
def market():
    ids = request.args.get('ids')
    category = request.args.get('category')
    
    if not ids and not category:
        return jsonify({"error": "Either 'ids' or 'category' query parameter is required"}), 400

    try:
        data = fetch_market_data(ids=ids, category=category)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
