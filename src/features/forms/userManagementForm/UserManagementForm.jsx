import { useState, useEffect } from "react"
import { FormLayout } from "../../../components/layout"
import {
    FormTableWrapper,
} from "../../../components/ui/form/FormBase.styles";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers } from "./userManagementSelectors";
import { UserTable } from "./UserTable";
import { fetchUsers } from "./userManagementFormSlice";
import { useAuth } from "../../../auth/AuthProvider";

export const UserManagementForm = ({ onClose }) => {
    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const displayedUsers = useSelector(selectUsers);

    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        dispatch(fetchUsers(accessToken));
    }, [dispatch]);

    return (
        <FormLayout title="User Management Form" onClose={onClose} isLoading={isLoading}>
            <FormTableWrapper>
                <UserTable
                    data={displayedUsers}
                    selectedRows={selectedUser}
                    setSelectedRows={setSelectedUser}
                />
            </FormTableWrapper>
        </FormLayout>
    )
}