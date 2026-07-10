import { useDispatch, useSelector } from "react-redux"
import { FormTable } from "../../../components/layout"
import { inboundPalletsColumns } from "./inboundTableConfig"
import { setDeliveryItemsSortConfig, setDeliveryItemsFilters, updateDeliveryItem, updateDeliveryItemField } from "./inboundFormSlice"
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles"
import { handleRowClick } from "../../../utils/table/tableRowSelection"
import { TableSelect } from "../../../components/ui/table/TableSelect"
import { handleBlur, handleChange, handleFocus } from "../../../utils/table/cellHandlers"
import { fetchMaterialData } from "./api/fetchMaterialData"
import { useAuth } from "../../../auth/AuthProvider"
import { CellInput } from "../../../components/ui"
import { adjustColumnWidths } from "../../../utils/table";

export const DeliveryItemsTable = ({
    data,
    selectedRows,
    setSelectedRows,
    availableSeqNumbers,
    availableMaterialCodes,
    editedValues,
    setEditedValues
}) => {
    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const { deliveryItemsSortConfig, deliveryItemsFilters } = useSelector(
        (state) => state.inboundForm
    );

    return (
        <FormTable
            tableOrigin="inboundDeliveryItems"
            columns={inboundPalletsColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={(row) => row.id}
            sortConfig={deliveryItemsSortConfig}
            setSortConfig={setDeliveryItemsSortConfig}
            filters={deliveryItemsFilters}
            setFilters={setDeliveryItemsFilters}
        >
            {data.map((row, index) => (
                <TableBodyRow key={index}>
                    <TableBodyCell $isFirstChild>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.id] || false}
                            onChange={() =>
                                handleRowClick(row.id, setSelectedRows)
                            }
                        />
                    </TableBodyCell>
                    {row.isNew ? (
                        <TableBodyCell>
                            <TableSelect
                                id="seq_number"
                                value={row.seq_number}
                                handleChange={(val) => {
                                    fetchMaterialData({
                                        key: "seq_number",
                                        value: val,
                                        id: row.id,
                                        accessToken,
                                        dispatch,
                                        reducer: updateDeliveryItem
                                    })
                                }}
                                handleFocus={() => adjustColumnWidths("inboundDeliveryItems")}
                                options={availableSeqNumbers.map((seq) => ({
                                    label: seq,
                                    value: seq,
                                }))}
                            />
                        </TableBodyCell>
                    ) : (
                        <TableBodyCell>
                            {row.seq_number}
                        </TableBodyCell>
                    )}
                    {row.isNew ? (
                        <TableBodyCell>
                            <TableSelect
                                id="material_code"
                                value={row.material_code}
                                handleChange={(val) => {
                                    fetchMaterialData({
                                        key: "material_code",
                                        value: val,
                                        id: row.id,
                                        accessToken,
                                        dispatch,
                                        reducer: updateDeliveryItem
                                    })
                                }}
                                handleFocus={() => adjustColumnWidths("inboundDeliveryItems")}
                                options={availableMaterialCodes.map((material) => ({
                                    label: material,
                                    value: material,
                                }))}
                            />
                        </TableBodyCell>
                    ) : (
                        <TableBodyCell>
                            {row.material_code}
                        </TableBodyCell>
                    )}
                    <TableBodyCell>{row.name}</TableBodyCell>
                    <TableBodyCell>{row.type}</TableBodyCell>
                    {row.type !== "COIL" ? (
                        <TableBodyCell>
                            {row.batch}
                        </TableBodyCell>
                    ) : (
                        <TableBodyCell>
                            <CellInput
                                type="text"
                                value={editedValues[row.id]?.batch ?? row.batch}
                                handleFocus={() =>
                                    handleFocus("batch", row.batch, setEditedValues, row.id)
                                }
                                handleChange={(val) =>
                                    handleChange("batch", val, setEditedValues, row.id)
                                }
                                handleBlur={(val) =>
                                    handleBlur(dispatch, updateDeliveryItemField, row.id, "batch", val, setEditedValues)
                                }
                            />
                        </TableBodyCell>
                    )}
                    <TableBodyCell>
                        <CellInput
                            type="number"
                            value={editedValues[row.id]?.quantity ?? row.quantity}
                            handleFocus={() =>
                                handleFocus("quantity", row.quantity, setEditedValues, row.id)
                            }
                            handleChange={(val) =>
                                handleChange("quantity", val, setEditedValues, row.id)
                            }
                            handleBlur={(val) =>
                                handleBlur(dispatch, updateDeliveryItemField, row.id, "quantity", val, setEditedValues, "number")
                            }
                        />
                    </TableBodyCell>
                    <TableBodyCell>{row.unit}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}