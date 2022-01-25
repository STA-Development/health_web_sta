export interface IAuthState {
  authToken: string
  reCaptchaVerifier: unknown
  phoneNumber: string
  patientAccountInformation: IPatientAccountInformation
  patientAccountInformationCalled: boolean
  getPatientInformation: () => Promise<IPatientAccountInformation>
}

export interface IPatientAccountInformation {
  isEmailVerified: boolean
  migrationRequired: boolean
  organizations: [
    {
      firebaseOrganizationId: string
      patientId: string
    },
  ]
}

export type IAuthActions =
  | {
      type: 'UPDATE_AUTH_TOKEN'
      token: string
    }
  | {
      type: 'UPDATE_RE_CAPTCHA'
      reCaptchaVerifier: unknown
    }
  | {
      type: 'UPDATE_PHONE_NUMBER'
      phoneNumber: string
    }
  | {
      type: 'UPDATE_PATIENT_ACCOUNT_INFORMATION'
      patientAccountInformation: IPatientAccountInformation
    }
  | {
      type: 'UPDATE_PATIENT_ACCOUNT_INFORMATION_CALLED'
      patientAccountInformationCalled: boolean
    }
  | {
      type: 'UPDATE_PATIENT_ACCOUNT_INFORMATION_AND_RESET_CALL_STATE'
      patientAccountInformationCalled: boolean
      patientAccountInformation: IPatientAccountInformation
    }
