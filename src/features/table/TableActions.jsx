import { ControlsWrapper, ButtonsWrapper, Button } from "./TableActions.styles";
import { exportTableData } from "../../utils/table/exportTableData";
import { refreshTableData } from "../../utils/table/refreshTableData";
import { useAuth } from "../../auth/AuthProvider";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { tableThunks } from "../../store/thunks/tableThunks";
import { selectors } from "../../store/selectors";
import { productionStockColumns } from "../tables/productionStock/productionStockColumns";
import { logisticsStockColumns } from "../tables/logisticsStock/logisticsStockColumns";
import { serviceStockColumns } from "../tables/serviceStock/serviceStockColumns";
import { coilStockColumns } from "../tables/coilStock/coilStockColumns";
import { ckdStockColumns } from "../tables/ckdStock/ckdStockColumns";
import { productionTransactionsColumns } from "../tables/productionTransactions/productionTransactionsColumns";
import { logisticsTransactionsColumns } from "../tables/logisticsTransactions/logisticsTransactionsColumns";
import { coilTransactionsColumns } from "../tables/coilTransactions/coilTransactionsColumns";

export const TableActions = () => {
  const { accessToken } = useAuth();

  const {
    fetchLogisticsStock,
    fetchProductionStock,
    fetchServiceStock,
    fetchCoilStock,
    fetchCkdStock,
    fetchProductionTransactions,
    fetchLogisticsTransactions,
    fetchCoilTransactions
  } = tableThunks;

  const {
    selectLogisticsStock,
    selectProductionStock,
    selectServiceStock,
    selectCoilStock,
    selectCkdStock,
    selectProductionTransactions,
    selectLogisticsTransactions,
    selectCoilTransactions
  } = selectors;

  const dispatch = useDispatch();

  const location = useLocation();

  const productionData = useSelector(selectProductionStock);
  const logisticsData = useSelector(selectLogisticsStock);
  const serviceData = useSelector(selectServiceStock);
  const coilData = useSelector(selectCoilStock);
  const ckdData = useSelector(selectCkdStock);
  const productionTransactionsData = useSelector(selectProductionTransactions);
  const logisticsTransactionsData = useSelector(selectLogisticsTransactions);
  const coilTransactionsData = useSelector(selectCoilTransactions);

  const handleExport = () => {
    if (location.pathname === "/productionStock") {
      exportTableData(productionData, productionStockColumns);
    }

    if (location.pathname === "/logisticsStock") {
      exportTableData(logisticsData, logisticsStockColumns);
    }

    if (location.pathname === "/serviceStock") {
      exportTableData(serviceData, serviceStockColumns);
    }

    if (location.pathname === "/coilStock") {
      exportTableData(coilData, coilStockColumns);
    }

    if (location.pathname === "/ckdStock") {
      exportTableData(ckdData, ckdStockColumns);
    }

    if (location.pathname === "/productionTransactions") {
      exportTableData(productionTransactionsData, productionTransactionsColumns);
    }

    if (location.pathname === "/logisticsTransactions") {
      exportTableData(logisticsTransactionsData, logisticsTransactionsColumns);
    }

    if (location.pathname === "/transactions") {
      exportTableData(coilTransactionsData, coilTransactionsColumns);
    }
  };

  const handleRefresh = () => {
    if (location.pathname === "/productionStock") {
      refreshTableData(dispatch, fetchProductionStock, accessToken);
    }

    if (location.pathname === "/logisticsStock") {
      refreshTableData(dispatch, fetchLogisticsStock, accessToken);
    }

    if (location.pathname === "/serviceStock") {
      refreshTableData(dispatch, fetchServiceStock, accessToken);
    }

    if (location.pathname === "/coilStock") {
      refreshTableData(dispatch, fetchCoilStock, accessToken);
    }

    if (location.pathname === "/ckdStock") {
      refreshTableData(dispatch, fetchCkdStock, accessToken);
    }

    if (location.pathname === "/productionTransactions") {
      refreshTableData(dispatch, fetchProductionTransactions, accessToken);
    }

    if (location.pathname === "/logisticsTransactions") {
      refreshTableData(dispatch, fetchLogisticsTransactions, accessToken);
    }

    if (location.pathname === "/transactions") {
      refreshTableData(dispatch, fetchCoilTransactions, accessToken);
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
