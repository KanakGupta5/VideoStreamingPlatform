import sidebarData from "../mockData/sidebarData.json"
import SidebarTile from "./SidebarTile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appDataSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
    const isShowMenu = useSelector((store) => store.app.isShowMenu);

    useEffect(() => {
        if (window.innerWidth < 768) {
            dispatch(closeMenu());
        }
    }, [dispatch]);

    const closeMobileMenu = () => dispatch(closeMenu());

    return <>
        {isShowMenu && isMenuOpen && (
            <button
                aria-label="Close sidebar"
                className="fixed inset-0 top-14 z-40 bg-black/20 md:hidden"
                onClick={closeMobileMenu}
            ></button>
        )}

        <aside className={`fixed left-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-64 overflow-y-auto bg-white shadow-xl transition-transform duration-200 md:hidden ${isShowMenu && isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
            {
                sidebarData.length > 0 && sidebarData.map((ele, index) => <SidebarTile key={index} data={ele} />)
            }
        </aside>

        <div className="hidden md:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-white shrink-0">
            {
                sidebarData.length > 0 && sidebarData.map((ele, index) => <SidebarTile key={index} data={ele} />)
            }
        </div>
    </>
}
export default Sidebar;