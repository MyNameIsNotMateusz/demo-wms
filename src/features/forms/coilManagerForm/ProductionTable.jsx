import { useSelector } from "react-redux"
import { FormTable } from "../../../components/layout";
import { coilColumns } from "./coilManagerTableConfig";
import { setProductionSortConfig, setProductionFilters } from "./coilManagerFormSlice";
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";

export const ProductionTable = ({
    data,
    selectedRows,
    setSelectedRows,
}) => {
    const { productionCoilsSortConfig, productionCoilsFilters } = useSelector(
        (state) => state.coilManagerForm
    );

    return (
        <FormTable
            tableOrigin="productionCoils"
            columns={coilColumns}
            sortConfig={productionCoilsSortConfig}
            setSortConfig={setProductionSortConfig}
            filters={productionCoilsFilters}
            setFilters={productionCoilsFilters}
            showSelectAll={false}
        >
            {data.map((row, index) => (
                <TableBodyRow
                    key={index}
                    onClick={(e) => {
                        if (e.target.tagName.toLowerCase() === "input") return;
                        handleRowClick(row.coil_id, setSelectedRows, false);
                    }}
                >
                    <TableBodyCell $isFirstChild>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.coil_id] || false}
                            onChange={() => {
                                handleRowClick(row.coil_id, setSelectedRows, false);
                            }}
                        />
                    </TableBodyCell>
                    <TableBodyCell>{row.coil_id}</TableBodyCell>
                    <TableBodyCell>{row.line}</TableBodyCell>
                    <TableBodyCell>{row.material_code}</TableBodyCell>
                    <TableBodyCell>{row.thickness}</TableBodyCell>
                    <TableBodyCell>{row.width}</TableBodyCell>
                    <TableBodyCell>{row.metal_type}</TableBodyCell>
                    <TableBodyCell>{row.batch}</TableBodyCell>
                    <TableBodyCell>{row.weight}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}