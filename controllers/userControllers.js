import { fs } from "../dependencies.js";
import { io } from '../index.js';


export const postUserData = (req, res) => {
  try {
    const UserData = fs.readFileSync('./localCollection/users.json'); // read existing data from users.json file
    const InteractionsData = fs.readFileSync('./localCollection/interactions.json');
    const jsonUserData = JSON.parse(UserData);
    const jsonInteractionsData = JSON.parse(InteractionsData);

    const newUser = {
      id: jsonUserData.users.length + 1,
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      phone: req.body.phone,
      OS: req.body.OS,
      privacyAgreement: req.body.privacyAgreement
    };

    const newInteraction = {
      id: jsonInteractionsData.interactions.length + 1,
      date: req.body.date,
      timeStamp: req.body.timeStamp,
      OS: req.body.OS
    };

    // Push new users to actual data
    jsonUserData.users.push(newUser);
    jsonInteractionsData.interactions.push(newInteraction);

    fs.writeFileSync('./localCollection/users.json', JSON.stringify(jsonUserData, null, 2));
    fs.writeFileSync('./localCollection/interactions.json', JSON.stringify(jsonInteractionsData, null, 2));

    io.emit('real-time-update', 'update');

    res.status(201).send({msn: `User ${newUser.id} has been created`});

  } catch (error){
    console.error(error);
    res.status(500).send('There is an error adding the user');
  }
}

export const getUsers = (req, res) => {
  res.send({msn: "welcome user :)"})
}