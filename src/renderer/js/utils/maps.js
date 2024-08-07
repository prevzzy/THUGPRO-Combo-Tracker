import { GAMES, GAME_PROCESSES } from "./constants"

export const maps = {
  [GAME_PROCESSES.RETHAWED]: {
    THPS1: {
      sc: 'SCHOOL',
      MA: 'THE MALL',
      CH: 'CHICAGO',
      DN: 'MINNEAPOLIS',
    },
    THPS2: {
      hn: 'HANGAR',
      sc2: 'SCHOOL II',
      MS: 'MARSEILLES',
      chopper: 'CHOPPER DROP',
    },
    THPS3: {
      ap: 'AIRPORT',
    },
    THPS4: {
      sch: 'COLLEGE',
      kon: 'KONA SKATEPARK'
    },
    THUG: {
      nj: 'NEW JERSEY',
      ny: 'MANHATTAN',
      hi: 'HAWAII',
    },
    THUG2: {
      tr: 'TRAINING',
      BO: 'BOSTON',
      ba: 'BARCELONA',
      AU: 'AUSTRALIA',
      st: 'SKATOPIA',
    },
    THAW: {
      HO: 'HOLLYWOOD',
      BH: 'BEVERLY HILLS',
      DT: 'DOWNTOWN LA',
      EL: 'EAST LA',
      SM: 'SANTA MONICA',
      OI: 'OIL RIG',
      SV: 'VANS PARK',
      LV: 'CASINO',
      SR: 'SKATE RANCH',
      SZ: 'SANTA CRUZ',
      JA: 'KYOTO',
      SV2: 'THE RUINS',
      AT: 'ATLANTA',
    },
    THP8: {
      houses: 'SUBURBS',
      shops: 'DOWNTOWN',
      Center: 'CITY CENTER',
      inschool: 'HIGH SCHOOL',
      riod: 'DOWNHILL'
    },
    "MISC LEVELS": {
      canpsx: 'CANADA (PSX)',
      pizza: 'PIZZA PLANET'
    }
  },
  [GAME_PROCESSES.THUGPRO]: {
    THPS1: {
      ware: 'WAREHOUSE',
      SC: 'SCHOOL',
      z_ma: 'THE MALL',
      skatepark: 'SKATEPARK',
      z_dn: 'MINNEAPOLIS',
      DJ: 'DOWNHILL JAM',
      burn: 'BURNSIDE',
      ros: 'ROSWELL'
    },
    THPS2: {
      hn: 'HANGAR',
      SC2: 'SCHOOL II',
      z_ms: 'MARSEILLE',
      VN: 'VENICE',
      PH: 'PHILADELPHIA'
    },
    THPS3: {
      foun: 'FOUNDRY',
      CA: 'CANADA',
      rio: 'RIO',
      sub: 'SUBURBIA',
      AP: 'AIRPORT',
      si: 'SKATER ISLAND',
      LA: 'LOS ANGELES',
      tok: 'TOKYO',
      shp: 'CRUISE SHIP',
      oil: 'OIL RIG'
    },
    THPS4: {
      sch: 'COLLEGE',
      sf2: 'SAN FRANCISCO',
      alc: 'ALCATRAZ',
      kon: 'KONA',
      lon: 'LONDON',
      jnk: 'SHIPYARD',
      zoo: 'ZOO',
      cnv: 'CARNIVAL',
      hof: 'CHICAGO',
      practice: 'PRACTICE'
    },
    THUG: {
      NJ: 'NEW JERSEY',
      ny: 'MANHATTAN',
      FL: 'TAMPA',
      SD: 'SAN DIEGO',
      HI: 'HAWAII',
      vc: 'VANCOUVER',
      sj: 'SLAM CITY JAM',
      ru: 'MOSCOW',
      hh: 'HOTTER THAN HELL'
    },
    THUG2: {
      TR: 'TRAINING',
      BO: 'BOSTON',
      BA: 'BARCELONA',
      BE: 'BERLIN',
      AU: 'AUSTRALIA',
      NO: 'NEW ORLEANS',
      ST: 'SKATOPIA',
      SE: 'PRO SKATER',
      SE2: 'THE TRIANGLE'
    },
    THAW: {
      z_ho: 'HOLLYWOOD',
      z_bh: 'BEVERLY HILLS',
      z_dt: 'DOWNTOWN',
      z_el: 'EAST LA',
      z_sm: 'SANTA MONICA',
      z_oi: 'OIL RIG',
      vans: 'VANS PARK',
      z_lv: 'CASINO',
      z_sr: 'SKATE RANCH',
      z_sv2: 'THE RUINS',
      sz: 'SANTA CRUZ',
      kyoto: 'KYOTO',
      atlanta: 'ATLANTA'
    },
    THP8: {
      z_center: 'CITY CENTER',
      HISCH: 'HIGH SCHOOL',
      z_funpark: 'FUN PARK',
      z_riod: 'DOWNHILL'
    },
    "THPG (Larxian's ports)": {
      Philly: 'PHILLY',
      Baltimore: 'BALTIMORE',
      WashingtonDC: 'DC'
    },
    "MISC LEVELS": {
      toystory_bedroom: "ANDY'S ROOM"
    },
  },
  [GAME_PROCESSES.THUG2]: {
    [GAMES.THUG2]: {
      TR: 'TRAINING',
      BO: 'BOSTON',
      BA: 'BARCELONA',
      BE: 'BERLIN',
      AU: 'AUSTRALIA',
      NO: 'NEW ORLEANS',
      ST: 'SKATOPIA',
      SE: 'PRO SKATER',
      SE2: 'THE TRIANGLE',
      SC: 'SCHOOL',
      PH: 'PHILADELPHIA',
      DJ: 'DOWNHILL JAM',
      LA: 'LOS ANGELES',
      CA: 'CANADA',
      AP: 'AIRPORT',
    }
  },
  [GAME_PROCESSES.THAW]: {
    [GAMES.THAW]: {
      HO: 'HOLLYWOOD',
      BH: 'BEVERLY HILLS',
      DT: 'DOWNTOWN',
      EL: 'EAST LA',
      SM: 'SANTA MONICA',
      OI: 'OIL RIG',
      SV: 'VANS PARK',
      LV: 'CASINO',
      SR: 'SKATE RANCH',
      DN: 'MINNEAPOLIS',
      SZ: 'SANTA CRUZ',
      MA: 'THE MALL',
      CH: 'CHICAGO',
      JA: 'KYOTO',
      SV2: 'THE RUINS',
    }
  },
}
