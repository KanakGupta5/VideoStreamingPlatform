import { useSelector, useDispatch } from "react-redux";
import History from "./History";
import searchIcon from "../assets/images/search-icon.png";
import deleteIcon from "../assets/images/delete.png";
import pauseIcon from "../assets/images/pause.png";
import { clearHistory, pauseHistory } from "../utils/historySlice";
import useSaveHistoryToLocalStorage from '../utils/useSaveHistoryToLocalStorage';
import { useEffect, useState } from "react";

const HistoryContainer = () => {
    const rawVideoData = useSelector(store => store?.history?.videoData);
    const isPauseHistory = useSelector(store => store?.history?.isPauseHistory);
    useSaveHistoryToLocalStorage();
    const dispatch = useDispatch();
    const [searchString, setSearchString] = useState("");
    const [videoData, setVideoData] = useState({});

    useEffect(() => {
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (searchString != null) {
                const tempVideoData = rawVideoData.reduce((acc, item) => {

                    if (searchString.length > 0 && !item.title.toLowerCase().includes(searchString.toLowerCase()))
                        return acc;

                    const dateKey = item.watchedAt;
                    if (!acc[dateKey]) {
                        acc[dateKey] = [];
                    }
                    acc[dateKey].push(item);
                    return acc;

                }, {});
                setVideoData(tempVideoData);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchString, rawVideoData])

    return (rawVideoData && rawVideoData.length > 0 ? <div className="flex flex-col w-full px-2 sm:px-4 pb-4">
        <h4 className="text-2xl sm:text-3xl font-bold px-1 sm:px-0">Watch History</h4>
        <div className="flex flex-col lg:flex-row gap-4 lg:justify-between">
            <div className="order-2 lg:order-1 min-w-0 flex-1">
                {Object.entries(videoData).map(([date, videos]) => <History key={date} date={date} videos={videos} />)}
            </div>
            <div className="order-1 lg:order-2 flex flex-col px-1 sm:px-2 gap-y-3 sm:gap-y-4 lg:w-64 shrink-0">
                <div className="flex items-center border-b-2 border-black gap-x-1 w-full sm:w-64 lg:w-full">
                    <img src={searchIcon} alt="Search" className="w-5 h-5" />
                    <input
                        className="py-1 w-full min-w-0 outline-none text-sm"
                        type="text"
                        placeholder="Search watch history"
                        value={searchString}
                        onInput={(e) => setSearchString(e.target.value)}
                    />
                </div>
                <button className="flex gap-x-1 text-left font-semibold text-xs" onClick={() => {
                    dispatch(clearHistory());
                }}>
                    <img src={deleteIcon} alt="delete" className="w-5 h-5" />
                    <span>Clear all watch history</span>
                </button>
                <button className="flex gap-x-1 text-left font-semibold text-xs" onClick={() => {
                    dispatch(pauseHistory({ value: !isPauseHistory }));
                }}>
                    <img src={pauseIcon} alt="pause" className="w-5 h-5" />
                    <span>{isPauseHistory ? "Resume History" : "Pause watch history"}</span>
                </button>

            </div>
        </div>
    </div> : <div className="pt-5 font-bold text-2xl text-center w-full">No History Data</div>)
}

export default HistoryContainer;