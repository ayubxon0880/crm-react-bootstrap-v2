import React from "react";


const NewsUnAuth = () => {
    let data = [
        {
            id: 1,
            poster: "/data/image/img1.png",
            videoUri: "/data/video/ahadjon_ustoz.mp4",
            description:"Ahadjon Odilovni - 6 yildan ziyod pedagogik tajribaga ega, 200 dan ortiq yoshlarga ta'lim bergan"
        },
        {
            id: 2,
            poster: "/data/image/img2.png",
            videoUri: "/data/video/azizbek_ustoz.mp4",
            description:"Abdullayev Azizbek - Ta’lim berish bo’yicha yaqin 20 yillik tajribaga egalar. Hozirgacha minglab o’quvchilarga dars berganlar"
        },
    ]



    return (
        <>
            <h1 style={{textAlign: 'center'}}>Maqola va Yangiliklar</h1>
            <div className={"gallery"}>
                {data.map((item, index) => {
                    return(
                        <div className={"video"} key={index}>
                            <div className={"video-container"}>
                                {/*<Video*/}
                                {/*    style={{width: '70%'}}*/}
                                {/*    autoPlay={false}*/}
                                {/*    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}*/}
                                {/*    // poster={item.poster}*/}
                                {/*>*/}
                                {/*    <source src={item.videoUri} type={'video/mp4'} />*/}
                                {/*</Video>*/}
                                {/*<video width={"300px"} height={"300px"}>*/}
                                {/*    <source src={item.videoUri} type={'video/mp4'}/>*/}
                                {/*</video>*/}
                                {/*<p>{item.description}</p>*/}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default NewsUnAuth;