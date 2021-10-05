import Image from "next/image"
import {useState} from "react";
import {AuthContextStaticData} from "../../../static/AuthContextStaticData";
import {useRouter} from "next/router";
import firebase from "../../../lib/firbase";
import {UseAuthDataStateValue} from "../../../context/AuthContext";

const HeaderMenu = () => {
    const router = useRouter()
    const [isProfileMenuOpen, setData] = useState(false)
    const currentPage = useRouter().route
    const showBackIcon = currentPage.includes('my')
    const {setAuthDataState} = UseAuthDataStateValue()

    const openMenu = () => {
        setData(!isProfileMenuOpen)
    }

    const handlePreviousPageClick = () => {
        router.push('/webPortalResult')
    }

    const handleLogoutClick = async () => {
        try {
            await firebase.auth().signOut();
            setAuthDataState({type: AuthContextStaticData.UPDATE_AUTH_TOKEN, token: ""})
            localStorage.removeItem("selectedKitId")
            localStorage.removeItem("accessToken")
            router.push('/auth/login')
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <header className="main-header">
            <div className="fullWidthMenu">
                <div className="icon">
                    {
                        showBackIcon &&
                        <Image onClick={handlePreviousPageClick} src="/back.svg" width={12} height={12} alt="back arrow"/>
                    }
                </div>
                <div>
                    <Image className="icon" src="/group.svg" width={136} height={16} alt="FH HEALTH" onClick={() => router.push("/webPortalResult")} />
                </div>
                <div className="rectangle-13" onClick={openMenu}>
                    <Image src="/profile-user.svg" width={23} height={23} alt="user default avatar"/>
                    {
                        isProfileMenuOpen &&
                        <div onClick={handleLogoutClick} className="logOut">
                            Log Out
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default HeaderMenu
