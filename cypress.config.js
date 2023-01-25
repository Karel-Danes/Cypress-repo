const fs = require('fs')
const { defineConfig } = require("cypress");
let today = new Date();
require('dotenv').config()

function readCredentials() {
  let output = fs.readFileSync('./cypress/fixtures/microServicesCredencials.json');
  return output;
}


function tryToFindServiceName(param) {
  let serviceNamefound
  if (param.includes("/")) {
    serviceNamefound = (param.split("/"))[1]
  } else {
    serviceNamefound = param
  }
  return serviceNamefound;
}

function extractServiceName(param) {
  let result = param.split("_")
  return result[3]
}

function booleanParser(param) {
  string = param
  switch (string.toLowerCase()) {
    case "false":
    case "no":
    case "0":
      return false
    case "true":
    case "yes":
    case "1":
      return true
    default:
      return param;
  }
}

const TEST_CASE = extractServiceName(process.env.CYPRESS_TEST_CASE)
const CUT_ACTIVE = booleanParser(process.env.CYPRESS_CUT_ACTIVE)
const CUT_QTTY = parseInt(process.env.CYPRESS_CUT_QTTY)
const FEATURE_BRANCH_VERSION = process.env.CYPRESS_FEATURE_BRANCH_VERSION
const SERVICE_NAME = tryToFindServiceName(process.env.CYPRESS_SERVICE_NAME);
const productsAmount = parseInt(process.env.CYPRESS_PRODUCTS_QTTY);
const randomizerActive = booleanParser(process.env.CYPRESS_RANDOMIZER_ACTIVE);
const envService = extractServiceName(process.env.CYPRESS_TEST_CASE);





function inputsValidator() {

}

module.exports = defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  env: {
    baseUrl2: 'https://boostbrothers-bikes-api.herokuapp.com/motorcycles/',
    baseUrl: 'https://jsonplaceholder.typicode.com/todos/1',
    TEST_CASE: process.env.CYPRESS_TEST_CASE,
    FEATURE_BRANCH_VERSION: process.env.CYPRESS_FEATURE_BRANCH_VERSION,
    RANDOMIZER_ACTIVE: booleanParser(process.env.CYPRESS_RANDOMIZER_ACTIVE),
    PRODUCTS_AMOUNT: parseInt(process.env.CYPRESS_PRODUCTS_AMOUNT),
    SERVICE_NAME: process.env.CYPRESS_SERVICE_NAME
  },
  e2e: {
    setupNodeEvents(on, config) {
      const optionsCTR = {
        includeSuccessfulHookLogs: true,
        printLogsToConsole: 'always',
        printLogsToFile: 'always',
        outputRoot: config.projectRoot + '/logs/',
        specRoot: 'cypress/e2e',
        outputTarget: {
          "cypress-tracing.log": function (allMessages) {
            // allMessages= {[specPath: string]: {[testTitle: string]: [type: string, message: string, severity: string][]}}
            Object.entries(allMessages).forEach(([spec, tests]) => {
              let text = `\n[${today}]\n[${spec}]:\n`
              Object.entries(tests).forEach(([test, messages]) => {
                text += `\n    [${test}]\n`
                messages.forEach(([type, message, severity]) => {
                  if (severity == 'error') {
                    text += `        ${type} (///${severity.toUpperCase()}///): ${message}\n`
                  } else {
                    text += `        ${type} (---${severity}---): ${message}\n`
                  }
                })
              })
              this.writeSpecChunk(spec, text, 0);
            });
          }
        }
      };

      require('cypress-terminal-report/src/installLogsPrinter')(on, optionsCTR);

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family == 'chromium') {
          launchOptions.args.push('--auto-open-devtools-for-tabs')
          return launchOptions;
        }
      })

      on('task', {
        envPrint() {
          //console.log('service environment is: ' + process.env.CYPRESS_TEST_CASE)
          //console.log('FEATURE BRANCH DB NAME is: ' + process.env.CYPRESS_TEST_FEATURE_DB_NAME)
          //console.log('over all .env cache: ' + JSON.stringify(process.env, undefined, 2))
          for (let [key, value] of Object.entries(process.env)) {
            if (key.includes('CYPRESS') || key.includes('TEST')) {
              console.log(`${key}: ${value}`)
            }
          }
          return null
        }
      })

      on('task', {
        setupMicroServicesCredentials() {
          return new Promise((resolve, reject) => {
            let output = fs.readFileSync('./cypress/fixtures/microServicesCredentials.json', { encoding: 'utf8', flag: 'r' })
            
            resolve(output);

          })
        }
      })

      on('task', {
        writeServiceCredential(param) {
          return new Promise((resolve, reject) => {
            fs.writeFileSync('./cypress/fixtures/microServicesCredentials2.json', JSON.stringify(param))
            resolve('Done')
          })
        }
      })

    },
  },
});
