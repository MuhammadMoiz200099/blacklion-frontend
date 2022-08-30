import React from "react";
import classess from "./style.module.scss";
import messagesIcon from "../../assets/icons/message.svg"
import bellIcon from "../../assets/icons/bell.svg"
import HeaderProfileDropDown from "../header-profile-dropdown/header-profile-dropdown";
import { useSelector } from "react-redux";

const HeaderMenu = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className={classess.header_container}>
            <div className={classess.header_container__message_icon}>
                <div className={classess.header_container__message_icon__bubble}></div>
                <img src={messagesIcon} alt="message Icon" />
            </div>
            <div className={classess.header_container__name_container}>
                <div className={classess.header_container__name_container__name}>{user?.firstName || "N/A"} {user?.lastName || "N/A"}</div>
                <div className={classess.header_container__name_container__designation}>Member Guest</div>
            </div>
            <HeaderProfileDropDown />
            <div className={classess.header_container__bell_icon}>
                <div className={classess.header_container__bell_icon__bubble_with_text}>2</div>
                <img src={bellIcon} alt="Bell Icon" />
            </div>
        </div>
    );
};

export default HeaderMenu;