import { createContext, useState,useEffect } from "react"
import { getMe } from "./services/auth.api"

export const AuthContext= createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getAndSetUser = async () =>{
            try{
                const res = await getMe()
                if(res && res.data) {
                    setUser(res.data.user || res.data)
                }
                
            }catch(err){
                console.error("authentication failed:",err)
                // setUser(null)
            } finally {
                setLoading(false)
            }
            
            // const res = await getMe()
            // setUser(res.data.user || res.data)
            // setLoading(false)
            
            
        }

        getAndSetUser()
    },[])

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
          {children}
        </AuthContext.Provider>

    )

}