# Algolia Asssessment JC

![alt text](documentation/image.png)

## Getting Started
The app is hosted to Vercel and can be accessed [here](https://algolia-assessment.vercel.app/)

### Local Setup
1. `git clone https://github.com/Case104/algolia-assessment.git`
2. Run `npm install` to install the dependencies
3. Create a `.env.local` file in the root of the project and add the following environment variables:
```
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_API_KEY=
```
4. Run `npm run dev` to start the development server
5. Open `http://localhost:3000` in your browser

## Features
- Authentication with GitHub
- Initialize Algolia Client
- Display Indices and Rules
- Copy Rules from one index to another
- Delete Rules
- Load cards into Index
- Search card attributes
- Deployed to Vercel