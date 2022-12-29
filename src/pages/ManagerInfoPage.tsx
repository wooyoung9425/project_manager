import { useState, useEffect } from 'react';
import { Layout,DataGrid } from '../allcomponents';
import { useRecoilState, atom } from 'recoil';
import { ManagerLogin } from '../repositories/accountRepository';
import { apiHelper } from '../allutils';
import { ReturnValues } from '../allmodels';
import { User } from '../alltypes';
import { useNavigate } from 'react-router-dom';
import {Button, Form, Input, Modal} from 'antd';

function ManagerInfoPage(props:any) {
    const navigate = useNavigate();
    const [isBind, SetIsBind] = useState(false);
    const [user_id, SetUser_id] = useState(3)
    const [adminInfo, setAdminInfo] = useState<any>()
    const [newPhone,setPhone]=useState("")
    const [newName, setName] = useState("")
    // const [newPW, setPW] = useState({pre-pw:"",pw1:"",pw2:""})
    const [newPW, setPW] = useState({'pre-pw':"",'pw1':"", 'pw2':""})
    const [open, setOpen] = useState(false);
    const DataBind = () => {
        if (!isBind) {
            apiHelper.Post(`/account/member/view/${user_id}`, {}, (rst: ReturnValues<User[]>) => {
                let admin  = Object(rst.data)
                console.log(admin)
                if (rst.check && rst.data !== null && rst.data !== undefined) {
                    SetIsBind(true);
                    // console.log({ email: admin.email, pw: "", name: admin.name, phone: admin.phone })
                    setAdminInfo({ email: admin.email, pw: "", name: admin.name, phone: admin.phone })
                    setPhone(admin.phone)
                    setName(admin.name)
                }
            });
        }
    };
    
    useEffect(function() {
        DataBind();
    }, [isBind]);

    // const onRowClick = (row:any) => {
    //     navigate(`/member/view/${row.key}`);
    // };

    const columns = [
        { key: 'email', name: '이메일', show: true, isKey: true },
        { key: 'pw', name: '비밀번호', show: true, isKey: true },
        { key: 'name', name: '이름', show: true, isKey: true },
        { key: 'phone', name: '연락처', show: true, isKey: true }
    ]
    const EditPW = () => {
        // console.log(newPW)
        // apiHelper.Post(`/account/member/edit/${user_id}`, {}, (rst: ReturnValues<User[]>) => { 
        //     if (rst.check && rst.data !== null && rst.data !== undefined) {
        //         console.log(rst.data)
        //     }
        // })  
    }
    const EditInfo = () => {
        // const body = JSON.stringify({ name: newName, phone: newPhone } )
        if (adminInfo.name === newName ) {
            alert("이름이 동일합니다.")
        } else if (adminInfo.phone === newPhone) {
            alert("연락처가 동일합니다.")
        } else {
            apiHelper.Post(`/account/member/edit/${user_id}`, { name: newName, phone: newPhone }, (rst: ReturnValues<User[]>) => {
                if (rst.check ===true) {
                    alert("회원 정보를 수정했습니다.")
                }
            })  
        }
       
    }
    const ChangeInfo = (e:any) => {
        const id :string = e.target.id
        if (id === 'phone') {
            setPhone(e.target.value)
        } else if (id === 'name') {
            setName(e.target.value)
        } else if (id.includes('pw')) {
            if (id === 'pw2') {
                if (newPW.pw1 === e.target.value) {
                    setPW({...newPW, [id]:e.target.value})
                }
            } else {
                setPW({...newPW, [id]:e.target.value})
            }
        }
    }
    const showModal = () => {
        setOpen(true);
    };

    const hideModal = (text:string) => {
        if (text === "변경") {
            apiHelper.Post(`/account/member/password/change/${user_id}`, { oldpassword: newPW['pre-pw'], newpassword: newPW.pw2 }, (rst: ReturnValues<User[]>) => { 
                if (rst.check === true) {
                    alert("정상적으로 비밀번호가 변경되었습니다.")
                    setOpen(false);
                } else {
                    alert(rst.message)
                }
            })
        } else if (text === "취소") {

            setOpen(false);
        }
        
    };
    return (
        <Layout section="Manager" title="관리자 정보">
             <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            {(isBind) ?
                                <Form labelCol={{ span: 4, }} wrapperCol={{ span: 14, }} >
                                    <Form.Item label='이메일' >
                                        <Input size="large" value={adminInfo.email} disabled/>
                                    </Form.Item>
                                    <Form.Item label='비밀번호'>
                                        <Input size="large" style={{ width: "685px", marginRight: "20px" }} disabled value="*****"/>
                                        <Button type="primary" danger style={{ float: "right" }} onClick={showModal}> 변경</Button>
                                        <Modal title="비밀번호 변경" open={open} onOk={()=>hideModal("변경")} onCancel={()=>hideModal("취소")} okText="변경" cancelText="취소" >
                                            <Form labelCol={{ span: 6, }} wrapperCol={{ span: 12, }} >
                                                <Form.Item label='현재 비밀번호' >
                                                    <Input onChange={ChangeInfo} id="pre-pw"/>
                                                </Form.Item>
                                                <Form.Item label='비밀번호' >
                                                    <Input onChange={ChangeInfo} id="pw1"/>
                                                </Form.Item>
                                                <Form.Item label='비밀번호 확인' >
                                                    <Input onChange={ChangeInfo} id="pw2"/>
                                                </Form.Item>
                                             </Form>
                                        </Modal>
                                    </Form.Item>
                                    <Form.Item label='이름'>
                                        <Input size="large" id="name" defaultValue={adminInfo.name} onChange={ChangeInfo}/> 
                                    </Form.Item>
                                    <Form.Item label='연락처'>
                                        <Input size="large" id="phone" defaultValue={adminInfo.phone} onChange={ChangeInfo} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button  type="primary" htmlType='submit' style={{width:"770px", marginLeft:"220px"}}  onClick={EditInfo}>Edit</Button>
                                    </Form.Item>
                                </Form>
                                :
                                <div></div>
                            }
                       
                    </div>
                    </div>
                </div>
             </div>
        </Layout>
    );
};

export default ManagerInfoPage;