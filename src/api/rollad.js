import requests from "@/api/request";

//获取轮播图
export function getRollad() {
    return requests({
        url: '/get/rollad',
        method: 'get',
        headers: {
            isToken: false
        }
    })
}
