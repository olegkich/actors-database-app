import React from "react";
import Modal from "./Modal";

function UpdateActorModal() {
	const handleChange = () => {};

	return (
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
						<input placeholder="" name="video" type="file" />
					</label>
					<button>Створити</button>
				</div>
			</div>
		</Modal>
	);
}

export default UpdateActorModal;
