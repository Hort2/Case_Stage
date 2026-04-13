import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { AreaDetailPage } from "./pages/AreaDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/areas/:id" element={<AreaDetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
