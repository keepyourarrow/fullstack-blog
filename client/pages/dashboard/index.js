import React from "react";
import { withAdmin } from "../../hoc/withAdmin";
import { useAuth } from "../../hooks/useAuth";

import Dashboard from "../../Components/Admin/Dashboard";

const AdminPage = () => {
    const { hasPermission } = useAuth();

    // so it doesnt flash
    if (!hasPermission) {
        return <></>;
    }

    return <Dashboard />;
};

export default withAdmin(AdminPage);
