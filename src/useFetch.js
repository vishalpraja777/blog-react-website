import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data,setData] = useState(null)
    const [isPending,setIsPendingBlogs] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch data for that resourse');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPendingBlogs(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError'){
                    console.log('fetch aborted')
                }
                else{
                    setIsPendingBlogs(false);
                    setError(err.message);
                }
            });

            return () => abortCont.abort();
    },500)
    }, [url]);

    return {data, isPending, error}

}

export default useFetch;