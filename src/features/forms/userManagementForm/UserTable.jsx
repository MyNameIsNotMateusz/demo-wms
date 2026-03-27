import { FormTable } from "../../../components/layout";
import { userColumns } from "./userManagementTableConfig";
import { setUserFilters, setUserSortConfig } from "./userManagementFormSlice";
import { useSelector } from "react-redux";
import {
    TableBodyCell,
    TableBodyRow,
} from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";

export const UserTable = ({
    data,
    selectedRows,
    setSelectedRows,
    isUserFormVisible
}) => {
    const { userSortConfig, userFilters } = useSelector(
        (state) => state.userManagementForm,
    );

    return (
        <FormTable
            tableOrigin="user"
            columns={userColumns}
            sortConfig={userSortConfig}
            setSortConfig={setUserSortConfig}
            filters={userFilters}
            setFilters={setUserFilters}
            showSelectAll={false}
        >
            {data.map((row, index) => (
                <TableBodyRow
                    key={index}
                    onClick={(e) => {
                        if (e.target.tagName.toLowerCase() === "input" || isUserFormVisible) return;
                        handleRowClick(row.email, setSelectedRows, false);
                    }}
                >
                    <TableBodyCell>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.email] || false}
                            onChange={() => {
                                if (isUserFormVisible) return;
                                handleRowClick(row.email, setSelectedRows, false);
                            }}
                        />
                    </TableBodyCell>

                    <TableBodyCell>{row.name}</TableBodyCell>
                    <TableBodyCell>{row.email}</TableBodyCell>
                    <TableBodyCell>{row.position}</TableBodyCell>
                    <TableBodyCell>{row.role}</TableBodyCell>
                    <TableBodyCell>
                        {row.is_active === true ? "Active" : "Inactive"}
                    </TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    );
};
