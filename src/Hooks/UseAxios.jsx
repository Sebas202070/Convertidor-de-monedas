import axios from "axios";
import { useEffect, useState } from "react";

const UseAxios = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const axiosFunction = async () => {
      try {
        const response = await axios(url);
        const data = await response.data;
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    axiosFunction();
  }, [url]);

  return [data, error, loading];
};

export default UseAxios;
