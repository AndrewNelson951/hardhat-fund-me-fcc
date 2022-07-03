// function deployFunc(hre) {
//     console.log("Hi")
// }
// module.exports.default = deployFunc
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggreggator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggreggator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // if the contract doesn't exist, we deploy a minimal version for our local testing

    // when going for localhost or hardhat network we want to use a mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], // put price feed address
        log: true,
    })
    log("-------------------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
