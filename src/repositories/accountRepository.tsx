import { atom } from 'recoil';

var ManagerLogin = atom({
    key:"ManagerLogin",
    default:{}
});

var projectType = atom({
    key: "projectType",
    default: {}
})

export { ManagerLogin, projectType }