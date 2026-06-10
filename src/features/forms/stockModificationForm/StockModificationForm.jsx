import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchProjects, fetchPallets, clearStockModification } from "./stockModificationSlice";
import { useAuth } from "../../../auth/AuthProvider";
import { FormLayout } from "../../../components/layout";
import { Form, FormActionsWrapper, FormRow, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { FormInput, FormTabs, SubmitButton, TableActionButton } from "../../../components/ui";
import { updateFormData } from "../../../utils/forms/updateFormData";
import { tabsConfig } from "./tabsConfig";
import { PalletsTable } from "./PalletsTable";
import { selectPallets, selectRemovedPallets, selectEditedPallets, selectAddedPallets } from "./stockModificationSelectors";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { movePalletsToRemoved, movePalletsToEdited, moveRemovedPalletsToPallets, moveEditedPalletsToPallets, removeAddedPallets, addPalletRow, setProjectsForRow, updateAddedPallet, setMaterialCodesForRow } from "./stockModificationSlice";
import { RemovedPalletsTable } from "./RemovedPalletsTable";
import { EditedPalletsTable } from "./EditedPalletsTable";
import { handleRemoveSelectedRows } from "../../../utils/table/removeSelectedRows";
import { addPallet, handleMovePallets } from "./utils/tableOperations";
import { AddedPalletsTable } from "./AddedPalletsTable";
import { validateChanges } from "./utils/validateChanges";
import { buildPayload } from "./utils/buildPayload";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { resetForm } from "./utils/resetForm";

export const StockModificationForm = ({ onClose }) => {
    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const userName = useSelector((state) => state.auth.user.name || "");

    const [formData, setFormData] = useState({
        remarks: "",
    });

    const { removedPallets, addedPallets, pallets } = useSelector(
        (state) => state.stockModificationForm,
    );

    const displayedPallets = useSelector(selectPallets);
    const displayedRemovedPallets = useSelector(selectRemovedPallets);
    const displayedEditedPallets = useSelector(selectEditedPallets);
    const displayedAddedPallets = useSelector(selectAddedPallets);

    const { editedPallets } = useSelector((state) => state.stockModificationForm);

    const [currentDateTime, setCurrentDateTime] = useState("");
    const [activeTab, setActiveTab] = useState(0);

    const [selectedPallets, setSelectedPallets] = useState({});
    const [selectedRemovedPallets, setSelectedRemovedPallets] = useState({});
    const [selectedEditedPallets, setSelectedEditedPallets] = useState({});
    const [selectedAddedPallets, setSelectedAddedPallets] = useState({});

    const [editedValues, setEditedValues] = useState({});

    useEffect(() => {
        dispatch(fetchProjects(accessToken));
        dispatch(fetchPallets(accessToken));
    }, [dispatch]);

    useEffect(() => {
        const now = new Date();
        const localDateTime = now.toLocaleString("sv-SE");
        setCurrentDateTime(localDateTime);
    }, []);

    const handleClientChange = (
        row,
        clientName,
    ) => {
        dispatch(
            updateAddedPallet({
                id: row.unique_id,
                key: "client",
                value: clientName,
            }),
        );

        dispatch(
            updateAddedPallet({
                id: row.unique_id,
                key: "project",
                value: "",
            }),
        );

        dispatch(
            updateAddedPallet({
                id: row.unique_id,
                key: "material_code",
                value: "",
            }),
        );

        dispatch(
            setProjectsForRow({
                rowId: row.unique_id,
                clientName,
            }),
        );
    };

    const handleProjectChange = (
        row,
        projectName,
    ) => {
        dispatch(
            updateAddedPallet({
                id: row.unique_id,
                key: "project",
                value: projectName,
            }),
        );

        dispatch(
            updateAddedPallet({
                id: row.unique_id,
                key: "material_code",
                value: "",
            }),
        );

        dispatch(
            setMaterialCodesForRow({
                rowId: row.unique_id,
                projectName,
            }),
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !validateChanges(
                pallets,
                removedPallets,
                editedPallets,
                addedPallets,
                handleError,
            )
        ) {
            return;
        }

        const payload =
            buildPayload(
                userName,
                formData.remarks,
                removedPallets,
                editedPallets,
                addedPallets,
            );

        setIsLoading(true);

        try {
            const response = await fetch(
                `${BASE_API_URL}warehouse/inventory/manual-inventory-change/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(
                        accessToken,
                    ),
                    body: JSON.stringify(
                        payload,
                    ),
                },
            );

            if (!response.ok) {
                const errorData =
                    await response.json();

                const backendMessage =
                    errorData?.errors?.server ||
                    "";

                let userMessage =
                    "Error while submitting stock modification.";

                if (
                    backendMessage.includes(
                        "domain.add_pallets.missing",
                    )
                ) {
                    userMessage =
                        "The specified pallet does not exist.";
                }

                if (
                    backendMessage.includes(
                        "domain.add_pallets.material_mismatch",
                    )
                ) {
                    userMessage =
                        "The selected pallet belongs to a different material.";
                }

                throw new Error(
                    userMessage,
                );
            }

            resetForm(
                setFormData,
                setSelectedPallets,
                setSelectedRemovedPallets,
                setSelectedEditedPallets,
                setSelectedAddedPallets,
                dispatch,
                clearStockModification,
            );

            dispatch(
                fetchPallets(
                    accessToken,
                ),
            );

            handleSuccess(
                "Operation completed successfully.",
            );
        } catch (error) {
            console.error(
                "Error while submitting stock modification form:",
                error,
            );

            handleError(
                error.message ||
                "Error while submitting stock modification form.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormLayout title="Stock Modification Form" onClose={onClose} isLoading={isLoading}>
            <Form>
                <FormRow>
                    <FormInput
                        id="date_and_time"
                        label="Date and Time"
                        type="datetime-local"
                        value={currentDateTime}
                        disabled="true"
                    />
                    <FormInput
                        id="operator"
                        label="Operator"
                        type="text"
                        value={userName}
                        disabled="true"
                    />
                </FormRow>
                <FormRow>
                    <FormInput
                        id="remarks"
                        label="Remarks"
                        type="text"
                        value={formData.remarks}
                        handleChange={(val) =>
                            updateFormData(setFormData, "remarks", val)
                        }
                    />
                </FormRow>
                {activeTab == 0 && (
                    <>
                        <FormTableWrapper>
                            <PalletsTable
                                data={displayedPallets}
                                selectedRows={selectedPallets}
                                setSelectedRows={setSelectedPallets}
                            />
                        </FormTableWrapper>
                        <FormActionsWrapper>
                            <TableActionButton
                                handleClick={(e) =>
                                    handleMovePallets(
                                        e,
                                        selectedPallets,
                                        setSelectedPallets,
                                        movePalletsToRemoved,
                                        dispatch,
                                        handleError
                                    )
                                }
                                type="remove"
                            />
                            <TableActionButton
                                handleClick={(e) =>
                                    handleMovePallets(
                                        e,
                                        selectedPallets,
                                        setSelectedPallets,
                                        movePalletsToEdited,
                                        dispatch,
                                        handleError
                                    )
                                }
                                type="edit"
                            />
                        </FormActionsWrapper>
                    </>
                )}
                {activeTab == 1 && (
                    <>
                        <FormTableWrapper>
                            <RemovedPalletsTable
                                data={displayedRemovedPallets}
                                selectedRows={selectedRemovedPallets}
                                setSelectedRows={setSelectedRemovedPallets}
                            />
                        </FormTableWrapper>
                        <FormActionsWrapper>
                            <TableActionButton
                                handleClick={(e) =>
                                    handleMovePallets(
                                        e,
                                        selectedRemovedPallets,
                                        setSelectedRemovedPallets,
                                        moveRemovedPalletsToPallets,
                                        dispatch,
                                        handleError
                                    )
                                }
                                type="restore"
                            />
                        </FormActionsWrapper>
                    </>
                )}
                {activeTab == 2 && (
                    <>
                        <FormTableWrapper>
                            <EditedPalletsTable
                                data={displayedEditedPallets}
                                selectedRows={selectedEditedPallets}
                                setSelectedRows={setSelectedEditedPallets}
                                editedValues={editedValues}
                                setEditedValues={setEditedValues}
                            />
                        </FormTableWrapper>
                        <FormActionsWrapper>
                            <TableActionButton
                                handleClick={(e) =>
                                    handleMovePallets(
                                        e,
                                        selectedEditedPallets,
                                        setSelectedEditedPallets,
                                        moveEditedPalletsToPallets,
                                        dispatch,
                                        handleError,
                                        editedPallets,
                                        true
                                    )
                                }
                                type="restore"
                            />
                        </FormActionsWrapper>
                    </>
                )}
                {activeTab == 3 && (
                    <>
                        <FormTableWrapper>
                            <AddedPalletsTable
                                data={displayedAddedPallets}
                                selectedRows={selectedAddedPallets}
                                setSelectedRows={setSelectedAddedPallets}
                                handleClientChange={handleClientChange}
                                handleProjectChange={handleProjectChange}
                                editedValues={editedValues}
                                setEditedValues={setEditedValues}
                            />
                        </FormTableWrapper>
                        <FormActionsWrapper>
                            <TableActionButton
                                handleClick={(e) =>
                                    addPallet(
                                        e,
                                        dispatch,
                                        addPalletRow
                                    )
                                }
                                type="add"
                            />
                            <TableActionButton
                                handleClick={() =>
                                    handleRemoveSelectedRows(
                                        selectedAddedPallets,
                                        displayedAddedPallets,
                                        setSelectedAddedPallets,
                                        removeAddedPallets,
                                        dispatch,
                                        handleError
                                    )
                                }
                                type="remove"
                            />
                        </FormActionsWrapper>
                    </>
                )}
                <FormTabs
                    tabs={tabsConfig}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            </Form>
            <SubmitButton isLoading={isLoading} onClick={handleSubmit} />
        </FormLayout>
    )
}