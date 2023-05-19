export function getDevicePopularity(interactions) {
    let iOS_count = 0;
    let Android_count = 0;
    let other_count = 0;

    interactions.forEach(interaction => {
        if (interaction.OS === 'iOS') {
            iOS_count++;
        } else if (interaction.OS ==='Android') {
            Android_count++;
        }else{
            other_count++;
        }
    });
    console.table({iOS_count, Android_count, other_count});
    const osPopularity = {iOS_count, Android_count, other_count};
    return osPopularity;
}

//Visits by day

export function getInteractionsByDay(interactions) {
    const weekdays = {
        'Sun': 0,
        'Mon': 1,
        'Tue': 2,
        'Wed': 3,
        'Thu': 4,
        'Fri': 5,
        'Sat': 6
    };
    const dayCounts = Array.from({ length: 7 }, () => 0);

    interactions.forEach(visit => {
        const day = visit.date.split(' ')[0];
        dayCounts[weekdays[day]]++;
    });

    console.table(dayCounts);
    return dayCounts;

}

// Taking leads

export function getLastFiveLeads(users) {
    return users.slice(users.length - 5);
}

//Getting hour traffic

export function getHourTraffic(interactions) {
    let hours = {'00': 0, '01': 1, '02': 2, '03': 3, '04': 4, '05': 5, '06': 6, '07': 7, '08': 8, '09': 9, '10': 10, '11': 11, '12': 12, '13': 13, '14': 14, '15': 15, '16': 16, '17': 17, '18': 18, '19': 19, '20': 20, '21': 21, '22': 22, '23': 23,};
    const hourTraffic = Array.from({length: 24}, () => 0);

    interactions.forEach(visit => {
        const hour = visit.timeStamp.split(':')[0];
        hourTraffic[hours[hour]]++;        
    });

    console.table(hourTraffic);
    return hourTraffic;    
}
