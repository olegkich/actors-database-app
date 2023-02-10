import { useState } from "react";
import { React, useEffect } from "react";
import { findAllActors } from "../api/actors";
import ActorCard from "./ActorCard";

function AllActors() {
	const [actors, setActors] = useState();
	const [message, setMessage] = useState("");

	useEffect(() => {
		(async () => {
			const data = await findAllActors();

			if (Array.isArray(data)) {
				setActors([...data]);
			} else if (data) {
				setActors([data]);
			}
		})();
	}, []);

	return (
		<div
			className="actors-list"
			style={{
				width: "80vw",
				display: "flex",
				alignItems: "center",
			}}
		>
			{actors ? (
				actors.length >= 1 ? (
					actors.map((i) => (
						<ActorCard
							name={i.name}
							age={i.age}
							description={i.description}
							contacts={i.contacts}
							photos={i.photo_path || null}
							video={i.video_path || null}
							keywords={i.keywords}
							skills={i.skills}
						/>
					))
				) : (
					<p>None actors found.</p>
				)
			) : null}
			<h2>{message}</h2>
		</div>
	);
}

export default AllActors;
