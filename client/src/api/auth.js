import axios from "axios";
import { URL_ADMIN } from "../const";

export const authAdminRequest = async (password) => {
	const request = await axios.post(URL_ADMIN, { password });

	console.log(request.data);

	if (request.status === 200 && request.data) {
		localStorage.setItem("token", request.data.token);
		return true;
	}
};
