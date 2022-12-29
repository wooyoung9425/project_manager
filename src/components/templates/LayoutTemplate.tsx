import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Header } from '../allmolecules';
import { messageBox, util } from '../../allutils';
import { Account } from '../../alltypes';
import config from '../../config';
import { useJwt } from "react-jwt";
import { useRecoilState, atom } from 'recoil';
import { ManagerLogin } from '../../repositories/accountRepository';

function LayoutTemplate(props:any) {
    const access_token = util.getCookie(config.key);
    const { decodedToken, isExpired } = useJwt(access_token);
    const [manager, setManager] = useRecoilState(ManagerLogin);
    const navigate = useNavigate();

    useEffect(() => {
        if (!util.IsNullOrEmpty(access_token) && decodedToken !== null) {
            let account = decodedToken as Account;
            setManager(account);
        }

        if (util.IsNullOrEmpty(access_token) || manager === null || manager === undefined) {
            let account = manager as Account;
            if (account.id === null || account.id === undefined || Number(account.id) < 1) {
                messageBox.Alert("로그인 후 이용 가능합니다.", () => {
                    navigate("/");
                });
            }
        }
    }, []);

    return (
        (!util.IsNullOrEmpty(access_token) && manager !== null && manager !== undefined) ? 
        <>
        <Header />
        <div className="page-wrapper">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-title-box">
                                <div className="float-right">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">Home</li>
                                        <li className="breadcrumb-item active">{props?.section}</li>
                                    </ol>
                                </div>
                                <h4 className="page-title">{props?.title}</h4>
                            </div>
                        </div>
                    </div>
                    {props.children}
                </div>
                <Footer />
            </div>
        </div>
        </> : 
        <></>
    );
};

export default LayoutTemplate;