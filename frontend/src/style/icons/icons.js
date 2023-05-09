import {
    CiCalendar,
    CiGrid42,
    CiFolderOn,
    CiSquareChevLeft,
    CiSquareChevRight,
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
    folderCloseIcon: <CiSquareChevLeft className="folder_close" />,
    folderOpenIcon: <CiSquareChevRight className="folder_open" />,
};

export default icons;
