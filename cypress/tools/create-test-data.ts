// eslint-disable-next-line filenames/match-regex
import * as os from 'os'
import connectToMysql from './connection'
import createUser from './create-user'
import {createPCRTestResult} from './create-remove-pcr-test-results'
import getTestData from './test-data'
import createAppointment from './__seeds__/appointments'

const userInfo = os.userInfo()

const {phoneNumber} = process.env
const testData = getTestData(phoneNumber, userInfo.username)

async function createTestData() {
  await createUser()
  await Promise.all([...createAppointments(), ...createPCRTestResults()])
}

function createPCRTestResults(): Promise<unknown>[] {
  return [
    createPCRTestResult(
      {
        id: testData.TEST_RESULT_ID_1,
        dateTime: testData.DATE_TIME_FOR_APPOINTMENT,
        deadline: testData.DATE_TIME_FOR_APPOINTMENT_DEADLINE,
        appointmentId: testData.APPOINTMENT_TEST_TYPE_BAR_CODE1,
        displayInResult: true,
        testType: testData.TEST_TYPE_PCR,
        userId: testData.USER_ID,
      },
      testData.TEST_DATA_CREATOR,
    ),
  ]
}

function createAppointments(): Promise<FirebaseFirestore.WriteResult>[] {
  return [
    createAppointment(
      {
        id: testData.APPOINTMENT_TEST_TYPE_BAR_CODE1,
        dateTime: testData.DATE_TIME_FOR_APPOINTMENT,
        dateOfAppointment: testData.DATE_FOR_CREATED_AT,
        appointmentStatus: testData.APPOINTMENT_STATUS,
        barCode: testData.BAR_CODE,
        organizationId: testData.ORGANIZATION_ID,
        calendarId: testData.CALENDAR_ID,
        usAppointment: testData.USAPPOINTMENT,
      },
      testData.TEST_DATA_CREATOR,
    ),
  ]
}

async function main() {
  try {
    const connection = await connectToMysql()
    console.log(`Migration Starting Time: ${new Date()}`)
    await createTestData()
    await connection.close()
    console.log(`Test data successfully created`)
  } catch (error) {
    console.error('Error running migration', error)
  }
}

main().then(() => console.log('Script Complete'))
