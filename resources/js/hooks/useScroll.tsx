import { RefObject, useEffect, useRef, useState } from "react";

const useScroll = (): [RefObject<HTMLDivElement>, number] => {

    const [scrollY, setScrollY] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);
    
    
    const handleScroll = () => setScrollY(window.scrollY);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])


    return [ref, scrollY]
}

export default useScroll

