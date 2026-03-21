import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Register(){

const [name,setName]=useState("");
const [login,setLogin]=useState("");
const [password,setPassword]=useState("");

const navigate = useNavigate();

function register(){

fetch("http://localhost:3001/api/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,login,password})
})
.then(res=>{
if(res.ok) return res.json();
else alert("Ошибка регистрации");
})
.then(()=>{
alert("Успешно!");
navigate("/");
});

}

return(

<div>

<header>
<h1>Регистрация</h1>
</header>

<div className="container">

<input placeholder="Имя и фамилия" onChange={e=>setName(e.target.value)} />
<br/><br/>

<input placeholder="Логин" onChange={e=>setLogin(e.target.value)} />
<br/><br/>

<input type="password" placeholder="Пароль" onChange={e=>setPassword(e.target.value)} />
<br/><br/>

<button className="btn green" onClick={register}>
Зарегистрироваться
</button>

</div>

</div>

);
}

export default Register;
