import React, { useState } from "react";
import { deleteActor } from "../api/actors";
import { findActors } from "../api/actors";
import ActorCard from "./ActorCard";
import Modal from "./Modal";
import "../styles/updateActors.css";

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

		console.log(actor);
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
			{modal.shouldShow ? (
				modal.type === "DELETE" ? (
					<Modal>
						<h3>Точно видалити актора?</h3>
						<div>
							<button onClick={handleDelete}>Так</button>
							<button
								onClick={() =>
									setModal({ shouldShow: false, type: null })
								}
							>
								Ні
							</button>
						</div>
					</Modal>
				) : (
					<Modal>
						Оновити Актора
						<div>
							<div className="flex">
								<div className="column">
									<input
										placeholder="Ім'я Актора"
										onChange={handleChange}
										id="name"
									/>
									<input
										placeholder="Вік Актора"
										onChange={handleChange}
										id="age"
									/>
									<input
										placeholder="Контакти"
										onChange={handleChange}
										id="contacts"
									/>
								</div>
								<div className="column">
									<input
										placeholder="Ключові слова"
										onChange={handleChange}
										id="keywords"
									/>
									<input
										placeholder="Опис актора"
										onChange={handleChange}
										id="description"
									/>
									<input
										placeholder="Навички"
										onChange={handleChange}
										id="skills"
									/>
								</div>
							</div>
							<div>
								<label className="upload picture">
									Загрузити Фото
									<input
										placeholder=""
										name="photos"
										type="file"
										multiple={true}
									/>
								</label>
								<label className="upload picture">
									Загрузити відео
									<input
										placeholder=""
										name="video"
										type="file"
									/>
								</label>
								<button>Створити</button>
							</div>
						</div>
					</Modal>
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
