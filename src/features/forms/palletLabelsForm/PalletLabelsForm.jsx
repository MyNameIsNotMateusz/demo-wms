import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../auth/AuthProvider"
import { selectPallets } from "./palletLabelsSelectors";
import { useEffect, useState } from "react";
import { fetchPallets } from "./palletLabelsFormSlice";
import { FormLayout } from "../../../components/layout";
import { Form, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { PalletLabelsTable } from "./PalletLabelsTable";
import { handleError } from "../../../utils/alerts";
import { printPalletLabels } from "../../../utils/pdf/palletLabels/printPalletLabels";
import { SubmitButton } from "../../../components/ui";
import { buildPalletLabelsData } from "./utils/buildPalletLabelsData";
import { usePagination } from "../../../hooks/usePagination";
import { adjustColumnWidths } from "../../../utils/table";
import { TablePagination } from "../../../components/ui/table/TablePagination";

export const PalletLabelsForm = ({ onClose }) => {

    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const displayedPallets = useSelector(selectPallets);
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
        displayedPallets,
        () => adjustColumnWidths("palletLabels")
    );

    const { pallets } = useSelector(
        (state) => state.palletLabelsForm
    );

    const [selectedPallets, setSelectedPallets] = useState({});
    const [labelData, setLabelData] = useState([]);

    useEffect(() => {
        dispatch(fetchPallets(accessToken));
    }, [dispatch]);

    useEffect(() => {
        setLabelData(buildPalletLabelsData(selectedPallets, pallets));
    }, [selectedPallets, pallets]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!labelData.length) {
            handleError("No labels selected for printing!");
            return;
        }

        printPalletLabels(labelData);
    };

    return (
        <FormLayout
            title="Pallet Labels Form"
            onClose={onClose}
        >
            <Form>
                <FormTableWrapper>
                    <PalletLabelsTable
                        data={currentData}
                        selectedRows={selectedPallets}
                        setSelectedRows={setSelectedPallets}
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
}