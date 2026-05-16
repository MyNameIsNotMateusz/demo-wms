import { Summary } from "../../../components/ui"
import { SummaryWrapper } from "../../../components/ui/form/FormBase.styles"

export const ProductionSummary = ({ maxProducible, maxProducibleSelected }) => {
    return (
        <SummaryWrapper>
            <Summary
                label="Max producible (all options)"
                value={maxProducible}
            />
            <Summary
                label="Max producible (selected)"
                value={maxProducibleSelected}
            />
        </SummaryWrapper>
    )
}