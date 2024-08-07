import { APP_CONFIG_VALUES, GAME_PROCESSES } from '../utils/constants'
import { formatTimestamp } from '../utils/helpers'
import { requestNewMapToast } from '../events/outgoingIpcEvents'
import * as FileService from '../files/fileService'
import * as GlobalUI from '../ui/uiGlobal'
import * as HighscoresUI from '../ui/uiHighscores'
import * as SavedCombosService from '../combo/savedCombosService'

const timeToModalClose = document.getElementById('new-map-resume-time-left');
let timeToModalCloseUpdatingInterval = null;

function setupAutomaticModalHidingCountdown(closeModalCallback) {
  let timeLeft = APP_CONFIG_VALUES.HIDE_NEW_MAP_MODAL_TIMELEFT

  timeToModalCloseUpdatingInterval = setInterval(() => {
    timeLeft -= 1000;
    timeToModalClose.textContent = formatTimestamp(timeLeft)

    if (timeLeft === 0) {
      closeModalCallback()
    }
  }, 1000)
}

async function showNewMapModal(game, mapScriptName, postComboLogicCallback) {
  initMapModal(game)
  requestNewMapToast()

  document.getElementById('navbar-last-combo').click()
  document.getElementById('show-map-modal-button').click()
  
  const newMapSaveBtn = document.getElementById('new-map-save-button')
  const newMapDismissBtn = document.getElementById('new-map-dismiss-button')
  
  setupAutomaticModalHidingCountdown(() => newMapDismissBtn.click())
  
  // Removing old listeners right after event fires ensures that postComboLogicCallback is always invoked only once and mapScriptName is always equal to script name of a map last combo was done on. This way, even if a map is changed when modal is open, proper map script will be assigned to user's specified alias.
  
  const newMapSaveListener = async function(e) {
    newMapSaveBtn.removeEventListener('click', newMapSaveListener)
    await handleNewMapSubmit(game, mapScriptName, postComboLogicCallback)
      .then((data) => {
        data
          ? newMapDismissBtn.removeEventListener('click', newMapDismissListener)
          : newMapSaveBtn.addEventListener('click', newMapSaveListener) 
      })
      .catch((error) => {
        console.error(error);
      })
  }
  
  const newMapDismissListener = async function(e) {
    newMapDismissBtn.removeEventListener('click', newMapDismissListener)
    newMapSaveBtn.removeEventListener('click', newMapSaveListener)
    postComboLogicCallback(false) // shouldSaveCombo = false
    restartModal()
    clearInterval(timeToModalCloseUpdatingInterval)
  }
  
  
  document.getElementById('new-map-name').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      newMapSaveBtn.click()
    }
  })

  newMapDismissBtn.addEventListener('click', newMapDismissListener)
  newMapSaveBtn.addEventListener('click', newMapSaveListener)
}

function initMapModal(game) {
  timeToModalClose.textContent = `${formatTimestamp(APP_CONFIG_VALUES.HIDE_NEW_MAP_MODAL_TIMELEFT)}`
  const mapCategoryContainer = document.getElementById('new-map-category')

  const categories = SavedCombosService.getMapCategoriesArray(game)
  
  categories.forEach(category => {
    const categoryItem = document.createElement('option')
    categoryItem.className = 'map m-0 border-0'
    categoryItem.value = category
    categoryItem.textContent = category
    
    mapCategoryContainer.appendChild(categoryItem) 
  })

  $('#new-map-category').selectpicker('render');
  $('select[name=new-map-category]').val(categories[0])
  $('#new-map-category').selectpicker('refresh');
}

async function handleNewMapSubmit(game, mapScriptName, postComboLogicCallback) {
  const mapInput = document.getElementById('new-map-name')
  const categoryInput = document.getElementById('new-map-category')
  const mapName = mapInput.value.trim().replace(/\s+/g, ' ').toUpperCase()

  if (!isMapInputValid()) {
    GlobalUI.adjustTextInputUI(
      false,
      mapInput,
      mapInput.parentElement,
      'invalid-map-name',
      `Map name has to be at least 2 characters long and at most ${APP_CONFIG_VALUES.MAX_MAP_NAME_INPUT_LENGTH} characters long.`
    )
  } else if (!isMapNameUnique(game, categoryInput.value, mapName)) {
    GlobalUI.adjustTextInputUI(
      false,
      mapInput,
      mapInput.parentElement,
      'invalid-map-name',
      `Map with this name already exists in this category.`
    )
  } else {
    await saveNewMapAlias(game, mapScriptName, mapName, categoryInput.value)

    HighscoresUI.appendNewMapToMapCategoryDropdown(mapScriptName, mapName, categoryInput.value)
    postComboLogicCallback(true) // shouldSaveCombo = true
    restartModal()
    clearInterval(timeToModalCloseUpdatingInterval)
    return true
  }
  
  return false
}

function restartModal () {
  timeToModalClose.textContent = `${formatTimestamp(APP_CONFIG_VALUES.HIDE_NEW_MAP_MODAL_TIMELEFT)}`
  const mapInput = document.getElementById('new-map-name')

  document.getElementById('hide-map-modal-button').click()

  // wait for hiding animation to end
  setTimeout(() => {
    mapInput.value = ''
    $('select[name=new-map-category]').val('THPS1')
    document.getElementById('new-map-category').innerHTML = ''
    $('#new-map-category').selectpicker('render');
    
    const invalidMessageBox = document.getElementById('invalid-map-name')
  
    if (invalidMessageBox) {
      invalidMessageBox.remove()
    }
  
    mapInput.classList.remove('is-invalid')
    mapInput.classList.remove('is-valid')
  }, 500)
}

function isMapInputValid() {
  const mapInputRe = /^[^\s]+(\s{0,1}[^\s]+)*$/
  const mapInputRe2 = /[a-zA-Z0-9]/g
  const mapInput = document.getElementById('new-map-name')
  const mapInputTextLength = mapInput.value.length

  const lettersAndNumbersMatch = mapInput.value.match(mapInputRe2)

  return (
    mapInputTextLength > 1 &&
    mapInputTextLength <= APP_CONFIG_VALUES.MAX_MAP_NAME_INPUT_LENGTH &&
    mapInputRe.test(mapInput.value) &&
    lettersAndNumbersMatch &&
    lettersAndNumbersMatch.length > 1
  )
}

function isMapNameUnique(game, categoryInput, mapNameInput) {
  const mapCategoriesSavedCombos = SavedCombosService.getSavedCombos(game).mapCategories
  let isNameUnique = true

  Object.keys(mapCategoriesSavedCombos).forEach(category => {
    if (categoryInput === category) {
      Object.keys(mapCategoriesSavedCombos[category]).forEach(mapScriptName => {
        if (
          mapCategoriesSavedCombos[category][mapScriptName] &&
          mapCategoriesSavedCombos[category][mapScriptName].name === mapNameInput
        ) {
          isNameUnique = false
        }
      })
    }
  })

  return isNameUnique
}

async function saveNewMapAlias(game, mapScriptName, mapName, categoryName) {
  const savedCombos = SavedCombosService.getSavedCombos(game)

  if (!(savedCombos && savedCombos.mapCategories)) {
    return
  }

  for (const mapCategory in savedCombos.mapCategories) {
    if (mapCategory === categoryName) {
      savedCombos.mapCategories[mapCategory] = {
        ...savedCombos.mapCategories[mapCategory],
        [mapScriptName]: {
          name: mapName,
          scores: [],
          combosTracked: 0,
        }
      }
      break;
    }
  }

  await FileService.saveHighscoresJson(game, savedCombos)
    .catch((error) => {
      console.error(error)
    })
}

export {
  initMapModal,
  showNewMapModal,
}
