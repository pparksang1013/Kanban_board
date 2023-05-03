import {
    CiCalendar,
    CiGrid42,
    CiFolderOn,
    CiSquareChevLeft,
} from "react-icons/ci";

import {
    HiOutlineArrowNarrowRight,
    HiOutlineArrowNarrowLeft,
} from "react-icons/hi";

const icons = {
    boardIcon: <CiFolderOn />,
    calendarIcon: <CiCalendar />,
    dashboardIcon: <CiGrid42 />,
    rightArrowIcon: <HiOutlineArrowNarrowRight />,
    leftArrowIcon: <HiOutlineArrowNarrowLeft />,
    folderIcon: <CiSquareChevLeft className="folder_icon" />,
};

export default icons;
