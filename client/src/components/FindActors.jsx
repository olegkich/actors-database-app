import React from "react";
import "../styles/findActors.css";

export default function FindActors() {
	return (
		<>
			<div className="find-actors">
				<h2>FindActors</h2>
				<input placeholder="Actor Name" />
				<input placeholder="Actor Age" />
				<input placeholder="keywords" />
				<button>Find</button>
			</div>
			<div className="actors-list">
				<h2>No Actors Found.</h2>
			</div>
		</>
	);
}
