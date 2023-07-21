
# Digitizer

A full fledged digital project selector tool for B2B sales.

## Installation
Clone the project

```bash
  git clone https://github.com/dnyaneshwargiri/coding-challenge-fb
```
Install dependencies with npm/ yarn/ pnpm whatever package manager you like. I'm using npm here.

```bash
  cd frontend 
  npm install 
```
    
```bash
  cd backend 
  npm install 
```
## Database Setup

Database- PostgresSQL.

Update the DATABASE_URL in .env file.

Execute below commands to generate and migrate PostgresSQL database requried for digitizer application.
```bash
  cd backend
  npx prisma generate --schema=./src/prisma/schema.prisma
  npx prisma migrate dev --name init --schema=./src/prisma/schema.prisma 

```
## Run Locally


### Start Frontend

```bash
  cd frontend
```


Run the frontend

```bash
  npm run start
```

### Start Backend

```bash
  cd backend

```

Start the Apollo Server

```bash
  npm run devStart
   /**OR*/ 
  npm run start

```



## Usage/Examples

By default Frontend is picking questionnarie and pages data from local json file viz. __frontend/src/assets/questionnaire-config.json__

__File- questionnaire.service.ts__
```typescript

  //API call to fetch JSON local file.
  getQuestionnaireConfigFile(): Observable<QuestionnaireConfig> {
    return this.http.get<QuestionnaireConfig>(
      "/assets/questionnaire-config.json"
    );
  }

```

Once you have Backend server up and connected to PostgresSQL provided in .env file then comment above method and uncomment the below method to take data from PostgresSQL over Apollo Client.

__File- app.component.ts__
```typescript
this.getQuestionnaireConfigFile();
//this.getQuestionnaireConfig();

```
For getting a data from graphql via Apollo Client, You can customize GraphQL uri
```typescript
const uri = 'http://localhost:4000/'; // <-- add the URL of the GraphQL server here
```
## Running Tests

To run tests, run the following command in either frontend or backend directory.

```bash
  npm run test
```


## Screenshots

![App Screenshot](https://raw.githubusercontent.com/dnyaneshwargiri/coding-challenge-fb/main/screenshots/question%20page-1.png)

![App Screenshot](https://raw.githubusercontent.com/dnyaneshwargiri/coding-challenge-fb/main/screenshots/question%20page-2.png)



![App Screenshot](https://raw.githubusercontent.com/dnyaneshwargiri/coding-challenge-fb/main/screenshots/recommend%20page.png)
## Environment Variables

To run this project on live database, you will need to add the following environment variables to your .env file

`DATABASE_URL`



## Documentation

[Technical Workflow](https://github.com/dnyaneshwargiri/coding-challenge-fb/blob/main/documentation.adoc)


## Tech Stack

**Client:** Angular 16, TailwindCSS, RxJs.

**Server:** Node, Express, Prisma, Appolo Server, Prisma Client

**Database:** Postgresql 15.0.1



