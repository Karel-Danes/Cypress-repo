# cypress-repo

[![E2E cypress workflow ](https://github.com/Karel-Danes/cypress-repo/actions/workflows/main.yml/badge.svg)](https://github.com/Karel-Danes/cypress-repo/actions/workflows/main.yml) [![Cypress.io](https://img.shields.io/badge/Powered%20by-Cypress-04C38E.svg)](https://www.cypress.io/) [![version](https://badgen.net/badge/icon/v1.0.2?icon=awesome&label=E2E%20Tests)](https://github.com/Karel-Danes/cypress-repo/blob/master/package.json)



[![Node version](https://img.shields.io/node/v/cypress-repo.svg?style=flat)](http://nodejs.org/download/)

[![project version](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://github.com/Karel-Danes/cypress-repo/actions/workflows/main.yml)

![project version](https://img.shields.io/badge/dynamic/json?color=brightgreen&url=https://raw.githubusercontent.com/Karel-Danes/cypress-repo/master/package.json&query=$.dependencies.vue&label=vue&logo=vue.js)

![project version](https://img.shields.io/badge/dynamic/json?color=brightgreen&url=https://raw.githubusercontent.com/Karel-Danes/cypress-repo/blob/master/package.json&query=$.dependencies.vue&label=vue&logo=vue.js)


![project version](https://img.shields.io/badge/dynamic/json?color=brightgreen&url=https://github.com/Karel-Danes/cypress-repo/master/package.json&query=$.dependencies.vue&label=vue&logo=vue.js)

![project version](https://img.shields.io/badge/dynamic/json.svg?url=https://github.com/Karel-Danes/cypress-repo/blob/master/data.json&label=ahoj&colorB=green&query=$)

![testing jsonpath](https://img.shields.io/badge/dynamic/json?color=blue&label=package%20version&query=%24.version&url=https%3A%2F%2Fraw.githubusercontent.com%2FKarel-Danes%2Fcypress-repo%2Fmaster%2Fpackage.json)

![testing jsonpath](https://img.shields.io/badge/dynamic/json?color=blue&label=package%20version&query=$.version&url=https://raw.githubusercontent.com/Karel-Danes/cypress-repo/master/package.json)


![testing jsonpath](https://img.shields.io/badge/dynamic/json?color=blue&label=package%20version&query=$.version&url=https://github.com/Karel-Danes/cypress-repo/blob/master/package.json)


![e2e version](https://img.shields.io/badge/dynamic/json?color=blue&label=e2e%20code%20version&query=$.version&url=https://raw.githubusercontent.com/Karel-Danes/rocket/master/package.json?token=GHSAT0AAAAAAB2VELSQZ7YOBUUCJF5547GGY36HORQ)

![e2e version](https://img.shields.io/badge/dynamic/json?token=GHSAT0AAAAAAB2VELSQZ7YOBUUCJF5547GGY36HORQ&color=blue&label=e2e%20code%20version&query=$.version&url=https://raw.githubusercontent.com/Karel-Danes/rocket/master/package.json)

![e2e version](https://img.shields.io/badge/dynamic/json?color=blue&label=e2e%20code%20version&query=$.version&url=https://raw.githubusercontent.com/Karel-Danes/rocket/master/package.json)

----------------
![pacakge.json](https://github.com/Karel-Danes/cypress-repo/blob/master/package.json/badge.svg)

![badgen.net](https://badgen.net/github/watchers/micromatch/micromatch)

![badgen.net](https://badgen.net/npm/v/@babel/core)

[![npm version](https://badge.fury.io/js/razzle.svg)](https://badge.fury.io/js/razzle)


```shell
> git clone ...
> cd ...
> npm i
> npm run cy:{service_name}:root
```


### `client_payload` arguments detail:
|              Argument             |             Value(s)                | Required |     Default     |        Descrtiption                                 |
|:--------------------------------- |:----------------------------------- |:-------- |:--------------- |:--------------------------                          |
|`test_feature_branch_version`      | `${{ env.TARGET_ENVIRONMENT }}`     |  `true`  |      `N/A`      | `${{github.ref}}`                                   |
|                                   | `${{ env.PACKAGE_VERSION }}`        |  `true`  |      `N/A`      | package.json -> version                             |
|                                   | `${{ env.GITHUB_SHA_SHORT }}`       |  `true`  |      `N/A`      | `$GITHUB_SHA` cut -c 1-6                            |
|                                   | `${{ env.REPOSITORY_NAME }}`        |  `true`  |      `N/A`      | `${{github.repository}}`                            |
|`test_case`                        | `TC_00{e2e_num}_e2e_{service_name}` |  `true`  | TC_001_e2e_alza | E2E scenario env.                                   |
|`randomizer_active`                | `boolean`                           |  `false` |     `false`     | Simulated qtty "`products_qtty`" of products synced |
|`cut_active`                       | `boolean`                           |  `false` |      `true`     | Amount of products reduction "`cut_qtty`"           |
 



### `client_payload` parameters detail: 
### `test_feature_branch_version`:
                                                         
|                 Argument Name        | Required   | Default     | Description                  |
| ---------------------                | ---------- | ----------- | ---------------------        |
| `${{ env.TARGET_ENVIRONMENT }}`      | True       | N/A         | github.ref                   |
| `${{ env.PACKAGE_VERSION }}`         | True       | N/A         | package.json -> version      |
| `${{ env.GITHUB_SHA_SHORT }}`        | True       | N/A         | $GITHUB_SHA cut -c 1-6       |
| `${{ env.REPOSITORY_NAME }}`         | True       | N/A         | ${{github.repository}}       |


### `test_case`:
|                 Argument Name        | Required   | Default     | Description                  |
| ---------------------                | ---------- | ----------- | ---------------------        |
| `${{ env.TARGET_ENVIRONMENT }}`      | True       | N/A         | github.ref                   |
| `${{ env.PACKAGE_VERSION }}`         | True       | N/A         | ('./package.json').version   |
| `${{ env.GITHUB_SHA_SHORT }}`        | True       | N/A         | $GITHUB_SHA cut -c 1-6       |
| `${{ env.REPOSITORY_NAME }}`         | True       | N/A         | ${{github.repository}}       |




### `client_payload` parameters: 
### 1.) `test_feature_branch_version`:
                                                         
|                 Sub-argument Name    | Required   | Default     | Description                  |
| ---------------------                | ---------- | ----------- | ---------------------        |
| `${{ env.TARGET_ENVIRONMENT }}`      | True       | N/A         | `${{ github.ref }}`          |
| `${{ env.PACKAGE_VERSION }}`         | True       | N/A         | package.json -> version      |
| `${{ env.GITHUB_SHA_SHORT }}`        | True       | N/A         | `$GITHUB_SHA` cut -c 1-6     |
| `${{ env.REPOSITORY_NAME }}`         | True       | N/A         | `${{ github.repository }}`   |


### 2.) `test_case`:
|                 Choice               | Status        | Description                            |
| ---------------------                | ----------    | ---------------------                  |
| `TC_001_e2e_alza`                    | Running       | Runs E2E scenario focusing alza-service|
| `TC_002_e2e_kaufland`                | In development| In development                         |
| `TC_003_e2e_shoptet`                 | In development| In development                         |

|                 Argument Name        | Required   | Default     | Description                                                  |
| ---------------------                | ---------- | ----------- | ---------------------                                        |
| 3.) `randomizer_active`              | False      | False       | Simulates demanded qtty "`products_qtty`" of products synced |

|                 Argument Name        | Required   | Default     | Description                                                  |
| ---------------------                | ---------- | ----------- | ---------------------                                        |
| 4.) `cut_active`                     | False      | True        | Particular amonut of products reduction "`cut_qtty`"         |


version 1.0.2

(https://conventionalcommits.org)