/* eslint-disable  import/no-extraneous-dependencies,import/no-unresolved */
import {expect} from 'chai'
import axios from 'axios'
import PluginEvents = Cypress.PluginEvents
import PluginConfigOptions = Cypress.PluginConfigOptions

const warmupServices = async (
  _on: PluginEvents,
  config: PluginConfigOptions,
): Promise<PluginConfigOptions> => {
  console.log(`warmup requests to services started`)
  await Promise.all([
    warmupRequest(`${config.env.USER_SERVICE_URL}/`, 404),
    warmupRequest(`${config.env.RESERVATION_SERVICE_URL}/`, 404),
    warmupRequest(`${config.env.SCHEDULE_SERVICE_URL}/`, 404),
  ])
  console.log(`warmup requests completed successfully`)

  return config
}

const warmupRequest = (url: string, status: number): Promise<void> =>
  axios
    .get(url, {
      validateStatus: () => true,
    })
    .then((response) => {
      expect(response.status).to.equal(status)
    })
    .catch(() => {
      console.log(`Warning! Service ${url} did not give a correct response`)
    })

export default warmupServices
