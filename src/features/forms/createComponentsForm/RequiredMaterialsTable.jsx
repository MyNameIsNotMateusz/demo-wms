import { FormTable } from "../../../components/layout"
import { requiredMaterialsColumns } from "./createComponentsTableConfig"
import { setRequiredMaterialsSortConfig, setRequiredMaterialsFilters, updateRequiredMaterialOption } from "./createComponentsFormSlice";
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles";
import { useDispatch, useSelector } from "react-redux";
import { TableSelect } from "../../../components/ui/table/TableSelect";
import { adjustColumnWidths } from "../../../utils/table";

export const RequiredMaterialsTable = ({ data }) => {
    const dispatch = useDispatch();

    const { requiredMaterialsSortConfig, requiredMaterialsFilters } = useSelector(
        (state) => state.createComponentsForm,
    );

    return (
        <FormTable
            tableOrigin="requiredMaterials"
            columns={requiredMaterialsColumns}
            sortConfig={requiredMaterialsSortConfig}
            setSortConfig={setRequiredMaterialsSortConfig}
            filters={requiredMaterialsFilters}
            setFilters={setRequiredMaterialsFilters}
            showSelectAll={false}
        >
            {data.map((row, index) => (
                <TableBodyRow key={index}>
                    <TableBodyCell>{index + 1}</TableBodyCell>
                    <TableBodyCell>
                        {row.options ? (
                            <TableSelect
                                id="material_code"
                                value={row.material_code}
                                handleChange={(val) =>
                                    dispatch(updateRequiredMaterialOption({ currentMaterialCode: row.material_code, newMaterialCode: val }))
                                }
                                handleFocus={() => adjustColumnWidths("requiredMaterials")}
                                options={row.options.map((o) => ({
                                    label: o.material_code,
                                    value: o.material_code,
                                }))}
                            />
                        ) : (
                            row.material_code
                        )}
                    </TableBodyCell>

                    <TableBodyCell>{row.quantity}</TableBodyCell>
                    <TableBodyCell>{row.availableQuantity}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}