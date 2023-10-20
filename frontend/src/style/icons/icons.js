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
    HiOutlineDotsVertical,
} from "react-icons/hi";

import { MdExposurePlus1, MdExposureNeg1 } from "react-icons/md";

import { BiChevronDown } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";

const icons = {
    boardIcon: <CiFolderOn />,
    calendarIcon: <CiCalendar />,
    dashboardIcon: <CiGrid42 />,
    rightArrowIcon: <HiOutlineArrowNarrowRight />,
    leftArrowIcon: <HiOutlineArrowNarrowLeft />,
    folderCloseIcon: <CiSquareChevLeft className="folder_close" />,
    folderOpenIcon: <CiSquareChevRight className="folder_open" />,
    menuKebabIcon: <HiOutlineDotsVertical />,
    plusIcon: <MdExposurePlus1 />,
    minusIcon: <MdExposureNeg1 />,
    dropdownIcon: <BiChevronDown className="dropdown" />,
    trashIcon: <BsTrash3 />,
};

export default icons;
