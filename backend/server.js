const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* Пользователи */
let users = [
{ id:1, role:"patient", name:"Иван Иванов", login:"patient", password:"123" },
{ id:2, role:"doctor", name:"Петров Сергей", login:"doctor", password:"123" },
{ id:3, role:"admin", name:"Админ", login:"admin", password:"123" }
];


/* Записи */
let appointments = [];

/* Заключения */
let reports = [];

/* Получить врачей */
app.get("/api/doctors",(req,res)=>{
res.json(users.filter(u=>u.role==="doctor"));
});

/* Запись к врачу */
app.post("/api/appointments",(req,res)=>{

const patient = users.find(u=>u.id==req.body.patientId);
const doctor = users.find(u=>u.id==req.body.doctorId);

const appointment={
id:Date.now(),
patientId:req.body.patientId,
patientName: patient.name,   
doctorId:req.body.doctorId,
doctorName: doctor.name,     
date:req.body.date,
status:"active"
};

appointments.push(appointment);

res.json(appointment);
});


/* Получить записи пациента */
app.get("/api/appointments/patient/:id",(req,res)=>{
res.json(appointments.filter(a=>a.patientId==req.params.id));
});

/* Получить записи врача */
app.get("/api/appointments/doctor/:id",(req,res)=>{
res.json(appointments.filter(a=>a.doctorId==req.params.id));
});

/* Удалить запись */
app.delete("/api/appointments/:id",(req,res)=>{
appointments=appointments.filter(a=>a.id!=req.params.id);
res.json({message:"Удалено"});
});

/* Создать заключение */
app.post("/api/reports",(req,res)=>{
const report={
id:Date.now(),
appointmentId:req.body.appointmentId,
text:req.body.text
};

reports.push(report);

appointments=appointments.map(a=>
a.id==req.body.appointmentId
? {...a,status:"done"}
: a
);

res.json(report);
});

/* Получить заключения пациента */
app.get("/api/reports/patient/:id",(req,res)=>{

const patientAppointments=appointments.filter(a=>a.patientId==req.params.id);

const patientReports=reports.filter(r=>
patientAppointments.some(a=>a.id==r.appointmentId)
);

res.json(patientReports);
});

app.listen(3001,()=>{
console.log("Server started on port 3001");
});

app.post("/api/login",(req,res)=>{

const user = users.find(u =>
u.login === req.body.login &&
u.password === req.body.password
);

if(user){
res.json(user);
}else{
res.status(401).json({message:"Ошибка"});
}

});

app.post("/api/register",(req,res)=>{

const {name, login, password} = req.body;

/* проверка */
const exists = users.find(u=>u.login === login);

if(exists){
return res.status(400).json({message:"Пользователь уже есть"});
}

/* создаём нового пациента */
const newUser = {
id:Date.now(),
name:name,
login:login,
password:password,
role:"patient"
};

users.push(newUser);

res.json(newUser);

});
