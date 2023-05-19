import { fs } from "../dependencies.js";
import * as KPI from "./kpiCalculations.js";

export const getData = (req, res) => {
    try {
        // read data from users.json file
        const usersJSONData = fs.readFileSync('./localCollection/users.json');
        const interactionsJSONData = fs.readFileSync('./localCollection/interactions.json');

        const { users } = JSON.parse(usersJSONData);
        const { interactions } = JSON.parse(interactionsJSONData);

        const lastFiveLeads = KPI.getLastFiveLeads(users);
        const dayCounts = KPI.getInteractionsByDay(interactions);
        const osPopularity = KPI.getDevicePopularity(interactions);
        const hourTraffic = KPI.getHourTraffic(interactions);


        let dashboardData = { users, interactions, lastFiveLeads, dayCounts, osPopularity, hourTraffic};
        res.status(201).send(dashboardData);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error reading JSON data');
    }
}

