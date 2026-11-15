import { useSelector } from "react-redux";
import { useEffect } from "react";

const useSaveHistoryToLocalStorage = () => {
    const rawVideoData = useSelector(store => store.history.videoData);
    const isPauseHistory = useSelector(store => store.history.isPauseHistory);
    useEffect(() => {
        const obj = {
            videoData: rawVideoData,
            isPauseHistory: isPauseHistory
        };

        localStorage.setItem("historyData", JSON.stringify(obj));
    }, [rawVideoData, isPauseHistory]);
}

export default useSaveHistoryToLocalStorage;