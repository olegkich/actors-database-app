import React from "react";
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
	return (
		<div className="actor-card">
			<div className="actor-card__info">
				<h3 className="actor-card__name">
					{name} {age}
				</h3>
				<p className="actor-card__description">{description}</p>

				<p className="actor-card__skills">{skills}</p>
				<p className="actor-card__keywords">{keywords}</p>

				<p className="actor-card__contacts">{contacts}</p>
			</div>
			{photos ? (
				<img
					className="actor-card__image"
					src={`${API_URL}/${photos[0]}`}
					alt=""
				/>
			) : null}
		</div>
	);
}

export default ActorCard;
