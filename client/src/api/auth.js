import axios from "axios";
import { API_URL, URL_AUTH } from "../const";

export const authAdminRequest = async (password) => {
	const request = await axios.post(API_URL + URL_AUTH, { password });
	console.log(request);
	if (request.status === 200) {
		return true;
	}
};
