class View {
    static barItem = document.querySelector('#myBarChart');
    static doughnutItem = document.querySelector('#myDoughnutChart');
    static lineItem = document.querySelector('#myLineChart');
    static leads = document.getElementById('leads-table');
    
    constructor() {
        this.doughnutChart;
        this.barChart;
        this.LineChart
    }

    getHello() {
        this.onHello();
    }

    getBarChart() {
        const config = {
            type: 'bar',
            data: {
                labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                datasets: [{
                    label: 'Interactions per day',
                    data: [45, 20, 25, 36, 40, 65, 58],
                    backgroundColor: ['rgb(247, 37, 133, 0.7)'],
                    borderColor: ['rgb(247, 37, 133)'],
                    hoverOffset: 4,
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
        this.barChart = new Chart(View.barItem, config);
    }

    getDoughnutChart() {
        const data = {
            labels: [
                'Android',
                'iOS',
                'Other'
            ],
            datasets: [{
                label: 'Total',
                data: [14, 10, 8],
                backgroundColor: [
                    'rgb(114, 9, 183)',
                    'rgb(67, 97, 238)',
                    'rgb(76, 201, 240)'
                ],
                hoverOffset: 4
            }]
        };
        const config = {
            type: 'doughnut',
            data: data,
        };

        this.doughnutChart = new Chart(View.doughnutItem, config);
    }

    getLineChart() {
        const labels = ['00','', '02', '', '04', '', '06', '', '08', '', '10', '', '12', '', '14', '', '16', '', '18', '', '20', '', '22', ''];
        const data = {
            labels: labels,
            datasets: [{
                label: 'Total traffic',
                data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                fill: false,
                borderColor: 'rgb(58, 12, 163)',
                tension: 0.1
            }]
        };
        const config = {
            type: 'line',
            data: data,
        };
        this.LineChart = new Chart(View.lineItem, config);
    }

    updateTable(newLeads){
        
        console.log(View.leads);
        console.table(newLeads);

        newLeads.reverse().forEach((element, index) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${newLeads[index].name}</td>
                <td>${newLeads[index].email}</td>
                <td>${newLeads[index].dob}</td>
            `;
            View.leads.appendChild(row);
        });
    }

    updateDoughnut(osPopularity){
        console.log(this.doughnutChart.data.datasets[0].data);
        console.table(osPopularity);
        this.doughnutChart.data.datasets[0].data[0] = osPopularity.iOS_count;
        this.doughnutChart.data.datasets[0].data[1] = osPopularity.Android_count;
        this.doughnutChart.data.datasets[0].data[2] = osPopularity.other_count;
        this.doughnutChart.data.labels = ['iOS', 'Android', 'Other'];

        console.log(this.doughnutChart.data.datasets[0].data);
        this.doughnutChart.update();
    };
    
    updateBarChart(dayCounts) {
        this.barChart;
        this.barChart.data.datasets[0].data = dayCounts;
        this.barChart.update();
    }

    updateLineChart(hourTraffic) {
        this.LineChart;
        this.LineChart.data.datasets[0].data = hourTraffic;
        this.LineChart.update();
    }

    render() {
        this.getBarChart();
        this.getDoughnutChart();
        this.getLineChart();
    }
}