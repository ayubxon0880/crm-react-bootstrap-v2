import React from "react";
import {NavbarDataForTeacher} from "../components/NavbarData";

const Dashboard = () => {
    return (
        <>
            <div className={"grid-container"}>
                <div className={"block-container"}>
                    {
                        NavbarDataForTeacher.map((it) => {
                            return (
                                <a href={it.path} className={"grid-item"}>
                                    {it.icon}
                                    <p>{it.title}</p>
                                </a>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Dashboard;