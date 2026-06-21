import { ReadonlyFormTable } from "../../../components/layout/ReadonlyFormTable"
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles"
import { summaryColumns } from "./outboundTableConfig"

export const SummaryTable = ({ data }) => {
    return (
        <ReadonlyFormTable
            columns={summaryColumns}
        >
            {data.map((row, index) => (
                <TableBodyRow key={index}>
                    <TableBodyCell>
                        {row.material_code}
                    </TableBodyCell>
                    <TableBodyCell>
                        {row.count}
                    </TableBodyCell>
                    <TableBodyCell>
                        {row.total_quantity}
                    </TableBodyCell>
                </TableBodyRow>
            ))}
        </ReadonlyFormTable>
    )
}