#!/bin/bash

echo "Testing IsThisPersonReal Backend..."
echo "=================================="

# Check if backend is running
echo "1. Checking if backend is running..."
if curl -s http://localhost:8080/api/graphiql > /dev/null; then
    echo "✅ Backend is running on http://localhost:8080/api"
else
    echo "❌ Backend is not running. Please start it first with: ./mvnw spring-boot:run"
    exit 1
fi

# Test GraphQL query
echo ""
echo "2. Testing GraphQL search query..."
QUERY='{"query": "query { searchPerson(name: \"John Smith\") { id name platform confidence isVerified } }"}'

RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "$QUERY" \
  http://localhost:8080/api/graphql)

if echo "$RESPONSE" | grep -q "John Smith"; then
    echo "✅ GraphQL query successful"
    echo "Response: $RESPONSE"
else
    echo "❌ GraphQL query failed"
    echo "Response: $RESPONSE"
fi

echo ""
echo "3. Testing H2 Console..."
if curl -s http://localhost:8080/api/h2-console > /dev/null; then
    echo "✅ H2 Console is accessible at http://localhost:8080/api/h2-console"
else
    echo "❌ H2 Console is not accessible"
fi

echo ""
echo "Test completed!" 