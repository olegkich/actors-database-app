import React from "react";
import { useNavigate } from "react-router-dom";
import { addActor } from "../api/actors";
import "../styles/addActors.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	ERR_AGE_EMPTY,
	ERR_INVALID_VIDEO_TYPE,
	ERR_NAME_TOO_SHORT,
	ERR_TOO_MANY_PHOTOS,
} from "../const";

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
				setError(ERR_NAME_TOO_SHORT);
				return;
			}

			if (values.age === "") {
				setError(ERR_AGE_EMPTY);
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

	const selectPhotos = (e) => {
		setError("");

		const photos = e.target.files;

		if (photos.length > 3) {
			setError(ERR_TOO_MANY_PHOTOS);
			return;
		}

		for (let i = 0; i < e.target.files.length; i++) {
			if (
				photos[i].type !== "image/jpeg" &&
				photos[i].type !== "image/png" &&
				photos[i].type !== "image/jpg"
			) {
				setError();
			}
		}

		formik.setFieldValue("photos", e.target.files);
		// setPhotos(e.target.files);
	};

	const selectVideo = (e) => {
		if (e.target.files[0].type !== "video/mp4") {
			setError(ERR_INVALID_VIDEO_TYPE);
			return;
		}
		formik.setFieldValue("video", e.target.files[0]);

		// setVideo(e.target.files[0]);
	};

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
			
		</div>
	);
}

export default AddActors;
