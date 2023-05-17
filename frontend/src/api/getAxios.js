import axios from "axios";

export const BOARD_GET_DATA = async (URL) => {
    return await axios.get(URL);
};

export const CALENDAR_GET_DATA = async (URL) => {
    return await axios.get(URL);
};
