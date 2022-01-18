export interface IAuthState {
  authToken: string
  reCaptchaVerifier: unknown
  phoneNumber: string
  patientAccountInformation: IPatientAccountInformation
}

export interface PatientInfo {
  city?: string | null
  consentFileUrl?: string | null
  country?: string | null
  dateOfBirth?: string | null
  email?: string | null
  firstName?: string
  homeAddress?: string | null
  homeAddressUnit?: string | null
  id?: string
  lastName?: string
  organizations?: [] | null
  patientPublicId?: string
  phoneNumber?: string
  photoUrl?: string | null
  postalCode?: string | null
  province?: string | null
  trainingCompletedOn?: null | string
}

export interface IPatientAccountInformation {
  isEmailVerified: boolean
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
