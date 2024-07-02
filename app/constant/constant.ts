import axios, { AxiosInstance } from "axios";

export const baseUrl = "http://localhost:4000/api";

export const axiosClientJsonContent = axios.create({
    baseURL: baseUrl,
	headers: {
	  "Content-Type": "application/json"
	}
});

export const axiosClientSecuredJsonContent: (data: string) => AxiosInstance = (jwt: string) => axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${jwt}`
	}
});


export const primaryColor = "#526ed3";
export const secondaryColor = "#EBEFFF";
export const lightTextColor = "#6A6D7F";
export const infoColor = "#4b7bec";
export const successColor = "#3aa981";
export const warningColor = "#ff9f43";
export const errorColor = "#dd4c1e";