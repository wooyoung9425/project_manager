import { useState, useEffect } from 'react';
import { Layout,DataGrid } from '../../allcomponents';
import { useRecoilState, atom } from 'recoil';
import { ManagerLogin } from '../../repositories/accountRepository';
import { apiHelper } from '../../allutils';
import { ReturnValues } from '../../allmodels';
import { User } from '../../alltypes';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function CompanyListPage(props:any) {
    const [manager, setManager] = useRecoilState(ManagerLogin);
    const [isBind, SetIsBind] = useState(false);
    const [list, setList] = useState<User[]>();
    const navigate = useNavigate();

    const DataBind = () => {
        if (!isBind) {
            apiHelper.Get("/company/list", {}, (rst: ReturnValues<User[]>) => {
                console.log(rst)
                if (rst.check && rst.data !== null && rst.data !== undefined) {
                    setList(rst.data);
                    SetIsBind(true);
                }
            });
        }
    };

    useEffect(function() {
        DataBind();
    }, [isBind]);

    const columns = [
        { key: 'id', name: 'ID', show:false, isKey:false },
        { key: 'name', name: '회사명', show:true, isKey:false },
        { key: 'employee', name: '담당자', show:true, isKey:false },
        { key: 'businessRegNo', name: '사업자번호', show:true, isKey:false },
        { key: 'phone', name: '연락처', show:true, isKey:false },
        { key: 'masterID', name: '요금제', show:true, isKey:false },
        { key: 'isAccept', name: '승인여부', show: true, isKey: false, on: "승인", off: "미승인" },
        { key: 'delete', name: '삭제', show: true, isKey: false}
    ];

    const onRowClick = (row:any) => {
        navigate(`/company/view/${row.key}`);
    };

    const CompanyAdd = () => {
        navigate('/company/add')
    }

    return (
        <Layout section="Company" title="회사목록">
            <div className="row">
                <div className="col-11"></div>
                <div className="col-1"> <button type="button" className="btn btn-outline-primary btn-lg" onClick={CompanyAdd} style={{margin:"10px"}}> 추가 </button></div>
            </div>
             <div className="row">
                <div className="col-12">
                    <div className="card">
                    <div className="card-body">
                        {
                            (isBind) ? 
                            <DataGrid cols={columns} data={list} size={10} onRowClicked={onRowClick} fontsize={15} />
                            :
                            <div className="spinner-border text-primary" style={{ margin : "0 auto" }} role="status"></div>
                        }
                    </div>
                    </div>
                </div>
             </div>
        </Layout>
    );
};

export default CompanyListPage;