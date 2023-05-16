import requests from "@/api/request";
//优秀项目数据
export function getAdshow(){
    return requests({
        url: '/get/adshow',
        method: 'get',
        headers: {
            isToken: false
        }
    })
}
