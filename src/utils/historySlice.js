import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = (key, defaultValue) => {
    const data = localStorage.getItem("historyData");
    if(data == null || !JSON.parse(data).hasOwnProperty(key))
        return defaultValue;
    return JSON.parse(data)[key];
}

const initialState = {
    videoData: fetchFromLocalStorage("videoData", []),
    isPauseHistory: fetchFromLocalStorage("isPauseHistory", false),
    activeMenuVideoId: null
}


const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addToHistory: (state, action) => {
            const {videoId} = action?.payload;
            const index = state.videoData.findIndex(ele => ele.videoId == videoId);
            if(index != -1){
                state.videoData.splice(index, 1);
            }
            state.videoData.unshift(action?.payload);
        },
        removeFromHistory: (state, action) => {
            const {videoId} = action?.payload;
            const index = state.videoData.findIndex(ele => ele.videoId == videoId);
            if(index != -1)
                state.videoData.splice(index, 1);
            else
                console.warn("Error occured in removeFromHistory");
        },
        clearHistory: (state) => {
            state.videoData = [];
        },
        pauseHistory: (state, action) => {
            state.isPauseHistory = action.payload.value
        },
        setActiveMenuVideoId: (state, action) => {
            state.activeMenuVideoId = action.payload.videoId;
        }
    }
})

export const {addToHistory, removeFromHistory, clearHistory, pauseHistory, setActiveMenuVideoId} = historySlice.actions;

export default historySlice.reducer;