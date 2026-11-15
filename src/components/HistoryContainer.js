import { useSelector, useDispatch } from "react-redux";
import History from "./History";
import searchIcon from "../assets/images/search-icon.png";
import deleteIcon from "../assets/images/delete.png";
import pauseIcon from "../assets/images/pause.png";
import {clearHistory, pauseHistory} from "../utils/historySlice";
import useSaveHistoryToLocalStorage from '../utils/useSaveHistoryToLocalStorage';
import { useEffect, useState } from "react";

const HistoryContainer = () => {
    const rawVideoData = useSelector(store => store?.history?.videoData);
    const isPauseHistory = useSelector(store => store?.history?.isPauseHistory);
    useSaveHistoryToLocalStorage();
    const dispatch = useDispatch();
    const [searchString, setSearchString] = useState(null);

    // useEffect(() => {
    //     let timer;
    //     clearTimeout(timer);
    //     timer = setTimeout(() => {

    //     }, 2000);
    // }, [searchString])

    const videoData = rawVideoData.reduce((acc, item) => {
        const dateKey = item.watchedAt;
        if (acc.hasOwnProperty(dateKey))
            acc[dateKey].push(item);
        else
            acc[dateKey] = [item];
        return acc;
    }, {});

    return (rawVideoData && rawVideoData.length > 0 ? <div className="flex flex-col w-full px-4">
        <h4 className="text-3xl font-bold">Watch History</h4>
        <div className="flex justify-between">
            <div>
                {Object.entries(videoData).map(([date, videos]) => <History key={date} date={date} videos={videos} />)}
            </div>
            <div className="flex flex-col px-2 gap-y-4">
                <div className="flex items-center border-b-2 border-black gap-x-1">
                    <img src={searchIcon} alt="Search" className="w-5 h-5" />
                    <input
                        className="py-1 outline-none"
                        type="text"
                        placeholder="Search watch history"
                    />                    
                </div>
                <button className="flex gap-x-1 text-left font-semibold text-xs" onClick={() =>  {  
                    dispatch(clearHistory());
                }}>
                    <img src={deleteIcon} alt="delete" className="w-5 h-5" />
                    <span>Clear all watch history</span>
                </button>
                <button className="flex gap-x-1 text-left font-semibold text-xs" onClick={() => {
                    dispatch(pauseHistory({value: !isPauseHistory}));
                }}>
                    <img src={pauseIcon} alt="pause" className="w-5 h-5" />
                    <span>{isPauseHistory ? "Resume History" : "Pause watch history"}</span>
                </button>

            </div>
        </div>
    </div> : <div className="pt-5 font-bold text-2xl text-center w-full">No History Data</div>)
}

export default HistoryContainer;