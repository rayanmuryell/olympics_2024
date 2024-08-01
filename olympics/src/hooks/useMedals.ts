import { useEffect, useState } from "react";
import { fetchMedals, Medal } from "../api/fetchMedals";

export const useMedals = () => {
  const [medals, setMedals] = useState<Medal[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const getMedals = async () => {
      setLoading(true);
      try {
        const data = await fetchMedals();
        setMedals(data.results);
        setLastUpdated(data.last_updated);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMedals();
  }, []);

  return { medals, loading, lastUpdated };
};
