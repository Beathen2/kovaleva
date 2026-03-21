import {useEffect,useState} from "react";
import jsPDF from "jspdf";


function Patient(){

const [doctors,setDoctors]=useState([]);
const [appointments,setAppointments]=useState([]);
const [reports,setReports]=useState([]);
const [date,setDate]=useState("");


const user = JSON.parse(localStorage.getItem("user"));
const patientId = user.id;



useEffect(()=>{

fetch("http://localhost:3001/api/doctors")
.then(res=>res.json())
.then(setDoctors);

loadAppointments();
loadReports();

},[]);

function loadAppointments(){
fetch(`http://localhost:3001/api/appointments/patient/${patientId}`)
.then(res=>res.json())
.then(setAppointments);
}

function loadReports(){
fetch(`http://localhost:3001/api/reports/patient/${patientId}`)
.then(res=>res.json())
.then(setReports);
}

function book(id){

fetch("http://localhost:3001/api/appointments",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
patientId:patientId,
doctorId:id,
date:date
})
}).then(()=>{
loadAppointments();
});

}

function remove(id){

fetch(`http://localhost:3001/api/appointments/${id}`,{
method:"DELETE"
}).then(()=>{
loadAppointments();
});

}

function downloadPDF(text){

const doc = new jsPDF();

doc.text(text,10,10);

doc.save("report.pdf");

}


return(

<div>

<header>
<h1>Панель пациента</h1>
</header>

<div className="container">

<h2>Запись к врачу</h2>

{doctors.map(d=>(

<div className="card" key={d.id}>
<p>{d.name}</p>
<button className="btn blue" onClick={()=>book(d.id)}>
Записаться
</button>
</div>

))}

<h2>Мои записи</h2>

{appointments.map(a=>(

<div className="card" key={a.id}>
<p><b>Врач:</b> {a.doctorName}</p>
<p><b>Дата:</b> {a.date}</p>
<p><b>Статус:</b> {a.status}</p>


<button className="btn red" onClick={()=>remove(a.id)}>
Удалить
</button>
</div>

))}

<h2>Заключения врача</h2>

{reports.map(r=>(

<div className="card" key={r.id}>

<p>{r.text}</p>

<button className="btn blue" onClick={()=>downloadPDF(r.text)}>
Скачать PDF
</button>

</div>

))}


<input type="date" onChange={(e)=>setDate(e.target.value)} />


</div>

</div>

);
}

export default Patient;
