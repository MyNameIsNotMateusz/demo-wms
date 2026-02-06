import { ControlsWrapper, ButtonsWrapper, Button } from "./TableActions.styles";
import { exportTableData } from "../../utils/table/exportTableData";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLogisticsStock } from "../logisticsStock/logisticsStockSelector";

export const TableActions = () => {
  const location = useLocation();
  const logisticsData = useSelector(selectLogisticsStock);
  const logisticsTitles = useSelector((state) => state.logisticsStock.columns);

  const handleExport = () => {
    if (location.pathname === "/logisticsStock") {
      exportTableData(logisticsData, logisticsTitles);
    }
  };

  return (
    <ControlsWrapper>
      <ButtonsWrapper>
        <Button onClick={handleExport}>Export</Button>
        <Button>Refresh</Button>
      </ButtonsWrapper>
    </ControlsWrapper>
  );
};
