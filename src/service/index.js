import {HTTP} from '../common/request'

export function createTask(data) {
    return HTTP({
        url: '/api/deployment/create',
        method: 'post',
        data
    })
}

export function getDeployment(data) {
    return HTTP({
        url: '/api/deployment',
        method: 'get',
        data
    })
}
