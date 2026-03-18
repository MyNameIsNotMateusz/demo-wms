import { useState, useRef, useEffect } from "react";
import { FormLayout, FormCard } from "../../../components/layout";
import { tabsConfig } from "./tabsConfig";
import {
  FormCardWrapper,
  FormRow,
  FormTableWrapper,
  FormActionsWrapper,
} from "../../../components/ui/form/FormBase.styles";
import {
  FormSelect,
  FormTabs,
  FormInput,
  TableActionButton,
  SubmitButton,
  ReadOnlyField
} from "../../../components/ui";
import { updateFormData } from "../../../utils/forms/updateFormData";
import { useSelector } from "react-redux";
import { DeliveryItemsTable } from "./DeliveryItemsTable";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { v4 as uuidv4 } from "uuid";
import { lookupMaterial } from "../../../utils/table/lookupMaterial";
import { useAuth } from "../../../auth/AuthProvider";
import {
  selectDeliveryItems,
  selectPlannedDeliveries,
  selectPlannedDeliveryRemarksById,
  selectDeliveryDetails
} from "./plannedDeliverySelectors";
import {
  addDeliveryItemRow,
  removeDeliveryItems,
  applyMaterialLookupData,
  updateDeliveryItems,
  setDeliveryDetailsRows,
  addDeliveryDetailsRow,
  clearDeliveryItemsState,
  removeDeliveryDetails
} from "./plannedDeliveryFormSlice";
import { useDispatch } from "react-redux";
import { PlannedDeliveriesTable } from "./PlannedDeliveriesTable";
import { handleMaterialLookup, cancelPlannedDelivery, updatePlannedDelivery } from "./utils/api";
import { handleRemoveSelectedRows, addDeliveryItem, addDeliveryRow } from "./utils/tableOperations";
import { handlePastedMaterial } from "./utils/clipboard";
import { addPlannedDelivery } from "./utils/addPlannedDelivery";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { dictionaryThunks } from "../../../store/thunks/dictionaryThunks";
import { DeliveryDetailsTable } from "./DeliveryDetailsTable";

export const PlannedDeliveryForm = ({ onClose }) => {
  const { accessToken } = useAuth();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    contractor_tax_id: "",
    planned_date: "",
    delivery_document: "",
    remarks: "",
  });

  const { fetchPlannedDeliveries } = dictionaryThunks;

  const displayedDeliveryItems = useSelector(selectDeliveryItems);
  const displayedPlannedDeliveries = useSelector(selectPlannedDeliveries);
  const displayedDeliveryDetails = useSelector(selectDeliveryDetails);

  const [editedValues, setEditedValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [deletedDetailsItems, setDeletedDetailsItems] = useState([]);
  const [selectedDeliveryItems, setSelectedDeliveryItems] = useState({});
  const [selectedPlannedDeliveries, setSelectedPlannedDeliveries] = useState(
    {},
  );
  const [selectedDeliveryDetails, setSelectedDeliveryDetails] = useState({});

  const [isDetailsTableEdited, setIsDetailsTableEdited] = useState(false);

  const isFocusedRef = useRef(false);

  const { contractors } = useSelector((state) => state.contractors);
  const { deliveryItemsRows, deliveryDetailsRows } = useSelector((state) => state.plannedDeliveryForm);

  const remarks = useSelector((state) =>
    selectPlannedDeliveryRemarksById(state, Object.keys(selectedPlannedDeliveries)[0])
  );

  useEffect(() => {
    const handlePaste = async (e) => {
      if (isFocusedRef.current) return;
      if (!e.ctrlKey && !e.metaKey) return;
      if (e.key !== "v" && e.key !== "V") return;

      const pastedText = await navigator.clipboard.readText();
      if (!pastedText) return;

      const lines = pastedText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line !== "");

      for (const line of lines) {
        const columns = line.split("\t");
        const firstCol = columns[0] || "";

        let secondCol = 0;
        if (columns[1] && columns[1].trim() !== "") {
          const normalized = columns[1].trim().replace(",", ".");
          const parsed = parseFloat(normalized);
          secondCol = isNaN(parsed) ? 0 : parsed;
        }

        await handlePastedMaterial(
          firstCol,
          secondCol,
          dispatch,
          handleMaterialLookup,
          applyMaterialLookupData,
          updateDeliveryItems,
          lookupMaterial,
          accessToken,
          addDeliveryItem,
          formData,
          uuidv4,
          handleError,
          addDeliveryItemRow,
        );
      }
    };

    window.addEventListener("keydown", handlePaste);
    return () => window.removeEventListener("keydown", handlePaste);
  }, [formData.contractor_tax_id]);

  useEffect(() => {
    setIsDetailsTableEdited(false);
    setDeletedDetailsItems([]);
    const selectedIds = Object.keys(selectedPlannedDeliveries);

    if (selectedIds.length === 0) {
      dispatch(setDeliveryDetailsRows([]));
      return;
    }

    const selectedId = selectedIds[0];

    const selectedDelivery = displayedPlannedDeliveries.find(
      (delivery) => delivery.id === selectedId,
    );

    if (!selectedDelivery || !selectedDelivery.items) {
      dispatch(setDeliveryDetailsRows([]));
      return;
    }

    const mappedItems = selectedDelivery.items.map((item) => ({
      id: item.id,
      seq_number: item.material.seq_number,
      material_code: item.material.material_code,
      name: item.material.name,
      type: item.material.type,
      planned_quantity: Math.round(parseFloat(item.planned_quantity)),
      unit: item.material.unit,
    }));

    dispatch(setDeliveryDetailsRows(mappedItems));
  }, [selectedPlannedDeliveries, displayedPlannedDeliveries, dispatch]);

  const handleSubmit = async () => {
    const success = await addPlannedDelivery(
      formData,
      deliveryItemsRows,
      handleError,
      handleSuccess,
      setIsLoading,
      BASE_API_URL,
      DEFAULT_HEADERS,
      accessToken
    );

    if (!success) return;

    dispatch(fetchPlannedDeliveries(accessToken));
    dispatch(clearDeliveryItemsState());
    setFormData({
      contractor_tax_id: "",
      planned_date: "",
      delivery_document: "",
      remarks: "",
    })
  };

  return (
    <FormLayout
      title="Planned Delivery Form"
      onClose={onClose}
      isLoading={isLoading}
    >
      {activeTab === 0 && (
        <FormCardWrapper>
          <FormCard title="Delivery Details">
            <FormRow>
              <FormSelect
                id="contractor"
                label="Contractor Selection *"
                placeholder="Select a Contractor"
                value={formData.contractor_tax_id}
                handleChange={(val) =>
                  updateFormData(setFormData, "contractor_tax_id", val)
                }
                options={contractors.map((c) => ({
                  label: c.name,
                  value: c.tax_id,
                }))}
              />
            </FormRow>
            <FormRow>
              <FormInput
                id="plannedDate"
                label="Planned Delivery Date *"
                type="date"
                value={formData.planned_date}
                disabled={!formData.contractor_tax_id}
                handleChange={(val) =>
                  updateFormData(setFormData, "planned_date", val)
                }
              />
            </FormRow>
            <FormRow>
              <FormInput
                id="deliveryDocument"
                label="Delivery Document"
                type="text"
                value={formData.delivery_document}
                disabled={!formData.contractor_tax_id}
                handleChange={(val) =>
                  updateFormData(setFormData, "delivery_document", val)
                }
              />
            </FormRow>
            <FormRow>
              <FormInput
                id="remarks"
                label="Remarks"
                type="text"
                value={formData.remarks}
                disabled={!formData.contractor_tax_id}
                handleChange={(val) =>
                  updateFormData(setFormData, "remarks", val)
                }
              />
            </FormRow>
            <SubmitButton
              isLoading={isLoading}
              onClick={handleSubmit}
            />
          </FormCard>
          <FormCard title="Delivery Items">
            <FormTableWrapper>
              <DeliveryItemsTable
                data={displayedDeliveryItems}
                isFocusedRef={isFocusedRef}
                selectedRows={selectedDeliveryItems}
                setSelectedRows={setSelectedDeliveryItems}
                editedValues={editedValues}
                setEditedValues={setEditedValues}
              />
            </FormTableWrapper>
            <FormActionsWrapper>
              <TableActionButton
                handleClick={() =>
                  addDeliveryItem(
                    formData,
                    uuidv4,
                    handleError,
                    dispatch,
                    addDeliveryItemRow,
                  )
                }
                type="add"
              />
              <TableActionButton
                handleClick={() =>
                  handleRemoveSelectedRows(
                    selectedDeliveryItems,
                    displayedDeliveryItems,
                    setSelectedDeliveryItems,
                    removeDeliveryItems,
                    dispatch,
                    handleError,
                  )
                }
                type="remove"
              />
            </FormActionsWrapper>
          </FormCard>
        </FormCardWrapper>
      )}

      {activeTab === 1 && (
        <FormCardWrapper>
          <FormCard title="Planned Deliveries">
            <FormTableWrapper>
              <PlannedDeliveriesTable
                data={displayedPlannedDeliveries}
                selectedRows={selectedPlannedDeliveries}
                setSelectedRows={setSelectedPlannedDeliveries}
              />
            </FormTableWrapper>
            <SubmitButton
              isLoading={isLoading}
              onClick={() => cancelPlannedDelivery(selectedPlannedDeliveries, accessToken, setIsLoading, setSelectedPlannedDeliveries, dispatch, fetchPlannedDeliveries, handleSuccess, handleError)}
              label="cancel delivery"
            />
          </FormCard>
          <FormCard title="Delivery Details">
            <FormRow>
              <ReadOnlyField
                label="Remarks"
                value={remarks}
              />
            </FormRow>
            <FormTableWrapper>
              <DeliveryDetailsTable
                data={displayedDeliveryDetails}
                isFocusedRef={isFocusedRef}
                selectedRows={selectedDeliveryDetails}
                setSelectedRows={setSelectedDeliveryDetails}
                editedValues={editedValues}
                setEditedValues={setEditedValues}
                setIsEdited={setIsDetailsTableEdited}
              />
            </FormTableWrapper>
            <FormActionsWrapper>
              <TableActionButton
                handleClick={() => {
                  const success = addDeliveryRow(
                    selectedPlannedDeliveries,
                    handleError,
                    dispatch,
                    addDeliveryDetailsRow
                  );

                  if (!success) return;

                  setIsDetailsTableEdited(true);
                }}
                type="add"
              />
              <TableActionButton
                handleClick={() => {
                  const success = handleRemoveSelectedRows(
                    selectedDeliveryDetails,
                    displayedDeliveryDetails,
                    setSelectedDeliveryDetails,
                    removeDeliveryDetails,
                    dispatch,
                    handleError,
                  );

                  if (!success) return;

                  setDeletedDetailsItems(prev => [
                    ...prev,
                    ...Object.keys(selectedDeliveryDetails),
                  ]);

                  setIsDetailsTableEdited(true);
                }}
                type="remove"
              />
            </FormActionsWrapper>
            <SubmitButton
              isLoading={isLoading}
              onClick={() => updatePlannedDelivery(isDetailsTableEdited, handleError, deliveryDetailsRows, selectedPlannedDeliveries, deletedDetailsItems, setIsLoading, accessToken, setDeletedDetailsItems, dispatch, fetchPlannedDeliveries, handleSuccess, setSelectedPlannedDeliveries)}
            />
          </FormCard>
        </FormCardWrapper>
      )}

      <FormTabs
        tabs={tabsConfig}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </FormLayout>
  );
};
