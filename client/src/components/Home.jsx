import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import AddActors from "./AddActors";
import FindActors from "./FindActors";
import UpdateActors from "./UpdateActors";

function Home() {
	const navigate = useNavigate();
	const [action, setAction] = React.useState("None");
	return (
		<div className="home">
			<div className="menu">
				<h1>Меню Дій</h1>
				<button onClick={() => navigate("add")}>Додати Актора</button>
				<button onClick={() => navigate("find")}>Знайти акторів</button>
				<button onClick={() => navigate("find-all")}>
					Показати всіх акторів
				</button>
				<button onClick={() => navigate("update")}>
					ВидаЛити актора
				</button>
				<button onClick={() => navigate("help")}>Інструкція</button>
			</div>
		</div>
	);
}

export default Home;
