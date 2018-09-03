import * as Config from '../../config/Config'

const host = 'http://localhost:8080'

const isWeb = WXEnvironment.platform === 'Web'

const Url = {
    login: `${isWeb ? '/proxy' : host}/api/app/sys/login`
}

export default Url
