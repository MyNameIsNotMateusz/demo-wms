import { FormTable } from "../../../components/layout";
import { deliveryItemsColumns } from "./plannedDeliveryTableConfig";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryDetailsFilters, setDeliveryDetailsSortConfig, applyMaterialToDeliveryDetails, updateDeliveryDetails } from "./plannedDeliveryFormSlice";
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";
import { CellInput } from "../../../components/ui";
import { handleMaterialLookup } from "./utils/api";
import { lookupMaterial } from "../../../utils/table/lookupMaterial";
import { useAuth } from "../../../auth/AuthProvider";
import {
    handleFocus,
    handleChange,
    handleBlur,
} from "../../../utils/table/cellHandlers";
import { useRef } from "react";

export const DeliveryDetailsTable = ({
    data,
    isFocusedRef,
    selectedRows,
    setSelectedRows,
    editedValues,
    setEditedValues,
    setIsEdited
}) => {

    const { deliveryDetailsSortConfig, deliveryDetailsFilters } = useSelector(
        (state) => state.plannedDeliveryForm,
    );

    const dispatch = useDispatch();

    const { accessToken } = useAuth();

    const initialInputValueRef = useRef(null);

    return (
        <FormTable
            tableOrigin="deliveryDetails"
            columns={deliveryItemsColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            idKey="id"
            sortConfig={deliveryDetailsSortConfig}
            setSortConfig={setDeliveryDetailsSortConfig}
            filters={deliveryDetailsFilters}
            setFilters={setDeliveryDetailsFilters}
        >
            {data.map((row, index) => (
                <TableBodyRow key={index}>
                    <TableBodyCell>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.id] || false}
                            onChange={() => {
                                handleRowClick(row.id, setSelectedRows);
                            }}
                        />
                    </TableBodyCell>
                    {row.isNew ? (
                        <TableBodyCell>
                            <CellInput
                                type="text"
                                value={editedValues[row.id]?.seq_number ?? row.seq_number}
                                handleFocus={(val) => {
                                    isFocusedRef.current = true;
                                    initialInputValueRef.current = val;
                                    handleFocus(
                                        "seq_number",
                                        row.seq_number,
                                        setEditedValues,
                                        row.id,
                                    );
                                }}
                                handleChange={(val) => {
                                    handleChange("seq_number", val, setEditedValues, row.id);
                                    handleMaterialLookup(
                                        row.id,
                                        "seq_number",
                                        val,
                                        dispatch,
                                        applyMaterialToDeliveryDetails,
                                        lookupMaterial,
                                        accessToken
                                    );
                                }}
                                handleBlur={(val) => {
                                    isFocusedRef.current = false;
                                    if (initialInputValueRef.current !== val) {
                                        setIsEdited(true);
                                    }
                                    handleBlur(
                                        dispatch,
                                        updateDeliveryDetails,
                                        row.id,
                                        "seq_number",
                                        val,
                                        setEditedValues,
                                    );
                                }}
                            />
                        </TableBodyCell>

                    ) : (
                        <TableBodyCell>{row.seq_number}</TableBodyCell>
                    )}

                    {row.isNew ? (
                        <TableBodyCell>
                            <CellInput
                                type="text"
                                value={editedValues[row.id]?.material_code ?? row.material_code}
                                handleFocus={(val) => {
                                    isFocusedRef.current = true;
                                    initialInputValueRef.current = val;
                                    handleFocus(
                                        "material_code",
                                        row.material_code,
                                        setEditedValues,
                                        row.id,
                                    );
                                }}
                                handleChange={(val) => {
                                    handleChange("material_code", val, setEditedValues, row.id);
                                    handleMaterialLookup(
                                        row.id,
                                        "material_code",
                                        val,
                                        dispatch,
                                        applyMaterialToDeliveryDetails,
                                        lookupMaterial,
                                        accessToken
                                    );
                                }}
                                handleBlur={(val) => {
                                    if (initialInputValueRef.current !== val) {
                                        setIsEdited(true);
                                    }
                                    handleBlur(
                                        dispatch,
                                        updateDeliveryDetails,
                                        row.id,
                                        "material_code",
                                        val,
                                        setEditedValues,
                                    );
                                }}
                            />
                        </TableBodyCell>
                    ) : (
                        <TableBodyCell>
                            {row.material_code}
                        </TableBodyCell>
                    )}

                    <TableBodyCell>{row.name}</TableBodyCell>
                    <TableBodyCell>{row.type}</TableBodyCell>

                    <TableBodyCell>
                        <CellInput
                            type="number"
                            value={
                                editedValues[row.id]?.planned_quantity ?? row.planned_quantity
                            }
                            handleFocus={(val) => {
                                initialInputValueRef.current = val;
                                handleFocus(
                                    "planned_quantity",
                                    row.planned_quantity,
                                    setEditedValues,
                                    row.id,
                                );
                            }}
                            handleChange={(val) => {
                                handleChange("planned_quantity", val, setEditedValues, row.id);
                            }}
                            handleBlur={(val) => {
                                if (initialInputValueRef.current !== val) {
                                    setIsEdited(true);
                                }
                                handleBlur(
                                    dispatch,
                                    updateDeliveryDetails,
                                    row.id,
                                    "planned_quantity",
                                    val,
                                    setEditedValues,
                                    "number",
                                );
                            }}
                        />
                    </TableBodyCell>
                    <TableBodyCell>{row.unit}</TableBodyCell>

                </TableBodyRow>
            ))
            }
        </FormTable >
    )
}