const API_BASE_URL = "http://localhost:8080/api";
import { post } from "./apiClient";

export function changePassword(currentPassword, newPassword) {
    return post("/auth/change-password", {
        currentPassword,
        newPassword,
    });
}

export async function login(employeeNumber, password) {
    const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                employeeNumber,
                password,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Invalid employee ID or password."
        );
    }

    return response.json();
}

export function logout() {
    localStorage.removeItem("lms_token");
    localStorage.removeItem("lms_user");
}

export function getToken() {
    return localStorage.getItem("lms_token");
}

export function getStoredUser() {
    const user = localStorage.getItem("lms_user");

    return user ? JSON.parse(user) : null;
}