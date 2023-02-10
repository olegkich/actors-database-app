import axios from "axios";
import { URL_ADD, URL_ALL, URL_DELETE, URL_FIND } from "../const";

const config = {
	headers: {
		authorization: "Bearer " + localStorage.getItem("token"),
	},
};

export const findActors = async (data) => {
	try {
		const request = await axios.post(URL_FIND, data, config);

		if (request.status === 200) {
			return { data: request.data, status: true };
		}
	} catch (e) {
		return { data: null, status: false };
	}
};

export const findAllActors = async () => {
	const request = await axios.get(URL_ALL, config);

	console.log(request.data);

	return request.data;
};

export const addActor = async (data) => {
	const request = await axios.post(URL_ADD, data, config);

	console.log(request);

	if (request.status === 200) {
		return { status: true, message: "" };
	}

	return { status: false, message: request.data };
};

export const deleteActor = async (name) => {
	console.log(name);
	const request = await axios.delete(`${URL_DELETE}/${name}`, config);

	console.log(name);

	if (request.status === 200) {
		return true;
	}

	return false;
};
