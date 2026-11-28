import SearchIcon from "../assets/images/search-icon.png"
import { Link } from "react-router-dom";

const getShortTitle = (title) => {
    return title.split(/[\p{Emoji}\p{Symbol}]|#/u)[0].trim();
};

const Suggestion = ({data}) => {
    return<div className="absolute left-0 right-0 top-full z-50 mt-1 flex max-h-72 flex-col overflow-y-auto rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm shadow-lg sm:left-0 sm:right-0">
        {data.map(suggestionEle => 
            <Link key={suggestionEle?.id} to={"/watch?v=" +suggestionEle?.id} onMouseDown={(e) => e.preventDefault()}>
                <div className="flex min-w-0 px-2 py-2 sm:py-1 hover:bg-slate-200 hover:rounded-lg">
                    <div className="pr-3 shrink-0"><img className="w-5 inline" src={SearchIcon} alt="icon"/></div>
                    <span className="truncate">{getShortTitle(suggestionEle?.title)}</span>
                </div>
             </Link>
            )}
    </div>
}

export default Suggestion;