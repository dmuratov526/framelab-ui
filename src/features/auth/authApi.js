const API_URL = "http://localhost:5218/Auth";

// 🔹 Логин
export async function loginApi({ email, password }) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to login");
    }

    return await res.json();
}

// 🔹 Регистрация
export async function registerApi({ email, name, password }) {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to register");
    }

    return await res.json();
}
