import { useDispatch, useSelector } from "react-redux"
import { FormTable } from "../../../components/layout"
import { inboundPalletsColumns } from "./inboundTableConfig"
import { setManualSortConfig, setManualFilters, updateManualPalletField, updateManualPallet } from "./inboundFormSlice";
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";
import { CellInput } from "../../../components/ui";
import { handleBlur, handleChange, handleFocus } from "../../../utils/table/cellHandlers";
import { fetchMaterialData } from "./api/fetchMaterialData";
import { useAuth } from "../../../auth/AuthProvider";

export const ManualPalletsTable = ({
    data,
    selectedRows,
    setSelectedRows,
    editedValues,
    setEditedValues,
}) => {
    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const { manualPalletsSortConfig, manualPalletsFilters } = useSelector((state) => state.inboundForm);

    return (
        <FormTable
            tableOrigin="manualPallets"
            columns={inboundPalletsColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={(row) => row.id}
            sortConfig={manualPalletsSortConfig}
            setSortConfig={setManualSortConfig}
            filters={manualPalletsFilters}
            setFilters={setManualFilters}
        >
            {data.map((row, index) => (
                <TableBodyRow key={index}>
                    <TableBodyCell $isFirstChild>
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
                            handleFocus={() =>
                                handleFocus("seq_number", row.seq_number, setEditedValues, row.id)
                            }
                            handleChange={(val) => {
                                handleChange("seq_number", val, setEditedValues, row.id);

                                fetchMaterialData({
                                    key: "seq_number",
                                    value: val,
                                    id: row.id,
                                    accessToken,
                                    dispatch,
                                    reducer: updateManualPallet,
                                });
                            }}
                            handleBlur={(val) =>
                                handleBlur(dispatch, updateManualPalletField, row.id, "seq_number", val, setEditedValues)
                            }
                        />
                    </TableBodyCell>
                    <TableBodyCell>
                        <CellInput
                            type="text"
                            value={editedValues[row.id]?.material_code ?? row.material_code}
                            handleFocus={() =>
                                handleFocus("material_code", row.material_code, setEditedValues, row.id)
                            }
                            handleChange={(val) => {
                                handleChange("material_code", val, setEditedValues, row.id);

                                fetchMaterialData({
                                    key: "material_code",
                                    value: val,
                                    id: row.id,
                                    accessToken,
                                    dispatch,
                                    reducer: updateManualPallet,
                                });
                            }}
                            handleBlur={(val) =>
                                handleBlur(dispatch, updateManualPalletField, row.id, "material_code", val, setEditedValues)
                            }
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
                                    handleBlur(dispatch, updateManualPalletField, row.id, "batch", val, setEditedValues)
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
                                handleBlur(dispatch, updateManualPalletField, row.id, "quantity", val, setEditedValues, "number")
                            }
                        />
                    </TableBodyCell>
                    <TableBodyCell>{row.unit}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}