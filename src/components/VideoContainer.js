import { useEffect, useRef, useState } from "react";
import { YOUTUBE_VIDEO_API, OFFSET_YOUTUBE_VIDEO_API_CALLS } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import VideoContainerShimmer from "./VideoContainerShimmer";
import { useSelector } from "react-redux";
import Error from "./Error";

const VideoContainer = () => {
    const apiCallsCount = useRef(0);
    let targetElement = useRef(null);
    const videoCategoryId = useSelector(store => store.app.videoCategoryId);

    const nextPageToken = useRef(null); //next requests possible ref
    const isFetching = useRef(false); //to ignore the api calls if any request is still running, I cant use isLoading because state variable updates are asynchronous
    const [isLoading, setIsLoading] = useState(false); //loading state, control the display of shimmer ui
    const [isError, setIsError] = useState(false); //to track if api call throws error   
    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
        setVideoData([]);
        apiCallsCount.current = 0;
        nextPageToken.current = null;
        setIsError(false);
        fetchData();
         // eslint-disable-next-line
    }, [videoCategoryId]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isError && apiCallsCount.current < OFFSET_YOUTUBE_VIDEO_API_CALLS)
                    fetchData();
            });
        });

        targetElement.current = document.getElementById("target-element");

        if (targetElement.current) {
            observer.observe(targetElement.current);
        }

        return () => observer.disconnect();
         // eslint-disable-next-line
    }, [videoCategoryId, isError]);

     // eslint-disable-next-line
    async function fetchData() {
        if (isFetching.current || isError)
            return;

        isFetching.current = true;
        setIsLoading(true);
        const url = videoCategoryId != null ? YOUTUBE_VIDEO_API + "&videoCategoryId=" + videoCategoryId : YOUTUBE_VIDEO_API;
        try {
            const response = nextPageToken && nextPageToken.current ? await fetch(url + "&pageToken=" + nextPageToken.current) : await fetch(url);
            const data = await response.json();
            if (data?.error)
                throw new Error(data?.error?.message || "Error in fetchData()");
            setVideoData(prevData => [...prevData, ...data?.items]);
            setIsError(false);
            nextPageToken.current = data?.nextPageToken || null;
            apiCallsCount.current = apiCallsCount.current + 1;
        }
        catch (error) {
            console.warn(error);
            nextPageToken.current = null;
            setVideoData([]);
            setIsError(true);
        }
        finally {
            isFetching.current = false;
            setIsLoading(false);
        }
    }


    return (<>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 px-1 sm:px-0">
            {videoData.length > 0 && videoData.map(videoEle => <Link key={videoEle?.id} to={"/watch?v=" + videoEle?.id}><VideoCard data={videoEle} /></Link>)}
            {isLoading && <VideoContainerShimmer />}
        </div>
        {isError && <Error error={{ message: "Error occurred! Please try another video category." }} />}
        {<div className="h-1" id="target-element"></div>}
    </>)
}

export default VideoContainer;