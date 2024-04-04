import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://api.producthunt.com/v2/",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

const getAccessTokenPayload = {
	client_id: "39zsVF6R_8mbajaavFpoNkEHlqNTfw6IFgM5d2OpvhU",
	client_secret: "v0XAT9pnOb0MIxj1s2d79J85kY3SF2ae4ZPUcJ_3o5c",
	redirect_uri: "https://clone-producthunt-5173.netlify.app:3000",
	grant_type: "authorization_code",
};

export const getAccessToken = async code => {
	try {
		const response = await axiosInstance.post("oauth/token", {
			...getAccessTokenPayload,
			code,
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error("Failed to get access token");
	}
};

export const getUserName = async token => {
	try {
		const response = await axiosInstance.post(
			"api/graphql",
			{
				query: `
					query {
						viewer {
							user {
								username
							}
						}
					}
				`,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error("Failed to get username");
	}
};
