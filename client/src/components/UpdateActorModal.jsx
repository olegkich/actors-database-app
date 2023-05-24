import React, { useEffect } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import {
	ERR_AGE_EMPTY,
	ERR_INVALID_VIDEO_TYPE,
	ERR_NAME_TOO_SHORT,
	ERR_TOO_MANY_PHOTOS,
} from "../const";

import { useFormik } from "formik";
import { updateActor } from "../api/actors";

function UpdateActorModal({ actor, goBack }) {
	const [error, setError] = React.useState("");
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: actor,

		onSubmit: async function (values) {
			try {
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

				const request = await updateActor(formData, actor._id);
				if (request.status) {
					// navigate(-1);
				} else {
					setError(request.message);
				}
			} catch (error) {
				console.log(error);
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
	};

	const selectVideo = (e) => {
		if (e.target.files[0].type !== "video/mp4") {
			setError(ERR_INVALID_VIDEO_TYPE);
			return;
		}
		formik.setFieldValue("video", e.target.files[0]);
	};

	return (
		<Modal>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "90%",
				}}
			>
				<h2>Оновити Актора</h2>
				<button onClick={goBack}>X</button>
			</div>
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
						Оновити
					</button>
				</div>
				<h3>{error}</h3>
			</form>
		</Modal>
	);
}

export default UpdateActorModal;
