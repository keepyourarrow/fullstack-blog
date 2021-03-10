import axios from "axios";


const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs`;

export const postBlog = (body) => axios.post(`${url}/`, body);
export const login = ({ userField, password }) =>
    axios.post(`${url}/login`, { userField, password });

export const resendLink = (email) => axios.get(url + `/resend-email/${email}`);
export const resetPassword = (password) => axios.get(url + `/reset-password/${password}`);

export const fetchByCategory = (name) => axios.get(url + `/category/${name}`);
export const fetchOneBlog = (name) => axios.get(url + `/${name}`);
export const fetchBySearch = (name) => axios.get(url + `/search/${name}`);
