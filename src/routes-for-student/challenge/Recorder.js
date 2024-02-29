import React, {useState, useRef} from 'react';
import axios from "axios";
import Timer from "./Timer";
import {loader, toaster, toasterContainer} from "../../components/service";
import {API, token} from "../../components/API";

const Recorder = () => {
    const [isGetRandomQuiz, setGetRandomQuiz] = useState(false);
    const [loading, setLoading] = useState(false);
    const [question, setTopic] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const mediaRecorderRef = useRef(null);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                let chunks = [];

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(chunks);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64data = reader.result.split(',')[1];
                        sendAudioToServer(base64data);
                    };
                    reader.readAsDataURL(audioBlob);
                    setRecordedAudio(URL.createObjectURL(audioBlob));
                };

                mediaRecorder.start();
                setIsRecording(true);
                setTimeout(() => {
                    stopRecording();
                }, 30000);
            })
            .catch(error => console.error('Error accessing microphone:', error));
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const sendAudioToServer = (data) => {
        if (data) {
            axios.post(API + '/speaking/save/'+question.id, data, {
                headers: token
            })
                .then(response => {
                    toaster(200,"saqlandi");
                    setTimeout(() => {
                        stopRecording();
                    }, 2000);
                    window.location.reload();
                })
                .catch(error => {
                    toaster(404,"saqlanmadi")
                });
        } else {
            console.error('No audio to send.');
        }
    };

    function getRandomQuestion() {
        setGetRandomQuiz(true);
        setLoading(true);
        axios.get(API + "/topic/random", {
            headers: token
        }).then((response) => {
            setTopic(response.data);
            setLoading(false);
        }).catch((error) => {
            toaster(404, error.response.data.message);
        })
    }


    return (
        <>
            {toasterContainer()}
            <div className="container" style={{textAlign: "center"}}>
                <br></br>
                <div className="panel-content">
                    <button type="button"
                            className="btn btn-success"
                            onClick={getRandomQuestion}>
                        Tasodifiy savolni olish
                    </button>
                </div>
                <div className="panel-content">
                    <p>
                        {question !== null ? <>
                            <h3>{question.topic}</h3>
                            <p>{question.author} tarafidan yaratilgan</p>
                        </> : <></>}
                    </p>
                </div>
                {
                    isGetRandomQuiz ?
                        <>
                            <div className="panel-content">
                                <button type="button"
                                        className="btn btn-outline-primary"
                                        onClick={startRecording}
                                        disabled={isRecording}>
                                    Ovoz yozish
                                </button>
                                {isRecording ? <div className='sound-icon disabled'>
                                    <div className='sound-wave'>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                        <i className='bar'></i>
                                    </div>
                                </div> : <></>}
                            </div>
                            <br></br>
                            <div className="panel-content">
                                {
                                    isRecording ? <Timer deadline={30}/> : <></>
                                }
                            </div>
                            {recordedAudio && <><audio controls src={recordedAudio}/><h1>Malumot saqlanmoqda</h1></>}
                        </> : <></>
                }
            </div>
            {loading ? loader() : <></>}
        </>
    );
};
export default Recorder;