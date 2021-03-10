import React from "react";
import Link from "next/link";
import { useAuth } from "../../../hooks/useAuth";

const Profile = () => {
    const { user, isAdmin } = useAuth();
    const link = isAdmin() ? "/" : user.userName;

    return <Link href={`dashboard/${link}`}>{user.userName}</Link>;
};

export default Profile;
