import React from "react";
import { Header } from "../../Components/Auth/Header";
import Signup from "../../components/Auth/Signup";

export default function SignupPage() {
    return (
        <div className="app-auth">
            <Header />
            <Signup />
        </div>
    );
}
