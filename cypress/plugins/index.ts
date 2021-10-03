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
import * as dotenv from 'dotenv'

module.exports = (on: any, config: any) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config

    // Read e2e env. file, show error is not found
    const fileConfig = dotenv.config({path: __dirname + '/../../.env.e2e'})
    if (fileConfig.error) {
        console.log('Error loading e2e config file')
        console.log(fileConfig.error)
        return null
    }
    const envConfig = fileConfig.parsed

    // Apply values from .env file to cypress config
    for (const envKey in envConfig) {
        config.env[envKey] = envConfig[envKey]
    }

    return config
}