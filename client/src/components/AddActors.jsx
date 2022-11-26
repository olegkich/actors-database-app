import React from "react";
import "../styles/addActors.css";

function AddActors() {
	return (
		<div className="add-actors">
			<h2>Add Actors</h2>
			<div>
				<div className="flex">
					<div className="column">
						<input placeholder="Actor's Name" />
						<input placeholder="Actor's Age" />
						<input placeholder="Contacts" />
					</div>
					<div className="column">
						<input placeholder="Keywords" />
						<input placeholder="Description" />
						<div>
							<label className="upload picture">
								Upload Files
								<input placeholder="" type="file" />
							</label>
							<button>Create</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddActors;
