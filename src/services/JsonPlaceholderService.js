import fetch from "auth/JsonPlaceholderInterceptor";

const jsonPlaceholderService = {};

jsonPlaceholderService.getUsers = async function () {
	await new Promise((res) => setTimeout(res, 1_000));
	return fetch({
		url: "/users",
		method: "get",
	});
};

jsonPlaceholderService.getUser = async function (userId) {
	await new Promise((res) => setTimeout(res, 500));
	return fetch({
		url: `/users/${userId}`,
		method: "get",
	});
};

export default jsonPlaceholderService;
