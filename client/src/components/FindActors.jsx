import React from "react";
import { findActors } from "../api/actors";
import "../styles/findActors.css";
import ActorCard from "./ActorCard";

export default function FindActors() {
	const [actors, setActors] = React.useState([]);
	const [values, setValues] = React.useState({
		name: "",
		age: "",
		keywords: "",
		skills: "",
	});

	const handleChange = (e) => {
		switch (e.currentTarget.id) {
			case "name":
				if (e.currentTarget.value.length === 30) {
					return;
				}
				setValues({
					name: e.currentTarget.value,
					age: values.age,
					keywords: values.keywords,
					skills: values.skills,
				});
				break;

			case "age":
				if (
					e.currentTarget.value.length === 3 ||
					isNaN(e.currentTarget.value)
				) {
					return;
				}
				setValues({
					name: values.name,
					age: e.currentTarget.value,
					keywords: values.keywords,
					skills: values.skills,
				});
				break;

			case "keywords":
				if (e.currentTarget.value.length === 200) {
					return;
				}
				setValues({
					name: values.name,
					age: values.age,
					keywords: e.currentTarget.value,
					skills: values.skills,
				});
				break;

			case "skills":
				if (e.currentTarget.value.length === 200) {
					return;
				}
				setValues({
					name: values.name,
					age: values.age,
					keywords: values.keywords,
					skills: e.currentTarget.value,
				});
				break;

			default:
				break;
		}
	};

	const handleSubmit = async () => {
		const data = values;

		const request = await findActors(data);

		if (request.data.length < 1) {
			return;
		}

		if (Array.isArray(request.data)) {
			setActors([...request.data]);
		} else {
			console.log(request.data);
			setActors([request.data]);
		}
	};

	return (
		<div className="find-actors__container">
			<div className="find-actors">
				<h2>Пошук Акторів</h2>
				<input
					placeholder="Ім'я актора"
					id="name"
					value={values.name}
					onChange={handleChange}
				/>
				<input
					placeholder="Вік актора"
					id="age"
					value={values.age}
					onChange={handleChange}
				/>
				<input
					placeholder="Ключові слова"
					id="keywords"
					value={values.keywords}
					onChange={handleChange}
				/>
				<input
					placeholder="Навички"
					id="skills"
					value={values.skills}
					onChange={handleChange}
				/>
				<button onClick={handleSubmit}>Знайти</button>
			</div>
			<div className="actors-list">
				{actors.length >= 1 ? (
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
					<p>Акторів не знайдено.</p>
				)}
			</div>
		</div>
	);
}
