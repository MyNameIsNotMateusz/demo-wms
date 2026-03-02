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
} from "../../../components/ui";
import { updateFormData } from "../../../utils/forms/updateFormData";
import { useSelector } from "react-redux";
import { DeliveryItemsTable } from "./DeliveryItemsTable";
import { handleError } from "../../../utils/alerts";
import { v4 as uuidv4 } from "uuid";
import { lookupMaterial } from "../../../utils/table/lookupMaterial";
import { useAuth } from "../../../auth/AuthProvider";
import {
  selectDeliveryItems,
  selectPlannedDeliveries,
} from "./plannedDeliverySelectors";
import {
  addDeliveryItemRow,
  removeDeliveryItems,
  applyMaterialLookupData,
  updateDeliveryItems,
} from "./plannedDeliveryFormSlice";
import { useDispatch } from "react-redux";
import { PlannedDeliveriesTable } from "./PlannedDeliveriesTable";

export const PlannedDeliveryForm = ({ onClose }) => {
  const { accessToken } = useAuth();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    contractor_tax_id: "",
    planned_date: "",
    delivery_document: "",
    remarks: "",
  });

  const displayedDeliveryItems = useSelector(selectDeliveryItems);
  const displayedPlannedDeliveries = useSelector(selectPlannedDeliveries);

  const [editedValues, setEditedValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [selectedDeliveryItems, setSelectedDeliveryItems] = useState({});
  const [selectedPlannedDeliveries, setSelectedPlannedDeliveries] = useState(
    {},
  );

  const isFocusedRef = useRef(false);

  const { contractors } = useSelector((state) => state.contractors);
  const { plannedDeliveries } = useSelector((state) => state.plannedDelivery);

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
        );
      }
    };

    window.addEventListener("keydown", handlePaste);
    return () => window.removeEventListener("keydown", handlePaste);
  }, [formData.contractor_tax_id]);

  const addDeliveryItem = () => {
    if (formData.contractor_tax_id === "") {
      handleError("Please select a contractor first.");
      return null;
    }

    const uniqueId = uuidv4();

    const newRow = {
      id: uniqueId,
      seq_number: "",
      material_code: "",
      name: "",
      type: "",
      planned_quantity: 0,
      unit: "",
    };

    dispatch(addDeliveryItemRow(newRow));

    return uniqueId;
  };

  const handleMaterialLookup = async (id, key, value, dispatch, reducer) => {
    const emptyRow = {
      id,
      name: "",
      type: "",
      unit: "",
      material_code: key === "seq_number" ? "" : undefined,
      seq_number: key === "material_code" ? "" : undefined,
    };

    if (!value) {
      dispatch(reducer(emptyRow));
      return false;
    }

    try {
      const responseData = await lookupMaterial(key, value, accessToken);

      if (!responseData || !responseData.name) {
        dispatch(reducer(emptyRow));
        return false;
      }

      dispatch(
        reducer({
          id,
          name: responseData.name,
          type: responseData.type,
          unit: responseData.unit,
          material_code: responseData.code,
          seq_number: responseData.seq_number,
        }),
      );

      return true;
    } catch (error) {
      dispatch(reducer(emptyRow));
      return false;
    }
  };

  const handleRemoveSelectedRows = (
    selectedRows,
    data,
    setSelectedRows,
    reducer,
    dispatch,
  ) => {
    const idsToRemove = Object.keys(selectedRows);

    if (idsToRemove.length === 0) {
      handleError("No row selected.");
      return;
    }

    if (idsToRemove.length === 1) {
      const onlyId = idsToRemove[0];
      const indexToRemove = data.findIndex((row) => row.id === onlyId);

      const nextItem =
        data[indexToRemove + 1] &&
        !idsToRemove.includes(String(data[indexToRemove + 1].id))
          ? data[indexToRemove + 1]
          : data[indexToRemove - 1] &&
              !idsToRemove.includes(String(data[indexToRemove - 1].id))
            ? data[indexToRemove - 1]
            : null;

      dispatch(reducer(idsToRemove));
      setSelectedRows(nextItem ? { [nextItem.id]: true } : {});
    } else {
      dispatch(reducer(idsToRemove));
      setSelectedRows({});
    }
  };
  const handlePastedMaterial = async (
    value,
    quantity,
    dispatch,
    handleMaterialLookupFn,
    applyLookupReducer,
    updateReducer,
  ) => {
    const newRowId = addDeliveryItem();
    if (!newRowId) return;

    const foundByCode = await handleMaterialLookupFn(
      newRowId,
      "material_code",
      value,
      dispatch,
      applyLookupReducer,
    );

    if (!foundByCode) {
      await handleMaterialLookupFn(
        newRowId,
        "seq_number",
        value,
        dispatch,
        applyLookupReducer,
      );
    }

    if (quantity !== 0) {
      dispatch(
        updateReducer({
          id: newRowId,
          key: "planned_quantity",
          value: quantity,
        }),
      );
    }
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
          </FormCard>
          <FormCard title="Delivery Items">
            <FormTableWrapper>
              <DeliveryItemsTable
                data={displayedDeliveryItems}
                isFocusedRef={isFocusedRef}
                handleMaterialLookup={handleMaterialLookup}
                selectedRows={selectedDeliveryItems}
                setSelectedRows={setSelectedDeliveryItems}
                editedValues={editedValues}
                setEditedValues={setEditedValues}
              />
            </FormTableWrapper>
            <FormActionsWrapper>
              <TableActionButton handleClick={addDeliveryItem} type="add" />
              <TableActionButton
                handleClick={() =>
                  handleRemoveSelectedRows(
                    selectedDeliveryItems,
                    displayedDeliveryItems,
                    setSelectedDeliveryItems,
                    removeDeliveryItems,
                    dispatch,
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
