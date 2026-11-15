import { configureStore } from "@reduxjs/toolkit";
import appDataSlice from "./appDataSlice";
import searchSlice from "./searchSlice";
import liveChatSlice from "./liveChatSlice";
import historySlice from "./historySlice";

const appStore = configureStore({
    reducer: {
        app: appDataSlice,
        search: searchSlice,
        livechat: liveChatSlice,
        history: historySlice
    }
})

export default appStore;