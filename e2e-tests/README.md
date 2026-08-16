# E2E Testing Setup for Spiderman Application

This README provides an overview of the end-to-end (E2E) testing setup for the Spiderman application using Playwright.

## Project Structure

The E2E tests are organized in the following structure:

```
e2e-tests
├── tests
│   └── spidey.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

## Installation

To get started with the E2E tests, ensure you have Node.js installed. Then, navigate to the `e2e-tests` directory and install the dependencies:

```bash
npm install
```

## Running Tests

To run the E2E tests, use the following command:

```bash
npm test
```

This command will execute the tests defined in the `tests` directory using Playwright.

## Test Overview

The main test file is located at `tests/spidey.spec.js`. This file contains a Playwright test that:

1. Navigates to the Spiderman application running at `http://localhost`.
2. Verifies that the main header is visible.
3. Interacts with the attack button.
4. Asserts that the combat log updates accordingly.

## Configuration

The Playwright configuration is defined in `playwright.config.js`, where you can adjust settings such as the test directory and timeout values.

## Additional Information

For more details on Playwright and its capabilities, refer to the [Playwright documentation](https://playwright.dev/docs/intro).