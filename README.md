# evidence

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Description](#description)
  - [src/main.ts](#srcmaints)
  - [src/app.module.ts](#srcappmodulets)
  - [src/data/entities/customer.entity.ts](#srcdataentitiescustomerentityts)
  - [src/data/dto/create-customer.dto.ts](#srcdatadtocreate-customerdtots)
  - [src/data/dto/update-customer.dto.ts](#srcdatadtoupdate-customerdtots)
  - [src/data/data.service.ts](#srcdatadataservicets)
  - [test/data.service.spec.ts](#testdataservicespects)
  - [test/app.controller.spec.ts](#testappcontrollerspects)
- [Features](#features)
- [Running Tests](#running-tests)
- [TODO](#todo)
- [DONE](#done)

## Requirements

- [Node.js](https://nodejs.org/) (v14 or later)
- [PostgreSQL](https://www.postgresql.org/) (v12 or later)
- [pnpm](https://pnpm.io/) (package manager)
- [NestJS 10](https://nestjs.com/) (backend framework)
- [Jest](https://jestjs.io/) (testing framework)
- [Faker.js](https://github.com/faker-js/faker) (for generating fake data)

## Installation

1. **Clone the repository:**

    ```
    git clone https://github.com/handbob/customer.git
    cd customer
    ```

2. **Install dependencies:**

    ```
    pnpm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=customer_user
    DB_PASSWORD=securepassword
    DB_DATABASE=evidence
    ```

4. **Set up the PostgreSQL database:**

    ```bash
    # Login to PostgreSQL as the postgres user
    psql -U postgres

    # In the psql console, run the following commands:
    CREATE DATABASE evidence;
    CREATE USER customer_user WITH PASSWORD 'securepassword';
    GRANT ALL PRIVILEGES ON DATABASE customer TO customer_user;

    # Exit the psql console
    \q
    ```

## Description

### `src/main.ts`

Bootstraps the NestJS application, sets up global validation pipes, and configures Swagger for API documentation.

- **Functions**:
  - `bootstrap()`: Initializes the application, configures Swagger, and starts listening on the specified port.

### `src/app.module.ts`

Main application module that imports necessary modules and configurations.

- **Imports**:
  - `ConfigModule`: Loads environment variables.
  - `TypeOrmModule`: Configures the PostgreSQL database connection.
  - `DataModule`: Contains the customer management logic.

### `src/data/entities/customer.entity.ts`

Defines the `Customer` entity that maps to the `customers` table in PostgreSQL.

- **Properties**:
  - `id`: UUID primary key.
  - `name`: Customer's name.
  - `email`: Unique email address.
  - `phone`: Contact phone number.

### `src/data/dto/create-customer.dto.ts`

Defines the data transfer object for creating a new customer with validation rules.

- **Properties**:
  - `name`: String, required.
  - `email`: Valid email format, required.
  - `phone`: String, required.

### `src/data/dto/update-customer.dto.ts`

Defines the data transfer object for updating an existing customer with optional fields.

- **Properties**:
  - `name`: String, optional.
  - `email`: Valid email format, optional.
  - `phone`: String, optional.

### `src/data/data.service.ts`

Service that handles business logic for customer management, interacting with the PostgreSQL database via TypeORM.

- **Functions**:
  - `findAll()`: Retrieves all customers.
  - `findOne(id: string)`: Retrieves a customer by ID.
  - `create(createCustomerDto: CreateCustomerDto)`: Creates a new customer.
  - `update(id: string, updateCustomerDto: UpdateCustomerDto)`: Updates an existing customer.
  - `onModuleInit()`: Seeds the database with fake data if it's empty.

### `test/data.service.spec.ts`

Unit tests for the `DataService`, ensuring proper functionality and error handling.

- **Tests**:
  - Service definition.
  - Retrieval of all customers.
  - Retrieval of a single customer.
  - Handling of non-existent customer retrieval.
  - Creation of a new customer.
  - Updating an existing customer.

### `test/app.controller.spec.ts`

Unit tests for the `AppController`, verifying the API endpoints' behavior.

- **Tests**:
  - Retrieval of all customers.
  - Retrieval of a single customer by ID.
  - Handling of non-existent customer retrieval.
  - Creation of a new customer.
  - Updating an existing customer.
  - Handling of updating a non-existent customer.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete customers.
- **Data Validation**: Ensures data integrity using `class-validator`.
- **API Documentation**: Interactive Swagger UI available at `/api`.
- **PostgreSQL Integration**: Robust database management with TypeORM.
- **Unit Testing**: Comprehensive tests for services and controllers.
- **Configuration Management**: Environment variables handled by `@nestjs/config`.

## Running Tests
To run the tests, use the following commands:
- **Run all tests:**
```
  pnpm run test
```

## Running Server
To run the server, use the following command:
- **Run server:**
```
  pnpm run start
```

## TODO

- [ ] Add authentication and authorization.
- [ ] Integrate with external APIs for data enrichment.
- [ ] Deploy the application to a cloud platform.
- [ ] Enhance error handling and logging.
- [ ] Implement `DELETE` endpoint to customer/customers.

## DONE

- [x] Set up NestJS project with TypeORM and PostgreSQL.
- [x] Implement CRUD operations for customers.
- [x] Configure Swagger for API documentation.
- [x] Set up environment variable management with `@nestjs/config`.
- [x] Create unit tests for services and controllers.
- [x] Seed the database with fake data on initialization.
