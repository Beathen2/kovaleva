import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login(){

const [login,setLogin]=useState("");
const [password,setPassword]=useState("");

const navigate = useNavigate();

function enter(){

fetch("http://localhost:3001/api/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({login,password})
})
.then(res=>{
if(res.ok) return res.json();
else alert("Ошибка");
})
.then(user=>{

if(!user) return;

localStorage.setItem("user",JSON.stringify(user));

if(user.role==="patient") navigate("/patient");
if(user.role==="doctor") navigate("/doctor");
if(user.role==="admin") navigate("/admin");

});

}

return(

<div>

<header>
<h1>Вход</h1>
</header>

<div className="container">

<input placeholder="Логин" onChange={e=>setLogin(e.target.value)} />
<br/><br/>

<input placeholder="Пароль" type="password" onChange={e=>setPassword(e.target.value)} />
<br/><br/>

<button className="btn blue" onClick={enter}>
Войти
</button>

<button className="btn gray" onClick={()=>navigate("/register")}>
Регистрация
</button>

</div>

</div>

);
}

export default Login;
