export const API = "https://crm-backend-w9gj.onrender.com/api/v1";
// export const API = "http://localhost:8080/api/v1";

export const token = {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
}