import { FormLayout } from "../../../components/layout"
import { Form, FormRow } from "../../../components/ui/form/FormBase.styles"
import { handleCloseForm } from "../../../utils/forms/handleCloseForm"
import { FormInput, FormSelect, ImagePreview, SubmitButton } from "../../../components/ui"
import { updateFormData } from "../../../utils/forms/updateFormData"
import { resetMaterialFields } from "./utils/resetMaterialFields"
import { useState, useEffect } from "react"
import { UploadButton } from "./UploadButton"

export const MaterialForm = ({ title, setFormData, setIsMaterialFormVisible, setMode, formData, selectedFile, handleFileSelect, isLoading, handleSubmit }) => {

    const [previewSrc, setPreviewSrc] = useState(formData.graphic_uml);

    const types = ["FG", "WIP", "COIL", "CKD", "DEVELOPMENT"];
    const units = ["pcs", "kg", "m"];

    useEffect(() => {
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreviewSrc(url);
            return () => URL.revokeObjectURL(url);
        } else if (formData.graphic_uml) {
            setPreviewSrc(formData.graphic_uml);
        } else {
            setPreviewSrc(null);
        }
    }, [selectedFile, formData.graphic_uml]);

    return (
        <FormLayout
            title={title}
            onClose={() =>
                handleCloseForm({
                    setFormData,
                    setIsFormVisible: setIsMaterialFormVisible,
                    setMode,
                })
            }
        >
            <Form>
                <FormRow>
                    <FormInput
                        id="code"
                        label="Code *"
                        type="text"
                        value={formData.code}
                        handleChange={(val) =>
                            updateFormData(setFormData, "code", val)
                        }
                    />
                    <FormInput
                        id="seq_number"
                        label="Sequence Number *"
                        type="text"
                        value={formData.seq_number}
                        handleChange={(val) =>
                            updateFormData(setFormData, "seq_number", val)
                        }
                    />
                    <FormInput
                        id="name"
                        label="Name *"
                        type="text"
                        value={formData.name}
                        handleChange={(val) =>
                            updateFormData(setFormData, "name", val)
                        }
                    />
                </FormRow>
                <FormRow>
                    <FormSelect
                        id="type"
                        label="Type Selection *"
                        placeholder="Select a type"
                        value={formData.type}
                        handleChange={(val) => {
                            updateFormData(setFormData, "type", val);
                            resetMaterialFields(setFormData);
                        }}
                        options={types.map((type) => ({
                            label: type,
                            value: type,
                        }))}
                    />
                    <FormSelect
                        id="destination"
                        label="Destination Selection *"
                        placeholder="Select a destination"
                        value={formData.destination}
                        handleChange={(val) => {
                            updateFormData(setFormData, "destination", val);
                            resetMaterialFields(setFormData);
                        }}
                        options={[
                            { label: "SALE", value: "SALE" },
                            { label: "SERVICE", value: "SERVICE" },
                        ]}
                    />
                    <FormSelect
                        id="unit"
                        label="Unit *"
                        placeholder="Select a unit"
                        value={formData.unit}
                        handleChange={(val) => {
                            updateFormData(setFormData, "unit", val);
                            resetMaterialFields(setFormData);
                        }}
                        options={units.map((unit) => ({
                            label: unit,
                            value: unit,
                        }))}
                    />
                </FormRow>

                {formData.type == "COIL" && (
                    <FormRow>
                        <FormInput
                            id="metal_type"
                            label="Metal Type *"
                            type="text"
                            value={formData.metal_type}
                            handleChange={(val) =>
                                updateFormData(setFormData, "metal_type", val)
                            }
                        />
                        <FormInput
                            id="thickness"
                            label="Thickness *"
                            type="number"
                            value={formData.thickness ?? ""}
                            handleChange={(val) =>
                                updateFormData(setFormData, "thickness", val)
                            }
                        />
                        <FormInput
                            id="width"
                            label="Width *"
                            type="number"
                            value={formData.width ?? ""}
                            handleChange={(val) =>
                                updateFormData(setFormData, "width", val)
                            }
                        />
                    </FormRow>
                )}

                {(formData.type == "WIP" || formData.type == "FG") && (
                    <FormRow>
                        <FormInput
                            id="unit_weight"
                            label="Unit Weight *"
                            type="number"
                            value={formData.unit_weight ?? ""}
                            handleChange={(val) =>
                                updateFormData(setFormData, "unit_weight", val)
                            }
                        />
                        <FormInput
                            id="scrap_per_unit_weight"
                            label="Scrap Per Unit Weight *"
                            type="number"
                            value={formData.scrap_per_unit_weight ?? ""}
                            handleChange={(val) =>
                                updateFormData(setFormData, "scrap_per_unit_weight", val)
                            }
                        />
                        <FormSelect
                            id="is_simplified"
                            label="Is Simplified *"
                            placeholder="Select option"
                            value={String(formData.is_simplified)}
                            handleChange={(val) => {
                                const parsed = val === "true";
                                updateFormData(setFormData, "is_simplified", parsed);
                            }}
                            options={[
                                { label: "YES", value: "true" },
                                { label: "NO", value: "false" },
                            ]}
                        />
                    </FormRow>
                )}

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

                <FormRow>
                    <ImagePreview
                        id="graphic_uml"
                        label="Material Image"
                        src={previewSrc}
                        name={formData.name}
                        extra={
                            <UploadButton onClick={handleFileSelect} />
                        }
                    />
                </FormRow>
            </Form>
            <SubmitButton
                isLoading={isLoading}
                onClick={handleSubmit}
            />
        </FormLayout>
    )
}