import request from "@/utils/request.ts";

export function getProjectInfo(params: any) {
    return request({
        url: '/mock/project/info',
        method: 'get',
        params: params
    })
}