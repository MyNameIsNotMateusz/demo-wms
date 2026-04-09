import { FormTable } from "../../../components/layout";
import { projectColumns } from "./projectManagementTableConfig";
import { setProjectSortConfig, setProjectFilters } from "./projectManagementFormSlice";
import { useSelector } from "react-redux";
import {
    TableBodyCell,
    TableBodyRow,
} from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";

export const ProjectTable = ({
    data,
    selectedRows,
    setSelectedRows,
    isProjectFormVisible
}) => {
    const { projectSortConfig, projectFilters } = useSelector(
        (state) => state.projectManagementForm,
    );

    return (
        <FormTable
            tableOrigin="project"
            columns={projectColumns}
            sortConfig={projectSortConfig}
            setSortConfig={setProjectSortConfig}
            filters={projectFilters}
            setFilters={setProjectFilters}
            showSelectAll={false}
        >
            {data.map((row, index) => (
                <TableBodyRow
                    key={index}
                    onClick={(e) => {
                        if (e.target.tagName.toLowerCase() === "input" || isProjectFormVisible) return;
                        handleRowClick(row.code, setSelectedRows, false);
                    }}
                >
                    <TableBodyCell>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.code] || false}
                            onChange={() => {
                                if (isProjectFormVisible) return;
                                handleRowClick(row.code, setSelectedRows, false);
                            }}
                        />
                    </TableBodyCell>

                    <TableBodyCell>{row.code}</TableBodyCell>
                    <TableBodyCell>{row.name}</TableBodyCell>
                    <TableBodyCell>{row.type}</TableBodyCell>
                    <TableBodyCell>
                        {row.is_active === true ? "Active" : "Inactive"}
                    </TableBodyCell>
                    <TableBodyCell>{row.start_date}</TableBodyCell>
                    <TableBodyCell>{row.end_date}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    );
};
