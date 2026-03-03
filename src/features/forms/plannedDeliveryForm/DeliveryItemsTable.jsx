import { FormTable } from "../../../components/layout";
import { deliveryItemsColumns } from "./plannedDeliveryTableConfig";
import {
  setDeliveryItemsSortConfig,
  setDeliveryItemsFilters,
  updateDeliveryItems,
  applyMaterialLookupData,
} from "./plannedDeliveryFormSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  TableBodyRow,
  TableBodyCell,
} from "../../../components/ui/table/TableBase.styles";
import { CellInput } from "../../../components/ui";
import { handleRowClick } from "../../../utils/table/tableRowSelection";
import {
  handleFocus,
  handleChange,
  handleBlur,
} from "../../../utils/table/cellHandlers";
import { handleMaterialLookup } from "./utils/api";
import { lookupMaterial } from "../../../utils/table/lookupMaterial";
import { useAuth } from "../../../auth/AuthProvider";

export const DeliveryItemsTable = ({
  data,
  isFocusedRef,
  selectedRows,
  setSelectedRows,
  editedValues,
  setEditedValues,
}) => {
  const { deliveryItemsSortConfig, deliveryItemsFilters } = useSelector(
    (state) => state.plannedDeliveryForm,
  );

  const dispatch = useDispatch();

  const { accessToken } = useAuth();

  return (
    <FormTable
      tableOrigin="deliveryItems"
      columns={deliveryItemsColumns}
      rows={data}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      idKey="id"
      sortConfig={deliveryItemsSortConfig}
      setSortConfig={setDeliveryItemsSortConfig}
      filters={deliveryItemsFilters}
      setFilters={setDeliveryItemsFilters}
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

          <TableBodyCell>
            <CellInput
              type="text"
              value={editedValues[row.id]?.seq_number ?? row.seq_number}
              handleFocus={() => {
                isFocusedRef.current = true;
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
                  applyMaterialLookupData,
                  lookupMaterial,
                  accessToken
                );
              }}
              handleBlur={(val) => {
                isFocusedRef.current = false;
                handleBlur(
                  dispatch,
                  updateDeliveryItems,
                  row.id,
                  "seq_number",
                  val,
                  setEditedValues,
                );
              }}
            />
          </TableBodyCell>

          <TableBodyCell>
            <CellInput
              type="text"
              value={editedValues[row.id]?.material_code ?? row.material_code}
              handleFocus={() => {
                isFocusedRef.current = true;
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
                  applyMaterialLookupData,
                  lookupMaterial,
                  accessToken
                );
              }}
              handleBlur={(val) => {
                isFocusedRef.current = false;
                handleBlur(
                  dispatch,
                  updateDeliveryItems,
                  row.id,
                  "material_code",
                  val,
                  setEditedValues,
                );
              }}
            />
          </TableBodyCell>
          <TableBodyCell>{row.name}</TableBodyCell>
          <TableBodyCell>{row.type}</TableBodyCell>
          <TableBodyCell>
            <CellInput
              type="number"
              value={
                editedValues[row.id]?.planned_quantity ?? row.planned_quantity
              }
              handleFocus={() => {
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
                handleBlur(
                  dispatch,
                  updateDeliveryItems,
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
      ))}
    </FormTable>
  );
};
