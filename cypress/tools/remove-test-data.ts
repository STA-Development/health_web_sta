// eslint-disable-next-line filenames/match-regex
import * as os from 'os'
import connectToMysql from "./connection";
import deleteUser from "./delete-user";
import {deletePCRTestResultByUserId} from "./create-remove-pcr-test-results";
import getTestData from "./test-data";

const userInfo = os.userInfo()

const {phoneNumber} = process.env
const testData = getTestData(phoneNumber, userInfo.username)

async function removeTestData() {
    await deleteUser()
    deletePCRTestResultByUserId(testData.USER_ID)
}

async function main() {
    try {
        const connection = await connectToMysql()
        console.log(`Migration Starting Time: ${new Date()}`)
        await removeTestData()
        await connection.close()
        console.log(`Test data successfully removed`)
    } catch (error) {
        console.error('Error running migration', error)
    }
}

main().then(() => console.log('Script Complete'))

