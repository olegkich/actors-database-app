import React from "react";
import { useNavigate } from "react-router-dom";
import { authAdminRequest } from "../api/auth";

export default function Auth() {
	const navigate = useNavigate();

	const [state, setState] = React.useState({
		adminPassword: "",
		actorPassword: "",
	});

	const [error, setError] = React.useState("");

	const handleLogin = async () => {
		try {
			const req = await authAdminRequest(state.adminPassword);
			if (req) {
				navigate("admin/");
				return;
			}
		} catch (e) {}

		setError("Wrong Password");
	};

	const handleLoginChange = (e) => {
		setState({
			adminPassword: e.target.value,
			actorPassword: state.actorPassword,
		});
	};

	const handleOneTimeChange = (e) => {
		setState({
			adminPassword: state.adminPassword,
			actorPassword: e.target.value,
		});
	};

	return (
		<div className="column">
			<input
				placeholder="admin password"
				value={state.adminPassword}
				onChange={handleLoginChange}
			/>
			<button onClick={handleLogin}>Log In as Admin</button>

			<input
				placeholder="actor password "
				value={state.actorPassword}
				onChange={handleOneTimeChange}
			/>
			<button>Login as Actor</button>
			<b>{error}</b>
		</div>
	);
}
