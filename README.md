This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Objective: The primary goal of this assignment is to develop a personal finance visualizer web application using Next.js, React, shadcn/ui, Recharts, and MongoDB. The application will enable users to track their income and expenses, categorize transactions, and set budgets. The expected learning outcomes include proficiency in front-end development with React and Next.js, back-end development with MongoDB, UI design with shadcn/ui, data visualization with Recharts, and implementing responsive designs with error handling.

Step-by-Step Instructions:

Project Setup and Initialization:

Create Project Directory: Create a new directory for your project using the command line: mkdir personal-finance-visualizer && cd personal-finance-visualizer
Initialize Next.js Project: Initialize a Next.js project using npx create-next-app@latest .
Install Dependencies: Install necessary dependencies using npm install @radix-ui/react-slot recharts mongoose zod react-hook-form tailwind-merge class-variance-authority clsx date-fns and npm install -D prettier-plugin-tailwindcss.
Configure shadcn/ui: Initialize shadcn/ui by running npx shadcn-ui@latest init. Follow the prompts to configure your project with the desired styling and components.
Set up MongoDB: Ensure you have MongoDB installed locally or are using a cloud-based MongoDB service like MongoDB Atlas. Obtain the connection string for your MongoDB database. Create a .env.local file in your project root and add MONGODB_URI=<your_mongodb_connection_string>.
Development Process:

Stage 1: Basic Transaction Tracking

Define Transaction Schema (MongoDB): Create a models directory and within it, create a transaction.js file. Define a Mongoose schema for transactions with fields like amount (Number), date (Date), and description (String). Use Zod to ensure type safety and validation.
Create API Routes (Next.js): In the app/api directory, create API routes for:
POST /api/transactions: To create a new transaction.
GET /api/transactions: To retrieve all transactions.
PUT /api/transactions/[id]: To update an existing transaction.
DELETE /api/transactions/[id]: To delete a transaction.
Use the Mongoose model to interact with MongoDB in these API routes. Handle errors gracefully.
Develop Transaction Form (React): Create a React component for adding/editing transactions. This form should include fields for amount, date, and description. Use React Hook Form and Zod for form validation and state management.
Develop Transaction List View (React): Create a React component to display a list of transactions. Fetch transaction data from the GET /api/transactions endpoint and render it in a table or list format. Implement the delete functionality, using the DELETE api call.
Implement Monthly Expenses Bar Chart (Recharts): Use Recharts to create a bar chart that displays monthly expenses. Aggregate transaction data by month and pass it to the Recharts component. Ensure the chart is responsive.
Implement Basic Form Validation: Ensure that all form fields (amount, date, description) have appropriate validation.
Stage 2: Categories

Update Transaction Schema (MongoDB): Add a category field (String) to the transaction schema in transaction.js.
Define Predefined Categories: Decide on a set of predefined categories for transactions (e.g., Food, Rent, Utilities, Transportation, Entertainment). Store these categories in an array that can be used in the frontend for dropdown selection in the transaction form.
Update Transaction Form (React): Add a dropdown menu to the transaction form to select a category for each transaction. Populate this dropdown with the predefined categories.
Create API routes for Category Management: Add the following API routes to manage categories:
GET /api/categories: retrieves list of predefined categories
POST /api/categories: Adds a new category to the list
Implement Category-wise Pie Chart (Recharts): Use Recharts to create a pie chart that displays the breakdown of expenses by category. Aggregate transaction data by category and pass it to the Recharts component. Ensure the chart is responsive.
Create Dashboard (React): Create a dashboard component to display summary information.
Implement Summary Cards:
Total Expenses: Calculate and display the total expenses for the current month.
Category Breakdown: Display the percentage breakdown of expenses for each category.
Most Recent Transactions: Display a list of the most recent transactions.
Stage 3: Budgeting

Create Budget Schema (MongoDB): Create a budget.js model file and define a Mongoose schema for budgets with fields like category (String), and amount (Number), and month (Date or String representing the month).
Create API Routes (Next.js): Create API routes for:
POST /api/budgets: To create/update a budget for a category.
GET /api/budgets: To retrieve all budgets.
Develop Budget Form (React): Create a React component for setting monthly category budgets. This form should include fields for category and budget amount. Use React Hook Form for form management.
Implement Budget vs. Actual Comparison Chart (Recharts): Use Recharts to create a chart that compares the budgeted amount for each category with the actual spending. Display this chart on the dashboard. (Combination chart of bar and line would be suitable.)
Implement Spending Insights: Provide simple spending insights based on the budget vs. actual comparison. For example, highlight categories where the user is over budget. Display these insights on the dashboard.
Styling and Design:

Use shadcn/ui Components: Utilize the pre-built components from shadcn/ui to create a consistent and visually appealing user interface.
Implement Responsive Design: Ensure that the application is responsive and adapts to different screen sizes using CSS. Use media queries to adjust the layout and styling for different devices.
Handle Error States: Implement error handling and display informative error messages to the user. Use try...catch blocks to handle potential errors in API calls and other operations. Use shadcn/ui's Alert component to display errors.
Accessibility: Ensure your application is accessible by using semantic HTML, providing alternative text for images, and ensuring sufficient color contrast.
Deployment:

Choose a Deployment Platform: Select a platform for deploying your Next.js application (e.g., Vercel, Netlify, AWS Amplify).
Configure Environment Variables: Set the MONGODB_URI environment variable in your deployment platform's settings.
Deploy the Application: Follow the deployment instructions provided by your chosen platform.
Test the Deployment: Verify that the application is running correctly and that all features are working as expected.
Submission Guidelines:

GitHub Repository: Create a public GitHub repository for your project. Ensure that the repository contains all source code, configuration files, and a .gitignore file that excludes node_modules and other unnecessary files.
Live Deployment URL: Deploy your application to a live environment and provide the URL for the deployed application.
Basic README: Create a README.md file in your GitHub repository that includes:
Project Title
Brief description of the application
Instructions for setting up the project locally (including how to install dependencies and configure the environment)
Live Deployment URL
Brief overview of the features implemented
Multiple Submissions: You can submit multiple times at different stages of development. Higher stages will receive priority in evaluation.
No Authentication: Do not implement any authentication or login functionality. Submissions with login/signup will not be evaluated.
Evaluation Criteria: Feature implementation (40%), Code quality (30%), UI/UX design (30%).
