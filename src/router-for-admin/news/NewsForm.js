import React, {useState} from 'react';
import axios from "axios";
import {API, token} from "../../components/API";




const NewsForm = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [hashtag, setHashtag] = useState([]);

    const handleHashtag = (event) => {
        setHashtag(event)
    }

    function postData() {
        setLoading(true);
        if (!(file == null || title == null || body == null)) {
            let path = file.split("\\");
            let img = path[path.length-1];
            axios.post(API + "/news/save", {
                imagePath:img,
                title,
                body
            },{
                headers: token
            }).then((response) => {
                console.log(response.data);
                window.location.reload();
            }).catch((error) => {
                console.log(error.response);
            })
        }
    }

    return (
        <>
            <div>
                <ul className="form-style-1">
                    <li>
                        <label>Rasm<span>( 5MB jpg/png)</span></label>
                        <input type={"file"}
                               className={"test-form-input"}
                               required
                               onChange={event => setFile(event.target.value)}
                        />
                    </li>
                    <li>
                        <label>Sarlavha <span>( 225 )</span></label>
                        <input type={"text"}
                               placeholder={"title"}
                               className={"test-form-input"}
                               required
                               onChange={event => setTitle(event.target.value)}
                        />
                    </li>
                    <li>
                        <label>Asos <span>( 500 )</span></label>
                        <textarea placeholder="body"
                                  className="box"
                                  cols="42"
                                  rows="5"
                                  onChange={event => setBody(event.target.value)}
                        ></textarea>
                    </li>

                    <li>
                        {
                            loading ? <div className={"loader"}></div> :
                                <button className={"test-form-input"}
                                        onClick={postData}
                                >Qo'shish</button>
                        }
                    </li>
                </ul>
            </div>
        </>
    )
}
export default NewsForm;
