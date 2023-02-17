import React from "react";
import { useNavigate } from "react-router-dom";
import { addActor } from "../api/actors";
import "../styles/addActors.css";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddActors() {
	const navigate = useNavigate();

	// const [values, setValues] = React.useState({
	// 	name: "",
	// 	age: "",
	// 	contacts: "",
	// 	description: "",
	// 	keywords: "",
	// 	skills: "",
	// 	photos: null,
	// 	video: null,
	// });

	// const [photos, setPhotos] = React.useState();
	// const [video, setVideo] = React.useState();

	const [error, setError] = React.useState("");

	const formik = useFormik({
		initialValues: {
			name: "",
			age: "",
			contacts: "",
			skills: "",
			keywords: "",
			description: "",
			photos: null,
			video: null,
		},
		onSubmit: async function (values) {
			const photos = values.photos;
			const video = values.video;

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
		},
	});

	// const handleChange = (e) => {
	// 	switch (e.currentTarget.id) {
	// 		case "name":
	// 			if (e.currentTarget.value.length === 30) {
	// 				return;
	// 			}
	// 			setValues({
	// 				name: e.currentTarget.value,
	// 				age: values.age,
	// 				keywords: values.keywords,
	// 				skills: values.skills,
	// 				description: values.description,
	// 				contacts: values.contacts,
	// 			});
	// 			break;

	// 		case "age":
	// 			if (
	// 				e.currentTarget.value.length === 3 ||
	// 				isNaN(e.currentTarget.value)
	// 			) {
	// 				return;
	// 			}
	// 			setValues({
	// 				name: values.name,
	// 				age: e.currentTarget.value,
	// 				keywords: values.keywords,
	// 				skills: values.skills,
	// 				description: values.description,
	// 				contacts: values.contacts,
	// 			});
	// 			break;

	// 		case "keywords":
	// 			if (e.currentTarget.value.length === 200) {
	// 				return;
	// 			}
	// 			setValues({
	// 				name: values.name,
	// 				age: values.age,
	// 				keywords: e.currentTarget.value,
	// 				skills: values.skills,
	// 				description: values.description,
	// 				contacts: values.contacts,
	// 			});
	// 			break;

	// 		case "skills":
	// 			if (e.currentTarget.value.length === 200) {
	// 				return;
	// 			}
	// 			setValues({
	// 				name: values.name,
	// 				age: values.age,
	// 				keywords: values.keywords,
	// 				skills: e.currentTarget.value,
	// 				description: values.description,
	// 				contacts: values.contacts,
	// 			});
	// 			break;

	// 		case "description":
	// 			if (e.currentTarget.value.length === 200) {
	// 				return;
	// 			}
	// 			setValues({
	// 				name: values.name,
	// 				age: values.age,
	// 				keywords: values.keywords,
	// 				skills: values.skills,
	// 				description: e.currentTarget.value,
	// 				contacts: values.contacts,
	// 			});
	// 			break;

	// 		case "contacts":
	// 			if (e.currentTarget.value.length === 50) {
	// 				return;
	// 			}
	// 			setValues({
	// 				name: values.name,
	// 				age: values.age,
	// 				keywords: values.keywords,
	// 				skills: values.skills,
	// 				description: values.description,
	// 				contacts: e.currentTarget.value,
	// 			});
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// };

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

		formik.setFieldValue("photos", e.target.files);
		// setPhotos(e.target.files);
	};

	const selectVideo = (e) => {
		if (e.target.files[0].type !== "video/mp4") {
			setError("Помилка - данний тип відео не підтримується. Тільки MP4");
			return;
		}
		formik.setFieldValue("video", e.target.files[0]);

		// setVideo(e.target.files[0]);
	};

	// const handleSubmit = async () => {
	// 	const formData = new FormData();

	// 	if (values.name.length < 3) {
	// 		setError("Помилка - ім'я закоротке. (3 символа мінімум.) ");
	// 		return;
	// 	}

	// 	if (values.age === "") {
	// 		setError("Помилка - вік не може бути пустий");
	// 		return;
	// 	}

	// 	formData.append("name", values.name);
	// 	formData.append("age", Number(values.age));

	// 	if (values.contacts !== "") {
	// 		formData.append("contacts", values.contacts);
	// 	}

	// 	if (values.description !== "") {
	// 		formData.append("description", values.description);
	// 	}

	// 	if (photos) {
	// 		for (const photo of photos) {
	// 			formData.append("photos", photo);
	// 		}
	// 	}

	// 	if (video) {
	// 		formData.append("video", video);
	// 	}

	// 	if (values.keywords !== "") {
	// 		formData.append("keywords", values.keywords);
	// 	}

	// 	if (values.skills !== "") {
	// 		formData.append("skills", values.skills);
	// 	}

	// 	const request = await addActor(formData);
	// 	if (request.status) {
	// 		navigate(-1);
	// 	} else {
	// 		setError(request.message);
	// 	}
	// };

	return (
		<div className="add-actors">
			<h2>Add Actors</h2>
			<form onSubmit={formik.handleSubmit}>
				<div className="flex">
					<div className="column">
						<input
							placeholder="Ім'я Актора"
							onChange={formik.handleChange}
							value={formik.values.name}
							onBlur={formik.handleBlur}
							id="name"
						/>
						<input
							name="age"
							placeholder="Вік Актора"
							onChange={formik.handleChange}
							value={formik.values.age}
							onBlur={formik.handleBlur}
							id="age"
						/>
						<input
							name="contacts"
							placeholder="Контакти"
							onChange={formik.handleChange}
							value={formik.values.contacts}
							onBlur={formik.handleBlur}
							id="contacts"
						/>
					</div>
					<div className="column">
						<input
							name="keywords"
							placeholder="Ключові слова"
							onChange={formik.handleChange}
							value={formik.values.keywords}
							onBlur={formik.handleBlur}
							id="keywords"
						/>
						<input
							name="description"
							placeholder="Опис актора"
							onChange={formik.handleChange}
							value={formik.values.description}
							onBlur={formik.handleBlur}
							id="description"
						/>
						<input
							name="skills"
							placeholder="Навички"
							onChange={formik.handleChange}
							value={formik.values.skills}
							onBlur={formik.handleBlur}
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
					<button type="submit" onClick={formik.onSubmit}>
						Створити
					</button>
				</div>
			</form>
			<h2>{error}</h2>
		</div>
	);
}

export default AddActors;
