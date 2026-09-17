import { Route, Routes } from "react-router";
import MyNavbar from "./MyNavbar";
import Home from "./pages/Home";
import Cars from "./pages/Cars"

function App() {
  return (
      <div className=" bg-black min-h-1000">
    <MyNavbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cars" element={<Cars />} />
      </Routes>
      </div>
  );
}
export default App;
