import { FormLayout } from "../../../components/layout"
import { useEffect, useState } from "react";
import { Form, FormSection, FormColumn, FormRow, SummaryWrapper, FormTableWrapper, FormActionsWrapper, ModalContainer } from "../../../components/ui/form/FormBase.styles";
import { FormInput, FetchButton, FormSelect, ImagePreview, TableActionButton, FormTabs, SubmitButton } from "../../../components/ui";
import { updateFormData } from "../../../utils/forms/updateFormData";
import { fetchData } from "../../../utils/forms/fetchData";
import { useAuth } from "../../../auth/AuthProvider";
import { selectProjects, selectCreatedPallets, selectRequiredMaterials } from "./createComponentsSelectors";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoils } from "./createComponentsFormSlice";
import { MaterialSummary } from "./MaterialSummary";
import { getRecipesForMaterial } from "./utils/getRecipesForMaterial";
import { buildRequiredMaterialsStock } from "./utils/buildRequiredMaterialsStock";
import { fetchRequiredMaterialsStock } from "./api/fetchRequiredMaterialsStock";
import { Summary } from "../../../components/ui";
import { setRequiredMaterialsStock, addCreatedPalletRow, removeCreatedPalletRows, clearCreatedPallets } from "./createComponentsFormSlice";
import { CreatedPalletsTable } from "./CreatedPalletsTable";
import { v4 as uuidv4 } from "uuid";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { AddRowsModal } from "./AddRowsModal";
import { tabsConfig } from "./tabsConfig";
import { RequiredMaterialsTable } from "./RequiredMaterialsTable";
import { ProductionSummary } from "./ProductionSummary";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { validateProductionForm } from "./utils/validateProductionForm";
import { handleRecipeProduction } from "./utils/production/handleRecipeProduction";
import { handleSimpleProduction } from "./utils/production/handleSimpleProduction";
import { buildLabelsData } from "./utils/buildLabelsData";
import { tableThunks } from "../../../store/thunks/tableThunks";
import { resetCreateComponentsForm } from "./utils/resetCreateComponentsForm";
import { printLabels } from "./pdf/printLabels";

export const CreateComponentsForm = ({ onClose }) => {
    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const { fetchLogisticsStock } = tableThunks;

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
    const displayedCreatedPallets = useSelector(selectCreatedPallets);
    const displayedRequiredMaterials = useSelector(selectRequiredMaterials);

    const [previewSrc, setPreviewSrc] = useState(null);
    const [materialExtraData, setMaterialExtraData] = useState({
        destination: null,
        is_simplified: null,
    });
    const [isAssemblyMode, setIsAssemblyMode] = useState(null);
    const [maxProducible, setMaxProducible] =
        useState(null);
    const [
        maxProducibleSelected,
        setMaxProducibleSelected,
    ] = useState(null);
    const [selectedCreatedPallets, setSelectedCreatedPallets] = useState({});
    const [editedValues, setEditedValues] = useState({});
    const [activeTab, setActiveTab] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalHandlers, setModalHandlers] = useState({
        onClose: null,
        onSubmit: null,
    });
    const [addRowsModalData, setAddRowsModalData] = useState({
        rows: 0,
        quantity: 0,
    });

    const {
        coils,
        requiredMaterialsStock,
        createdPallets
    } = useSelector((state) => state.createComponentsForm);

    useEffect(() => {
        dispatch(fetchCoils(accessToken));
    }, [dispatch]);

    useEffect(() => {
        const load = async () => {
            try {
                const data =
                    await fetchRequiredMaterialsStock({
                        materialCode:
                            formData.material_code,
                        accessToken,
                    });

                const stock =
                    buildRequiredMaterialsStock({
                        inputs: data.inputs,
                        recipes,
                    });

                dispatch(setRequiredMaterialsStock(stock));

            } catch {
                dispatch(setRequiredMaterialsStock([]));
            }
        };

        if (
            !formData.material_code ||
            !recipes.length
        ) {
            dispatch(setRequiredMaterialsStock([]));
            return;
        }

        load();

    }, [formData.material_code, recipes]);

    useEffect(() => {
        if (
            !requiredMaterialsStock ||
            requiredMaterialsStock.length === 0
        ) {
            setMaxProducible(null);
            return;
        }

        const producibleNumbers =
            requiredMaterialsStock.map((item) => {
                if (
                    item.options &&
                    item.options.length > 0
                ) {
                    const total = item.options.reduce(
                        (sum, opt) =>
                            sum +
                            opt.availableQuantity /
                            opt.quantity,
                        0
                    );

                    return total;
                }

                return (
                    item.availableQuantity /
                    item.quantity
                );
            });

        const minNumber = Math.floor(
            Math.min(...producibleNumbers)
        );

        setMaxProducible(
            minNumber.toString()
        );

    }, [requiredMaterialsStock]);

    useEffect(() => {
        if (
            !requiredMaterialsStock ||
            requiredMaterialsStock.length === 0
        ) {
            setMaxProducibleSelected(null);
            return;
        }

        const values =
            requiredMaterialsStock
                .filter(
                    (item) =>
                        item.quantity !== null &&
                        item.quantity !== 0 &&
                        item.availableQuantity !== null
                )
                .map(
                    (item) =>
                        item.availableQuantity /
                        item.quantity
                );

        if (values.length === 0) {
            setMaxProducibleSelected(null);
            return;
        }

        const minValue = Math.floor(
            Math.min(...values)
        );

        setMaxProducibleSelected(
            minValue.toString()
        );

    }, [requiredMaterialsStock]);

    useEffect(() => {
        dispatch(clearCreatedPallets());

        setActiveTab(0);

    }, [formData.material_code]);

    const handleFetchSeq = async () => {
        setIsLoading(true);

        const data = await fetchData({
            endpoint:
                `common/materials/lookup/?seq_number=${formData.seqNumber}`,
            accessToken,
        });

        if (!data) {
            setIsLoading(false);
            return;
        }

        const matchedProject = projects.find(
            (project) =>
                data.projects?.some(
                    (materialProject) =>
                        materialProject.name ===
                        project.name
                )
        );

        if (!matchedProject) {
            handleError(
                "This material is not assigned to any available project."
            );
            setIsLoading(false);
            return;
        }

        const codes =
            matchedProject.materials?.map(
                (m) => m.material_code
            ) || [];

        setMaterialCodes(codes);

        setPreviewSrc(data.graphic_uml);

        updateFormData(
            setFormData,
            "project",
            matchedProject.name
        );

        updateFormData(
            setFormData,
            "material_code",
            data.code
        );

        const recipes = getRecipesForMaterial({
            projects,
            projectName:
                matchedProject.name,
            materialCode: data.code,
        });

        setRecipes(recipes);

        setMaterialExtraData({
            destination:
                data.destination,

            is_simplified:
                data.is_simplified,
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
        const recipes = getRecipesForMaterial({
            projects,
            projectName: formData.project,
            materialCode: val
        })
        setRecipes(recipes);

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

    const handleAddCreatedPalletRow = (
        e,
        quantity = 0
    ) => {
        e?.preventDefault();

        if (!formData.material_code) {
            handleError(
                "No material code selected."
            );

            return;
        }

        const uniqueId = uuidv4();

        const newRow = {
            id: uniqueId,
            material_code:
                formData.material_code,
            quantity,
            status: "OK",
        };

        dispatch(
            addCreatedPalletRow(newRow)
        );
    };

    const handleRemoveCreatedPalletRows = (
        e
    ) => {
        e.preventDefault();

        const idsToRemove = Object.keys(
            selectedCreatedPallets
        );

        if (idsToRemove.length === 0) {
            handleError("No row selected.");

            return;
        }

        if (idsToRemove.length === 1) {
            const onlyId = idsToRemove[0];

            const indexToRemove =
                displayedCreatedPallets.findIndex(
                    (row) => row.id === onlyId
                );

            const nextItem =
                displayedCreatedPallets[
                    indexToRemove + 1
                ] &&
                    !idsToRemove.includes(
                        displayedCreatedPallets[
                            indexToRemove + 1
                        ].id
                    )
                    ? displayedCreatedPallets[
                    indexToRemove + 1
                    ]
                    : displayedCreatedPallets[
                        indexToRemove - 1
                    ] &&
                        !idsToRemove.includes(
                            displayedCreatedPallets[
                                indexToRemove - 1
                            ].id
                        )
                        ? displayedCreatedPallets[
                        indexToRemove - 1
                        ]
                        : null;

            dispatch(
                removeCreatedPalletRows(
                    idsToRemove
                )
            );

            setSelectedCreatedPallets(
                nextItem
                    ? {
                        [nextItem.id]: true,
                    }
                    : {}
            );

            return;
        }

        dispatch(
            removeCreatedPalletRows(
                idsToRemove
            )
        );

        setSelectedCreatedPallets({});
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (modalHandlers.onClose) modalHandlers.onClose();

        setAddRowsModalData({ rows: 0, quantity: 0 });
    };

    const handleSubmitModal = () => {
        const { rows, quantity } = addRowsModalData;

        if (rows <= 0) {
            handleError("Number of rows must be greater than 0");
            return;
        }

        if (quantity <= 0) {
            handleError("Quantity must be greater than 0");
            return;
        }

        setIsModalOpen(false);
        if (modalHandlers.onSubmit) modalHandlers.onSubmit(addRowsModalData);

        setAddRowsModalData({ rows: 0, quantity: 0 });
    };

    const handleAddMultipleRows = async (e) => {
        e.preventDefault();

        if (!formData.material_code) {
            handleError(
                "No material code selected."
            );

            return;
        }

        setIsModalOpen(true);

        const popupResult = await new Promise((resolve) => {
            setModalHandlers({
                onClose: () => resolve(false),
                onSubmit: (latestAddRowsForm) =>
                    resolve({ submitted: true, data: latestAddRowsForm }),
            });
        });

        if (!popupResult || popupResult.submitted === false) return;

        const { rows, quantity } = popupResult.data;

        dispatch(clearCreatedPallets());

        for (let i = 0; i < rows; i++) {
            handleAddCreatedPalletRow(null, quantity);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid =
            validateProductionForm({
                isAssemblyMode,
                createdPallets,
                formData,
                handleError,
            });

        if (!isValid) {
            return;
        }

        setIsLoading(true);

        try {
            let data = null;

            if (isAssemblyMode) {
                data =
                    await handleRecipeProduction({
                        accessToken,
                        formData,
                        createdPallets,
                        requiredMaterialsStock,
                        maxProducibleSelected,
                        handleError,
                    });
            } else {
                data =
                    await handleSimpleProduction({
                        accessToken,
                        formData,
                        createdPallets,
                        handleError,
                    });
            }

            if (!data) {
                return;
            }

            if (
                materialExtraData.is_simplified ===
                false
            ) {
                const labelsData =
                    buildLabelsData(
                        data.items,
                        formData.material_code
                    );

                if (labelsData.length > 0) {
                    await printLabels(labelsData);
                }
            }

            handleSuccess(
                "Operation completed successfully."
            );

            resetCreateComponentsForm({
                dispatch,
                setFormData,
                setRecipes,
                setMaterialCodes,
                setPreviewSrc,
                setSelectedCreatedPallets,
            });

            // tutaj dispatch do production transactions

            if (
                materialExtraData.is_simplified
            ) {
                // dispatch production table
            } else {
                dispatch(
                    fetchLogisticsStock(
                        accessToken
                    )
                );
            }

        } catch (err) {
            console.error(
                "Request failed:",
                err
            );

            handleError(
                err.message ||
                "Unexpected error occurred."
            );

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormLayout title="Create Components Form" onClose={onClose} isLoading={isLoading}>
            <button onClick={() => console.log(projects)} style={{ height: "50px" }}>kliknij mnie</button>
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
                                src={previewSrc}
                                name={formData.material_code}
                            />
                        </FormRow>
                    </FormColumn>
                </FormSection>
                <MaterialSummary
                    materialData={materialExtraData}
                    materialCode={formData.material_code}
                />
                {isAssemblyMode === true && maxProducible !== null && (
                    <ProductionSummary
                        maxProducible={maxProducible}
                        maxProducibleSelected={maxProducibleSelected}
                    />
                )}
                <FormTableWrapper>
                    {activeTab == 0 && isModalOpen && (
                        <ModalContainer>
                            <AddRowsModal
                                handleClose={handleCloseModal}
                                handleSubmit={handleSubmitModal}
                                modalData={addRowsModalData}
                                setModalData={setAddRowsModalData}
                            />
                        </ModalContainer>
                    )}
                    {activeTab == 0 && (
                        <CreatedPalletsTable
                            data={displayedCreatedPallets}
                            selectedRows={selectedCreatedPallets}
                            setSelectedRows={setSelectedCreatedPallets}
                            editedValues={editedValues}
                            setEditedValues={setEditedValues}
                        />
                    )}
                    {activeTab == 1 && (
                        <RequiredMaterialsTable
                            data={displayedRequiredMaterials}
                        />
                    )}
                </FormTableWrapper>
                <FormActionsWrapper>
                    <TableActionButton
                        handleClick={handleAddCreatedPalletRow}
                        type="add"
                    />
                    <TableActionButton
                        handleClick={handleRemoveCreatedPalletRows}
                        type="remove"
                    />
                    <TableActionButton
                        handleClick={handleAddMultipleRows}
                        type="addMultiple"
                    />
                </FormActionsWrapper>
                {isAssemblyMode === true && (
                    <FormTabs
                        tabs={tabsConfig}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                )}
            </Form>
            <SubmitButton isLoading={isLoading} onClick={handleSubmit} />
        </FormLayout>
    )
}