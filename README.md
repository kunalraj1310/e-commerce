# E-Commerce Platform

A full-stack e-commerce web application built with Node.js, Express.js, MongoDB, and EJS. The platform provides a seamless shopping experience with user authentication, product management, cart functionality, and an admin dashboard.

## 🚀 Features

### User Features

* User Registration & Login
* Secure Authentication
* Browse Products
* Product Details Page
* Shopping Cart Management
* Quantity Update Controls
* Order Summary
* Responsive UI

### Admin Features

* Admin Authentication
* Product Management
* Add New Products
* Edit Existing Products
* Delete Products
* Product Image Upload
* Dashboard Management

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* Tailwind CSS
* EJS Templates
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JWT Authentication
* bcrypt Password Hashing
* Cookie Parser

### File Uploads

* Multer

## 📂 Project Structure

```bash
project-root/
│
├── config/
├── middlewares/
├── models/
├── public/
│   ├── css/
│   ├── images/
│   └── js/
├── routes/
├── views/
│   ├── partials/
│   └── *.ejs
├── app.js
├── package.json
└── vercel.json
```

## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/kunalraj1310/e-commerce.git
```

2. Navigate to the project directory

```bash
cd e-commerce
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file

```env
MONGODB_URI=your_mongodb_connection_string
JWT_KEY=your_secret_key
NODE_ENV=development
```

5. Start the development server
*** the app.listen is in run.js ***
```bash
node run.js
```

or

```bash
nodemon run.js
```

## 📸 Screenshots

Add screenshots of:

* Home Page
* Product Listing
* Product Details
* Shopping Cart
* Admin Dashboard

## 🔒 Environment Variables

| Variable    | Description               |
| ----------- | ------------------------- |
| PORT        | Server Port               |
| MONGODB_URI | MongoDB Connection String |
| JWT_KEY     | JWT Secret Key            |
| NODE_ENV    | Environment Mode          |

## 🌟 Future Improvements

* Payment Gateway Integration
* Wishlist Functionality
* Order Tracking
* Product Reviews & Ratings
* Search & Filtering
* Email Notifications
* User Profile Management

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository and submit pull requests.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Kunal Raj**

GitHub: https://github.com/kunalraj1310
