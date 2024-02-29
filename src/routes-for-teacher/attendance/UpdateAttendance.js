import React, {useState} from "react";

const UpdateAttendance = () => {
    const [loading,setLoading] = useState(false);
    const [attendance,setAttendance] = useState(null);

    function postData() {

    }
    return(
        <div>
            <div>
                <ul className="form-style-1">
                    <li>
                        <label>Sarlavha <span>( 225 )</span></label>
                        <input type={"text"}
                               placeholder={"title"}
                               className={"test-form-input"}
                               required
                               // onChange={event => setTitle(event.target.value)}
                        />
                    </li>
                    <li>
                        <label>Asos <span>( 500 )</span></label>
                        <textarea placeholder="body"
                                  className="box"
                                  cols="42"
                                  rows="5"
                                  // onChange={event => setBody(event.target.value)}
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
        </div>
    )
}

export default UpdateAttendance;