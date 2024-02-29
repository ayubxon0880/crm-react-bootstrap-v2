import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import {PiChalkboardTeacherBold} from "react-icons/pi";
import {SiTestcafe} from "react-icons/si";
import {AiOutlineDeleteRow} from "react-icons/ai";

export const NavbarDataForStudent = [
    {
        title: "Dashboard",
        path: "/",
        icon: <AiIcons.AiFillHome/>,
        cName: "nav-text",
    },
    {
        title: "Davomat",
        path: "/attendance",
        icon: <FaIcons.FaAdn/>,
        cName: "nav-text",
    },
    {
        title: "Challenge",
        path: "/challenge",
        icon: <FaIcons.FaQuestion/>,
        cName: "nav-text",
    },
    {
        title: "Speaking",
        path: "/voices",
        icon: <FaIcons.FaQuestion/>,
        cName: "nav-text",
    },
    {
        title: "Topic yaratish",
        path: "/create-topic",
        icon: <FaIcons.FaQuestion/>,
        cName: "nav-text",
    },
    {
        title: "Testlar",
        path: "/tests",
        icon: <IoIcons.IoIosPaper/>,
        cName: "nav-text",
    },
    {
        title: "To'lov",
        path: "/payment",
        icon: <FaIcons.FaMoneyCheck/>,
        cName: "nav-text",
    },
    {
        title: "Profile",
        path: "/profile",
        icon: <FaIcons.FaFingerprint/>,
        cName: "nav-text",
    },
    {
        title: "Dasturchi haqida",
        path: "/about-programmer",
        icon: <IoIcons.IoMdHelpCircle/>,
        cName: "nav-text",
    },
];
export const NavbarDataForTeacher = [
    {
        title: "Dashboard",
        path: "/",
        icon: <AiIcons.AiFillHome/>,
        cName: "nav-text",
    },
    {
        title: "Davomat qilish",
        path: "/attendance-form",
        icon: <IoIcons.IoMdHelpCircle/>,
        cName: "nav-text",
    },
    {
        title: "Davomatlar",
        path: "/attendances-view",
        icon: <IoIcons.IoIosCalendar/>,
        cName: "nav-text",
    },
    {
        title: "Test natijalari",
        path: "/tests-view",
        icon: <IoIcons.IoIosCalendar/>,
        cName: "nav-text",
    },
    {
        title: "Test qo'shish",
        path: "/tests",
        icon: <IoIcons.IoIosPaper/>,
        cName: "nav-text",
    },
    {
        title: "Guruxlarim",
        path: "/group-details",
        icon: <IoIcons.IoIosPaper/>,
        cName: "nav-text",
    },
    {
        title: "O'quvchini o'chirish",
        path: "/delete-student",
        icon: <AiOutlineDeleteRow/>,
        cName: "nav-text",
    },
    {
        title: "Profile",
        path: "/profile",
        icon: <AiIcons.AiOutlineUser/>,
        cName: "nav-text",
    },
];
export const NavbarDataForAdmin = [
    {
        title: "Menu",
        path: "/",
        icon: <AiIcons.AiFillHome/>,
        cName: "nav-text",
    },
    {
        title: "O'quvchi qo'shish",
        path: "/student-form",
        icon: <IoIcons.IoIosPeople/>,
        cName: "nav-text",
    },
    {
        title: "Ustoz qo'shish",
        path: "/teacher-form",
        icon: <PiChalkboardTeacherBold/>,
        cName: "nav-text",
    },
    {
        title: "Guruh qo'shish",
        path: "/group-form",
        icon: <IoIcons.IoIosAlbums/>,
        cName: "nav-text",
    },
    {
        title: "To'lov qo'shish",
        path: "/payment-form",
        icon: <IoIcons.IoIosAlbums/>,
        cName: "nav-text",
    },
    {
        title: "Gurux + Student",
        path: "/add-to-group",
        icon: <IoIcons.IoIosAlbums/>,
        cName: "nav-text",
    },
    {
        title: "O'quvchini o'chirish",
        path: "/delete-student",
        icon: <AiOutlineDeleteRow/>,
        cName: "nav-text",
    },
    {
        title: "Yangilik qo'shish",
        path: "/news-form",
        icon: <IoIcons.IoIosAddCircle/>,
        cName: "nav-text",
    },
    {
        title: "Yangiliklar",
        path: "/view-news",
        icon: <IoIcons.IoIosAddCircle/>,
        cName: "nav-text",
    },
    /*
    {
      title: "O'quvchilar",
      path: "/view-students",
      icon: <PiStudentBold/>,
      cName: "nav-text",
    },
    {
      title: "Ustozlar",
      path: "/view-teachers",
      icon: <PiChalkboardTeacherBold />,
      cName: "nav-text",
    },
    {
      title: "Guruhlar",
      path: "/view-groups",
      icon: <FiUsers />,
      cName: "nav-text",
    },
    {
      title: "To'lovlar",
      path: "/view-payments",
      icon: <FaMoneyCheckDollar />,
      cName: "nav-text",
    },
    */
    {
        title: "Test natijalari",
        path: "/view-test-results",
        icon: <SiTestcafe/>,
        cName: "nav-text",
    },
];
export const PublicNavbarData = [
    {
        title: "Bosh sahifa",
        path: "/",
        icon: <AiIcons.AiFillHome/>,
        cName: "nav-text",
    },
    // {
    //   title: "Guruhga yozilish",
    //   path: "/enter-group",
    //   icon: <IoIcons.IoIosPeople />,
    //   cName: "nav-text",
    // },
    // {
    //   title: "Guruhlar haqida",
    //   path: "/about-groups",
    //   icon: <IoIcons.IoMdTennisball />,
    //   cName: "nav-text",
    // },
    {
        title: "Yangiliklar",
        path: "/public-news",
        cName: "nav-text",
    },
];
