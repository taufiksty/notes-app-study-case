# Notes App

A simple notes application built with Next.js, TypeScript, Prisma, Chakra UI, and GraphQL. This is for assignment internship at dibimbing.id.

## Features

- Create, view, and delete notes
- Responsive design
- GraphQL API integration

## Technologies

- **Frontend**: Next.js, Chakra UI
- **Backend**: GraphQL, Prisma, PostgreSQL

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/taufiksty/notes-app-study-case.git
   cd notes-app-study-case
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a .env file:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   ```

4. **Run database migrations**:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

## Scripts

- **`dev`**: Start the development server
- **`build`**: Build the app for production
- **`start`**: Run the production server
- **`lint`**: Run linter checking
- **`format`**: Run fixing format
