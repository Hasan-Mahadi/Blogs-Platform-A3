# Blogs-Platform-Application

**#Authentication & Authorization On TypeScript | Node.js | Express.js | MongoDB with Mongoose | JWT**


Objective:

I Develop an Express application with TypeScript, integrating MongoDB with Mongoose to manage a Book Store. Ensure data integrity using Mongoose schema validation and Others.

**Project Setup:**

1. Initialize the Project:

- Create a new directory for My project.
- Initialize an npm project: | npm init -y |.
- Install dependencies: | npm install express, mongoose, cors, dotenv, body-parser, npm install --save-dev, typescript , ts-node-dev |.
- Set up the TypeScript configuration: |npx tsc --init |.
- Update tsconfig.json to include: | "rootDir": "./src", | "outDir": "./dist", | "target": "ES6",|
- Add scripts to package.json: "scripts": {
  "build": "tsc",
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "lint": "eslint src/**/\*.ts",
  "lint:fix": "eslint src/**/\*.ts --fix",
  "format": "prettier . --write",
  "test": "echo \"Error: no test specified\" && exit 1"
  },

2. Project Structure:

- Create the following folder structure:
- Feature-Based Pattern(Modular) project/
  ├── src/
  │ ├── features/
  │ │ ├── Product/
  │ │ │ ├── ProductModel.ts
  │ │ │ ├── ProductController.ts
  │ │ │ ├── ProductRoutes.ts
  │ │ │ └── ProductService.ts
  │ │ ├── orders/
  │ │ │ ├── orderModel.ts
  │ │ │ ├── orderController.ts
  │ │ │ ├── orderRoutes.ts
  │ │ │ └── orderService.ts
  │ ├── app.ts
  │ └── server.ts

3. Implementation:

- Database Configuration: | src/app/config/index.ts |.
- Models: | src/models/User.ts | src/models/blog.ts |.
- Controllers:user  Controller: | src/controllers/user Controller.ts |.
- Controllers:blog Controller: | src/controllers/blog Controller.ts |.
- Controllers:auth Controller: | src/controllers/auth Controller.ts |.
- Routes: | src/routes/userRoutes.ts | src/routes/blogRoutes.ts| src/routes/authRoutes.ts|.
- Testing with Postman

4. Features:

**CRUD Operations for Blogs**

- Add, retrieve, update, and delete books.

| Blogs Management |
- Place blogs and update inventory automatically.

| Error Handling |
- Provides meaningful error messages with stack traces.

ZOD_ERROR: Validation errors from Zod.

NOT_FOUND_ERROR: Resource not found.

VALIDATION_ERROR: General validation issues.

AUTH_ERROR: Authentication errors.

AUTHORIZATION_ERROR: Insufficient permissions.

INTERNAL_SERVER_ERROR: Unexpected server issues.

5. Technology Stack:

**Backend:** Node.js, Express.js, TypeScript
**Database:** MongoDB (with Mongoose)
**Validation:** Mongoose schema validation
**Error Handling:** Custom middleware
**Authentication** JWT, bycrypt, 

6. {timestamps: true}

7.  Endpoints: | POST, GET, GET, PUT, DELETE |.

8.  Access the API at http://localhost:5000.

9.  https://book-shop-assignment-2.vercel.app/

