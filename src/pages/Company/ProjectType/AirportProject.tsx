import { useState, useEffect } from 'react';
import { useRecoilValue, atom } from 'recoil';
import { projectType } from '../../../repositories/accountRepository';


function AirportProject(props: any) {
    const setting = useRecoilValue<any>(projectType)
    const ListName : any= {
        'airport_kor': '공항 이름(한)', 'airport_eng': '공항 이름(영)', 'airstripWidth': '활주로 너비','airstripLength': '댐 구역',
        'cameraCount': '카메라 수', 'cameraFocus': '카메라 초점 거리','cameraSensor': '카메라 센서 크기',
        'spanCount': '스팬 수', 'spanLength': '스팬 길이', 'crackMaxWidth': '실제 균열 최대 폭',
        'droneAltitude': '드론 촬영 고도','imageHeight': '이미지 높이', 'imageWidth': '이미지 너비', 'overlap':'촬영 시 겹칩률',
    }
    const rendering = () => {
        let render :any[]=[]
        for (let key in ListName) {
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
        return render
    }

    return (
        <>
            {rendering()}
        </>
    );
};

export default AirportProject;