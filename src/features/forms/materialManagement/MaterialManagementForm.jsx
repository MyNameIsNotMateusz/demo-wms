import { FormLayout } from "../../../components/layout"
import { useState } from "react";
import { MaterialForm } from "./MaterialForm";
import { FormActionsWrapper, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { TableActionButton } from "../../../components/ui";
import { MaterialTable } from "./MaterialTable";
import { selectMaterials } from "./materialManagementSelectors";
import { useSelector, useDispatch } from "react-redux";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { getSelectedItem } from "../../../utils/forms/getSelectedItem";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { useAuth } from "../../../auth/AuthProvider"
import { handleCloseForm } from "../../../utils/forms/handleCloseForm";
import { dictionaryThunks } from "../../../store/thunks/dictionaryThunks";
import { validateMaterialForm } from "./utils/materialValidation";
import { prepareMaterialPayload } from "./utils/materialPayload";
import { uploadMaterialGraphic } from "./utils/uploadMaterialGraphic";

export const MaterialManagementForm = ({ onClose }) => {

    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const displayedMaterials = useSelector(selectMaterials);

    const { fetchMaterials } = dictionaryThunks;

    const [isLoading, setIsLoading] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState({});
    const [isMaterialFormVisible, setIsMaterialFormVisible] = useState(false);
    const [mode, setMode] = useState(null);
    const [materialFormData, setMaterialFormData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    const { materials } = useSelector((state) => state.materials);

    const handleOpenMaterialForm = (e, mode) => {
        e.preventDefault();

        if (isMaterialFormVisible) return;

        if (mode === "edit") {
            const material = getSelectedItem({
                selected: selectedMaterial,
                collection: materials,
                keyName: "id",
                errorMessage: "Please select a material to edit first.",
                handleError,
            });

            if (!material) return;

            setMaterialFormData(material);
            setMode("edit");
            setIsMaterialFormVisible(true);
        }

        if (mode === "create") {
            setMaterialFormData({
                code: "",
                seq_number: "",
                name: "",
                type: "",
                unit: "",
                destination: "",
                metal_type: null,
                thickness: null,
                width: null,
                unit_weight: null,
                scrap_per_unit_weight: null,
                is_simplified: false,
                remarks: "",
            });

            setMode("create");
            setIsMaterialFormVisible(true);
        }
    };

    const handleFileSelect = (e) => {
        e.preventDefault();
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (ev) => {
            if (ev.target.files && ev.target.files[0]) {
                setSelectedFile(ev.target.files[0]);
            }
        };
        input.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const isValid = validateMaterialForm(materialFormData, handleError);

            if (!isValid) {
                setIsLoading(false);
                return;
            }

            const jsonPayload = prepareMaterialPayload(materialFormData, mode);


            const response = await fetch(
                `${BASE_API_URL}common/materials/upsert/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(accessToken),
                    body: JSON.stringify(jsonPayload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();

                if (errorData.code || errorData.seq_number) {
                    let message = [];
                    if (errorData.code) message.push(errorData.code.join(" "));
                    if (errorData.seq_number)
                        message.push(errorData.seq_number.join(" "));
                    handleError(message.join(" "));
                } else {
                    handleError(errorData.message || "Operation failed");
                }

                setIsLoading(false);
                return;
            }

            const responseData = await response.json();

            if (selectedFile) {
                const id = mode === "edit" ? jsonPayload.id : responseData.id;

                await uploadMaterialGraphic({
                    file: selectedFile,
                    id,
                    BASE_API_URL,
                    DEFAULT_HEADERS,
                    accessToken,
                    handleError,
                });

                setSelectedFile(null);
            }

            handleSuccess("Operation completed successfully.");

            handleCloseForm({
                setFormData: setMaterialFormData,
                setIsFormVisible: setIsMaterialFormVisible,
                setMode,
            });

            dispatch(fetchMaterials(accessToken));
            setSelectedMaterial({});
        } catch (error) {
            handleError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormLayout
            title="Material Management Form"
            onClose={onClose}
            isLoading={isLoading}
            extra={isMaterialFormVisible && (
                <MaterialForm
                    title={mode === "create" ? "Add New Material" : "Edit Material"}
                    setFormData={setMaterialFormData}
                    setIsMaterialFormVisible={setIsMaterialFormVisible}
                    setMode={setMode}
                    formData={materialFormData}
                    selectedFile={selectedFile}
                    handleFileSelect={handleFileSelect}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                />
            )}
        >
            <FormTableWrapper>
                <MaterialTable
                    data={displayedMaterials}
                    selectedRows={selectedMaterial}
                    setSelectedRows={setSelectedMaterial}
                    isMaterialFormVisible={isMaterialFormVisible}
                />
            </FormTableWrapper>
            <FormActionsWrapper>
                <TableActionButton
                    handleClick={(e) => handleOpenMaterialForm(e, "create")}
                    type="add"
                />
                <TableActionButton
                    handleClick={(e) => handleOpenMaterialForm(e, "edit")}
                    type="edit"
                />
            </FormActionsWrapper>
        </FormLayout>
    )
}