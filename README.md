# YourBlog - React Blog Application

This project is a simple **React Blog Application** where users can view, add, and manage blogs. Built using **React**, **Firebase**, and **Vite**, it allows users to sign in with Google and only post blogs when logged in. The application also allows users to view and delete their blogs.

### Key Features:
- **User Authentication**: Users can sign in with Google using Firebase Authentication.
- **Blog CRUD Operations**: Users can add, view, and delete blogs.
- **User-Specific Blogs**: Blogs are tied to the user's UID, so they can only see and delete their own blogs.
- **Responsive Design**: The layout is fully responsive and works well on both mobile and desktop devices.

### Technologies Used:
- **React**: For building the user interface and handling state.
- **Firebase**: For user authentication and storing blog data in Firestore.
- **Vite**: A fast and lightweight build tool for React development.
- **TailwindCSS**: For styling the application with a modern and responsive design.

---

### How to Set Up the Project:

1. **Clone the Repository:**
   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/yourblog.git
   cd yourblog
   ```

2. **Install Dependencies:**
   Install the required dependencies using npm or yarn:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Firebase Setup:**
   - Create a Firebase project in the Firebase Console.
   - Enable **Firebase Authentication** with Google as a sign-in method.
   - Set up **Firestore Database** to store blogs.
   - Copy your Firebase credentials (API keys) and update them in the `firebase.js` file.

4. **Run the Project:**
   Once everything is set up, run the development server using Vite:

   ```bash
   npm run dev
   ```

   Your app will be running at [http://localhost:3000](http://localhost:3000).

---

### Features and Functionality:

1. **Authentication (Google Sign-In)**:
   - The application uses **Firebase Authentication** to sign in users with their Google account.
   - After logging in, users can add, view, and delete blogs.
   - A user must be logged in to post or manage blogs.

2. **Home Page**:
   - Displays all blogs publicly.
   - Logged-in users have the option to add a new blog or view their own blogs.
   - Users can log out, and the app will redirect them to the login page.

3. **Add Blog**:
   - Logged-in users can add a blog by providing a title, content, and an author.
   - Blogs are saved to **Firebase Firestore**, with the user's UID attached to ensure the correct ownership.

4. **Your Blogs**:
   - Users can view their own blogs by clicking the "Your Blogs" button.
   - Only blogs created by the user will be displayed.
   - The user has the option to delete blogs they created.

5. **Responsive Layout**:
   - The design uses **TailwindCSS**, ensuring the application looks great on both desktop and mobile devices.
   - The footer is always fixed at the bottom of the page, even if the content is short.

---

### Folder Structure:
Here’s an overview of the project’s folder structure:

```
/src
  /components
    Header.jsx          # Navigation bar with login/logout links
    Footer.jsx          # Footer with Developer Information
    Home.jsx            # Displays all blogs and has options for logged-in users
    AddBlog.jsx         # Form to add new blog
    YourBlogs.jsx       # Displays blogs specific to the logged-in user
  /firebase.js          # Firebase configuration and initialization
  /App.jsx              # Main component that renders the homepage
  /index.css            # Global CSS styles
  /tailwind.config.js    # TailwindCSS configuration
  /vite.config.js       # Vite configuration
```

---



### Additional Notes:
- This application is fully functional with Firebase and React.
- All blogs are stored in Firebase Firestore and are available across sessions for logged-in users.
- If you face any issues or have suggestions, feel free to contribute or open an issue in the GitHub repository!

