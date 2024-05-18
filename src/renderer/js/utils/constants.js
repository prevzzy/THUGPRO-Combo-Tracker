import { isAppInDebugMode } from "../debug/debugHelpers"

export const GAME_PROCESSES = {
  THUGPRO: 'THUGPro.exe',
  RETHAWED: 'reTHAWed.exe',
}

export const GAMES = {
  THUGPRO: 'THUG Pro',
  RETHAWED: 'reTHAWed',
}

export const GAME_CONSTANTS = {
  MAX_INT32_VALUE: 2147483647,
  THUGPRO_CAP_SCRIPT: 'sk5ed',
  THUGPRO_MAIN_MENU_SCRIPT: 'skateshop',
  RETHAWED_CAP_SCRIPT: '5ed',
  RETHAWED_MAIN_MENU_SCRIPT: 'mainmenu'
}

export const BALANCE_TIME_VALUES = {
  NEW_GRIND_TIME_AWARD: -0.0858,
  DOUBLE_GRIND_TIME_PENALTY: 2,
  MANUAL_CHEESE_TIME_PENALTY: 2,
  PIVOT_TIME_PENALTY: 1
}

export const APP_CONFIG_VALUES = {
  HIDE_NEW_MAP_MODAL_TIMELEFT: 300000,
  MINIMAL_SAVEABLE_COMBO_LENGTH: isAppInDebugMode() ? 2000 : 15000,
  MINIMAL_SAVEABLE_COMBO_SCORE: 10000,
  MAX_SCORES_PER_MAP: 10,
  MAX_MAP_NAME_INPUT_LENGTH: 25,
}

export const ERROR_STRINGS = {
  UNKNOWN_MAP: 'UNKNOWN MAP',
  STANDARD_ERROR_TEXT: '???'
}

export const ALL_MAPS = 'allMaps'
export const CREATE_A_PARK = 'CREATE-A-PARK'
