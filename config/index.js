module.exports = {
    mongo: {
        // sourceConnectionString: "mongodb://wcm_antwerpenmorgen_o:jbOr3F3LNTxvdYfw@devdsu2112.dev.digant.antwerpen.local,devdsu2113.dev.digant.antwerpen.local/wcm_antwerpenmorgen?replicaSet=repset_db1_dev?authSource=wcm_antwerpenmorgen",
        // destinationConnectionString: "mongodb://localhost:27013/wcm_migratie-test"
        sourceConnectionString: "mongodb://rasu1004.rte.antwerpen.local:27017/wcm_antwerpen-morgen",
        destinationConnectionString: "mongodb://wcm_antwerpenmorgen_a:fItCdb4XlPSrpIp1@rdsu2218.rte.antwerpen.local,rdsu2219.rte.antwerpen.local/wcm_antwerpenmorgen?replicaSet=repset_db1_acc?authSource=wcm_antwerpenmorgen"
    },
    batchSize: 30,
};