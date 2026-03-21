function Admin(){

const user = JSON.parse(localStorage.getItem("user"));

if(!user || user.role !== "admin"){
return <h2>Нет доступа</h2>;
}

return(

<div>

<header>
<h1>Панель администратора</h1>
</header>

<div className="container">
<p>Управление системой</p>
</div>

</div>

);
}

export default Admin;
