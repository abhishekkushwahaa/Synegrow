# SDE Intern Assignment - Synegrow

This project is a RESTful API for a minimal dropshipping service, designed to manage suppliers and their inventory. It was built as part of the SDE Intern Assignment for Synegrow.

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Framework**: Express
- **ORM**: TypeORM
- **Database**: MySQL

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

**1. Clone the Repository**

```bash
git clone https://github.com/abhishekkushwahaa/Synegrow
cd Synegrow
```

**2. Install Dependencies**

```bash
bun install
```

**3. Configure Environment Variables**
Create a `.env` file in the root of the project:
Now, open the `.env` file and update the variables with your local MySQL database credentials.

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=Synegrow
API_PORT=3000
```

**4. Create the MySQL Database**
Connect to your local MySQL instance and run the following command to create the database:

```sql
CREATE DATABASE IF NOT EXISTS Synegrow;
```

## Database Migrations

This project uses a migration-first approach for database schema management. You must run the migrations to create the necessary tables.

**Run the migration to set up your database schema:**

```bash
bun run migration:run
```

This command will execute the migration files located in `src/migrations` and create the `suppliers` and `products` tables.

## Running the Application

**Start the server:**

```bash
bun run dev
```

The server will start at `http://localhost:3000`.

## API Testing with Postman

To test the API endpoints, you can use the provided Postman Collection, which includes pre-configured requests for all available routes.

### **1. Importing the Collection (Recommended)**

A Postman collection file named `Synegrow.json` is included in the root of this repository.

- Open your Postman application.
- Click the **Import** button in the top-left corner.
- In the dialog box, select the `Synegrow.json` file from the project directory.
- Once imported, you will see a new collection named "Synegrow Assignment" in your Postman sidebar.

Now you can expand the collection and run any of the saved requests to test the API functionality.

### **2. Manual Testing**

- **POST /suppliers**
  - Method: `POST`
  - URL: `http://localhost:3000/suppliers`
  - Headers:
    - `Content-Type`: `application/json`
  - Body (raw JSON):
    ```json
    {
      "name": "Synetronics Global",
      "email": "contact@syne.global",
      "phone": "9876543210",
      "country": "India"
    }
    ```
  - Expected Response: `201 Created` with the created supplier object.

---

- **GET /suppliers**
  - Method: `GET`
  - URL: `http://localhost:3000/suppliers`
  - Expected Response: `200 OK` with an array of supplier objects.

---

- **GET /suppliers/:id**
  - Method: `GET`
  - URL: `http://localhost:3000/suppliers/1`
  - Expected Response: `200 OK` with the supplier object including products and analytics.

---

- **POST /products**
  - Method: `POST`
  - URL: `http://localhost:3000/products`
  - Headers:
    - `Content-Type`: `application/json`
  - Body (raw JSON):
    ```json
    {
      "title": "Quantum Laptop Pro",
      "price": 120000.0,
      "stock_quantity": 50,
      "category": "ELECTRONICS",
      "supplier_id": 1
    }
    ```
  - Expected Response: `201 Created` with the created product object.

---

- **GET /products**
  - Method: `GET`
  - URL: `http://localhost:3000/products`
  - Expected Response: `200 OK` with an array of product objects including supplier details.

---

- **GET /products?category=ELECTRONICS**
  - Method: `GET`
  - URL: `http://localhost:3000/products?category=ELECTRONICS`
  - Expected Response: `200 OK` with an array of products filtered by category.

---

- **GET /products/:id**
  - Method: `GET`
  - URL: `http://localhost:3000/products/1`
  - Expected Response: `200 OK` with the requested product object.

---

- **PATCH /products/:id**
  - Method: `PATCH`
  - URL: `http://localhost:3000/products/1`
  - Headers:
    - `Content-Type`: `application/json`
  - Body (raw JSON):
    ```json
    {
      "stock_quantity": 45
    }
    ```
  - Expected Response: `200 OK` with the updated product object.

---

#### ⚠️ **Error Handling Examples**

- **Validation Error (400 Bad Request)**
  - Method: `POST`
  - URL: `http://localhost:3000/suppliers`
  - Headers:
    - `Content-Type`: `application/json`
  - Body (raw JSON):
    ```json
    {
      "name": "A",
      "email": "bademail",
      "phone": "12345"
    }
    ```
  - Expected Response: `400 Bad Request` with a detailed `errors` array.

---

- **Not Found Error (404 Not Found)**

  - Method: `GET`
  - URL: `http://localhost:3000/suppliers/999`
  - Expected Response: `404 Not Found` with message:

    ```json
    {
      "message": "Supplier not found"
    }
    ```

Thank you for reviewing this SDE Intern Assignment.  
Wishing you a great experience testing and working with the API!
