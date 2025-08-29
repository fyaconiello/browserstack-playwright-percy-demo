# node-js-playwright-browserstack
This repo contains samples for running [Playwright](https://playwright.dev/docs/intro) tests on BrowserStack using the browserstack-node-sdk.

![BrowserStack Logo](https://d98b8t1nnulk5.cloudfront.net/production/images/layout/logo-header.png?1469004780)

## Setup

* Clone the repo `git clone -b sdk https://github.com/browserstack/node-js-playwright-browserstack.git` and run `cd node-js-playwright-browserstack`.
* **Environment Variables Setup (Recommended):**
  * Copy `.env.example` to `.env`: `cp .env.example .env`
  * Update `.env` with your [BrowserStack Username and Access Key](https://www.browserstack.com/accounts/settings)
  * Update `.env` with your [Percy Token](https://docs.percy.io/docs/installing-and-configuring-percy) for visual testing
  * The `.env` file will be automatically loaded when running tests
* **Alternative:** Set `BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY`, and `PERCY_TOKEN` as environment variables
* Run `npm i` to install the dependencies.

## Running your tests

- To run the sample tests in parallel across the platforms specified in the `browserstack.yml`, run `npm run sample-test`.
- To run the sample local tests in parallel across the platforms specified in the `browserstack.yml`, run `npm run sample-local-test`.

## Environment Variables

The project now supports automatic loading of environment variables from a `.env` file. This provides several benefits:

* **Security**: Keep sensitive credentials out of your code
* **Flexibility**: Easy to switch between different environments (dev, staging, prod)
* **Team Collaboration**: Share `.env.example` without exposing actual credentials

### Available Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BROWSERSTACK_USERNAME` | Your BrowserStack username | Required |
| `BROWSERSTACK_ACCESS_KEY` | Your BrowserStack access key | Required |
| `BROWSERSTACK_PROJECT_NAME` | Project name for reporting | "Colab - PercyPlaywrightNodeJS" |
| `BROWSERSTACK_BUILD_NAME` | Build name for reporting | "SmokeTest - PlaywrightNodeJS" |
| `BROWSERSTACK_BUILD_IDENTIFIER` | Build identifier format | "#${BUILD_NUMBER}" |
| `PERCY_TOKEN` | Your Percy authentication token | Required for Percy tests |

### Testing Environment Variables

To verify your environment variables are loaded correctly:

```bash
npm run test-with-env
```

### Ensuring Environment Variables in Tests

There are multiple ways to ensure your `.env` file is loaded when running tests:

#### 1. **Automatic Loading (Recommended)**
- **Playwright Config Files**: Both `playwright.config.js` and `playwright.local.config.js` now automatically load `.env`
- **Test Setup File**: All tests can import `tests/setup.js` to ensure environment variables are loaded
- **Test Runner Script**: Use the provided test runner for guaranteed environment variable loading

#### 2. **Test Runner Scripts**
```bash
# Run tests with environment verification
npm run test-runner

# Run specific test types
npm run test-prod      # Production tests
npm run test-percy     # Percy tests  
npm run test-local     # Local tests

# Verify environment setup
npm run test-env-verify
```

#### 3. **Manual Import in Tests**
```javascript
// At the top of your test files
require('./setup.js');  // Loads environment variables
```

#### 4. **Direct Environment Loading**
```javascript
// In any Node.js file
require('dotenv').config();
```

## Notes
* You can view your test results on the [BrowserStack Automate dashboard](https://www.browserstack.com/automate)
* Understand how many parallel sessions you need by using our [Parallel Test Calculator](https://www.browserstack.com/automate/parallel-calculator?ref=github)
