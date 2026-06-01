import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ENV } from "../helpers/EnvUtils";

interface ActivityLog{ 
    activity_description: string;
    timestamp: string;
}

function Dashboard() {
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
    const { user, token } = useAuth();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const getActivityLogs = async () => {
            const response = await fetch(`${ENV.API_URL}/api/users/activity-logs?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            });

            const data = await response.json();

            setActivityLogs(data.userActivityLogs);
            setTotalPages(data.totalPages);
        }
        
        getActivityLogs();
    }, [token, page])
    
    return(
        <>
            <div className="w-full">
                <div className="md:w-1/5 mx-auto md:ml-5 max-w-50 p-2 my-2 overflow-hidden border border-slate-200 text-center md:text-left rounded-xl shadow-sm">
                    Pull Currency: {user?.pull_currency}
                </div>
                <div className="md:w-1/5 mx-auto md:ml-5 max-w-50 p-2 my-2 overflow-hidden border border-slate-200 text-center md:text-left rounded-xl shadow-sm">
                    Fragments: {user?.pull_currency_fragment}
                </div>
                <div className="md:w-1/5 mx-auto md:ml-5 max-w-50 p-2 my-2 overflow-hidden border border-slate-200 text-center md:text-left rounded-xl shadow-sm">
                    Status: <b>{user?.plan_tier.toUpperCase()}</b>
                </div>
                <div className="mx-auto text-center text-3xl">
                    <b>Activity Logs</b>
                </div>
                <div className="w-9/10 md:w-1/2 max-w-2xl mx-auto my-6 overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                <div className="flex flex-row w-full justify-between min-h-12 border-slate-200 border-t p-2">
                    <div className="flex w-full h-full">
                        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-blue-600 text-white py-3 rounded-lg font-bold px-5 hover:bg-blue-700 transition-colors">
                            Previous
                        </button>
                        </div>
                        <div className="h-full min-h-12 flex flex-row w-1/3 justify-center">
                        <div className="h-full min-h-12 flex flex-col justify-center">{page}/{totalPages}</div>
                        </div>
                        <div className="flex justify-end w-full h-full">
                        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="bg-blue-600 text-white py-3 rounded-lg font-bold px-5 hover:bg-blue-700 transition-colors">
                            Next
                        </button>
                        </div>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-4 py-2 text-sm font-semibold text-center text-slate-700 tracking-wider">
                                #
                                </th>
                                <th className="px-4 py-2 w-full text-sm font-semibold text-center text-slate-700 tracking-wider">
                                Description
                                </th>
                                <th className="px-4 py-2 w-full text-sm font-semibold text-center text-slate-700 tracking-wider">
                                Timestamp
                                </th>
                            </tr>
                        </thead>
                        <tbody className=" bg-white">
                        {activityLogs.map((row, index) => (
                            <tr 
                            key={index} 
                            className={`hover:bg-slate-50/70 transition-colors duration-200`}
                            >
                            <td className="px-4 py-2 text-sm font-medium text-center text-slate-900 align-top">
                                {index + 1}
                            </td>
                            <td className="px-4 py-2 text-sm w-full font-medium text-center text-slate-900 align-top">
                                {row.activity_description}
                            </td>
                            <td className="px-4 py-2 text-sm w-full text-slate-600 text-center">
                                {row.timestamp ? (() => {
                                const d = new Date(row.timestamp);

                                const ld = d.toLocaleString(undefined, {
                                    year: '2-digit',    // "YY"
                                    month: '2-digit',   // "MM"
                                    day: '2-digit',     // "DD"
                                    hour: '2-digit',    // "hh"
                                    minute: '2-digit',  // "mm"
                                    second: '2-digit',  // "ss"
                                    hour12: true
                                })
                                return `${ld}`;
                                })() : 'Loading...'}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="flex flex-row w-full justify-between min-h-12 border-slate-200 border-t p-2">
                        <div className="flex w-full h-full">
                        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-blue-600 text-white py-3 rounded-lg font-bold px-5 hover:bg-blue-700 transition-colors">
                            Previous
                        </button>
                        </div>
                        <div className="h-full min-h-12 flex flex-row w-1/3 justify-center">
                        <div className="h-full min-h-12 flex flex-col justify-center">{page}/{totalPages}</div>
                        </div>
                        <div className="flex justify-end w-full h-full">
                        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="bg-blue-600 text-white py-3 rounded-lg font-bold px-5 hover:bg-blue-700 transition-colors">
                            Next
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard