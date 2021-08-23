import moment from "moment";

export const getDateAndTime = (date) => {
    return moment(date).format("MMMM, D y h:mmA");
};

export const getDate = (date) => {
    return moment(date).format("MMMM D, y");
};
