# BuildForm

**BuildForm** is a versatile, full-stack application designed to empower users to create, share, and manage custom forms effortlessly. This platform provides an intuitive interface and a rich feature set to handle a wide variety of form inputs and data collection needs.

## Features

### **Form Creation**
- Add various input types: 
  - Headings (`h1`, `h3`)
  - Date Picker
  - Text Inputs
  - Dropdown Selectors
  - Checkboxes
  - Separators for better form organization
  - And more!
- Fully customizable form fields to fit your specific requirements.

### **Form Sharing**
- Share your form through a unique link.
- Visitors can fill out the form via the shared link and submit their responses.

### **Analytics and Submissions**
- View the total number of submissions for each form.
- Monitor the total number of visits to your forms.
- Review submitted form details in an organized manner.

### **Themes**
- Toggle between **Dark Mode** and **Light Mode** for a personalized user experience.

### **Authentication**
- User authentication and session management are powered by **Clerk**, ensuring secure access to your forms and data.

---

## Tech Stack

- **Next.js**: React framework for building server-rendered and statically generated web applications.
- **TypeScript**: Ensures type safety and better development experience.
- **shadcn**: UI components for consistent and customizable styling.
- **DNK-Kit**: Efficient and scalable tools for building complex forms.
- **PostgreSQL**: Reliable relational database for storing form data and user details.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/AnchalDevBytes/buildform.git
   cd buildform
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. **Set Up the Database**
    - Configure the database connection string in the .env file:

    ```bash
    DATABASE_URL="postgresql://username:password@hostname:port/database_name"
    ```

4. **Configure Environment Variables**
    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="Your_clerk_publishable_key"
    CLERK_SECRET_KEY="Your_clerk_secret"
    POSTGRES_PRISMA_URL="Postgres_prisma_url"
    POSTGRES_URL_NON_POOLING="Postgres_non_pooling_url"
    ```

5. **Run Prisma Migrations**
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

6. **Run the development server:**
    ```bash
   npm run dev
   ```
The app will be available at http://localhost:3000.