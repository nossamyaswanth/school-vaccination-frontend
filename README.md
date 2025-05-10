# SchoolVaccination

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.10.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Development Server](#development-server)
- [Code Scaffolding](#code-scaffolding)
- [Building](#building)
- [Folder Structure](#folder-structure)
- [Additional Resources](#additional-resources)

## Overview

The **SchoolVaccination** application is designed to manage vaccination drives for schools. It includes features for managing students, vaccination drives, and generating reports.

## Features

- User authentication with JWT.
- Manage students (add, edit, delete, view).
- Upload vaccination certificates and bulk student data via Excel.
- Schedule and manage vaccination drives.
- Generate and download vaccination reports.
- Dashboard with key metrics and upcoming drives.

## Technologies Used

- **Angular**: Frontend framework.
- **Bootstrap**: For responsive UI design.
- **RxJS**: For reactive programming.
- **Chart.js**: For data visualization.
- **Karma**: For unit testing.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nossamyaswanth/school-vaccination-frontend.git
   cd school-vaccination-frontend/school-vaccination
   ```

2. **Install Dependencies**:
   Ensure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   - Ensure the backend API is running on `http://localhost:5020`.
   - Update the API URLs in the services if needed (e.g., `src/app/services/student.service.ts`).

4. **Run the Application**:
   Start the development server:
   ```bash
   npm start
   ```

   Open your browser and navigate to `http://localhost:4200/`.

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Folder Structure

Below is an overview of the folder structure:

```
school-vaccination/
├── src/
│   ├── app/
│   │   ├── auth/                # Authentication module
│   │   ├── components/          # Application components
│   │   │   ├── dashboard/       # Dashboard component
│   │   │   ├── reports/         # Reports component
│   │   │   ├── students/        # Student management components
│   │   │   ├── vaccination-drives/ # Vaccination drives component
│   │   ├── services/            # Angular services for API calls
│   │   ├── app.routes.ts        # Application routes
│   │   ├── app.config.ts        # Application configuration
│   │   ├── app.component.ts     # Root component
│   ├── assets/                  # Static assets
│   ├── styles.css               # Global styles
│   ├── index.html               # Main HTML file
├── angular.json                 # Angular CLI configuration
├── package.json                 # Node.js dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── README.md                    # Project documentation
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
