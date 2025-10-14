#!/bin/bash
# You can use it by running: ./start.sh
# Or using docker compose up directly. Both work fine!
# It's helpful for:
# - New developers joining the project
# - Quick setup without remembering Docker commands
# - Documentation of available services and credentials
# - Validation that required files exist before starting

echo "🚀 Starting Seatre Application..."

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if .env file exists in root directory
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found in root directory"
    echo "📝 Please create a .env file with your configuration"
    echo "💡 You can reference server/.env.example for required variables"
    exit 1
fi

# Start services with Docker Compose
echo "🐳 Starting services with Docker Compose..."
docker compose up -d

echo ""
echo "✅ Services started successfully!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001" 
echo "🔍 Health Check: http://localhost:3001/healthz"
echo ""
echo "📋 Demo Login Credentials:"
echo "   Admin: admin@localhost.com / secret"
echo ""
echo "📖 Available Commands:"
echo "   docker compose logs -f        # View logs"
echo "   docker compose stop           # Stop services"
echo "   docker compose down           # Stop and remove containers"
echo ""