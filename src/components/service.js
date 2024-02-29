import {toast, Toaster} from "react-hot-toast";

export const logo= "/data/image/logo.png";
export const logoWhite= "/data/image/logo_white.png";
export const user = JSON.parse(localStorage.getItem("user"));
export const months = [
    {value: "1", label: "Yanvar"},
    {value: "2", label: "Fevral"},
    {value: "3", label: "Mart"},
    {value: "4", label: "Aprel"},
    {value: "5", label: "May"},
    {value: "6", label: "Iyun"},
    {value: "7", label: "Iyul"},
    {value: "8", label: "Avgust"},
    {value: "9", label: "Sentyabr"},
    {value: "10", label: "Oktyabr"},
    {value: "11", label: "Noyabr"},
    {value: "12", label: "Dekabr"},
];

export const years = [
    {value: '2024', label: '2024'},
    {value: '2023', label: '2023'},
    {value: '2022', label: '2022'},
];

export function username() {
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user")).username;
    }
    return "Anonymous";
}

export function logout() {
    localStorage.clear();
    window.location.reload();
}

export function loader() {
    return (
        <div className={"loader"}></div>
    )
}

export function getStyle(status) {
    if (status === "Qatnashdi") {
        return {backgroundColor: "#16c709"};
    } else if (status === "Sababli") {
        return {backgroundColor: '#e75507'}
    } else if (status === "Qatnashdi") {
        return {backgroundColor: "red"}
    }
}

export function toasterContainer() {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    );
}
export function toaster(status,message) {
    if (status === 200 || status === 201){
        toast.success(message);
    } else {
        toast.error(message);
    }
}