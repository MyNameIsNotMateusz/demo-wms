import { useDispatch, useSelector } from "react-redux";
import { FormLayout } from "../../../components/layout";
import { Form, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { CoilsTable } from "./CoilsTable";
import { selectCoils } from "./coilLabelsSelectors";
import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/AuthProvider";
import { fetchPrintedCoils } from "./coilLabelsFormSlice";
import { handleError } from "../../../utils/alerts";
import { printCoilLabels } from "./pdf/printCoilLabels";
import { SubmitButton } from "../../../components/ui";

export const CoilLabelsForm = ({ onClose }) => {

    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const displayedCoils = useSelector(selectCoils);

    const { printedCoils } = useSelector((state) => state.coilLabelsForm);

    const [selectedCoils, setSelectedCoils] = useState({})
    const [labelsData, setLabelsData] =
        useState([]);

    useEffect(() => {
        dispatch(fetchPrintedCoils(accessToken));
    }, [dispatch])

    useEffect(() => {
        if (Object.keys(selectedCoils).length === 0 || printedCoils.length === 0) {
            return;
        }

        const selectedIds = Object.keys(selectedCoils);

        const filtered = printedCoils.filter((coil) =>
            selectedIds.includes(coil.coil_id)
        );

        const formatted = filtered.map((coil) => ({
            coil_id: coil.coil_id ?? "",
            material_code: coil.material_code ?? "",
            metal_type: coil.metal_type ?? "",
            batch: coil.batch ?? "",
            width: coil.width ?? null,
            thickness: coil.thickness ?? null,
            weight: coil.weight
                ? Number(coil.weight).toLocaleString("de-DE", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                })
                : null,
            unit: coil.unit,
            printed_date: null,
        }));

        setLabelsData(formatted);

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
                        data={displayedCoils}
                        selectedRows={selectedCoils}
                        setSelectedRows={setSelectedCoils}
                    />
                </FormTableWrapper>
            </Form>
            <SubmitButton
                onClick={handleSubmit}
            />
        </FormLayout>
    )
};