import { useState, useEffect } from 'react';
import { useRecoilValue, atom } from 'recoil';
import { projectType } from '../../../repositories/accountRepository';


function TunnelProject(props: any) {
    const setting = useRecoilValue<any>(projectType)
    const ListName : any= {
        'tunnel_kor': '터널 이름(한)', 'tunnel_eng': '터널 이름(영)', 'scanSpeed': '터널 스캐너 이동 속도', 'fps': '영상 FPS', 'direction': '진행 방향',
        'filmSetCount': '촬영 set수', 'cameraCount': '카메라 수', 'spanCount': '스팬 수', 'spanLength': '스팬 길이', 'constructType': '터널 종류',
        'constructWidth': '터널 너비', 'constructLength': '터널 길이', 'crackMaxWidth':'실제 균열 최대 폭', 'offsetPersent':'겹침률'
    }
    
    const rendering = () => {
        let render: any[] = []
        let sub_render: any[]=[]
        for (let key in ListName) {
            if (key === 'filmSetCount') {
                let setCount = JSON.parse(setting[key])
                let str = ""
                setCount.map((item: any, index: number) => {
                    sub_render.push(
                        <>
                            <div className='row' id={'row_index' + index}>
                                <div className="col-3">
                                    <label className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "15px" }}> set{index+1} </label>
                                </div>
                                <div className="col-9">
                                    <input type="text" value={item.FirstCamera+" ~ "+item.LastCamera+"번 카메라"} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "15px" }} />
                                </div>
                            </div>
                        </>
                    )
                    
                })
                console.log(typeof sub_render)
                render.push(<>
                        <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                            <div className="col-2"></div>    
                            <div className="col-2">
                            <label className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "15px" }}> {ListName[key]} </label></div>
                            <div>
                                {sub_render}
                            </div>
                        </div>
                
                </>)
            
            } else {
                render.push(<>
                        <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                            <div className="col-2"></div>    
                            <div className="col-2">
                                <label className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "15px" }}> {ListName[key]} </label></div>
                            <div className="col-6">
                                <input type="text" value={setting[key]} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "15px" }} />
                            </div>
                        </div>
                
                </>)
            }
        }
        return render
    }

    return (
        <>
            {rendering()}
        </>
    );
};

export default TunnelProject;