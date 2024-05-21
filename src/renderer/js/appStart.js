import { ipcRenderer } from 'electron'
import { initIncomingIpcEventListeners } from './events/incomingIpcEvents'
import * as HighscoresUI from './ui/uiHighscores'
import * as GlobalUI from './ui/uiGlobal'
import * as NewMapModalUI from './ui/uiNewMapModal'
import * as SettingsUI from './ui/uiSettings'
import * as GameProcessService from './game/gameProcessService'
import * as LastComboUI from './ui/lastCombo/uiLastCombo'
import * as FileService from './files/fileService'
import { setupGlobalError } from './ui/globalError'
import { app } from '@electron/remote'
import { COMBO_PAGE_INFO_MESSAGES } from './utils/constants'

let isRunning = false

function startApp() {
  if (isRunning) {
    return
  }

  ipcRenderer.send('user-data-path-request')
  ipcRenderer.on('user-data-path-request-response', (event, arg) => {
    initIncomingIpcEventListeners()
    SettingsUI.initSettings()
    runCoreLogic(arg)
    ipcRenderer.removeAllListeners('user-data-path-request-response')
  })

  document.getElementById('app-version').textContent = `v${app.getVersion()}`
}

function runCoreLogic(paths) {
  FileService.setSavingPaths(paths)
  FileService.readAllHighscoreJsons()
    .then(async () => {
      LastComboUI.displayDefaultComboPageInfo()

      isRunning = true

      LastComboUI.init()
      GlobalUI.setupToolbarListeners()
      
      await GameProcessService.mainLoop()

      HighscoresUI.initHighscoresPage()
    })
    .catch((error) => {
      console.error(error)
      setupGlobalError(true, 'Failed to read highscores data. Try resetting your highscores in the settings.', 1)

      LastComboUI.setLastComboPageInfo(
        true,
        COMBO_PAGE_INFO_MESSAGES.TRACKER_UNAVAILABLE,
        1,
        false
      )

      GlobalUI.blockHighscoresPage()
    })
    .finally(() => {
      GlobalUI.showApp()
    })
}

export {
  startApp,
}
