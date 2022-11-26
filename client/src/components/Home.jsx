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
				<h1>Main Menu</h1>
				<button onClick={() => navigate("add")}>Add Actors</button>
				<button onClick={() => navigate("find")}>Find Actors</button>
				<button onClick={() => navigate("update")}>
					Delete or Update Actors
				</button>
			</div>
		</div>
	);
}

export default Home;
