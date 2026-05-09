import {
    StyledFormTable,
    TableHeader,
    TableHeaderRow,
    TableHeaderCell,
    TableBody,
} from "./ReadonlyFormTable.styles"

export const ReadonlyFormTable = ({
    columns,
    children
}) => {

    return (
        <StyledFormTable>
            <TableHeader>
                <TableHeaderRow>
                    {columns.map((title, index) => (
                        <TableHeaderCell>
                            {title}
                        </TableHeaderCell>
                    ))}
                </TableHeaderRow>
            </TableHeader>
            <TableBody>
                {children}
            </TableBody>
        </StyledFormTable>
    )
}