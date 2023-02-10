import React from "react";
import { useNavigate } from "react-router-dom";
import { addActor } from "../api/actors";
import "../styles/addActors.css";

function AddActors() {
	const navigate = useNavigate();

	const [values, setValues] = React.useState({
		name: "",
		age: "",
		contacts: "",
		description: "",
		keywords: "",
		skills: "",
		photos: null,
		video: null,
	});

	const [photos, setPhotos] = React.useState();
	const [video, setVideo] = React.useState();

	const [error, setError] = React.useState("");

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
					description: values.description,
					contacts: values.contacts,
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
					description: values.description,
					contacts: values.contacts,
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
					description: values.description,
					contacts: values.contacts,
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
					description: values.description,
					contacts: values.contacts,
				});
				break;

			case "description":
				if (e.currentTarget.value.length === 200) {
					return;
				}
				setValues({
					name: values.name,
					age: values.age,
					keywords: values.keywords,
					skills: values.skills,
					description: e.currentTarget.value,
					contacts: values.contacts,
				});
				break;

			case "contacts":
				if (e.currentTarget.value.length === 50) {
					return;
				}
				setValues({
					name: values.name,
					age: values.age,
					keywords: values.keywords,
					skills: values.skills,
					description: values.description,
					contacts: e.currentTarget.value,
				});
				break;
			default:
				break;
		}
	};

	const selectPhotos = (e) => {
		setError("");

		const photos = e.target.files;

		if (photos.length > 3) {
			setError("Помилка - Максимум 3 фото.");
			return;
		}

		for (let i = 0; i < e.target.files.length; i++) {
			if (
				photos[i].type !== "image/jpeg" &&
				photos[i].type !== "image/png" &&
				photos[i].type !== "image/jpg"
			) {
				setError(
					"Розширення фото не підтримується. Тільки JPG (jpeg) або PNG"
				);
			}
		}

		setPhotos(e.target.files);
	};

	const selectVideo = (e) => {
		if (e.target.files[0].type !== "video/mp4") {
			setError("Помилка - данний тип відео не підтримується. Тільки MP4");
			return;
		}
		setVideo(e.target.files[0]);
	};

	const handleSubmit = async () => {
		const formData = new FormData();

		if (values.name.length < 3) {
			setError("Помилка - ім'я закоротке. (3 символа мінімум.) ");
			return;
		}

		if (values.age === "") {
			setError("Помилка - вік не може бути пустий");
			return;
		}

		formData.append("name", values.name);
		formData.append("age", Number(values.age));

		if (values.contacts !== "") {
			formData.append("contacts", values.contacts);
		}

		if (values.description !== "") {
			formData.append("description", values.description);
		}

		if (photos) {
			for (const photo of photos) {
				formData.append("photos", photo);
			}
		}

		if (video) {
			formData.append("video", video);
		}

		if (values.keywords !== "") {
			formData.append("keywords", values.keywords);
		}

		if (values.skills !== "") {
			formData.append("skills", values.skills);
		}

		const request = await addActor(formData);
		if (request.status) {
			navigate(-1);
		} else {
			setError(request.message);
		}
	};

	return (
		<div className="add-actors">
			<h2>Add Actors</h2>
			<div>
				<div className="flex">
					<div className="column">
						<input
							placeholder="Ім'я Актора"
							onChange={handleChange}
							value={values.name}
							id="name"
						/>
						<input
							placeholder="Вік Актора"
							onChange={handleChange}
							value={values.age}
							id="age"
						/>
						<input
							placeholder="Контакти"
							onChange={handleChange}
							value={values.contacts}
							id="contacts"
						/>
					</div>
					<div className="column">
						<input
							placeholder="Ключові слова"
							onChange={handleChange}
							value={values.keywords}
							id="keywords"
						/>
						<input
							placeholder="Опис актора"
							onChange={handleChange}
							value={values.description}
							id="description"
						/>
						<input
							placeholder="Навички"
							onChange={handleChange}
							value={values.skills}
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
							onChange={selectPhotos}
							multiple={true}
						/>
					</label>
					<label className="upload picture">
						Загрузити відео
						<input
							placeholder=""
							name="video"
							type="file"
							onChange={selectVideo}
						/>
					</label>
					<button onClick={handleSubmit}>Створити</button>
				</div>
			</div>
			<h2>{error}</h2>
		</div>
	);
}

export default AddActors;
