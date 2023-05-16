import requests from "@/api/request";
export function policy() {
       return requests({
            url: '/oss/policy',
            method: "get",
        })
}
