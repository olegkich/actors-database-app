import React from "react";
import { useNavigate } from "react-router-dom";
import { authAdminRequest } from "../api/auth";

export default function Auth() {
	const navigate = useNavigate();

	const [input, setInput] = React.useState("");

	const [error, setError] = React.useState("");

	const handleLogin = async () => {
		if (input === "") {
			setError("password cannot be empty");
			return;
		}
		try {
			const req = await authAdminRequest(input);
			if (req) {
				setInput("");
				navigate("admin/");
				return;
			}
		} catch (e) {}

		setError("Wrong Password");
	};

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	return (
		<div className="column">
			<h1 style={{ marginBottom: "1rem" }}>Actor Database</h1>
			<input
				type="password"
				placeholder="admin password"
				value={input}
				onChange={handleChange}
			/>
			<button onClick={handleLogin}>Log In</button>
			<b>{error}</b>
		</div>
	);
}
