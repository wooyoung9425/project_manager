import { Footer } from "../allcomponents";
import { ReturnValue,ReturnValues } from "../allmodels";
import { apiHelper,util,formHelper,messageBox } from "../allutils";
import config from "../config";

//로그인 페이지 (시작 페이지)
const LoginPage = () => {
    const BtnLogin = () => {
        formHelper("frm", function(jsonData:any) {
            if (util.IsNullOrEmpty(jsonData.email)) {
                messageBox.Alert("아이디를 입력하세요.");
            } else if (util.IsNullOrEmpty(jsonData.password)) {
                messageBox.Alert("비밀번호를 입력하세요.");
            } else {
                apiHelper.Post("/Account/Manager/Login", jsonData, (rst:ReturnValue) => {
                    if (rst.check) {
                        //로그인에 성공하면 
                        util.setCookie(config.key, rst.value); //쿠키에 저장하고
                        util.Move('/main'); //main 페이지로 이동합니다.
                    } else {
                        messageBox.Alert(rst.message);
                    }
                });
            }
        });
    };

    return(
        <>
        <div className="page-wrapper">
            <div className="page-content">
                <div className="container-fluid">
<div className="row">
<div className="col-3"></div>
<div className="col-6">
<div className="card shadow-lg">
<div className="card-body">
    <div className="px-3">
        <div style={{ textAlign:"center" }}>
            <img src="#" height="55" alt="logo" className="auth-logo" />
        </div>
        <div className="text-center auth-logo-text">
            <h4 className="mt-0 mb-3 mt-5">Deep v1.0 Management</h4>
            <p className="text-muted mb-0">Sign in to continue to Management System.</p>  
        </div>
        <form className="form-horizontal auth-form my-4" name="frm" id="frm" method="post">
            <div className="form-group">
                <label htmlFor="managerid">Manager ID</label>
                <div className="input-group mb-3">
                    <span className="auth-form-icon">
                        <i className="dripicons-user"></i> 
                    </span>                                                                                                              
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter Manager Email" defaultValue={''} />
                </div>                                    
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>                                            
                <div className="input-group mb-3"> 
                    <span className="auth-form-icon">
                        <i className="dripicons-lock"></i> 
                    </span>                                                       
                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" defaultValue={''} />
                </div>                               
            </div>
            <div className="form-group row mt-4">
                <div className="col-sm-6">
                    <div className="custom-control custom-switch switch-success">
                        <input type="checkbox" className="custom-control-input" id="customSwitchSuccess" />
                        <label className="custom-control-label text-muted" htmlFor="customSwitchSuccess">Remember me</label>
                    </div>
                </div>
            </div>

            <div className="form-group mb-0 row">
                <div className="col-12 mt-2">
                    <button className="btn btn-gradient-primary btn-round btn-block waves-effect waves-light" type="button" onClick={BtnLogin}>Log In <i className="fas fa-sign-in-alt ml-1"></i></button>
                </div>
            </div>
        </form>
    </div>
    
    <div className="m-3 text-center text-muted">
        <p className="">Don't have an account ?  <a href="http://deepinspection.ai/" target="_blank" className="text-primary ml-2">Contact us</a></p>
    </div>
</div>
</div>
</div>
</div>
                </div>
                <Footer />
            </div>
        </div>
        </>
    );
};

export default LoginPage;