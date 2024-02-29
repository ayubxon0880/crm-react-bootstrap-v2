import React from "react";
import {NavbarDataForStudent} from "../components/NavbarData";

function Home() {
    return (
        <div className="home">
                <div className={"grid-container"}>
                    <div className={"block-container"}>
                        {
                            NavbarDataForStudent.map((it) => {
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
        </div>
    );
}

export default Home;
