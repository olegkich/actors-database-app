import axios from "axios";
import { URL_ADD, URL_FIND } from "../const";

const config = {
	headers: {
		authorization: "Bearer " + localStorage.getItem("token"),
	},
};

export const findActors = async (data) => {
	const request = await axios.post(URL_FIND, data, config);

	console.log(request);

	if (request.status === 200) {
		return request;
	}
};

export const addActor = async (data) => {
	const request = await axios.post(URL_ADD, data, config);

	console.log(request);

	if (request.status === 200) {
		return true;
	}
};
