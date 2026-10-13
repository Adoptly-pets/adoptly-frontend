# React Project

This project is a React-based frontend application for Adoptly, a pet adoption platform. It is built with modern web development tools and follows best practices for scalability and maintainability.

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: CSS Modules, TailwindCSS (if applicable)
- **State Management**: Context API, Redux (if applicable)
- **Backend Integration**: REST API (Adoptly backend)
- **Build Tool**: Vite
- **Linting and Formatting**: ESLint, Prettier
- **CI/CD**: GitHub Actions

## Project Structure

- **src/**
  - **components/** — Reusable UI components (e.g., Button).
  - **pages/** — Components representing application pages (e.g., HomePage).
  - **services/** — Logic for API interactions (e.g., requests to the Adoptly backend).
  - **App.tsx** — Main application component.
  - **main.tsx** — Entry point for rendering React.
  - **index.css** — Global styles.
- **public/** — Static files (e.g., favicon, images).
- **.env.example** — Template for environment variables (e.g., VITE_API_URL).
- **.eslintrc.json** — ESLint configuration for code linting.
- **.prettierrc** — Prettier configuration for code formatting.
- **.github/workflows/ci.yml** — GitHub Actions workflow for CI.

## Getting Started

### Prerequisites

- **Node.js**: v20 or higher
- **npm**: v10 or higher

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project_directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy .env.example to .env and configure environment variables:

   ```bash
   cp .env.example .env
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Troubleshooting

- Port Conflict: If port 5173 is already in use, update the vite.config.js file to use a different port.
- Missing .env File: Ensure you have created a .env file based on .env.example.

## API Configuration

To connect to the Adoptly backend, configure the `VITE_API_URL` in the `.env` file. Example:

```
VITE_API_URL=http://backend-api.com
```

## Location data

Region and settlement data for Ukrainian location pickers are generated from
the State Codifier of Administrative-Territorial Units and Territories of
Territorial Hromadas (KATOTTG), published by the Ministry for Development of
Communities, Territories and Infrastructure of Ukraine.

- Source: https://mininfra.gov.ua/diialnist/rozvytok-mistsevoho-samovriaduvannia/kodyfikator-administratyvno-terytorialnykh-odynyts-ta-terytorii-terytorialnykh-hromad
- KATOTTG edition: 2026-07-07
- Regenerate: place the XLSX at `scripts/data/kodifikator.xlsx`, then run `npm run generate:cities`.

## Available Scripts

- `npm run dev` — Starts the development server.
- `npm run build` — Builds the project for production.
- `npm run preview` — Previews the built project.
- `npm run lint` — Runs ESLint to check code quality.
- `npm run format` — Formats code using Prettier.
- `npm run generate:cities` — Regenerates `src/constants/cities/*.json` from the KATOTTG XLSX.

## Code Style

- The project uses ESLint and Prettier to enforce consistent code style.
- Before committing, run:
  ```bash
  npm run lint
  npm run format
  ```
- Configuration details are in `.eslintrc.json` and `.prettierrc`.

## Continuous Integration

- A GitHub Actions workflow (`ci.yml`) runs on pull requests to `main`, ensuring the project builds successfully (`npm install` and `npm run build`).
- Status checks must pass before merging pull requests.

## Branch Protection Rules

- The `main` branch is protected to ensure code quality and collaboration:
  - Pull requests are required: Direct pushes to `main` are blocked.
  - Minimum 1 review: At least one approval is required before merging.
  - Status checks: CI check (build) must pass before merging.
- To contribute, create a new branch, push changes, and open a pull request:
  ```bash
  git checkout -b feature/OSTC-XX-your-feature
  git push origin feature/OSTC-XX-your-feature
  ```

## Contributing

For guidelines on how to contribute, please see `CONTRIBUTING.md`.

## Collaboration Guidelines

- Keep components modular and reusable in `src/components/`.
- Add new pages to `src/pages/`.
- Place API-related logic in `src/services/`.
- Use PascalCase for component and file names (e.g., `HomePage.tsx`).
- Avoid global styles; prefer CSS Modules or other isolated styling approaches.

## Environment Requirements

- **Node.js**: v20 or higher
- **npm**: v10 or higher

## License

This project is licensed under the MIT License.
