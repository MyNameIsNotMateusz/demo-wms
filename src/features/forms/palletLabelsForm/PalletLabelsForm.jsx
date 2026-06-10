import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../auth/AuthProvider"
import { selectPallets } from "./palletLabelsSelectors";
import { useEffect, useState } from "react";
import { fetchPallets } from "./palletLabelsFormSlice";
import { FormLayout } from "../../../components/layout";
import { Form, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { PalletLabelsTable } from "./PalletLabelsTable";
import { handleError } from "../../../utils/alerts";
import { printPalletLabels } from "./pdf/printPalletLabels";
import { SubmitButton } from "../../../components/ui";

export const PalletLabelsForm = ({ onClose }) => {

    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const displayedPallets = useSelector(selectPallets);

    const { pallets } = useSelector((state) => state.palletLabelsForm);

    const [selectedPallets, setSelectedPallets] = useState({});
    const [labelData, setLabelData] = useState([]);

    useEffect(() => {
        dispatch(fetchPallets(accessToken));
    }, [dispatch]);

    useEffect(() => {
        if (Object.keys(selectedPallets).length === 0 || pallets.length === 0) {
            return;
        }

        const selectedIds = Object.keys(selectedPallets);

        const filtered = pallets.filter((pallet) =>
            selectedIds.includes(pallet.pallet_id),
        );

        const formatted = filtered.map((pallet) => ({
            id: pallet.pallet_id ?? "",
            material_code: pallet.material_code ?? "",
            sequenceNumber: pallet.material_seq_number ?? "",
            quantity: pallet.quantity ? parseFloat(pallet.quantity) : 0,
        }));

        setLabelData(formatted);
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
                        data={displayedPallets}
                        selectedRows={selectedPallets}
                        setSelectedRows={setSelectedPallets}
                    />
                </FormTableWrapper>
            </Form>
            <SubmitButton
                onClick={handleSubmit}
            />
        </FormLayout>
    )
}