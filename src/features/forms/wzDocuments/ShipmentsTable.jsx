import { FormTable } from "../../../components/layout";
import { shipmentsColumns } from "./wzDocumentsTableConfig";
import { setShipmentsSortConfig, setShipmentsFilters } from "./wzDocumentsFormSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    TableBodyCell,
    TableBodyRow,
} from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";

export const ShipmentsTable = ({
    data,
    selectedRows,
    setSelectedRows,
}) => {
    const { shipmentsSortConfig, shipmentsFilters } = useSelector(
        (state) => state.wzDocumentsForm,
    );

    return (
        <FormTable
            tableOrigin="shipments"
            columns={shipmentsColumns}
            sortConfig={shipmentsSortConfig}
            setSortConfig={setShipmentsSortConfig}
            filters={shipmentsFilters}
            setFilters={setShipmentsFilters}
            showSelectAll={false}
        >
            {data.map((row, index) => (
                <TableBodyRow
                    key={index}
                    onClick={(e) => {
                        if (e.target.tagName.toLowerCase() === "input") return;
                        handleRowClick(row.document_number, setSelectedRows, false);
                    }}
                >
                    <TableBodyCell $isFirstChild>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.document_number] || false}
                            onChange={() => {
                                handleRowClick(row.document_number, setSelectedRows, false);
                            }}
                        />
                    </TableBodyCell>

                    <TableBodyCell>{row.document_number}</TableBodyCell>
                    <TableBodyCell>{row.created_at}</TableBodyCell>

                </TableBodyRow>
            ))}
        </FormTable>
    );
};
