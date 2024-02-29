import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, token} from "../../components/API";

const NewsView = () => {
    const [loading , setLoading] = useState(true);
    const [news , setNews] = useState([]);

    useEffect(() => {
        axios.get(API+"/news/all",{
            headers:token
        }).then((response) => {
            setNews(response.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error.response);
            setLoading(false);
        })
    }, []);

    return(
        <>
            <div>
                {
                    news.map((it) => {
                        return (
                            <div className="about-me-container">
                                <div className="about-me-content">
                                    <h1 className={"about-h2"}>{it.imagePath}</h1>
                                    <h1 className={"about-h2"}>{it.title}</h1>
                                    <p className={"about-p"}>
                                        {it.body} , {it.createdAt}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default NewsView;