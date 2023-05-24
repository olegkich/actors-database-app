const URL_ACTORS = "actors/";
const URL_AUTH = "authentication/";

export const API_URL = "http://localhost:5000/";
export const URL_ADD = API_URL + URL_ACTORS;
export const URL_FIND = API_URL + URL_ACTORS + "find/";
export const URL_ALL = API_URL + URL_ACTORS;
export const URL_ADMIN = API_URL + URL_AUTH + "admin/";
export const URL_DELETE = API_URL + URL_ACTORS;

export const ERR_NAME_TOO_SHORT =
	"Помилка - ім'я закоротке. (3 символа мінімум.) ";
export const ERR_AGE_EMPTY = "Помилка - вік не може бути пустий";
export const ERR_TOO_MANY_PHOTOS = "Помилка - Максимум 3 фото.";
export const ERR_INVALID_PHOTO_TYPE =
	"Розширення фото не підтримується. Тільки JPG (jpeg) або PNG";
export const ERR_INVALID_VIDEO_TYPE =
	"Помилка - данний тип відео не підтримується. Тільки MP4";
