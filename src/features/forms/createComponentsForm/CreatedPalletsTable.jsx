import { FormTable } from "../../../components/layout"
import { createdPalletsColumns } from "./createComponentsTableConfig"
import { useDispatch, useSelector } from "react-redux";
import { setCreatedPalletsSortConfig, setCreatedPalletsFilters, updateCreatedPalletField } from "./createComponentsFormSlice";
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";
import { CellInput } from "../../../components/ui";
import {
    handleFocus,
    handleChange,
    handleBlur,
} from "../../../utils/table/cellHandlers";
import { TableSelect } from "../../../components/ui/table/TableSelect";
import { adjustColumnWidths } from "../../../utils/table";

export const CreatedPalletsTable = ({
    data,
    selectedRows,
    setSelectedRows,
    editedValues,
    setEditedValues
}) => {

    const dispatch = useDispatch();

    const { createdPalletsSortConfig, createdPalletsFilters } = useSelector(
        (state) => state.createComponentsForm,
    );

    const statuses = ["OK", "HOLD", "SCRAP"];

    return (
        <FormTable
            tableOrigin="createdPallets"
            columns={createdPalletsColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={(row) => row.id}
            sortConfig={createdPalletsSortConfig}
            setSortConfig={setCreatedPalletsSortConfig}
            filters={createdPalletsFilters}
            setFilters={setCreatedPalletsFilters}
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
                    <TableBodyCell>
                        <CellInput
                            type="number"
                            value={
                                editedValues[row.id]?.quantity ?? row.quantity
                            }
                            handleFocus={(val) => {
                                handleFocus(
                                    "quantity",
                                    row.quantity,
                                    setEditedValues,
                                    row.id,
                                );
                            }}
                            handleChange={(val) => {
                                handleChange("quantity", val, setEditedValues, row.id);
                            }}
                            handleBlur={(val) => {
                                handleBlur(
                                    dispatch,
                                    updateCreatedPalletField,
                                    row.id,
                                    "quantity",
                                    val,
                                    setEditedValues,
                                    "number",
                                );
                            }}
                        />
                    </TableBodyCell>
                    <TableBodyCell>
                        <TableSelect
                            id="status"
                            value={row.status}
                            handleChange={(val) => {
                                dispatch(updateCreatedPalletField({ id: row.id, key: "status", value: val }));
                            }}
                            handleFocus={() => adjustColumnWidths("createdPallets")}
                            options={statuses.map((status) => ({
                                label: status,
                                value: status,
                            }))}
                        />
                    </TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}