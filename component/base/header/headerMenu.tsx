import Image from "next/image"
import {useState} from "react";

const HeaderMenu = () => {
    const [isProfileMenuOpen, setData] = useState(false);
    const openMenu = () => {
        setData(!isProfileMenuOpen)
    }
    const logOutClick = (event: { stopPropagation: () => void; }) => {
        event.stopPropagation()
    }
    return (
        <div className="head">
            <div className="fullWidthMenu">
                <div className="icon">
                    <Image src="/back.svg" width={12} height={12} alt="back arrow"/></div>
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
