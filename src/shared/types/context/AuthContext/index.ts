export interface IAuthState {
  reCaptchaVerifier: unknown
  phoneNumber: string
}

export interface IPatientAccountInformation {
  firstName: string
  email: string
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
      type: 'UPDATE_RE_CAPTCHA'
      reCaptchaVerifier: unknown
    }
  | {
      type: 'UPDATE_PHONE_NUMBER'
      phoneNumber: string
    }
