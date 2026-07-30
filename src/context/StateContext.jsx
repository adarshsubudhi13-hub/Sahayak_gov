import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getStateById } from '../lib/seed/states.js';
import { TELANGANA_SCHEMES, TELANGANA_ELIGIBILITY_RULES } from '../lib/seed/telanganaSchemes.js';
import { MAHARASHTRA_SCHEMES, MAHARASHTRA_ELIGIBILITY_RULES } from '../lib/seed/maharashtraSchemes.js';
import { KARNATAKA_SCHEMES, KARNATAKA_ELIGIBILITY_RULES } from '../lib/seed/karnatakaSchemes.js';
import { TAMILNADU_SCHEMES, TAMILNADU_ELIGIBILITY_RULES } from '../lib/seed/tamilnaduSchemes.js';
import { KERALA_SCHEMES, KERALA_ELIGIBILITY_RULES } from '../lib/seed/keralaSchemes.js';
import { UP_SCHEMES, UP_ELIGIBILITY_RULES } from '../lib/seed/upSchemes.js';
import { BIHAR_SCHEMES, BIHAR_ELIGIBILITY_RULES } from '../lib/seed/biharSchemes.js';
import { RAJASTHAN_SCHEMES, RAJASTHAN_ELIGIBILITY_RULES } from '../lib/seed/rajasthanSchemes.js';
import { GUJARAT_SCHEMES, GUJARAT_ELIGIBILITY_RULES } from '../lib/seed/gujaratSchemes.js';
import { WESTBENGAL_SCHEMES, WESTBENGAL_ELIGIBILITY_RULES } from '../lib/seed/westbengalSchemes.js';
import { MP_SCHEMES, MP_ELIGIBILITY_RULES } from '../lib/seed/mpSchemes.js';
import { AP_SCHEMES, AP_ELIGIBILITY_RULES } from '../lib/seed/andhraPradeshSchemes.js';
import { PUNJAB_SCHEMES, PUNJAB_ELIGIBILITY_RULES } from '../lib/seed/punjabSchemes.js';
import { ODISHA_SCHEMES, ODISHA_ELIGIBILITY_RULES } from '../lib/seed/odishaSchemes.js';
import { ASSAM_SCHEMES, ASSAM_ELIGIBILITY_RULES } from '../lib/seed/assamSchemes.js';
import { CENTRAL_SCHEMES, CENTRAL_ELIGIBILITY_RULES } from '../lib/seed/centralSchemes.js';

const StateContext = createContext();

/** Map of stateId → { schemes, rules } */
const STATE_DATA_MAP = {
  telangana:        { schemes: TELANGANA_SCHEMES,  rules: TELANGANA_ELIGIBILITY_RULES },
  andhra_pradesh:   { schemes: AP_SCHEMES,          rules: AP_ELIGIBILITY_RULES },
  maharashtra:      { schemes: MAHARASHTRA_SCHEMES, rules: MAHARASHTRA_ELIGIBILITY_RULES },
  karnataka:        { schemes: KARNATAKA_SCHEMES,   rules: KARNATAKA_ELIGIBILITY_RULES },
  tamil_nadu:       { schemes: TAMILNADU_SCHEMES,   rules: TAMILNADU_ELIGIBILITY_RULES },
  kerala:           { schemes: KERALA_SCHEMES,      rules: KERALA_ELIGIBILITY_RULES },
  uttar_pradesh:    { schemes: UP_SCHEMES,           rules: UP_ELIGIBILITY_RULES },
  bihar:            { schemes: BIHAR_SCHEMES,        rules: BIHAR_ELIGIBILITY_RULES },
  rajasthan:        { schemes: RAJASTHAN_SCHEMES,    rules: RAJASTHAN_ELIGIBILITY_RULES },
  gujarat:          { schemes: GUJARAT_SCHEMES,      rules: GUJARAT_ELIGIBILITY_RULES },
  west_bengal:      { schemes: WESTBENGAL_SCHEMES,   rules: WESTBENGAL_ELIGIBILITY_RULES },
  madhya_pradesh:   { schemes: MP_SCHEMES,           rules: MP_ELIGIBILITY_RULES },
  punjab:           { schemes: PUNJAB_SCHEMES,       rules: PUNJAB_ELIGIBILITY_RULES },
  odisha:           { schemes: ODISHA_SCHEMES,       rules: ODISHA_ELIGIBILITY_RULES },
  assam:            { schemes: ASSAM_SCHEMES,        rules: ASSAM_ELIGIBILITY_RULES },
};

/** Stub data for states not yet seeded — returns central schemes only */
function getStateData(stateId) {
  const data = STATE_DATA_MAP[stateId];
  if (data) {
    return {
      schemes: [...data.schemes, ...CENTRAL_SCHEMES],
      rules:   [...data.rules,   ...CENTRAL_ELIGIBILITY_RULES]
    };
  }
  return {
    schemes: CENTRAL_SCHEMES,
    rules:   CENTRAL_ELIGIBILITY_RULES
  };
}

export function StateProvider({ children }) {
  const [selectedStateId, setSelectedStateIdState] = useState('telangana');
  const [hasChosenState, setHasChosenState] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem('sahayak_state_id');
    const savedChosen = localStorage.getItem('sahayak_state_chosen');
    if (savedId) setSelectedStateIdState(savedId);
    if (savedChosen === 'true') setHasChosenState(true);
  }, []);

  const setSelectedState = (stateId) => {
    setSelectedStateIdState(stateId);
    setHasChosenState(true);
    localStorage.setItem('sahayak_state_id', stateId);
    localStorage.setItem('sahayak_state_chosen', 'true');
  };

  const selectedState = useMemo(() => getStateById(selectedStateId), [selectedStateId]);

  const { schemes: stateSchemes, rules: stateRules } = useMemo(
    () => getStateData(selectedStateId),
    [selectedStateId]
  );

  return (
    <StateContext.Provider value={{
      selectedState,
      selectedStateId,
      setSelectedState,
      hasChosenState,
      stateSchemes,
      stateRules,
    }}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error('useStateContext must be used within StateProvider');
  return ctx;
}
