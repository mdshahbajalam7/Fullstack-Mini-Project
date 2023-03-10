import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Createnote from "./components/page/Createnote";
import Editpage from "./components/page/Editpage";
import Lognin from "./components/page/Lognin";
import PrivateRoute from "./components/page/PrivateRoute";
import Signup from "./components/page/Signup";
export const BaseUrl = "https://zany-gray-prawn-kilt.cyclic.app/auth";
export const BASEURL = 'https://zany-gray-prawn-kilt.cyclic.app/note'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
         <Route
          path="/createnote"
          element={
            <PrivateRoute>
              <Createnote />
            </PrivateRoute>
          }
        />
          <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <Editpage />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lognin" element={<Lognin />} />
      </Routes>
    </div>
  );
}

export default App;
