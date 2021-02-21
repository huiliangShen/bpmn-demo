import {HTTP} from '../common/request'

export function createTask(data) {
    return HTTP({
        url: '/api/deployment/create',
        method: 'post',
        data
    })
}
