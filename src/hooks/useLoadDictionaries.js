import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { dictionaryThunks } from "../store/thunks/dictionaryThunks";

const { fetchContractors, fetchPlannedDeliveries } = dictionaryThunks;

export const useLoadDictionaries = (accessToken) => {
  const dispatch = useDispatch();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!accessToken || hasFetched.current) return;

    dispatch(fetchContractors(accessToken));
    dispatch(fetchPlannedDeliveries(accessToken));

    hasFetched.current = true;
  }, [dispatch, accessToken]);
};
