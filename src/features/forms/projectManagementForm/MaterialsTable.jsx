import { FormTable } from "../../../components/layout";
import { materialsColumns } from "./projectManagementTableConfig";
import { useSelector } from "react-redux";
import { setMaterialsSortConfig, setMaterialsFilters } from "./projectManagementFormSlice";
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";
import { adjustColumnWidths } from "../../../utils/table";
import { TableSelect } from "../../../components/ui/table/TableSelect";

export const MaterialsTable = ({ data, selectedRows, setSelectedRows, materials, handleUpdateMaterial }) => {

    const { materialsSortConfig, materialsFilters } = useSelector(
        (state) => state.projectManagementForm,
    );

    const getRowId = (row) => row.rowId || row.material_code;

    return (
        <FormTable
            tableOrigin="materials"
            columns={materialsColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={getRowId}
            sortConfig={materialsSortConfig}
            setSortConfig={setMaterialsSortConfig}
            filters={materialsFilters}
            setFilters={setMaterialsFilters}
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
                    <TableBodyCell>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows.hasOwnProperty(getRowId(row))}
                            onChange={() =>
                                handleRowClick(getRowId(row), setSelectedRows)
                            }
                        />
                    </TableBodyCell>
                    <TableBodyCell>{row.type}</TableBodyCell>
                    {row.isEditable ? (
                        <TableBodyCell>
                            <TableSelect
                                id="material_code"
                                value={row.material_code}
                                handleChange={(val) => {
                                    handleUpdateMaterial(row.rowId, "material_code", val);
                                }}
                                handleFocus={() => adjustColumnWidths("materials")}
                                options={materials.map((m) => ({
                                    label: m.code,
                                    value: m.code,
                                }))}
                            />
                        </TableBodyCell>
                    ) : (
                        <TableBodyCell>{row.material_code}</TableBodyCell>
                    )}
                    <TableBodyCell>{row.name}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}