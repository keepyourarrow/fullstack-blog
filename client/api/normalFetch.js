import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/`;

export const normalFetch = (params, type, body = {}) => {
    return axios[type](url + params, body);
};
