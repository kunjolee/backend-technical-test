# Backend Technical Test

## Description

This project is an Event Management Service developed in TypeScript using a Domain-Driven Design (DDD) architecture. The service allows for the creation, retrieval, updating, and deletion of events through a REST API implemented with Express.js.

## Table of Contents

1. [Description](#description)
2. [Project URL](#project-url)
3. [Postman Endpoints](#postman-endpoints)
4. [Setup Instructions](#setup-instructions)
   - [Local Setup](#local-setup)
   - [Docker Setup](#docker-setup)
5. [Assumptions and Design Decisions](#assumptions-and-design-decisions)

## Project URL

[Link to deployed project](#) _(pending update)_

## Postman Endpoints

[Link to Postman collection](#) _(pending update)_

## Setup Instructions

### Local Setup

Follow these steps to set up and run the project on your local machine:

1.  **Clone the repository**:

    Using HTTPS:

    ```bash
    git clone https://github.com/kunjolee/backend-technical-test.git
    ```

    Using SSH:

    ```bash
    git clone git@github.com:kunjolee/backend-technical-test.git
    ```

    Then navigate to the project directory:

    ```bash
    cd backend-technical-test
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  #### Set up environment variables:

    Create a .env file in the root directory of the project and add the following variables:

    ```ini
    PORT=3000
    DB_NAME=event_management
    DB_USER_NAME=root
    DB_PASSWORD=1234
    DB_PORT=5432
    DB_HOST=35.224.193.1
    # ☝️ This is the IP address of the live Cloud SQL instance
    ```

4.  **Run the project**:

    - Simplified Local Run:

      Use the following command to quickly build and start the application:

      ```bash
      npm run start
      ```

      This will compile the TypeScript code into JavaScript and run the application.

    - Development Mode:

      To work on the application, you need to run two commands simultaneously:

      - Compile TypeScript to JavaScript in watch mode:

        ```bash
        npm run ts-watch
        ```

      - Run the application in development mode with file watching:

        ```bash
        npm run dev
        ```

      This setup allows you to make changes to the TypeScript files, which will be automatically compiled and reflected in the running application.

5.  **Access the application**:

    Once the application is running, you can start testing the API endpoints at:

    👉 [http://localhost:3000/api/events](http://localhost:3000/api/events)

### Docker Setup

To run the project using Docker, follow these steps:

1. **Build the Docker image**:
   Run the following command to build the Docker image:

   ```bash
   docker build -t backend-technical-test .
   ```

2. **Run the Docker container**:
   Once the image is built, run the container using the following command:

   ```bash
   docker run --env-file .env -p 3000:3000 backend-technical-test
   ```

   > ⚠️ **Note: Make sure you have the `.env` file set up with the required environment variables to run the Docker instance correctly. For details on setting up the `.env` file, refer to the [Set up environment variables](#set-up-environment-variables) section.**

3. **Access the application:**

   Once the application is running, you can start testing the API endpoints at:

   👉 http://localhost:3000/api/events

   **Additional Notes:**:

   - If you make changes to the code, you will need to rebuild the Docker image using the `docker build` command.
   - To stop the running container, use:

   ```bash
   docker ps  # List running containers
   docker stop <container_id>  # Replace <container_id> with the ID of your container
   ```

### Assumptions and Design Decisions

### Domain-Driven Design (DDD) and Separation of Responsibilities

The application follows **Domain-Driven Design (DDD)** principles to ensure a clean separation of concerns and responsibilities. The architecture is divided into distinct layers:

1. **Domain Layer**:

   - Contains the core business logic and domain models.
   - Defines the structure of the data and the rules that govern it.

2. **Application Layer**:

   - Manages use cases, which represent the actions that can be performed in the application.
   - Orchestrates the interaction between the domain logic and the infrastructure layer.

3. **Infrastructure Layer**:
   - Handles external concerns such as database interactions and API controllers.
   - Implements the repository pattern to connect the domain layer with the database.

#### Key Design Decisions:

- **Repository Pattern**:

  - The **Domain Repository** encapsulates business logic, ensuring it remains independent of the database implementation.
  - The **Infrastructure Repository** handles database-specific operations, using methods like `toPersistence` and `toDomain` to map between domain models and database models.

- **Separation of Responsibilities**:

  - **Controllers** (Infrastructure Layer) receive client requests and pass the data to the **Use Cases** (Application Layer).
  - **Use Cases** orchestrate the business logic and interact with the **Domain Repository**.
  - The **Infrastructure Repository** handles database-specific operations, ensuring that neither controllers nor use cases interact directly with the database.

- **Use Cases and Repository Interaction**:

  - **Use Cases** (Application Layer) orchestrate the business logic and interact with the **Domain Repository**.
  - The **Infrastructure Repository** (`EventRepositoryImpl`) is injected into the **Use Cases** during initialization, ensuring that the business logic remains decoupled from the database implementation.

- **Type Organization**:
  - Types are organized by their respective layers and use cases, avoiding a single "types" folder. This improves clarity and maintainability.

This structure ensures a clean separation of concerns, making the application more maintainable, scalable, and easier to test.

---

### Development Workflow:

- **Local Run (Simplified Mode)**: Run `npm run start` to compile TypeScript to JavaScript and start the application. This command is designed to quickly run the app locally without needing to execute multiple commands. It is not intended for active development

- **Development Mode**: Run `npm run ts-watch` and `npm run dev` simultaneously to enable real-time TypeScript compilation and file watching. This approach is specifically designed for active development, allowing you to make changes to the code and see them reflected immediately without restarting the server. It avoids unnecessary dependencies like `ts-node` or `ts-watch`, aligning with the requirement to minimize external libraries.

---

### Database and ORM

- **PostgreSQL**: Chosen as the primary database due to its reliability, scalability, and support for complex queries.
- **Sequelize (ORM)**: Used to interact with the database. Sequelize was selected because:
  - It allows working with the database as objects, improving code readability and maintainability.
  - It helps prevent SQL injection attacks by parameterizing queries.
  - It simplifies database interactions, reducing the need for raw SQL queries.
  - It automatically handles `created_at` and `updated_at` timestamps.
- **Database synchronization**: The `sync()` method is used during development to automatically synchronize the database schema with the models.

---

### Validation

- **Custom Validations**: Custom validations were implemented to cover as many scenarios as possible without relying on external libraries. This ensures the application adheres to the requirements while keeping dependencies to a minimum.

---

### Allowed Fields

- **Allowed Fields in Request Bodies**: Only specific fields are allowed in request bodies, such as `name`, `description`, `date`, `location`, and `organizer`. If any additional fields are sent, the API will return an error.
- **Allowed Query Parameters**: The allowed query parameters for filtering events are `location`, `date`, and `organizer`. Any other query parameters will result in an error.

### Environment Variables

- **Dotenv**: Used to manage environment variables, ensuring sensitive configuration (e.g., database credentials) is not hardcoded.
- **Centralized Configuration**: A `config/env.ts` file was created within the infrastructure layer to centralize access to environment variables, improving maintainability and reducing duplication.

---

### API Design

- **Standardized Responses**:
  - Error responses are standardized to provide consistent feedback to clients.
  - Success responses are tailored to the specific endpoint, avoiding unnecessary data in responses.

---

### Deployment

- **Google Cloud Platform (GCP)**:
  - **Cloud Run**: Chosen for deploying the API due to its scalability, managed infrastructure, and support for containerized applications.
  - **Cloud SQL**: Used for the managed PostgreSQL instance, ensuring reliability and ease of maintenance.

---

### API Endpoints

- **Base Path**: The API starts with `/api/` to clearly indicate it is an API.
- **Root Endpoint**:

  - **Root URL (`/`)**: When accessing the root URL, a simple HTML page is displayed with a welcome message and a link to the events API.
    This was implemented to provide a more user-friendly experience instead of showing a generic "Can't GET" message.
