let vMajor;
let vMinor;
let vPatch;


function tryToFindMongoUrlString(param, specificator) {
    let arrayOfCandidates = [];
    let inputString = param;
    let outputMongoDbString = '';
    if (specificator == 'version') {
      const noVersionErr = new Error(`ERROR: Docker image tag does not provide "version". fix it on calling repository side (client_payload:{values...}), or use "commitId" as specififator. Data you passed: "${param}"`)
      for (let i = 0; i < param.length; i++) {
        if (param.charAt(i) == "v") {
          arrayOfCandidates.push(param.substring(i + 1, i + 6))
        }
      }
      if (arrayOfCandidates.length > 0) {
        let counter = 0;
        for (let l = 0; l < arrayOfCandidates.length; l++) {
          counter++;
          if (arrayOfCandidates[l].split('.').length == 3) {
            vMajor = parseInt(arrayOfCandidates[l].split('.')[0])
            vMinor = parseInt(arrayOfCandidates[l].split('.')[1])
            vPatch = parseInt(arrayOfCandidates[l].split('.')[2])
          } else if (counter == arrayOfCandidates.length && (isNaN(vMajor) == true || isNaN(vMinor) == true || isNaN(vPatch) == true)) {
            throw noVersionErr
          }
        }
      } else {
        throw noVersionErr
      }
      let version = `v${vMajor}.${vMinor}.${vPatch}`
      let outputStep1 = inputString.split("~")
      let serviceName = (outputStep1[1].split("/"))[1]
      outputMongoDbString = `test-${serviceName}-${version}`
      return outputMongoDbString
      // "prod-v4.2.1-bf4lv4~expando-global/alza-service"
    } else if (specificator == 'commitId') {
      const noCommitIdErr = new Error(`ERROR: Docker image tag does not provide "commitId". fix it on calling repository side (client_payload:{values...}), or use "version" as specififator. Data you passed: "${param}" `)
      let outputStep1 = inputString.split("~")
      let tagString = outputStep1[0]
      let serviceName = (outputStep1[1].split("/"))[1]
      if (tagString.includes('-')) {
  
        if (tagString.split('-').length > 0) {
          for (let a = 0; a < tagString.split('-').length; a++) {
            arrayOfCandidates.push(tagString.split('-')[a])
          }
          let counter = 0;
          for (let i = 0; i < arrayOfCandidates.length; i++) {
            counter++
            //arrayOfCandidates.push(tagString.split('-')[i])
            //console.log(arrayOfCandidates[i])
            if (arrayOfCandidates[i].length == 7 && (arrayOfCandidates[i]).includes('.') == false) {
              outputMongoDbString =  `test-${serviceName}-${arrayOfCandidates[i]}` ;
  
            } else if (counter == arrayOfCandidates.length && outputMongoDbString == '') {
              throw noCommitIdErr
            }
          }
        }
      } else if (tagString.includes('-') == false && tagString.includes('.') == false && tagString.length == 7) {
        outputMongoDbString = `test-${serviceName}-${tagString}`
  
      } else {
        throw noCommitIdErr;
      }
      return outputMongoDbString
    }
  
  }
  
  function mongoUrlStringParser(dockerImageTag, specificator) {
    let inputTag = dockerImageTag.toLowerCase();
    let outputMongoDbName;
  
    switch (inputTag) {
      case "test-alza-service":
      case "test-expando-service":
      case "test-product-service":
      case "test-kaufland-service":
      case "test-shoptet-srvice":
        outputMongoDbName = inputTag
        return outputMongoDbName;
      default:
        outputMongoDbName = tryToFindMongoUrlString(inputTag, specificator)
        return outputMongoDbName;
    }
  }

export { mongoUrlStringParser }