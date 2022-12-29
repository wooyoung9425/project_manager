import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const swal = withReactContent(Swal);

//디자인된 경고창 띄우기 위한 함수
const MessageBox = {
    Alert : function(msg:String, callback?:Function):void {
        swal.fire({
            title: <p>{msg}</p>,
            confirmButtonColor: '#dc3545',
            icon:'error',
        }).then(() => { if (callback !== null && callback !== undefined) callback(); });
    }, 
    Confirm : function(msg:String, callback?:Function):void {
        swal.fire({
            title: <p>{msg}</p>,
            icon:'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => { 
            if (callback !== null && callback !== undefined) {
                if (result.isConfirmed) {
                    callback(); 
                }
            }
        });
    },
    Success : function(msg:String, callback?:Function):void {
        swal.fire({
            title: <p>{msg}</p>,
            confirmButtonColor: '#28a745',
            icon:'success',
        }).then(() => { if (callback !== null && callback !== undefined) callback(); });
    }
};

export default MessageBox;
