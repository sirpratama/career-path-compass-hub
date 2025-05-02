## Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Node.js:** Version 18.x or later recommended. You can download it from [nodejs.org](https://nodejs.org/).
-   **npm:** Usually comes with Node.js. You can check your version using `npm -v`.
-   **PostgreSQL:** A running PostgreSQL database instance. You can download it from [postgresql.org](https://www.postgresql.org/) or use a Docker image.
-   **Git:** For cloning the repository.

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/career-path-compass-hub.git
    cd career-path-compass-hub
    ```
    *(Replace `your-username` with the actual username or organization)*

2.  **Install dependencies:**
    This project uses npm for package management. Install both frontend and backend dependencies:
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    The backend server requires environment variables for configuration, especially for the database connection and JWT secrets.
    -   Create a `.env` file in the `server/` directory: `server/.env`
    -   Add the following variables, replacing the placeholder values with your actual configuration:

        ```dotenv
        # server/.env

        # PostgreSQL Database Connection
        DB_USER=your_db_user
        DB_HOST=localhost
        DB_DATABASE=your_db_name
        DB_PASSWORD=your_db_password
        DB_PORT=5432 # Or your DB port

        # JWT Secret Key
        JWT_SECRET=your_very_strong_secret_key # Replace with a strong, random secret

        # Google Generative AI API Key (Optional, if using AI features)
        GEMINI_API_KEY=your_gemini_api_key
        ```

4.  **Database Setup:**
    -   Ensure your PostgreSQL server is running.
    -   Connect to your PostgreSQL instance (using `psql` or a GUI tool like pgAdmin).
    -   Create the database specified in your `server/.env` file (e.g., `CREATE DATABASE your_db_name;`).
    -   Create the necessary user and grant privileges if you haven't already.
    -   **(TODO: Add instructions for running database migrations if applicable. Check if there's a migration script or tool like Sequelize/TypeORM used.)**

5.  **Run the Application:**
    You need to run both the frontend development server and the backend server.

    -   **Start the Backend Server (Development):**
        Open a terminal in the project root and run:
        ```bash
        npm run server
        ```
        This uses `ts-node` to run the TypeScript server directly. It will usually run on a port like 5000 (check server logs).

    -   **Start the Frontend Development Server:**
        Open *another* terminal in the project root and run:
        ```bash
        npm run dev
        ```
        This starts the Vite development server, typically available at `http://localhost:5173` (check terminal output).

6.  **Access the Application:**
    Open your web browser and navigate to the frontend development server URL (usually `http://localhost:5173`). The frontend will communicate with the backend server running on its port.

### Building for Production

To create a production build of the frontend:

```bash
npm run build
```
This will generate optimized static assets in the `dist/` directory.

To run the pre-compiled backend server (assuming you have a build step for the server, which might need to be added):

```bash
# (Optional) Build the server if needed (e.g., tsc -p server/tsconfig.json)
npm run start # Runs the server/server.cjs file
```

## Project Structure
