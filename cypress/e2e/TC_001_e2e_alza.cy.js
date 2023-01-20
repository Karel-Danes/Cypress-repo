/// <reference types="cypress" />
//const fs = require('fs');

import { mongoUrlStringParser, setupMicroServicesInvolved } from "./../support/parent_functions"
const fixtures = require('../fixtures/fixtures')
const importedTestCase = Cypress.env('TEST_CASE')
const importedServiceName = Cypress.env('SERVICE_NAME')
const importedFeatureBranchDbName = Cypress.env('FEATURE_BRANCH_VERSION')

let mongoString = mongoUrlStringParser(importedFeatureBranchDbName, importedServiceName, 'version');
let mongoString2 = mongoUrlStringParser(importedFeatureBranchDbName, importedServiceName, 'commitId');

function setEnv(paramTC, paramDB) {
  Cypress.log({
    name: 'env sensitivity',
    message: `tc is: ${paramTC} and db name is: ${paramDB}`
  })
  // return [paramTC, paramDB]
}

Cypress.Commands.add('envPrint', () => {
  cy
    .task('envPrint', {})
})
//let x = setupMicroServicesInvolved()
let dataToWrite = {
  AHOJ: 123456789
}

describe('Testing API expected behavior', () => {
  it.only('step 1 (body length) on ALZA env', () => {

    // cy  .envPrint()

    cy
      .writeFile('./cache_data/cache.json', dataToWrite)

    cy
      .task('setupMicroServicesCredentials').then(resp => {
        let string = JSON.stringify(resp)
        cy
          .task('writeServiceCredential', resp)
        Cypress.log({
          name: 'INFO',
          message: `services name in json: ${resp}`
        })
      })

    //setEnv(importedTestCase, importedFeatureBranchDbName)



    Cypress.log({
      name: 'INFO',
      message: `version parser: ${mongoString}`
    })
    Cypress.log({
      name: 'INFO',
      message: `comitId parser: ${mongoString2}`
    })

    Cypress.log({
      name: 'INFO',
      message: `SERVICE_NAME values: ${Cypress.env('SERVICE_NAME')}`
    })

    Cypress.log({
      name: 'INFO',
      message: `RANDOMIZER_ACTIVE type: ${typeof (Cypress.env('RANDOMIZER_ACTIVE'))}`
    })

    Cypress.log({
      name: 'INFO',
      message: `RANDOMIZER_ACTIVE values: ${Cypress.env('RANDOMIZER_ACTIVE')}`
    })

    Cypress.log({
      name: 'INFO',
      message: `PRODUCTS_AMOUNT type: ${typeof (Cypress.env('PRODUCTS_AMOUNT'))}`
    })

    Cypress.log({
      name: 'INFO',
      message: `PRODUCTS_AMOUNT values: ${Cypress.env('PRODUCTS_AMOUNT')}`
    })

    Cypress.log({
      name: 'INFO',
      message: `TEST_CASE: ${Cypress.env('TEST_CASE')}`
    })

    Cypress.log({
      name: 'INFO',
      message: `FEATURE_BRANCH_VERSION: ${Cypress.env('FEATURE_BRANCH_VERSION')}`
    })

    Cypress.log({
      name: 'INFO',
      message: `env is: ${JSON.stringify(Cypress.env())}`
    })


    cy
      .request({
        method: 'GET',
        url: Cypress.env('baseUrl')
      }).then((resp) => {
        expect(resp.body).to.exist
        expect(resp.status).to.eq(200)
        // written in new-feature-branch
      })

  })


  it('step 2 (status code)', () => {
    cy
      .intercept('/login', (req) => {
        req.headers['x-custom-headers'] = 'added by expando'
        console.log(req)
      })
      .as('headers')

    cy
      .request({
        method: 'GET',
        url: Cypress.env('baseUrl')
      }).then((resp) => {
        console.table(resp.body)
        expect(resp.status).to.be.oneOf(fixtures.code.twoXX)
      })

  })
  it('step 3 (query parameter behaviour)', () => {
    cy
      .request({
        method: 'GET',
        url: Cypress.env('baseUrl'),
        qs: {
          q: 'triumph'
        }
      }).then((resp) => {

        expect(resp.body).to.have.length(1)
      })
  })

  it('step 4 (custom headers pump in)', () => {
    cy
      .request({
        method: 'GET',
        url: Cypress.env('baseUrl'),
        headers: {
          "x-custom-headers": 'rock and roll'

        },
      }).then((res) => {
        //console.log(typeof (resp.headers))
        console.log(res.headers)
      })
    /*
    cy.wait('@headers')
      .its('request.headers')
      .should('have.property', 'x-custom-headers', 'added by cy.intercept')
*/

  })
  it('step 5 (custom body pumping in)', () => {
    cy
      .request({
        method: 'POST',
        url: Cypress.env('baseUrl'),
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          'newKey': 'newValue'
        }
      })

    cy
      .request({
        method: 'GET',
        url: Cypress.env('baseUrl'),
      }).then((resp) => {
        console.table(resp.body)
      })
  })


  it('step 6 (custom body erasing)', () => {
    /*
        cy
          .request({
            method: 'DELETE',
            url: `https://boostbrothers-bikes-api.herokuapp.com/motorcycles/10`,
          })
    */

    cy
      .request({
        method: 'GET',
        url: Cypress.env('baseUrl'),
      }).then((resp) => {
        if (resp.body.length > 6) {
          for (let i = 7; i < resp.body.length; i++) {


            cy
              .request({
                method: 'DELETE',
                url: `https://boostbrothers-bikes-api.herokuapp.com/motorcycles/${i}`,
              })

          }
        }
      })

  })
})