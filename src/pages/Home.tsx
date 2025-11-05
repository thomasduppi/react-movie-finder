import { useEffect, useState } from "react";
import { getList } from "../proxy/api";

export function Home() {
    const [listMovie, setListMovie] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const movies = await getList();
            setListMovie(movies);
        };

        fetchData();
    }, []);

    return <h1>Bienvenue sur la page d'Accueil</h1>;
}