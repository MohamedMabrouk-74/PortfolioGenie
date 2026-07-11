import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import HomePage from "../pages/Home/HomePage";
import BuilderPage from "../pages/Builder/BuilderPage";
import PreviewPage from "../pages/Preview/PreviewPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="builder" element={<BuilderPage />} />
          <Route path="preview" element={<PreviewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
