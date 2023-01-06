import React,{useState} from 'react'
import { Layout } from '../../allcomponents';
function MessageEmailList(props: any) {
    const [isBind, SetIsBind] = useState(false);
    return (
        <Layout section="Member" title="회원목록">
             <div className="row">
                <div className="col-12">
                    <div className="card">
                    <div className="card-body">
                        {
                            (isBind) ? 
                            // <DataGrid cols={columns} data={list} size={10} onRowClicked={onRowClick} fontsize={10} />
                            ""
                            :
                            <div className="spinner-border text-primary" style={{ margin : "0 auto" }} role="status"></div>
                        }
                    </div>
                    </div>
                </div>
             </div>
        </Layout>
  )
}
export default MessageEmailList;