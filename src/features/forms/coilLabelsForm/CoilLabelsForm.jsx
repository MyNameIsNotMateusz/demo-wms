import { useDispatch, useSelector } from "react-redux";
import { FormLayout } from "../../../components/layout";
import { Form, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { CoilsTable } from "./CoilsTable";
import { selectCoils } from "./coilLabelsSelectors";
import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/AuthProvider";
import { fetchPrintedCoils } from "./coilLabelsFormSlice";
import { handleError } from "../../../utils/alerts";
import { printCoilLabels } from "../../../utils/pdf/coilLabels/printCoilLabels";
import { SubmitButton } from "../../../components/ui";
import { buildCoilLabelsData } from "./utils/buildCoilLabelsData";
import { usePagination } from "../../../hooks/usePagination";
import { TablePagination } from "../../../components/ui/table/TablePagination";
import { adjustColumnWidths } from "../../../utils/table";

export const CoilLabelsForm = ({ onClose }) => {

    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const displayedCoils = useSelector(selectCoils);
    const {
        currentData,
        page,
        pageSize,
        setPageSize,
        total,
        totalPages,
        safeStart,
        safeEnd,
        changePage,
    } = usePagination(
        displayedCoils,
        () => adjustColumnWidths("coils")
    );

    const { printedCoils } = useSelector((state) => state.coilLabelsForm);

    const [selectedCoils, setSelectedCoils] = useState({})
    const [labelsData, setLabelsData] =
        useState([]);

    useEffect(() => {
        dispatch(fetchPrintedCoils(accessToken));
    }, [dispatch])

    useEffect(() => {
        setLabelsData(buildCoilLabelsData(selectedCoils, printedCoils));
    }, [selectedCoils, printedCoils]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!labelsData.length) {
            handleError("No coils selected for printing!");
            return;
        }

        const formattedDate = new Date()
            .toLocaleString("sv-SE")
            .replace("T", " ")
            .slice(0, 16);

        const formattedLabelsData = labelsData.map((coil) => ({
            ...coil,
            printed_date: formattedDate,
        }));

        printCoilLabels(formattedLabelsData);
    };
    return (
        <FormLayout
            title="Coil Labels Form"
            onClose={onClose}
        >
            <Form>
                <FormTableWrapper>
                    <CoilsTable
                        data={currentData}
                        selectedRows={selectedCoils}
                        setSelectedRows={setSelectedCoils}
                    />
                </FormTableWrapper>
                <TablePagination
                    changePage={changePage}
                    safeStart={safeStart}
                    safeEnd={safeEnd}
                    total={total}
                    page={page}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
            </Form>
            <SubmitButton
                onClick={handleSubmit}
            />
        </FormLayout>
    )
};