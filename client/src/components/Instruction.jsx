import React from "react";
import "../styles/instruction.css";

function Instruction() {
	return (
		<div className="instruction">
			<h1>Інструкція Користування</h1>
			<div>
				<h2>Додавання актора</h2>
				<p>
					1. При вводі навичок або ключових слів
					<br />
					<u>
						ОБОВ'ЯЗКОВО розділяти кожне ключове слово/навичку комою.
					</u>
					<br />
					<small>
						<b>Наприклад: </b>Грання на піаніно, співи, поїдання
						дітей.
					</small>
				</p>
				<p>
					2. На данний момент підтримуются такі формати фото:
					<br />
					<ul>
						<li>JPEG</li>
					</ul>
					І такі формати відео:
					<br />
					<ul>
						<li>MP4</li>
					</ul>
				</p>
			</div>
		</div>
	);
}

export default Instruction;
