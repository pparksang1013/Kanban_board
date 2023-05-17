import axios from "axios";

export const CARD_DEL = async (URL) => {
    return await axios.delete(URL);
};

export const TASK_DEL = async (URL) => {
    return await axios.delete(URL);
};
