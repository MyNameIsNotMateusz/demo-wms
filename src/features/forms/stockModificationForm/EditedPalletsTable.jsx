import { useDispatch, useSelector } from "react-redux";
import { FormTable } from "../../../components/layout";
import { palletsColumns } from "./stockModificationTableConfig";
import {
    setEditedPalletsSortConfig,
    setEditedPalletsFilters,
    updateEditedPallet
} from "./stockModificationSlice";
import {
    TableBodyCell,
    TableBodyRow,
} from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";
import {
    handleFocus,
    handleChange,
    handleBlur,
} from "../../../utils/table/cellHandlers";
import { CellInput } from "../../../components/ui";
import { TableSelect } from "../../../components/ui/table/TableSelect";
import { adjustColumnWidths } from "../../../utils/table";

export const EditedPalletsTable = ({
    data,
    selectedRows,
    setSelectedRows,
    editedValues,
    setEditedValues
}) => {

    const dispatch = useDispatch();

    const { editedPalletsSortConfig, editedPalletsFilters } = useSelector(
        (state) => state.stockModificationForm,
    );

    const statuses = ["OK", "HOLD", "BLOCKED"];

    return (
        <FormTable
            tableOrigin="editedPallets"
            columns={palletsColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={(row) => row.id}
            sortConfig={editedPalletsSortConfig}
            setSortConfig={setEditedPalletsSortConfig}
            filters={editedPalletsFilters}
            setFilters={setEditedPalletsFilters}
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
                        handleRowClick(row.id, setSelectedRows);
                    }}
                >
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
                    <TableBodyCell>{row.id}</TableBodyCell>
                    <TableBodyCell>{row.material_code}</TableBodyCell>
                    <TableBodyCell>{row.material_type}</TableBodyCell>
                    <TableBodyCell>{row.destination}</TableBodyCell>
                    <TableBodyCell>
                        <CellInput
                            type="number"
                            value={
                                editedValues[row.id]?.quantity ??
                                parseFloat(row.quantity).toFixed(0)
                            }
                            handleFocus={(val) =>
                                handleFocus(
                                    "quantity",
                                    val,
                                    setEditedValues,
                                    row.id
                                )
                            }
                            handleChange={(val) =>
                                handleChange(
                                    "quantity",
                                    val,
                                    setEditedValues,
                                    row.id
                                )
                            }
                            handleBlur={(val) =>
                                handleBlur(
                                    dispatch,
                                    updateEditedPallet,
                                    row.id,
                                    "quantity",
                                    val,
                                    setEditedValues,
                                    "number"
                                )
                            }
                        />
                    </TableBodyCell>
                    <TableBodyCell>
                        <TableSelect
                            id="status"
                            value={row.status}
                            handleChange={(val) =>
                                dispatch(updateEditedPallet({ id: row.id, key: "status", value: val }))
                            }
                            handleFocus={() => adjustColumnWidths("editedPallets")}
                            options={statuses.map((status) => ({
                                label: status,
                                value: status,
                            }))}
                        />
                    </TableBodyCell>
                    <TableBodyCell>{row.created_at}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    );
};
