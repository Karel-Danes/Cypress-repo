
function mongoUrlStringParser(dockerImageTag) {
    let inputTag = dockerImageTag;
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
            let outputStep1 = inputTag.split("~")
            console.log(outputStep1)
            let serviceName = (outputStep1[1].split("/"))[1]
            console.log(serviceName)
            outputMongoDbName = `test-${serviceName}-${outputStep1[0].split('-')[2]}`
            return outputMongoDbName;
    }
}

export { mongoUrlStringParser }