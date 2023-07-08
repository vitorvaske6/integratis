import { dbResponseTimeHistogram } from "../utils/metrics";

var hana = require('@sap/hana-client');

interface ConnOptions {
    serverNode: string;
    uid:        string;
    pwd:        string;
};

export default async function executeHanaQuery(query: String, connOptions: ConnOptions) {
    const metricsLabels = {
        operation: `executeScript_hana`,
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {

        var connection = hana.createConnection();
        connection.connect(connOptions);
        var results = await connection.exec(query);

        timer({...metricsLabels, success: "true"});
        
        return { results, errors: null }
    } catch (e: any) {
        timer({ ...metricsLabels, success: "false" });
        return { results: null, errors: e.message }
    }

}
