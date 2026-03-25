import { FormLayout } from "../../../components/layout"
import { useEffect, useState } from "react";
import { Form, FormSection, FormColumn, FormRow } from "../../../components/ui/form/FormBase.styles";
import { FormInput, FetchButton, FormSelect, ImagePreview } from "../../../components/ui";
import { updateFormData } from "../../../utils/forms/updateFormData";
import { fetchData } from "../../../utils/forms/fetchData";
import { useAuth } from "../../../auth/AuthProvider";
import { selectProjects } from "./createComponentsSelectors";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoils } from "./createComponentsFormSlice";
import { MaterialSummary } from "./MaterialSummary";

export const CreateComponentsForm = ({ onClose }) => {
    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        seqNumber: "",
        project: "",
        material_code: "",
        operator_name: "",
        production_order_number: "",
        remarks: "",
        coil: ""
    });
    const [recipes, setRecipes] = useState([]);
    const [materialCodes, setMaterialCodes] = useState([]);

    const projects = useSelector(selectProjects);

    const [previewSrc, setPreviewSrc] = useState(null);
    const [materialExtraData, setMaterialExtraData] = useState({
        destination: null,
        is_simplified: null,
    });
    const [isAssemblyMode, setIsAssemblyMode] = useState(null);

    const {
        coils,
    } = useSelector((state) => state.createComponentsForm);

    useEffect(() => {
        dispatch(fetchCoils(accessToken));
    }, [dispatch]);

    const handleFetchSeq = async () => {
        setIsLoading(true);

        const data = await fetchData({
            endpoint: `common/materials/lookup/?seq_number=${formData.seqNumber}`,
            accessToken,
        });

        if (!data) {
            setIsLoading(false);
            return;
        }

        setPreviewSrc(data.graphic_uml);
        updateFormData(setFormData, "project", data.projects?.[0]?.name);
        updateFormData(setFormData, "material_code", data.code);
        setMaterialExtraData({
            destination: data.destination,
            is_simplified: data.is_simplified,
        });
        setIsAssemblyMode(data.recipe);
        setIsLoading(false);
    };

    const handleProjectChange = (val) => {
        updateFormData(setFormData, "project", val);

        setRecipes([]);
        setIsAssemblyMode(null);

        const selectedProject = projects.find((p) => p.name === val);

        const codes = selectedProject?.materials?.map(
            (m) => m.material_code
        ) || [];

        setMaterialCodes(codes);
    };

    const handleMaterialCodeChange = async (val) => {
        updateFormData(setFormData, "material_code", val);

        if (!val) {
            setMaterialExtraData({ destination: null, is_simplified: null });
            setIsAssemblyMode(null);
            return;
        }

        const data = await fetchData({
            endpoint: `common/materials/lookup/?material_code=${val}`,
            accessToken,
        });

        if (!data) {
            setMaterialExtraData({ destination: null, is_simplified: null });
            return;
        }

        setPreviewSrc(data.graphic_uml);

        setMaterialExtraData({
            destination: data.destination,
            is_simplified: data.is_simplified,
        });

        setIsAssemblyMode(data.recipe);
    };

    return (
        <FormLayout title="Create Components Form" onClose={onClose} isLoading={isLoading}>
            <Form>
                <FormSection>
                    <FormColumn $flex="2.5">
                        <FormRow>
                            <FormInput
                                id="seqNumber"
                                label="Sequence Number"
                                type="text"
                                value={formData.seqNumber}
                                handleChange={(val) =>
                                    updateFormData(setFormData, "seqNumber", val)
                                }
                                extra={<FetchButton active={!!formData.seqNumber} disabled={isLoading} onClick={handleFetchSeq} isLoading={isLoading} />}
                            />
                            <FormSelect
                                id="project"
                                label="Project Selection *"
                                placeholder="Select a project"
                                value={formData.project}
                                handleChange={handleProjectChange}
                                options={projects.map((p) => ({
                                    label: p.name,
                                    value: p.name,
                                }))}
                            />
                            <FormSelect
                                id="material_code"
                                label="Material Code *"
                                placeholder="Select a material code"
                                value={formData.material_code}
                                handleChange={(val) => {
                                    handleMaterialCodeChange(val);
                                }}
                                options={materialCodes.map((code) => ({
                                    label: code,
                                    value: code,
                                }))}
                                isDisabled={!formData.project}
                            />
                        </FormRow>
                        <FormRow>
                            <FormInput
                                id="operator_name"
                                label="Operator *"
                                type="text"
                                value={formData.operator_name}
                                handleChange={(val) =>
                                    updateFormData(setFormData, "operator_name", val)
                                }
                            />
                            <FormInput
                                id="production_order_number"
                                label="Production Order Number"
                                type="text"
                                value={formData.production_order_number}
                                handleChange={(val) =>
                                    updateFormData(setFormData, "production_order_number", val)
                                }
                            />
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
                        {isAssemblyMode === false && (
                            <FormRow>
                                <FormSelect
                                    id="coil"
                                    label="Coil Selection"
                                    placeholder="Select a coil"
                                    value={formData.coil}
                                    handleChange={(val) => {
                                        updateFormData(setFormData, "coil", val)
                                    }}
                                    options={coils.map((coil) => ({
                                        label: coil,
                                        value: coil,
                                    }))}
                                />
                            </FormRow>
                        )}
                    </FormColumn>

                    <FormColumn $flex="1">
                        <FormRow>
                            <ImagePreview
                                id="graphic_uml"
                                label="Material Image"
                            />
                        </FormRow>
                    </FormColumn>
                </FormSection>

                <MaterialSummary
                    materialData={materialExtraData}
                    materialCode={formData.material_code}
                />
            </Form>
        </FormLayout>
    )
}