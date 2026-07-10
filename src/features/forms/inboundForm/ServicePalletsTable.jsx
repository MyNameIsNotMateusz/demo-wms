import { useDispatch, useSelector } from "react-redux"
import { FormTable } from "../../../components/layout"
import { updateServicePallet, setServiceSortConfig, setServiceFilters, updateServiceItemField } from "./inboundFormSlice"
import { inboundPalletsColumns } from "./inboundTableConfig"
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles"
import { TableSelect } from "../../../components/ui/table/TableSelect"
import { fetchMaterialData } from "./api/fetchMaterialData"
import { useAuth } from "../../../auth/AuthProvider"
import { adjustColumnWidths } from "../../../utils/table"
import { handleBlur, handleChange, handleFocus } from "../../../utils/table/cellHandlers"
import { CellInput } from "../../../components/ui"
import { handleRowClick } from "../../../utils/table/tableRowSelection"

export const ServicePalletsTable = ({
    data,
    selectedRows,
    setSelectedRows,
    availableMaterialCodes,
    editedValues,
    setEditedValues
}) => {

    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const { serviceItemsSortConfig, deliveryItemsFilters } = useSelector(
        (state) => state.inboundForm
    )

    return (
        <FormTable
            tableOrigin="servicePallets"
            columns={inboundPalletsColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={(row) => row.id}
            sortConfig={serviceItemsSortConfig}
            setSortConfig={setServiceSortConfig}
            filters={deliveryItemsFilters}
            setFilters={setServiceFilters}
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
                    <TableBodyCell>
                        {row.seq_number}
                    </TableBodyCell>
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
                                    reducer: updateServicePallet
                                })
                            }}
                            handleFocus={() => adjustColumnWidths("servicePallets")}
                            options={availableMaterialCodes.map((material) => ({
                                label: material,
                                value: material,
                            }))}
                        />
                    </TableBodyCell>
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
                                    handleBlur(dispatch, updateServiceItemField, row.id, "batch", val, setEditedValues)
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
                                handleBlur(dispatch, updateServiceItemField, row.id, "quantity", val, setEditedValues, "number")
                            }
                        />
                    </TableBodyCell>
                    <TableBodyCell>{row.unit}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}