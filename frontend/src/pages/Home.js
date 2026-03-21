import {Link} from "react-router-dom";

function Home(){

return(

<div>

<header>
<h1>Медицинская платформа</h1>
</header>

<div className="container">

<div className="card">
<Link to="/patient" className="btn blue">Пациент</Link>
</div>

<div className="card">
<Link to="/doctor" className="btn green">Врач</Link>
</div>

<div className="card">
<Link to="/admin" className="btn gray">Админ</Link>
</div>

</div>

</div>

);
}

export default Home;
