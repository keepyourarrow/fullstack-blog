import axios from "axios";
import cookie from "js-cookie";

const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/`;

export const fetchWithAuth = (params, type, body) => {
    const access_token = cookie.get("access_token");
    body.refresh_token = cookie.get("refresh_token");

    console.log({ params, type, body, access_token });

    let config = {
        headers: {
            Authorization: access_token,
        },
    };

    return axios[type](url + params, body, config);
};
