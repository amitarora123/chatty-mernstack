# MERN Stack ChatApp

Welcome to the MERN Stack ChatApp project! This application is a real-time chat application built using the MERN (MongoDB, Express.js, React, Node.js) stack.

## Features

- Real-time messaging
- User authentication
- Private and group chats
- Responsive design
- Emoji support

## Technologies Used

- **Frontend:** React, Redux, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-time Communication:** Socket.io

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/mern-stack-chatapp.git
    ```
2. Navigate to the project directory:
    ```bash
    cd mern-stack-chatapp
    ```
3. Install dependencies for both frontend and backend:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```
4. Create a `.env` file in the `server` directory and add your MongoDB URI and other environment variables:
    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

## Usage

1. Start the backend server:
    ```bash
    cd server
    npm start
    ```
2. Start the frontend development server:
    ```bash
    cd client
    npm start
    ```
3. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [yourname@example.com](mailto:yourname@example.com).

---

Happy coding!