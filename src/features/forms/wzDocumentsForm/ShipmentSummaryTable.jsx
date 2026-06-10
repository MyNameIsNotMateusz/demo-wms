import { shipmentSummaryColumns } from "./wzDocumentsTableConfig"
import { ReadonlyFormTable } from "../../../components/layout/ReadonlyFormTable"
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles"

export const ShipmentSummaryTable = ({ data }) => {

    return (
        <ReadonlyFormTable
            columns={shipmentSummaryColumns}
        >
            {(data || []).map((row, index) => (
                <TableBodyRow key={index}>
                    <TableBodyCell>{row.material_name}</TableBodyCell>
                    <TableBodyCell>{row.material_code}</TableBodyCell>
                    <TableBodyCell>{row.quantity}</TableBodyCell>
                </TableBodyRow>
            ))}
        </ReadonlyFormTable>
    )
}