const getTestData = (phoneNumber: string, userName: string) => ({
    TEST_DATA_CREATOR: `cypressSeedCreatedBy${userName}`,
    ID: 'E2E_DOCUMENT_ID',
    FIRST_NAME: 'E2E_FIRSTNAME',
    LAST_NAME: 'E2E_LASTNAME',
    EMAIL: 'E2ETests_EMAIL@stayopn.com',
    IS_EMAIL_VERIFIED: true,
    USER_PHONE_NUMBER: `+1${phoneNumber}`,
    E2E_PASSWORD: `E2E_PASSWORD`,
    ORGANIZATION_IDS: ['PUBLIC_ORG'],
    DEFAULT_APPOINTMENT_ID: 'Default_ID',
    USER_ID: 'E2E_DOCUMENT_ID',
    TEST_TYPE_PCR: 'PCR',
    TEST_RESULT_ID_1: 'Test_result_ID_1',
    DATE_TIME_FOR_APPOINTMENT: '2022-03-01T07:00:00',
    DATE_TIME_FOR_APPOINTMENT_DEADLINE: '2021-04-01T07:00:00',

})

export default getTestData