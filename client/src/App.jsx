import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navtab from "./components/Navtab";
import Footer from "./components/Footer";

import Login from "./page/Login";
import Users from "./page/Users";
import Admin from "./page/Admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/shortener">
        <Navtab />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
