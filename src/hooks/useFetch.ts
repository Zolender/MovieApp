import { useEffect, useState } from "react";


export default function useFetch<T>(url: string){
    const [data, setData] = useState<T | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(()=>{
        if(!url)return
        const controller = new AbortController()


        const fetchData = async ()=>{
        setIsLoading(true)
            try{
                const response = await fetch(url, {signal: controller.signal})
                if(!response.ok){
                    throw new Error("Failed to retrieve needed data from the endpoint: " + response.statusText)
                }
                const json = await response.json()
                setData(json)
            }catch(err){
                if(err instanceof Error && err.name !=="AbortError"){
                    setError(err)
                }
            }finally{
                setIsLoading(false)
            }
        }
        fetchData()
        return ()=> controller.abort()
    }, [url])

    return {data, isLoading, error}
}