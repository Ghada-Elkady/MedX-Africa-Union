import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getNotifications, getUnreadNotificationCount, markNotificationsRead } from "../../services/apiService";

const NotificationBell = () => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    const refresh = () => {
        setNotifications(getNotifications());
        setCount(getUnreadNotificationCount());
    };

    useEffect(() => {
        refresh();
        const id = setInterval(refresh, 5000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    const handleOpen = () => {
        const next = !open;
        setOpen(next);
        if (next) {
            markNotificationsRead();
            setCount(0);
            refresh();
        }
    };

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={handleOpen}
                className="relative p-2.5 rounded-xl text-slate-600 hover:text-[#19A7CE] hover:bg-[#19A7CE]/10 transition-colors"
                title="Notifications"
            >
                <i className="fa-solid fa-bell text-lg"></i>
                {count > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                        {count > 9 ? "9+" : count}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-80 max-w-[85vw] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                    <div className="bg-gradient-to-r from-slate-900 to-cyan-950 px-4 py-3 flex items-center justify-between">
                        <p className="text-white font-bold text-sm flex items-center gap-2">
                            <i className="fa-solid fa-bell"></i> Notifications
                        </p>
                        <span className="text-[10px] text-slate-300 font-semibold">{notifications.length} total</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                        {notifications.length === 0 ? (
                            <div className="px-4 py-10 text-center text-slate-400">
                                <i className="fa-solid fa-bell-slash text-2xl mb-2"></i>
                                <p className="text-xs font-semibold">No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <div key={n.id} className="px-4 py-3 hover:bg-slate-50 transition">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{n.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-800">{n.title}</p>
                                            <p className="text-[11px] text-slate-500 leading-snug">{n.body}</p>
                                            <p className="text-[10px] text-slate-400 mt-1">
                                                {new Date(n.createdAt).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="border-t border-slate-100 p-2">
                        <Link
                            to="/dashboard/rescue"
                            onClick={() => setOpen(false)}
                            className="block w-full text-center text-xs font-bold text-[#19A7CE] bg-[#19A7CE]/10 hover:bg-[#19A7CE]/20 py-2 rounded-lg transition-colors"
                        >
                            <i className="fa-solid fa-flag mr-1"></i> View Rescue Center
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;