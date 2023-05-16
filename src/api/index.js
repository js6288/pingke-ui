import requests from "@/api/request";

export const test = () =>{
    return requests({
        url:'/test',
        method:'get',
    })
}
