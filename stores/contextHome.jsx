import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { isDebuggerState } from "@/stores/storeFiber"

const  ContextHome =()=> {
    
    const [isDebugger, setIsDebugger] = useRecoilState(isDebuggerState)
    useEffect(() => {
        let hasDebug = window.location.hash

        if (hasDebug == '#debug') {
            setIsDebugger(true)
        } else {
            setIsDebugger(false)
        }
        return () => {

        }
    }, [])
    return <></>
}

export default ContextHome;