import axios from "axios";

export const CARD_POST_API = async (URL, CARDINFO) => {
    return await axios.post(URL, CARDINFO);
};

export const TASK_POST_DATA = async (URL, TASKDATA) => {
    return await axios.post(URL, TASKDATA);
};
