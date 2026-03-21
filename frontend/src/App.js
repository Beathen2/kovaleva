import {BrowserRouter,Routes,Route} from "react-router-dom";

import Patient from "./pages/Patient";
import Doctor from "./pages/Doctor";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App(){
return(
<BrowserRouter>

<Routes>
<Route path="/" element={<Login/>}/>
<Route path="/patient" element={<Patient/>}/>
<Route path="/doctor" element={<Doctor/>}/>
<Route path="/admin" element={<Admin/>}/>
<Route path="/register" element={<Register/>}/>
</Routes>

</BrowserRouter>
);
}

export default App;
