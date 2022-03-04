/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,no-param-reassign,global-require,import/no-unresolved */
import * as dotenv from 'dotenv'
import {join} from 'path'
import {rmdir} from 'fs'

import PluginEvents = Cypress.PluginEvents
import PluginConfigOptions = Cypress.PluginConfigOptions
import warmupServices from './warmup-services'

const {isFileExist} = require('cy-verify-downloads')

const plugins = async (on: PluginEvents, config: PluginConfigOptions) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Read e2e env. file, show error is not found
  const fileConfig = dotenv.config({path: join(__dirname, '/../../.env.e2e')})
  const fileConfigEnv = dotenv.config({path: join(__dirname, '/../../.env')})
  if (fileConfig.error) {
    console.log('Error loading e2e config file')
    console.log(fileConfig.error)
    return null
  }

  if (fileConfigEnv.error) {
    console.log('Error loading env config file')
    console.log(fileConfigEnv.error)
    return null
  }
  const envConfig = fileConfig.parsed
  const DefaultEnvConfig = fileConfigEnv.parsed

  // Apply values from .env.e2e file to cypress config
  Object.keys(envConfig).forEach((envKey) => {
    const envValue = envConfig[envKey]
    config.env[envKey] = envValue
  })

  // Apply values from .env.e2e file to cypress config
  Object.keys(DefaultEnvConfig).forEach((envKey) => {
    const envValue = DefaultEnvConfig[envKey]
    config.env[envKey] = envValue
  })

  require('@cypress/code-coverage/task')(on, config)

  // register tasks warmup services
  await warmupServices(on, config)

  on('task', {
    deleteFolder(folderName) {
      console.log('deleting folder %s', folderName)

      return new Promise((resolve, reject) => {
        rmdir(folderName, {maxRetries: 10, recursive: true}, (err) => {
          if (err && err.code !== 'ENOENT') {
            console.error(err)

            return reject(err)
          }

          resolve(null)
        })
      })
    },
    isFileExist,
    csvToJson(data) {
      const lines = data.split('\n')
      const result = []
      const headers = lines[0].split(',')
      for (let i = 1; i < lines.length; i += 1) {
        const obj: {[key: string]: string} = {}
        const currentLine = lines[i].split(',')

        for (let j = 0; j < headers.length; j += 1) {
          obj[headers[j]] = currentLine[j]
        }
        result.push(obj)
      }
      return result
    },
  })

  return config
}

export default plugins
