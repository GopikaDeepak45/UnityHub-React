import { selectCurrentToken } from "@/redux/slices/authSlice"
import { useSelector } from "react-redux"
import  {jwtDecode,JwtPayload} from 'jwt-decode'

interface UserInfo {
    username: string;
    userId: string;
    role: string;
    // Add other properties if present in your JWT payload
}

// Define interface for DecodedToken
interface DecodedToken extends JwtPayload {
    UserInfo: UserInfo;
}

const useAuth=()=>{
    const token=useSelector(selectCurrentToken)

    if(token){
        const decoded=jwtDecode(token) as DecodedToken
        const { username,userId, role } = decoded.UserInfo

        return{username,userId,role}
    }
return{}
}

export default useAuth