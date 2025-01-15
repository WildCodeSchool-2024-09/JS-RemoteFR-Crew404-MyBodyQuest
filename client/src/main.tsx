// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* **/

// Import the main app component
import App from "./App";
import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import Food from "./components/Food";
import Quests from "./components/Quests";
import Success from "./components/Success";
import Tracking from "./components/Tracking";
import Layout from "./pages/Layout";
import Page_404 from "./pages/Page_404";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* **/

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/tracking",
        element: <Tracking />,
      },
      {
        path: "/quests",
        element: <Quests />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/food",
        element: <Food />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    path: "*",
    element: <Page_404 />,
  },

  // Try adding a new route! For example, "/about" with an About component
]);

/* **/

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
