import axios from 'axios'
import config from '@/utils/config'
import error from './error'
import { Client } from '@microsoft/microsoft-graph-client'

const { OneDrive: OneDriveConfig } = config.get()

const getAccessToken = async () => {
    let token = ''
    try {
        const res = await axios.post(
            OneDriveConfig.authority + '/oauth2/v2.0/token',
            null,
            {
                params: {
                    client_id: OneDriveConfig.client_id,
                    client_secret: OneDriveConfig.client_secret,
                    redirect_uri: OneDriveConfig.redirect_uri,
                    grant_type: 'client_credentials',
                    scope: OneDriveConfig.scopes.join(' ')
                }
            }
        )
        token = res.data.access_token
    } catch (e) {
        error.new(e, '获取 Onedrive token 失败', 'fatal')
    }
    return token
}

const token = await getAccessToken()

export const upload = async (fileStream: Blob, onedrivePath: string) => {
    try {
        const client = Client.init({
            authProvider: (done) => {
                done(null, token)
            }
        })

        const response = await client
            .api(`/me/drive/root:${onedrivePath}:/content`)
            .put(fileStream)

        return {
            status: true,
            data: response
        }
    } catch (e) {
        error.new(e, '上传文件到 Onedrive 失败', 'error')
        return {
            status: false,
            error: e,
            message: '上传文件到 Onedrive 失败'
        }
    }
}
