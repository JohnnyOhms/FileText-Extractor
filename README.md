# FileText Extractor

FileText Extractor is a Node.js web application that allows users to extract text from images, PDFs, and DOCX files. It provides registered users with the ability to store the extracted text in their user profiles. The application is built using Node.js, Express.js, MySQL for the backend, and SSR (Server-Side Rendering) for efficient rendering. Passport strategies are used for authentication, and the front end is built with React, MUI, and Styled Components.

## Features

- Extract text from images, PDFs, and DOCX files
- Store extracted text in user profiles
- User authentication with Passport strategies
- Server-Side Rendering for efficient rendering
- Responsive frontend design with React, MUI, and Styled Components

## Installation

Follow these steps to install and run the FileText Extractor application:

1. Clone the repository:

   ```bash
   git clone https://github.com/JohnnyOhms/FileText-Extractor

2. Install the dependency:

    ```bash
    npm install
    
3. Set up the database:

  - Create a MySQL database
  - Update the database configuration in the .env file located in the project root directory:

     ```bash
    DB_HOST=<your-database-host>
    DB_PORT=<your-database-port>
    DB_USER=<your-database-username>
    DB_PASSWORD=<your-database-password>
    DB_NAME=<your-database-name>

4. Start the application:
     
     ```bash
     npm start

## Usage
1. Create a new account or log in to your existing account.
2. Once logged in, navigate to the file upload page.
3. Select an image, PDF, or DOCX file to upload.
4. Click the "Extract Text" button.
5. The application will process the file and extract the text.
6. You can view and manage your extracted text in your user profile.

## Technologies Used
The following technologies and libraries were used to build FileText Extractor:

- Node.js - JavaScript runtime environment
- Express.js - Web application framework for Node.js
- MySQL - Relational database management system
- SSR (Server-Side Rendering) - Efficient rendering technique
- Passport.js - Authentication middleware for Node.js
- React - JavaScript library for building user interfaces
- Material-UI (MUI) - React UI framework
- Styled Components - CSS-in-JS library for styling React components

## Contributing
Contributions are welcome! If you would like to contribute to FileText Extractor, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix: git checkout -b my-feature.
3. Commit your changes: git commit -am 'Add new feature'.
4. Push the branch to your fork: git push origin my-feature.
5. Submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any questions or inquiries, please email officialjohn662@example.com.



