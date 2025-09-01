import React from "react";
import { Button } from "@/components/ui/button";
import {Link, useNavigate} from "react-router-dom";
import {getToken, removeToken} from "@/utilitis/sessionHelper.js";
import {useLogoutUserMutation} from "@/redux/feature/authAPI/authAPI.js";
import {useDispatch} from "react-redux";
import {logOutUser} from "@/redux/feature/authAPI/authSlice.jsx";
import {User} from "lucide-react";

const Header = () => {
    const token=getToken();
    const [logoutUser]=useLogoutUserMutation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout=async()=>{
        try {
            await logoutUser().unwrap()
            dispatch(logOutUser())
            removeToken()
            navigate("/login")
        }catch(err){
            console.log(err);
        }
    }

    return (
        <header className="flex items-center justify-between bg-white shadow-md px-6 py-4">
            {/* Left: Title */}
            <div className="flex items-center space-x-3">
                <span className="text-xl font-semibold">My Dashboard</span>
            </div>

            {/* Right: Login + Logo */}
            <div className="flex items-center space-x-4">
                {
                 token ? (
                    <>
                            <button onClick={handleLogout} className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 py-2">
                                Logout
                            </button>

                        <Link to="/profile">
                            <User/>
                        </Link>
                    </>
                 ):(
                     <>
                         <Link to='/register'>
                             <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 py-2">
                                 Register
                             </Button>
                         </Link>
                         <Link to='/login'>
                             <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 py-2">
                                 Login
                             </Button>
                         </Link>
                     </>
                 )
                }
            </div>
        </header>
    );
};

export default Header;
