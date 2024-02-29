import React from "react";
import * as IoIcons from "react-icons/io";
import {PiChalkboardTeacherBold} from "react-icons/pi";
import {FiUsers} from "react-icons/fi";
import {FaMoneyCheckDollar} from "react-icons/fa6";
import {SiTestcafe} from "react-icons/si";
import {SiGooglenews} from "react-icons/si";

const Menu = () => {
    return (
        <>
            <div className="home">
                <div className={"container"}>
                    <div className={"block-container"}>
                        <a href={"/view-students"} className={"grid-item"}>
                            <IoIcons.IoIosPeople/>
                            <p>O'quvchilar</p>
                        </a>
                        <a href={"/view-teachers"} className={"grid-item"}>
                            <PiChalkboardTeacherBold/>
                            <p>Ustozlar</p>
                        </a>
                        <a href={"/view-groups"} className={"grid-item"}>
                            <FiUsers/>
                            <p>Guruhlar</p>
                        </a>
                        <a href={"/view-payments"} className={"grid-item"}>
                            <FaMoneyCheckDollar/>
                            <p>To'lovlar</p>
                        </a>
                        <a href={"/view-test-results"} className={"grid-item"}>
                            <SiTestcafe/>
                            <p>Test natijalari</p>
                        </a>
                        <a href={"/view-news"} className={"grid-item"}>
                            <SiGooglenews/>
                            <p>Test natijalari</p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;