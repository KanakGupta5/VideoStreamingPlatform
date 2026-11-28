import { getLabelForCount } from "../utils/utilityFunctions";
import { Link } from "react-router-dom";
import dotIcon from "../assets/images/dots.png";
import deleteIcon from "../assets/images/delete.png";
import { useSelector, useDispatch } from "react-redux";
import {setActiveMenuVideoId, removeFromHistory} from "../utils/historySlice";

const History = ({ date, videos }) => {
    const activeMenuVideoId = useSelector(store => store.history.activeMenuVideoId);
    const dispatch = useDispatch();

    return <div className="mb-3">
        <h4 className="px-1 py-2 text-sm font-semibold text-gray-600">{date}</h4>
        {videos.map(v => (
            <div key={v?.videoId} className="flex gap-x-1 sm:gap-x-2 p-1 sm:p-2 hover:bg-pink-100 rounded-lg">
                <Link to={"/watch?v=" + v?.videoId} className="flex gap-x-2 flex-grow min-w-0" >
                    <img
                        className="w-28 sm:w-40 lg:w-44 h-auto aspect-video object-cover shrink-0 rounded-lg"
                        src={v?.thumbnail?.url}
                        alt=""
                    />
                    <div className="flex flex-col flex-grow min-w-0">
                        <h6 className="font-bold text-sm sm:text-base line-clamp-2">{v?.title}</h6>
                        <div className="flex flex-wrap gap-x-2 text-xs font-medium text-gray-500 mt-1">
                            <h6>{v?.channelTitle}</h6>
                            <p>{getLabelForCount(v?.views)}</p>
                        </div>
                    </div>
                </Link>

                <div className="relative">
                    <button className="shrink-0 hover:bg-gray-200 rounded-full p-1.5" aria-label="More options" onClick={() => dispatch(setActiveMenuVideoId({
                    videoId: activeMenuVideoId === v.videoId ? null : v.videoId
                    }))}>
                        <img className="h-4 w-4 object-contain" src={dotIcon} alt="" />
                    </button>
                    {activeMenuVideoId === v?.videoId && (
                        <div className="absolute right-0 sm:left-3 top-6 mt-1 bg-white w-48 max-w-[calc(100vw-2rem)] p-2 shadow-lg rounded-lg z-10">
                            <button className="flex gap-x-2 font-semibold text-xs" onClick={() => {
                                dispatch(removeFromHistory({ videoId: v.videoId }));
                                dispatch(setActiveMenuVideoId({ videoId: null }));
                            }}>
                                <img src={deleteIcon} alt="" className="w-4 h-4" />
                                <span>Remove from watch history</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        ))}
    </div>
}

export default History;