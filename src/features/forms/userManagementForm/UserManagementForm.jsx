import { useState, useEffect } from "react"
import { FormLayout } from "../../../components/layout"
import {
    FormTableWrapper,
    SummaryWrapper,
    FormActionsWrapper,
} from "../../../components/ui/form/FormBase.styles";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers } from "./userManagementSelectors";
import { UserTable } from "./UserTable";
import { fetchUsers, fetchAccessTabs } from "./userManagementFormSlice";
import { useAuth } from "../../../auth/AuthProvider";
import { Summary, TableActionButton } from "../../../components/ui";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { toggleAccessUtil, toggleAllChildrenUtil, selectAllAccessesUtil } from "./utils/accessUtils";
import { UserForm } from "./UserForm";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { validateUserForm } from "./utils/userValidation";

export const UserManagementForm = ({ onClose }) => {
    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const displayedUsers = useSelector(selectUsers);

    const [isLoading, setIsLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [usersStatusCount, setUsersStatusCount] = useState({
        active: 0,
        inactive: 0,
    });
    const [isUserFormVisible, setIsUserFormVisible] = useState(false);
    const [userFormData, setUserFormData] = useState({});
    const [mode, setMode] = useState(null);
    const [selectedAccesses, setSelectedAccesses] = useState({});

    const { userRows, accessTabs } = useSelector(
        (state) => state.userManagementForm,
    );

    useEffect(() => {
        dispatch(fetchUsers(accessToken));
        dispatch(fetchAccessTabs(accessToken));
    }, [dispatch]);

    useEffect(() => {
        const counts = userRows.reduce(
            (acc, user) => {
                if (user.is_active) {
                    acc.active += 1;
                } else {
                    acc.inactive += 1;
                }
                return acc;
            },
            { active: 0, inactive: 0 },
        );

        setUsersStatusCount(counts);
    }, [userRows]);

    const handleOpenUserForm = (e, mode) => {
        e.preventDefault();

        if (isUserFormVisible) return;

        if (mode === "edit") {
            if (!selectedUser || Object.keys(selectedUser).length === 0) {
                handleError("Please select a user to edit first.");
                return;
            }

            const email = Object.keys(selectedUser)[0];
            const user = userRows.find((u) => u.email === email);

            if (!user) {
                handleError("User not found.");
                return;
            }

            setUserFormData(user);

            if (user?.tabs_access?.length) {
                const mappedAccesses = user.tabs_access.reduce((acc, tab) => {
                    const accessTab = accessTabs.find((t) => t.code === tab.code);
                    if (!accessTab) return acc;

                    const allowedChildrenCodes = accessTab.children.map((c) => c.code);

                    const enabledSubtabs = Object.entries(tab.subtabs)
                        .filter(([key, value]) => value === true && allowedChildrenCodes.includes(key))
                        .reduce((subAcc, [key]) => {
                            subAcc[key] = true;
                            return subAcc;
                        }, {});

                    if (Object.keys(enabledSubtabs).length > 0) {
                        acc[tab.code] = enabledSubtabs;
                    }

                    return acc;
                }, {});

                setSelectedAccesses(mappedAccesses);
            } else {
                setSelectedAccesses({});
            }

            setMode("edit");
            setIsUserFormVisible(true);
        }

        if (mode === "create") {
            setUserFormData({
                name: "",
                email: "",
                password: "",
                position: "",
                role: "",
                is_staff: false,
                is_active: true,
            });

            setSelectedAccesses({});

            setMode("create");
            setIsUserFormVisible(true);
        }
    };

    const toggleAccess = (code, category) => {
        setSelectedAccesses((prev) =>
            toggleAccessUtil(prev, code, category)
        );
    };

    const toggleAllChildren = (category, isChecked) => {
        setSelectedAccesses((prev) =>
            toggleAllChildrenUtil(prev, category, isChecked, accessTabs)
        );
    };

    const selectAllAccesses = () => {
        setSelectedAccesses(selectAllAccessesUtil(accessTabs));
    };

    const handleCloseUserForm = () => {
        setUserFormData({});
        setIsUserFormVisible(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const isValid = validateUserForm(
                userFormData,
                mode,
                userRows,
                handleError
            );

            if (!isValid) {
                setIsLoading(false);
                return;
            }

            const tab_access = Object.values(selectedAccesses).flatMap((category) =>
                Object.entries(category)
                    .filter(([_, isActive]) => isActive)
                    .map(([key]) => key)
            );

            const userToSend =
                mode === "create"
                    ? { ...userFormData, tab_access }
                    : (() => {
                        const { created_at, id, tabs_access, ...restUser } = userFormData;
                        return { ...restUser, tab_access };
                    })();

            const response = await fetch(
                `${BASE_API_URL}common/users/upsert/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(accessToken),
                    body: JSON.stringify(userToSend),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                const backendMessage =
                    errorData?.errors?.errors?.join(", ") ||
                    "Error creating/updating user";
                throw new Error(backendMessage);
            }

            dispatch(fetchUsers(accessToken));
            setSelectedAccesses({});
            handleCloseUserForm();
            handleSuccess("Operation completed successfully.");
        } catch (error) {
            console.error(error);
            handleError(`Operation failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormLayout
            title="User Management Form"
            onClose={onClose}
            isLoading={isLoading}
            extra={isUserFormVisible && (
                <UserForm
                    title={mode === "create" ? "Add New User" : "Edit User"}
                    onClose={handleCloseUserForm}
                    isLoading={isLoading}
                    formData={userFormData}
                    setFormData={setUserFormData}
                    mode={mode}
                    selectAllAccesses={selectAllAccesses}
                    selectedAccesses={selectedAccesses}
                    toggleAllChildren={toggleAllChildren}
                    toggleAccess={toggleAccess}
                    handleSubmit={handleSubmit}
                />
            )}
        >
            <FormTableWrapper>
                <UserTable
                    data={displayedUsers}
                    selectedRows={selectedUser}
                    setSelectedRows={setSelectedUser}
                    isUserFormVisible={isUserFormVisible}
                />
            </FormTableWrapper>
            <SummaryWrapper>
                <Summary
                    label="Active users"
                    value={usersStatusCount.active}
                />
                <Summary
                    label="Inactive users"
                    value={usersStatusCount.inactive}
                />
            </SummaryWrapper>
            <FormActionsWrapper>
                <TableActionButton
                    handleClick={(e) => handleOpenUserForm(e, "create")}
                    type="add"
                />
                <TableActionButton
                    handleClick={(e) => handleOpenUserForm(e, "edit")}
                    type="edit"
                />
            </FormActionsWrapper>
        </FormLayout>
    )
}