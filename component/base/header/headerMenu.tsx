import Image from "next/image"
import {useEffect, useState} from "react";
import {AuthContextStaticData} from "../../../static/AuthContextStaticData";
import {useRouter} from "next/router";

const HeaderMenu = () => {
    const router = useRouter()
    const [isProfileMenuOpen, setData] = useState(false);
    const [currentPageUrl, setCurrentPageUrl] = useState<any>([]);
    const currentPage = router.asPath
    const openMenu = () => {
        setData(!isProfileMenuOpen)
    }
    const handlePreviousPageClick = () => {
        const lastVisitedPage = currentPageUrl.at(-2)
        if(currentPageUrl.length >=2 && lastVisitedPage.indexOf('auth') <= 0) {
            router.push(lastVisitedPage)
        }
    }
    const logOutClick = (event: { stopPropagation: () => void; }) => {
        event.stopPropagation()
    }
    useEffect(() => {
        setCurrentPageUrl([...currentPageUrl, currentPage])
    },[currentPage])
    return (
        <div className="head">
            <div className="fullWidthMenu">
                <div className="icon">
                    <Image onClick={handlePreviousPageClick} src="/back.svg" width={12} height={12} alt="back arrow"/></div>
                <div>
                    <Image src="/group.svg" width={136} height={16} alt="FH HEALTH"></Image>
                </div>
                <div className="rectangle-13" onClick={openMenu}>
                    <Image src="/profile-user.svg" width={23} height={23} alt="user default avatar"/>
                    {
                        isProfileMenuOpen &&
                        <div onClick={logOutClick} className="logOut">
                            Log Out
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default HeaderMenu
