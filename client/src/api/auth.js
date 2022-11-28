import axios from "axios";
import { URL_ADMIN } from "../const";

export const authAdminRequest = async (password) => {
	const request = await axios.post(URL_ADMIN, { password });

	if (request.status === 200) {
		return true;
	}
};
