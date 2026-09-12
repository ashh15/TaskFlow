import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {

        const response = await fetch(
             `${import.meta.env.VITE_API_URL}/api/user/check-auth`,
            {
                credentials: "include",
            }
        );

        const data = await response.json();

        setAuthenticated(data.success);
        setLoading(false);
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}