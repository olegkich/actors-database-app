import React from "react";
import { useState } from "react";
import { API_URL } from "../const";
import "../styles/actorCard.css";

function ActorCard({
	name,
	age,
	description,
	contacts,
	keywords,
	skills,
	photos,
	video,
}) {
	const [photoIndex, setPhotoIndex] = useState(0);
	let keywords_splitted = [];
	let skills_splitted = [];

	try {
		keywords_splitted = keywords.split(",");
		skills_splitted = skills.split(",");
	} catch (error) {}

	return (
		<div className="actor-card">
			<div className="actor-card__info">
				<h3 className="actor-card__name">
					<b>
						{name} ({age} років)
					</b>
				</h3>

				<hr />
				<p className="actor-card__description">
					Опис:
					<br />
					{description}
				</p>

				<hr />

				<p className="actor-card__skills">
					<b>Навички:</b>
					{skills_splitted
						? skills_splitted.map((s) => {
								return (
									<div className="actor-card__skills-skill">
										{s}
									</div>
								);
						  })
						: null}
				</p>
				<hr />
				<div className="actor-card__keywords">
					Ключові слова:
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
						}}
					>
						<br />
						{keywords_splitted
							? keywords_splitted.map((k) => {
									return (
										<div className="actor-card__keywords-keyword">
											{k}
										</div>
									);
							  })
							: null}
					</div>
				</div>

				<hr />
				<p className="actor-card__contacts">
					Контакти:
					<br />
					{contacts}
				</p>
				{video ? <a href={`${API_URL}/${video}`}>Відео</a> : null}
				{photos.length > 1 ? (
					<button
						onClick={() => {
							photoIndex === 2
								? setPhotoIndex(0)
								: setPhotoIndex(photoIndex + 1);
						}}
					>
						наступне фото
					</button>
				) : null}
			</div>
			{photos | (photos.length > 0) ? (
				<img
					className="actor-card__image"
					src={`${API_URL}/${photos[photoIndex]}`}
					alt=""
				/>
			) : null}
		</div>
	);
}

export default ActorCard;
