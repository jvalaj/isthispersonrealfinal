# IsThisPersonReal Search Backend

A simple Spring Boot application with GraphQL API for searching person profiles across social media platforms.

## Features

- GraphQL API for person search
- H2 in-memory database with sample data
- CORS configured for frontend integration
- Returns top 5 search results ordered by confidence

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Running the Application

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the application:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080/api`

## API Endpoints

- **GraphQL Playground**: `http://localhost:8080/api/graphiql`
- **H2 Console**: `http://localhost:8080/api/h2-console`

## GraphQL Query Example

```graphql
query {
  searchPerson(name: "John Smith") {
    id
    name
    platform
    profileUrl
    confidence
    isVerified
    lastSeen
  }
}
```

## Sample Data

The application comes pre-loaded with sample data for testing:
- John Smith (LinkedIn, Twitter, Facebook, Instagram)
- Sarah Johnson (LinkedIn, Twitter, Facebook)
- Michael Brown (LinkedIn, Instagram)
- Emily Davis (Twitter, Facebook, Instagram)
- And more...

## Deployment

This backend can be deployed to various platforms:
- **Railway**: Easy deployment with Git integration
- **Render**: Free tier available
- **Heroku**: Requires credit card for verification
- **AWS/GCP**: More complex setup but scalable

## Frontend Integration

The backend is configured to accept requests from:
- `https://isthispersonreal.netlify.app` (production)
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React dev server) 