from app import create_app

app = create_app()

if __name__ == '__main__':
    # Changed default port to 5000 to match user expectation from curl command
    app.run(debug=True, port=5000)
