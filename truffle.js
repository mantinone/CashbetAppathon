module.exports = {
  networks: {
    contracts_build_directory: "./eth/build/contracts",
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
}
