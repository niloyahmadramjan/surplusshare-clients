import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provide React Query to the app */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="bg-gray-200">
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light" // or "dark"
          />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 1500,
            }}
          />
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
