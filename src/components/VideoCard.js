import {getRelativeTime} from "../utils/utilityFunctions";
import {getLabelForCount} from "../utils/utilityFunctions";

const VideoCard = ({ data }) => {
    const { snippet, statistics } = data;
    const { title, channelTitle, publishedAt, thumbnails } = snippet;
    const  viewCount  = (statistics && statistics?.viewCount) || "";

    return <>
        <div className="flex flex-col p-2 rounded-xl hover:bg-pink-100 hover:cursor-pointer">
            <img className="rounded-lg" src={thumbnails?.medium?.url}></img>
            <div className="flex">
                <h4 className="font-medium line-clamp-2">{title}</h4>
            </div>
            <p className="text-sm text-gray-400 line-clamp-1">
                {channelTitle} {" "} {getLabelForCount(viewCount)} {" "} {getRelativeTime(publishedAt)}
            </p>
        </div>
    </>
}

export default VideoCard;