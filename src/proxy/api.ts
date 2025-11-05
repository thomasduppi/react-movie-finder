import { useEffect, useState } from "react";

export const getList = async () => {
    const url = 'https://api.themoviedb.org/3/account/22443069/lists?page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjQyODM3Njk3YjNjMzg2MzUyMzUxMjBjZTdjMjdkOSIsIm5iZiI6MTc2MjMyOTk0NC44NDMwMDAyLCJzdWIiOiI2OTBiMDU1OGEzOTg0NzY1NzQ3OGExMmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZcEgxXzT3Y0vle6SzRqJvjI8V7uG6bqWH1WsqX8A2cI'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error fetching the list:', error);
    }
}; 

const useFetch = (url: string, options: RequestInit) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const result = await response.json();
                setData(result);
            }
            catch (err: any) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};
