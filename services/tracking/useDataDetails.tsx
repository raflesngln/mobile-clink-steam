/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import {useEffect, useState} from 'react';

type DataFetchingResult = {
  data: any[]; // Define the data type appropriately
  loading: boolean;
  error: any;
};

// const useDataFetching = async ({url, param}: {url: any; param: any}):Promise<DataFetchingResult> => {
  function useFetchingDetail({url}:any): DataFetchingResult {

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${url}`);
        const result = await response.json();
        // console.log(result)
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchingDetail


