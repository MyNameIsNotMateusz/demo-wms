import { useDispatch, useSelector } from "react-redux";
import { FormTable } from "../../../components/layout"
import { addedPalletColumns } from "./stockModificationTableConfig"
import { setAddedPalletsSortConfig, setAddedPalletsFilters, updateAddedPallet } from "./stockModificationSlice";
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";
import { TableSelect } from "../../../components/ui/table/TableSelect";
import { adjustColumnWidths } from "../../../utils/table";
import {
    handleFocus,
    handleChange,
    handleBlur,
} from "../../../utils/table/cellHandlers";
import { CellInput } from "../../../components/ui";

export const AddedPalletsTable = ({
    data,
    selectedRows,
    setSelectedRows,
    handleClientChange,
    handleProjectChange,
    editedValues,
    setEditedValues
}) => {
    const dispatch = useDispatch();

    const { addedPalletsSortConfig, addedPalletsFilters, clients, projects, materialCodes } = useSelector(
        (state) => state.stockModificationForm,
    );

    const statuses = ["OK", "HOLD", "BLOCKED", "AT SERVICE"];

    return (
        <FormTable
            tableOrigin="addedPallets"
            columns={addedPalletColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={(row) => row.unique_id}
            sortConfig={addedPalletsSortConfig}
            setSortConfig={setAddedPalletsSortConfig}
            filters={addedPalletsFilters}
            setFilters={setAddedPalletsFilters}
        >
            {data.map((row, index) => (
                <TableBodyRow key={index}>
                    <TableBodyCell $isFirstChild>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.unique_id] || false}
                            onChange={() =>
                                handleRowClick(row.unique_id, setSelectedRows)
                            }
                        />
                    </TableBodyCell>
                    <TableBodyCell>
                        <TableSelect
                            id="client"
                            value={row.client}
                            handleChange={(val) =>
                                handleClientChange(
                                    row,
                                    val,
                                )
                            }
                            handleFocus={() =>
                                adjustColumnWidths(
                                    "addedPallets"
                                )
                            }
                            options={clients.map((c) => ({
                                label: c.name,
                                value: c.name,
                            }))}
                        />
                    </TableBodyCell>
                    <TableBodyCell>
                        <TableSelect
                            id="project"
                            value={row.project}
                            handleChange={(val) =>
                                handleProjectChange(
                                    row,
                                    val,
                                )
                            }
                            handleFocus={() =>
                                adjustColumnWidths(
                                    "addedPallets"
                                )
                            }
                            options={[
                                {
                                    label: "Select a project",
                                    value: "",
                                },
                                ...(projects[
                                    row.unique_id
                                ] || []).map((project) => ({
                                    label: project.name,
                                    value: project.name,
                                })),
                            ]}
                        />
                    </TableBodyCell>
                    <TableBodyCell>
                        <CellInput
                            type="text"
                            value={
                                editedValues[row.unique_id]?.pallet_id ??
                                row.pallet_id
                            }
                            handleFocus={(val) =>
                                handleFocus(
                                    "pallet_id",
                                    val,
                                    setEditedValues,
                                    row.unique_id,
                                )
                            }
                            handleChange={(val) =>
                                handleChange(
                                    "pallet_id",
                                    val,
                                    setEditedValues,
                                    row.unique_id,
                                )
                            }
                            handleBlur={(val) =>
                                handleBlur(
                                    dispatch,
                                    updateAddedPallet,
                                    row.unique_id,
                                    "pallet_id",
                                    val,
                                    setEditedValues,
                                )
                            }
                        />
                    </TableBodyCell>
                    <TableBodyCell>
                        <TableSelect
                            id="material_code"
                            value={row.material_code}
                            handleChange={(val) =>
                                dispatch(
                                    updateAddedPallet({
                                        id: row.unique_id,
                                        key: "material_code",
                                        value: val,
                                    })
                                )
                            }
                            handleFocus={() =>
                                adjustColumnWidths(
                                    "addedPallets"
                                )
                            }
                            options={[
                                {
                                    label: "Select a material code",
                                    value: "",
                                },
                                ...(materialCodes[
                                    row.unique_id
                                ] || []).map((code) => ({
                                    label: code,
                                    value: code,
                                })),
                            ]}
                        />
                    </TableBodyCell>
                    <TableBodyCell>
                        <TableSelect
                            id="status"
                            value={row.status}
                            handleChange={(val) =>
                                dispatch(
                                    updateAddedPallet({
                                        id: row.unique_id,
                                        key: "status",
                                        value: val,
                                    })
                                )
                            }
                            handleFocus={() =>
                                adjustColumnWidths(
                                    "addedPallets"
                                )
                            }
                            options={statuses.map((status) => ({
                                label: status,
                                value: status,
                            }))}
                        />
                    </TableBodyCell>
                    <TableBodyCell>
                        <CellInput
                            type="number"
                            value={
                                editedValues[row.unique_id]?.quantity ??
                                row.quantity
                            }
                            handleFocus={(val) =>
                                handleFocus(
                                    "quantity",
                                    val,
                                    setEditedValues,
                                    row.unique_id,
                                )
                            }
                            handleChange={(val) =>
                                handleChange(
                                    "quantity",
                                    val,
                                    setEditedValues,
                                    row.unique_id,
                                )
                            }
                            handleBlur={(val) =>
                                handleBlur(
                                    dispatch,
                                    updateAddedPallet,
                                    row.unique_id,
                                    "quantity",
                                    val,
                                    setEditedValues,
                                    "number",
                                )
                            }
                        />
                    </TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}