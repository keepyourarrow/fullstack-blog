import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_SERVER_URL}`;

// useSwr
export const getSingleUser = (params) => axios.get(url + params);
export const getAllUsers = (password) => axios.get(url + `/reset-password/${password}`);
