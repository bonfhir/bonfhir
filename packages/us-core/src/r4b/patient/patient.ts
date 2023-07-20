import { usCorePatientBirthSex } from "./birth-sex";
import { usCoreEthnicity } from "./ethnicity";
import { usCorePatientGenderIdentity } from "./gender-identity";
import { usCoreRace } from "./race";
import { usCorePatientSex } from "./sex";
import { usCoreTribalAffiliation } from "./tribal-affiliation";

export function usCorePatient() {
  return {
    race: usCoreRace(),
    ethnicity: usCoreEthnicity(),
    tribalAffiliation: usCoreTribalAffiliation(),
    birthsex: usCorePatientBirthSex(),
    sex: usCorePatientSex(),
    genderIdentity: usCorePatientGenderIdentity(),
  };
}
