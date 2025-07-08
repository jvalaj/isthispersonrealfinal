# Deployment Guide

## Quick Deploy Options

### 1. Railway (Recommended - Free Tier)
1. Go to [Railway](https://railway.app/)
2. Connect your GitHub account
3. Create a new project from GitHub
4. Select this repository
5. Railway will automatically detect it's a Java app and deploy it
6. The app will be available at `https://your-app-name.railway.app/api`

### 2. Render (Free Tier)
1. Go to [Render](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `./mvnw clean package -DskipTests`
5. Set start command: `java -jar target/search-backend-1.0.0.jar`
6. Deploy

### 3. Heroku (Requires Credit Card)
1. Install Heroku CLI
2. Run: `heroku create your-app-name`
3. Run: `git push heroku main`
4. The app will be available at `https://your-app-name.herokuapp.com/api`

## Environment Variables

Set these environment variables in your deployment platform:

```bash
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080
```

## Database Configuration

The app uses H2 in-memory database by default. For production, you can:

1. Use Railway's PostgreSQL addon
2. Use Render's PostgreSQL service
3. Use Heroku Postgres

Update `application.yml` to use PostgreSQL:

```yaml
spring:
  datasource:
    url: ${DATABASE_URL}
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
```

Add PostgreSQL dependency to `pom.xml`:

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

## Frontend Integration

After deployment, update the frontend to use your deployed backend URL:

```typescript
// In src/App.tsx, change the fetch URL:
const response = await fetch("https://your-backend-url.railway.app/api/graphql", {
  // ... rest of the code
});
```

## Testing the Deployment

1. Visit `https://your-backend-url.railway.app/api/graphiql`
2. Test the GraphQL query:
```graphql
query {
  searchPerson(name: "John Smith") {
    id
    name
    platform
    confidence
    isVerified
  }
}
```

## Troubleshooting

- If the app doesn't start, check the logs in your deployment platform
- Make sure Java 17 is available in your deployment environment
- Verify the port is correctly exposed (usually 8080)
- Check that CORS is properly configured for your frontend domain 