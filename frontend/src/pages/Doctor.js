import {useEffect, useState} from "react";

function Doctor(){

const user = JSON.parse(localStorage.getItem("user"));

const [appointments,setAppointments]=useState([]);
const [texts,setTexts]=useState({});

/* загрузка данных */
useEffect(()=>{
if(user && user.role === "doctor"){
load();
}
},[]);

function load(){
fetch(`http://localhost:3001/api/appointments/doctor/${user.id}`)
.then(res=>res.json())
.then(setAppointments);
}

/* ввод текста */
function handleChange(id,value){
setTexts({
...texts,
[id]:value
});
}

/* завершение приёма */
function finish(id){

fetch("http://localhost:3001/api/reports",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
appointmentId:id,
text:texts[id] || "Без заключения"
})
}).then(()=>{
load();
});

}

/* защита */
if(!user || user.role !== "doctor"){
return <h2>Нет доступа</h2>;
}

return(

<div>

<header>
<h1>Панель врача</h1>
</header>

<div className="container">

{appointments.map(a=>(

<div className="card" key={a.id}>

<p><b>Пациент:</b> {a.patientName}</p>
<p><b>Дата:</b> {a.date}</p>
<p><b>Статус:</b> {a.status}</p>

<textarea
placeholder="Введите заключение"
value={texts[a.id] || ""}
onChange={(e)=>handleChange(a.id,e.target.value)}
/>

<br/>

<button className="btn green" onClick={()=>finish(a.id)}>
Завершить приём
</button>

</div>

))}

</div>

</div>

);
}

export default Doctor;
