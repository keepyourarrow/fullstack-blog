import React from "react";
import Login from "../../components/Auth/Login";
import { Header } from "../../Components/Auth/Header";

export default function LoginPage() {
    return (
        <div className="app-auth">
            <Header />
            <Login />
        </div>
    );
}
