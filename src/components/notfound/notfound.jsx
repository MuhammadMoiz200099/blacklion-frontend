import React from 'react';
import classess from "./style.module.scss";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    return (
        <div className={classess.mainNotFound}>
            <div className={classess.mainNotFound__message_box}>
                <h1 className={classess.mainNotFound__message_box__heading}>404</h1>
                <p>Page not found</p>
                <div className={classess.mainNotFound__message_box__heading__button_con}>
                    <div className={classess.mainNotFound__message_box__heading__button_con__action_link_wrap}>
                        <a href="#" className={classess.mainNotFound__message_box__heading__button_con__action_link_wrap__link_button} onClick={(e) => {
                            e.preventDefault();
                            navigate('../');
                        }}>Go Back</a>
                        <a href="#" className={classess.mainNotFound__message_box__heading__button_con__action_link_wrap__link_button} onClick={(e) => {
                            e.preventDefault();
                            if (user || localStorage.getItem('accessToken')) {
                                navigate('/')
                            } else {
                                navigate('/')
                            }
                        }}>Go to Home Page</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;