import { fetchMaster } from "@/app/store/masterSlice";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";


const useMasterData = (type) => {
  const dispatch = useDispatch();
  const masterData = useSelector((state) => state?.master?.list);

  useEffect(() => {
    dispatch(fetchMaster({})); // ✅ Fetch master data when component mounts
  }, [dispatch]);

  const filteredData = useMemo(() => {
    return masterData?.filter((item) => item.type == type) || [];
  }, [masterData, type]);

  return filteredData; // ✅ Returns filtered master data
};

export default useMasterData;
