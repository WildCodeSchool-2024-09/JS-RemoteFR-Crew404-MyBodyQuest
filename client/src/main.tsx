import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { TrackingProvider } from "./context/TrackingContext";

// Import the main app component
import App from "./App";
import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import Food from "./components/Food";
import Quests from "./components/Quests";
import Recipe from "./components/Recipe";
import Tracking from "./components/Tracking";
import TrackingData from "./components/TrackingsData";
import UserSuccess from "./components/UserSuccess";
import Contact from "./pages/Contact";
import Layout from "./pages/Layout";
import Page404 from "./pages/Page404";
import ProtectedRoute from "./pages/ProtectedRoute";
import api from "./services/api";

const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
  },

  {
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
            loader: async () => {
              try {
                const response = await api.get("/api/user/me");

                return response.data;
              } catch (error) {
                console.error(error);
              }
            },
          },
          {
            path: "/tracking",
            element: <Tracking />,
          },
          {
            path: "/tracking/data",
            element: <TrackingData />,
          },
          {
            path: "/quests",
            element: <Quests />,
          },
          {
            path: "/success",
            element: <UserSuccess />,
          },
          {
            path: "/food",
            element: <Food />,
          },
          {
            path: "/account",
            element: <Account />,
          },
          {
            path: "/food/:idMeal",
            element: <Recipe />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
  {
    path: "/contact",
    element: <Contact />,
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
    <AuthProvider>
      <TrackingProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </TrackingProvider>
    </AuthProvider>
  </StrictMode>,
);
