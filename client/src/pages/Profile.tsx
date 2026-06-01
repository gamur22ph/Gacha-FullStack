import { useAuth } from "../contexts/AuthContext";
import ProfileModal from "../components/ProfileModal";
import { useState } from "react";
import type { ProfileModalType } from "../props/ProfileModalProps";
import { Link } from "react-router-dom";

const Profile = () => {
    const {user, token, handleLogout} = useAuth();
    const [activeModalType, setActiveModalType] = useState<ProfileModalType>(null);
    const [message, setMessage] = useState("");

    if (!user || !token) {
        handleLogout();
        return;
    }

    return (
        <>
            <div className="w-9/10 md:w-6/10 mx-auto my-4">
                <div className="w-full text-center mx-auto">{message}</div>
                <h2 className="text-4xl">Profile</h2>
                <div className="w-full md:w-200 max-w-100 p-2 my-2 overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                    Username: {user.username}<br/>
                    Email: {user.email}<br/>
                    <button onClick={() => setActiveModalType('change password')} className='hover:underline text-blue-600'>Change Password</button><br/>
                </div>
                <div className="max-w-full my-2 overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                    {/* <div className="w-full flex justify-end border-b border-slate-200 p-2">
                        <Link to={`/profile/settings`} className='p-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded'>Settings</Link><br/>
                    </div> */}
                    <div className="p-4 flex items-center">
                        <div className="w-full">
                            Subscription Status: <b>{user.plan_tier.toUpperCase()}</b>
                        </div>
                        { user?.plan_tier === "standard" ?
                            <div className="w-full flex justify-end">
                                <Link to="/subscription" className='p-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded'>Subscribe</Link><br/>
                            </div>
                            :
                            <div className="w-full flex justify-end">
                                <button onClick={() => setActiveModalType('subscription cancellation')} className='p-2 text-white bg-red-600 hover:bg-red-700 transition-colors rounded'>Remove Subscription</button><br/>
                            </div>
                        }
                    </div>
                    <ProfileModal
                        profileModalType={activeModalType}
                        onClose={() => setActiveModalType(null)}
                        onChangePasswordSuccess={() => setMessage("Changed Password Successfully.")}
                        onRemoveSubscription={() => setMessage("Subscription Removed Successfully.")}
                    />
                </div>
            </div>

            
        </>
    )
}

export default Profile;