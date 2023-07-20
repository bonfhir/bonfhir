import { usCorePatientBirthSex } from "./birth-sex";
import { usCorePatientGenderIdentity } from "./gender-identity";
import { usCoreRace } from "./race";
import { usCorePatientSex } from "./sex";

export function usCorePatient() {
  return {
    race: usCoreRace(),
    birthsex: usCorePatientBirthSex(),
    sex: usCorePatientSex(),
    genderIdentity: usCorePatientGenderIdentity(),
  };
}
