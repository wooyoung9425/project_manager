import React,{useState, useEffect} from 'react'
import { Layout } from '../../allcomponents';
import { apiHelper, messageBox } from '../../allutils';
import { ReturnValues } from '../../allmodels';
import { User, Company } from '../../alltypes';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

function CompanyAdd(props: any) {
    const [isBind, SetIsBind] = useState(false);
    const [isCheck,setIsCheck]=useState(false)
    const [list, setList] = useState<Company[]>();
    const navigate = useNavigate();
    const [company, setCompany] = useState<Company>({
        name: "", phone: "", businessRegNo: "", addr1: "",
        addr2: "", masterID: 0, employee: "", isAccept: false
    });

    useEffect(function() {
        DataBind();
    }, [isBind,isCheck]);

    // 고객서 추가 api연결
    const registCompany = () => {
        console.log(company)
        console.log(isCheck)
        if (isCheck) {
            apiHelper.Post("/company/regist", company, (rst: ReturnValues<Company>) => {
                if (rst.check === true) {
                    alert(" 고객사 정보 추가")
                    SetIsBind(true);
                    navigate('/company/list')
                } else {
                    messageBox.Alert(rst.message)
                }
            });
        } else {
            messageBox.Alert("회사명의 중복확인을 해주세요.")
        }
    }

    // 고객사 정보 입력시 정보입력
    const onChangeList = (row_name: string, res: any) => {
        if (row_name === 'masterID') {
            setCompany({...company, [row_name]:Number(res.target.value)})
        } else {
            setCompany({...company, [row_name]:res.target.value})
        }

    }
    // 목록보기로 페이지 이동
    const btnList = () => {
        navigate('/company/list')
    }

    const DataBind = () => {
        apiHelper.Get('/company/list', {}, (rst: ReturnValues<Company[]>) => {
            if (rst.check && rst.data !== null && rst.data !== undefined) {
                setList(rst.data)
                SetIsBind(true)
            }
        })
    }
    const NameCheck = () => {
        if (company.name === '') {
            messageBox.Alert('회사이름을 입력하세요',()=>navigate('/company/add'))
        } else {
            const index = list?.findIndex((item: any) => ( item.name === company.name ))
            if (index === -1) {
                messageBox.Success("추가 가능한 고객사입니다.")
                setIsCheck(true)
            } else {//중복
                messageBox.Alert("이미 있는 고객사입니다.")
            }
            
        }
        // console.log(list,company.name)
    }
    return (
        <Layout section="Company" title="회사 추가">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                        <div className='row' style={{"margin":"30px"}}>
                            <div className="col-5"></div>
                            <div className="col-5"><h1 style={{ "alignItems": "center" }}> 고객사 정보 </h1></div>
                            <div className="col-5"></div>    
                        </div>
                        <div className="row g-3 align-items-center" >
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>    
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{"fontSize":"18px"}}>회사명</span></div>
                                <div className="col-5">
                                    <input type="text" className="form-control" onChange={ (e:any)=>onChangeList("name", e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                                <div className='col-2'>
                                        <button type="button" className="btn btn-outline-primary btn-lg" style={{ margin: "10px", width: "50%", fontSize: "15px" }} onClick={ NameCheck}> 중복확인 </button>
                                </div>    
                            </div>
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>담당자</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" onChange={ (e:any)=>onChangeList("employee", e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                            </div>
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>주소</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" onChange={ (e:any)=>onChangeList("addr1", e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                            </div>
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>상세 주소</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" onChange={ (e:any)=>onChangeList("addr2", e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                            </div>    
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>사업자 번호</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" onChange={ (e:any)=>onChangeList("businessRegNo", e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                                </div>
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>회사 메일 도메인</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                            </div>
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>연락처</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" onChange={ (e:any)=>onChangeList("phone", e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                            </div>
                              
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>요금제</span></div>
                                <div className="col-6">
                                    <select className="form-select form-select-lg mb-3" onChange={ (e:any)=>onChangeList("masterID", e)} aria-label="Default select example" style={{ "fontSize": "18px", width:"650px", height: "40px", marginTop:"5px", borderRadius:"10px"}}>
                                        <option selected>요금제 선택</option>
                                        <option value="2"> 베이직 </option>
                                        <option value="3"> 프리미엄  </option>
                                    </select>
                                </div>
                                </div>
                                <div className="input-group input-group-lg" style={{ "marginBottom": "20px" }}>
                                    <div className='col-2'></div>
                                    <div className='col-8'>
                                        <button type="button" className="btn btn-outline-primary btn-lg" onClick={ registCompany} style={{ margin: "10px", width:"100%", fontSize:"20px"}}> Submit </button>
                                    </div>
                                    <div className='col-2'>
                                        <button type="button" className="btn btn-primary" onClick={btnList} style={{ margin: "10px",fontSize:"15px"}}>목록보기</button>
                                    </div>
                                    
                                </div>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}
export default CompanyAdd;