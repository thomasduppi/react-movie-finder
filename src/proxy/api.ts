import { useEffect, useState } from "react";

export const useFetch = (url: string, options: RequestInit) => {
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
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export const useGetList = (page: number = 1) => {
  const safePage = Math.max(1, Math.min(Math.trunc(page), 500));

  const url =
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${safePage}&sort_by=popularity.desc`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjQyODM3Njk3YjNjMzg2MzUyMzUxMjBjZTdjMjdkOSIsIm5iZiI6MTc2MjMyOTk0NC44NDMwMDAyLCJzdWIiOiI2OTBiMDU1OGEzOTg0NzY1NzQ3OGExMmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZcEgxXzT3Y0vle6SzRqJvjI8V7uG6bqWH1WsqX8A2cI",
    },
  };

  const { data, loading, error } = useFetch(url, options);

  return {
    movies: data?.results ?? [],
    totalPages: Math.min(data?.total_pages ?? 1, 500),
    loading,
    error,
  };
};

export const useGetGenres = () => {
    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjQyODM3Njk3YjNjMzg2MzUyMzUxMjBjZTdjMjdkOSIsIm5iZiI6MTc2MjMyOTk0NC44NDMwMDAyLCJzdWIiOiI2OTBiMDU1OGEzOTg0NzY1NzQ3OGExMmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZcEgxXzT3Y0vle6SzRqJvjI8V7uG6bqWH1WsqX8A2cI",
        },
    };

    const { data, loading, error } = useFetch(url, options);

    const genres =
        data?.genres?.reduce((acc: Record<number, string>, genre: any) => {
            acc[genre.id] = genre.name;
            return acc;
        }, {}) ?? {};

    return {
        genres,
        loading,
        error,
    };
};
