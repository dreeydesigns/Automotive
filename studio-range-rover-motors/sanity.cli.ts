import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ckvlowx4',
    dataset: 'production',
  },
  deployment: {
    appId: 'bz1vu35mri76uu067u9rsqtc',
    autoUpdates: true,
  },
})
