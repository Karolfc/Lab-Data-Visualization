const URL = `${window.location.hostname}:${window.location.port}`;
const socket = io(URL, { path: '/real-time' });
let leads = document.getElementById('leads-table');

function controller(view) {
    let dashboardLocalData;

    (async function getDashboard() {
        const request = await fetch('http://localhost:5050/dashboard');
        const data = await request.json();
        dashboardLocalData = data;

        const {lastFiveLeads, osPopularity, dayCounts, hourTraffic} = dashboardLocalData;

        view.updateTable(lastFiveLeads);
        view.updateDoughnut(osPopularity);
        view.updateBarChart(dayCounts);
        view.updateLineChart(hourTraffic);
    }) ();

    
    const updateRealTime = async () => {
        const request = await fetch('http://localhost:5050/dashboard');
        const data = await request.json();
        dashboardLocalData = data;
        
        const { lastFiveLeads, osPopularity, dayCounts, hourTraffic } = dashboardLocalData;
        leads.innerHTML = ` `;
        view.updateTable(lastFiveLeads);
        view.updateDoughnut(osPopularity);
        view.updateBarChart(dayCounts);
        view.updateLineChart(hourTraffic);
    }
    
    socket.on('real-time-update', (data) => {
        console.log(data);
        console.log('Its a new update!');
        updateRealTime();
    });

    view.onHello = (x) => {
        console.log('Hello inside the class!')
    }

    view.getHello();
    view.render();
}
    let view = new View();
    controller(view);