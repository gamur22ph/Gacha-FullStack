import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import type { SubscriptionProps } from "../props/SubscriptionProps";
import { useEffect, useState } from "react";
import { goCheckOut } from "../services/SubscriptionServices";

function Subscription({ onNoUser } : SubscriptionProps) {
    const { user, token } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const checkOut = async () => {
        setIsLoading(true);
        if (token) await goCheckOut(token);
        setIsLoading(false);
    }

    useEffect(() => setIsLoading(false));

    return(
        <>
            <div className="h-[30vh] flex w-full justify-center items-center">
                <h1 className="text-4xl md:text-6xl"><b>Subscription</b></h1>
                (Mock)
            </div>
            <div className="flex flex-col md:flex-row w-full justify-center items-center gap-4">
                {/* Standard (Free) */}
                <div className="w-9/10 md:w-120 h-100 bg-gray-100 rounded-2xl p-4">
                    <h1 className="text-2xl"><b>Standard</b></h1>
                    <p className="text-sm text-gray-600">The default plan on your account, completely free.</p>
                    <br/>
                    <div className="flex w-full">
                        <div className="w-full">
                            <b>COST</b><br/>
                            <p className="text-sm text-gray-600">No credit card required.</p>
                        </div>
                        <div className="w-full flex justify-end items-center">
                            <p className="text-2xl"><b>Free</b></p>
                        </div>
                    </div>
                    <br/>
                    {user ? 
                        <>
                            <Link to="/gacha" className="block w-full bg-blue-600 text-center text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
                                Go to Gacha
                            </Link>
                        </>
                    :
                        <>
                            <button onClick={onNoUser} className="block w-full bg-blue-600 text-center text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
                                Login to try Gacha
                            </button>
                        </>
                    }
                    
                    <br/>
                    <div>
                        <p className="text-sm"><b>Features:</b></p>
                        <div className="w-full flex p-4 text-sm text-gray-600">
                            <p>5 Daily Coins for pulling items</p>
                        </div>
                    </div>
                </div>
                {/* Pro (Paid) */}
                <div className="w-9/10 md:w-120 h-100 bg-gray-100 rounded-2xl p-4">
                    <h1 className="text-2xl"><b>Pro</b></h1>
                    <p className="text-sm text-gray-600">For people who wants to obtain more items.</p>
                    <br/>
                    <div className="flex w-full">
                        <div className="w-full">
                            <b>COST</b><br/>
                            <p className="text-sm text-gray-600">Monthly plan available.</p>
                        </div>
                        <div className="w-full flex justify-end items-center">
                            <p className="text-2xl"><b>$5.00</b></p>
                        </div>
                    </div>
                    <br/>
                    
                    {user === null ? 
                        <button disabled={isLoading} onClick={onNoUser} className="block w-full bg-blue-600 text-center text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
                            Login to Subscribe
                        </button>
                    : (user?.plan_tier === 'standard' ?
                        <button disabled={isLoading} onClick={checkOut} className="block w-full bg-blue-600 text-center text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
                            Choose Plan
                        </button>
                        :
                        <Link to={`/profile/${user.username}`} className="block w-full bg-blue-600 text-center text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
                            Manage Subscription
                        </Link>
                    )
                    }
                    
                    <br/>
                    <div>
                        <p className="text-sm"><b>Features:</b></p>
                        <div className="w-full flex-col p-4 text-sm text-gray-600">
                            <p>Free 10 Pulls on first time subscription</p>
                            <p>15 Daily Coins for pulling items</p>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
        </>
    )
}

export default Subscription