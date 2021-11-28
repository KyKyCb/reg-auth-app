import { useEffect, useState } from "react"
   
const getWindowSizes = ()=>{
    const {innerWidth: width, innerHeight: height} = window
    return {width, height}
}

const useWindowSize = ()=>{

    const [windowSize, setWindowSize] = useState(getWindowSizes())

    const handleSize = ()=>{
        setWindowSize(getWindowSizes())
    }

    useEffect(()=>{
        window.addEventListener('resize', handleSize)
        return ()=> document.removeEventListener('resize', handleSize)
    }, [])
    
    return windowSize
}

export default useWindowSize