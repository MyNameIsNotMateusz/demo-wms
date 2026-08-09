import { FormTable } from "../../../components/layout"
import { editableShipmentColumns } from "./wzDocumentsTableConfig"
import { useDispatch, useSelector } from "react-redux";
import { setEditableShipmentsFilters, setEditableShipmentsSortConfig, updateEditableShipmentField } from "./wzDocumentsFormSlice";
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";
import { TableSelect } from "../../../components/ui/table/TableSelect";
import { adjustColumnWidths } from "../../../utils/table";
import { CellInput } from "../../../components/ui";
import {
    handleFocus,
    handleChange,
    handleBlur,
} from "../../../utils/table/cellHandlers";

export const EditableShipmentTable = ({
    data,
    selectedRows,
    setSelectedRows,
    availablePallets,
    handlePalletChange,
    editedValues,
    setEditedValues,
}) => {
    const { editableShipmentSortConfig, editableShipmentFilters } = useSelector(
        (state) => state.wzDocumentsForm,
    );

    const dispatch = useDispatch();

    const getRowId = (row) => row.id || row.pallet;

    return (
        <FormTable
            tableOrigin="editableShipment"
            columns={editableShipmentColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={getRowId}
            sortConfig={editableShipmentSortConfig}
            setSortConfig={setEditableShipmentsSortConfig}
            filters={editableShipmentFilters}
            setFilters={setEditableShipmentsFilters}
        >
            {data.map((row, index) => (
                <TableBodyRow
                    key={index}
                    onClick={(e) => {
                        const target = e.target;
                        if (
                            target.tagName.toLowerCase() === "input" ||
                            target.closest("[data-table-select]") ||
                            target.closest(".react-select__menu")
                        ) {
                            return;
                        }
                        handleRowClick(getRowId(row), setSelectedRows);
                    }}
                >
                    <TableBodyCell $isFirstChild>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows.hasOwnProperty(getRowId(row))}
                            onChange={() => {
                                handleRowClick(getRowId(row), setSelectedRows);
                            }}
                        />
                    </TableBodyCell>

                    {row.id ? (
                        <TableBodyCell>
                            <TableSelect
                                id="pallet"
                                value={row.pallet}
                                handleChange={(val) => {
                                    handlePalletChange(val, row.id);
                                }}
                                handleFocus={() => adjustColumnWidths("editableShipment")}
                                options={availablePallets.map((p) => ({
                                    label: p.pallet_id,
                                    value: p.pallet_id,
                                }))}
                            />
                        </TableBodyCell>
                    ) : (
                        <TableBodyCell>{row.pallet}</TableBodyCell>
                    )}

                    <TableBodyCell>{row.material_code}</TableBodyCell>
                    <TableBodyCell>{row.material_name}</TableBodyCell>

                    {row.id ? (
                        <TableBodyCell>{row.quantity}</TableBodyCell>
                    ) : (
                        <TableBodyCell>
                            <CellInput
                                type="number"
                                value={
                                    editedValues[row.pallet]?.quantity ?? row.quantity
                                }
                                handleFocus={(val) => {
                                    handleFocus(
                                        "quantity",
                                        row.quantity,
                                        setEditedValues,
                                        row.pallet,
                                    );
                                }}
                                handleChange={(val) => {
                                    handleChange("quantity", val, setEditedValues, row.pallet);
                                }}
                                handleBlur={(val) => {
                                    handleBlur(
                                        dispatch,
                                        updateEditableShipmentField,
                                        row.pallet,
                                        "quantity",
                                        val,
                                        setEditedValues,
                                        "number",
                                    );
                                }}
                            />
                        </TableBodyCell>
                    )}

                    <TableBodyCell>{row.material_type}</TableBodyCell>

                </TableBodyRow>
            ))}
        </FormTable>
    )
}