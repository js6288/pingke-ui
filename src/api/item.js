import requests from "@/api/request";

//提交项目
export function commitItem(data) {
    return requests({
        url: '/item/commit',
        method: 'post',
        data: data
    })
}

//查询我的所有项目
export function getMyItem(){
    return requests({
        url: '/get/my/item',
        method: 'get'
    })
}

//根据itemId查询项目详情
export function getItemDetail(itemId){
    return requests({
        url: '/get/item/by/'+ itemId,
        method: 'get'
    })
}
