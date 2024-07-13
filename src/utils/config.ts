import fse from 'fs-extra'
import yaml from 'js-yaml'

class Config {
    private defaultConfig = {
        // OneDrive
        OneDrive: {
            client_id: 'your_client_id',
            client_secret: 'your_client_secret',
            redirect_uri: 'your_redirect_uri',
            authority: 'https://login.microsoftonline.com/common',
            scopes: ['https://graph.microsoft.com/.default']
        }
        // SMTP

        // File
    }

    private config: typeof this.defaultConfig

    constructor() {
        if (!fse.existsSync('./config.yaml')) {
            console.log('config.yaml not found, create one')
            fse.writeFileSync('./config.yaml', yaml.dump(this.defaultConfig))
            process.exit(0)
        }
        this.config = yaml.load(
            fse.readFileSync('./config.yaml', 'utf8')
        ) as typeof this.defaultConfig
    }

    get() {
        return this.config
    }
}

const config = new Config()

export default config
