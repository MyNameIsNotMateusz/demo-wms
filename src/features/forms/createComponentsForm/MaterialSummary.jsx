import { Summary } from "../../../components/ui";

export const MaterialSummary = ({ materialData, materialCode }) => {
    if (
        materialData.destination === null ||
        materialData.is_simplified === null ||
        !materialCode
    ) {
        return null;
    }

    return (
        <>
            <Summary
                label="Destination"
                value={
                    materialData.destination
                        ? materialData.destination.toUpperCase() === "SERVICE"
                            ? "WAREHOUSE"
                            : materialData.destination.toUpperCase()
                        : "NO DATA"
                }
            />

            <Summary
                label="Label"
                value={materialData.is_simplified ? "NO" : "YES"}
            />
        </>
    )
}