# AI Experts Assignment (JS/TS)

## Project Description

This repository is a small JavaScript/TypeScript project created to demonstrate:

- how to run a Node.js project reliably in both local and container environments,
- how to ensure reproducible installs by pinning dependency versions,
- how to detect a bug using tests,
- how to apply a minimal, reviewable fix.

The repository is designed so that the test suite can be executed:

1. Locally on a developer machine
2. Inside Docker in a clean CI-style environment

Both approaches should produce the same results.

## Requirements

Before running the project, install:

- Node.js (version 18 or newer recommended)
- npm (comes with Node.js)
- Docker (only needed for container testing)

To verify installation:

```bash
node -v
npm -v
docker -v
```

## Running Tests Locally (Step-by-Step)

Follow these steps if you want to run the project directly on your machine.

### Step 1 — Open the project folder

Clone the repository and move into it:

```bash
git clone https://github.com/malik-dev28/a2sv-js-assignment.git
cd a2sv-js-assignment
```

### Step 2 — Install dependencies

Install packages from package.json:

```bash
npm install
```

This will:

- download all required libraries
- install exact pinned versions
- prepare the project for execution

### Step 3 — Run the test suite

Execute:

```bash
npm test
```

This will:

- run the project's automated tests
- verify that the bug fix works correctly
- confirm the project runs as expected

If everything is correct, the tests should pass with no extra setup.

## Running Tests with Docker (Step-by-Step)

Use this method to simulate a clean CI environment. Docker ensures the project
works even without local Node/npm setup.

### Step 1 — Make sure Docker is running

Check:

```bash
docker -v
```

If Docker is not running, start it first.

### Step 2 — Build the Docker image

From the project root folder, run:

```bash
docker build -t ai-assignment-tests .
```

This step will:

- create a container image
- install Node inside the container
- copy the project files
- install dependencies using npm install

This may take a minute the first time.

### Step 3 — Run the container

```bash
docker run --rm ai-assignment-tests
```

This will:

- start a clean container
- automatically run npm test
- display the test results in your terminal
- delete the container after it finishes

## Expected Result

Both local and Docker runs should:

- install dependencies successfully
- execute the same test suite
- produce identical results

If both pass, the project is working correctly.
