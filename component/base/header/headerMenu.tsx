import Image from "next/image"
import {useEffect, useState} from "react";
import {AuthContextStaticData} from "../../../static/AuthContextStaticData";
import {useRouter} from "next/router";
import firebase from "../../../lib/firbase";
import {UseAuthDataStateValue} from "../../../context/AuthContext";

const HeaderMenu = () => {
    const router = useRouter();
    const [isProfileMenuOpen, setData] = useState(false);
    const currentPage = useRouter().route
    const showBackIcon = currentPage.includes('my');
    const {setAuthDataState} = UseAuthDataStateValue();

    const openMenu = () => {
        setData(!isProfileMenuOpen);
    }

    const handlePreviousPageClick = () => {
        router.push('/webPortalResult');
    }

    const handleLogoutClick = () => {
        firebase
            .auth()
            .signOut()
            .then(
                function(response) {
                    console.log(response);
                },
                function(error) {
                    console.log(error);
                }
            );
        setAuthDataState({type: AuthContextStaticData.UPDATE_AUTH_TOKEN, token: ""});
        localStorage.removeItem("selectedKitId");
        localStorage.removeItem("accessToken");
        router.push('/auth/login');
    }

    return (
        <header className="header">
            <div className="fullWidthMenu">
                <div className="icon">
                    {
                        showBackIcon &&
                        <Image onClick={handlePreviousPageClick} src="/back.svg" width={12} height={12} alt="back arrow"/>
                    }
                </div>
                <div>
                    <Image src="/group.svg" width={136} height={16} alt="FH HEALTH"/>
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

export default HeaderMenu;
