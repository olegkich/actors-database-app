import React from "react";
import { addActor } from "../api/actors";
import "../styles/addActors.css";

function AddActors() {
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
		console.log(e.currentTarget.id);
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
		if (e.target.files.length > 3) {
			return;
		}
		setPhotos(e.target.files);
		console.log(e.target.files);
	};

	const selectVideo = (e) => {
		if (e.target.files[0].type !== "video/mp4") {
			console.log("nope");
			return;
		}
		setVideo(e.target.files[0]);
	};

	const handleSubmit = () => {
		const formData = new FormData();

		if (values.name.length < 4) {
			setError("name is too short, 4 characters minimum.");
			return;
		}

		if (values.age === "") {
			setError("age cannot be empty");
			return;
		}

		formData.append("name", values.name);
		formData.append("age", Number(values.age));
		formData.append("contacts", values.contacts);
		formData.append("description", values.description);
		for (const photo of photos) {
			formData.append("photos", photo);
		}
		formData.append("video", video);
		formData.append("keywords", values.keywords);
		formData.append("skills", values.skills);

		console.log(formData);

		addActor(formData);
	};

	return (
		<div className="add-actors">
			<h2>Add Actors</h2>
			<div>
				<div className="flex">
					<div className="column">
						<input
							placeholder="Actor's Name"
							onChange={handleChange}
							value={values.name}
							id="name"
						/>
						<input
							placeholder="Actor's Age"
							onChange={handleChange}
							value={values.age}
							id="age"
						/>
						<input
							placeholder="Contacts"
							onChange={handleChange}
							value={values.contacts}
							id="contacts"
						/>
					</div>
					<div className="column">
						<input
							placeholder="Keywords"
							onChange={handleChange}
							value={values.keywords}
							id="keywords"
						/>
						<input
							placeholder="Description"
							onChange={handleChange}
							value={values.description}
							id="description"
						/>
						<input
							placeholder="Skills"
							onChange={handleChange}
							value={values.skills}
							id="skills"
						/>
					</div>
				</div>
				<div>
					<label className="upload picture">
						Upload Photos
						<input
							placeholder=""
							name="photos"
							type="file"
							onChange={selectPhotos}
							multiple={true}
						/>
					</label>
					<label className="upload picture">
						Upload Video
						<input
							placeholder=""
							name="video"
							type="file"
							onChange={selectVideo}
						/>
					</label>
					<button onClick={handleSubmit}>Create</button>
				</div>
			</div>
		</div>
	);
}

export default AddActors;
