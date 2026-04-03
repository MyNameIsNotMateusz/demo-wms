import { FormTable } from "../../../components/layout";
import { projectsColumns } from "./contractorManagementTableConfig";
import { setProjectsFilters, setProjectsSortConfig } from "./contractorManagementFormSlice";
import { useSelector } from "react-redux";
import {
    TableBodyCell,
    TableBodyRow,
} from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";
import { TableSelect } from "../../../components/ui/table/TableSelect";
import { adjustColumnWidths } from "../../../utils/table";

export const ProjectsTable = ({
    data,
    selectedRows,
    setSelectedRows,
    handleUpdateProject,
    projects
}) => {
    const { projectsSortConfig, projectsFilters } = useSelector(
        (state) => state.contractorManagementForm,
    );

    const getRowId = (row) => row.rowId || row.project_code;

    return (
        <FormTable
            tableOrigin="projects"
            columns={projectsColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={getRowId}
            sortConfig={projectsSortConfig}
            setSortConfig={setProjectsSortConfig}
            filters={projectsFilters}
            setFilters={setProjectsFilters}
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

                    {row.isEditable ? (
                        <TableBodyCell>
                            <TableSelect
                                id="project_code"
                                value={row.project_code}
                                handleChange={(val) => {
                                    handleUpdateProject(row.rowId, "project_code", val);
                                }}
                                handleFocus={() => adjustColumnWidths("projects")}
                                options={projects.map((p) => ({
                                    label: p.code,
                                    value: p.code,
                                }))}
                            />
                        </TableBodyCell>
                    ) : (
                        <TableBodyCell>{row.project_code}</TableBodyCell>
                    )}

                    <TableBodyCell>{row.name}</TableBodyCell>
                    <TableBodyCell>{row.type}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    );
};
