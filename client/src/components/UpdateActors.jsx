import React, { useState } from "react";
import { deleteActor } from "../api/actors";
import { findActors } from "../api/actors";
import ActorCard from "./ActorCard";
import Modal from "./Modal";
import "../styles/updateActors.css";
import DeleteActorModal from "./DeleteActorModal";
import UpdateActorModal from "./UpdateActorModal";

export default function UpdateActors() {
	const [name, setName] = useState("");
	const [actor, setActor] = useState(null);
	const [error, setError] = useState("");
	const [modal, setModal] = useState({
		shouldShow: false,
		type: null,
	});

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const findActor = async () => {
		const { data, status } = await findActors({ name });

		if (status) {
			setActor(data);
		} else if (!status && data === null) {
			setError("Помилка: Актора не існує");
		} else {
			setError("Помилка: сервер");
		}
	};

	const handleDelete = async () => {
		if (actor) {
			const deleted = deleteActor(actor.name);

			if (!deleted) {
				setError("could not delete actor");
			}

			setModal({ shouldShow: false, type: null });

			setError("deleted actor...");

			setTimeout(() => {
				window.location.reload(false);
			}, 1000);
		}
	};

	return (
		<div>
			{modal.shouldShow && actor !== null ? (
				modal.type === "DELETE" ? (
					<DeleteActorModal
						handleDelete={handleDelete}
						setModal={setModal}
					/>
				) : (
					<UpdateActorModal
						goBack={() => setModal(false, null)}
						actor={actor}
					/>
				)
			) : null}
			<input placeholder="Ім'я" value={name} onChange={handleChange} />
			<button onClick={findActor}>Знайти</button>
			{actor ? (
				<div>
					<div className="update__actor-card">
						<ActorCard
							name={actor.name}
							age={actor.age}
							description={actor.description}
							contacts={actor.contacts}
							photos={actor.photo_path || null}
							video={actor.video || null}
							keywords={actor.keywords}
							skills={actor.skills}
						/>
					</div>
					<div>
						<button
							onClick={() =>
								setModal({ shouldShow: true, type: "UPDATE" })
							}
						>
							ОНОВИТИ
						</button>
						<button
							onClick={() =>
								setModal({ shouldShow: true, type: "DELETE" })
							}
						>
							ВИДАЛИТИ
						</button>
					</div>
				</div>
			) : null}
			<h2 className="error">{error}</h2>
		</div>
	);
}
