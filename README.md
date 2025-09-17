# Playwright Login Test v2

Next.js project with Playwright automated testing for login functionality.

## Project Structure

```
playwright-login-test-v2
├── src
│   ├── pages
│   │   ├── index.tsx          # Main dashboard/home page
│   │   ├── _app.tsx           # Next.js app wrapper
│   │   └── api
│   │       ├── list-scenarios.ts    # API endpoint for test scenarios
│   │       └── run-playwright.ts    # API endpoint for running tests
│   └── styles
│       ├── globals.css        # Global CSS styles
│       └── login.css          # Login-specific styles
├── tests
│   ├── login.spec.ts          # Playwright login tests
│   └── null.spec.ts           # Additional test specifications
├── test-results               # Playwright test results (auto-generated)
├── playwright.config.ts       # Playwright configuration
├── package.json               # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd playwright-login-test-v2
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Install Playwright browsers:

    ```bash
    npx playwright install
    ```

5. Run the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and go to `http://localhost:3000` to see the application.

## Running Tests

To run Playwright tests:

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test tests/login.spec.ts

# Show test report
npx playwright show-report
```

## Features

-   Next.js application with TypeScript support
-   Playwright automated testing framework
-   Login functionality testing
-   API endpoints for test management
-   Test results dashboard

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.
