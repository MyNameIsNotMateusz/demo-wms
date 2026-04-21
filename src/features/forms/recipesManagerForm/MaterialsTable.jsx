import { FormTable } from "../../../components/layout"
import { recipeMaterialsColumns } from "./recipesManagerTableConfig"
import { useDispatch, useSelector } from "react-redux"
import { setRecipeMaterialsSortConfig, setRecipeMaterialsFilters, updateRecipeMaterial, updateRecipeQuantity } from "./recipesManagerFormSlice"
import { TableBodyRow, TableBodyCell } from "../../../components/ui/table/TableBase.styles"
import { handleRowClick } from "../../../utils/table/tableRowSelection";
import { TableSelect } from "../../../components/ui/table/TableSelect";
import { adjustColumnWidths } from "../../../utils/table";
import { CellInput } from "../../../components/ui"
import { handleFocus, handleChange, handleBlur } from "../../../utils/table/cellHandlers"

export const MaterialsTable = ({
    data,
    selectedRows,
    setSelectedRows,
    availableMaterialCodes,
    materials,
    selectedProcess,
    editedValues,
    setEditedValues
}) => {

    const dispatch = useDispatch();

    const { recipeMaterialsSortConfig, recipeMaterialsFilters } = useSelector(
        (state) => state.recipesManagerForm,
    );

    return (
        <FormTable
            tableOrigin="recipeMaterials"
            columns={recipeMaterialsColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={(row) => row.material_code}
            sortConfig={recipeMaterialsSortConfig}
            setSortConfig={setRecipeMaterialsSortConfig}
            filters={recipeMaterialsFilters}
            setFilters={setRecipeMaterialsFilters}
        >

            {data.map((row, index) => (
                <TableBodyRow
                    key={index}
                >
                    <TableBodyCell>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.material_code] || false}
                            onChange={() =>
                                handleRowClick(row.material_code, setSelectedRows)
                            }
                        />
                    </TableBodyCell>
                    <TableBodyCell>
                        <TableSelect
                            id="material_code"
                            value={row.material_code}
                            handleChange={(val) => {
                                dispatch(
                                    updateRecipeMaterial({
                                        id: row.material_code,
                                        key: "material_code",
                                        value: val,
                                        materials,
                                        selectedProcess
                                    })
                                );
                            }}
                            handleFocus={() => adjustColumnWidths("recipeMaterials")}
                            options={[
                                ...(row.material_code !== ""
                                    ? [{ label: row.material_code, value: row.material_code }]
                                    : []),
                                ...availableMaterialCodes.map((code) => ({
                                    label: code.material_code,
                                    value: code.material_code,
                                })),
                            ]}
                        />
                    </TableBodyCell>
                    <TableBodyCell>
                        <CellInput
                            type="number"
                            value={
                                editedValues[row.material_code]?.quantity ?? row.quantity
                            }
                            handleFocus={(val) => {
                                handleFocus(
                                    "quantity",
                                    row.quantity,
                                    setEditedValues,
                                    row.material_code,
                                );
                            }}
                            handleChange={(val) => {
                                handleChange("quantity", val, setEditedValues, row.material_code);
                            }}
                            handleBlur={(val) => {
                                handleBlur(
                                    dispatch,
                                    (payload) =>
                                        updateRecipeQuantity({
                                            ...payload,
                                            selectedProcess,
                                        }),
                                    row.material_code,
                                    "quantity",
                                    val,
                                    setEditedValues,
                                    "number",
                                );
                            }}
                        />
                    </TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}