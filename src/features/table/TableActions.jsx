import { ControlsWrapper, ButtonsWrapper, Button } from "./TableActions.styles";
import { exportTableData } from "../../utils/table/exportTableData";
import { refreshTableData } from "../../utils/table/refreshTableData";
import { useAuth } from "../../auth/AuthProvider";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunks } from "../../store/thunks";

import { selectLogisticsStock } from "../logisticsStock/logisticsStockSelector";

export const TableActions = () => {
  const { accessToken } = useAuth();
  const { fetchLogisticsStock } = thunks;

  const dispatch = useDispatch();

  const location = useLocation();
  const logisticsData = useSelector(selectLogisticsStock);
  const logisticsTitles = useSelector((state) => state.logisticsStock.columns);

  const handleExport = () => {
    if (location.pathname === "/logisticsStock") {
      exportTableData(logisticsData, logisticsTitles);
    }
  };

  const handleRefresh = () => {
    if (location.pathname === "/logisticsStock") {
      refreshTableData(dispatch, fetchLogisticsStock, accessToken);
    }
  };

  return (
    <ControlsWrapper>
      <ButtonsWrapper>
        <Button onClick={handleExport}>Export</Button>
        <Button onClick={handleRefresh}>Refresh</Button>
      </ButtonsWrapper>
    </ControlsWrapper>
  );
};
