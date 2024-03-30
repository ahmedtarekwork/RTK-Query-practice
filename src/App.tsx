import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// layouts
import MainLayout from "./layouts/MainLayout";

// pages
import HomePage from "./pages/HomePage";
import UserPage from "./pages/userPage/UserPage";
import ErrorPage from "./pages/ErrorPage";
import PostPage from "./pages/PostPage";
import AlbumPage from "./pages/AlbumPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/album/:id" element={<AlbumPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
