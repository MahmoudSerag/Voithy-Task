# Voithy-Task

<p align="center">
  <img src="https://media.discordapp.net/attachments/443058700396265472/1139365659604697089/image.png" width="100" alt="Voithy-Task" /></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
<img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
</a>

<p align="center">
<img alt="Node.Js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img alt="Express.Js" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
<img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-f7e018?style=for-the-badge&logo=javascript&logoColor=000000">
<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
<img alt="NPM" src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white"></p>

## Description

🎉 Our project aims to create an integrated patient profile system that empowers medical caregivers and patients alike. Medical caregivers can securely log in to access patient profiles, update information, add notes, medications, and more. Any modifications trigger automated email notifications to patients, keeping them informed. Patients can easily log in to review the updated data, fostering transparency and active participation in their care. This system optimizes medical data management, communication, and patient engagement for enhanced healthcare outcomes.

## Screens

<p align="center">
  <img src="https://media.discordapp.net/attachments/443058700396265472/1139359211034251294/image.png?width=932&height=419" alt="Sign in" width="400" style="margin-right: 150px;margin-bottom: 120px;" />
  <img src="https://media.discordapp.net/attachments/443058700396265472/1139359445906882660/image.png?width=594&height=419" alt="Sign up" width="400" />
</p>

## Database Design

<img src="https://media.discordapp.net/attachments/443058700396265472/1139355077136621598/f634470e-08a3-4e21-920f-6b1ee2d9c3b1.png" alt="Database design"/>

## Documentation

- [Feature Map](https://unknown-devs.atlassian.net/wiki/spaces/VT/overview)
- [Jira Board](https://unknown-devs.atlassian.net/jira/software/projects/VT/boards/7)

## 💥 Features

- 📱 Mobile friendly.
- ⚠️ Error handling.
- 🔐 Authentication and Authorization.
- 📊 MongoDB database and Mongoose ORM.
- 💲Subscription system.

## Installation

```bash
$ git clone https://github.com/MahmoudSerag/Voithy-Task.git
$ cd Voithy-Task
$ npm run build
```

## Seed Database

```bash
# Import Data to the database
$ npm run data:import

# Destroy Data from the database
$ npm run data:destroy
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm start
```

## Environment variables

1. `PORT`: Enter port number (e.g. `3000`).

2. `MONGO_URI`: Enter your MongoDB connection URL (e.g. `mongodb+srv://<username>:<password>@<cluster name>.0k0vtqz.mongodb.net/?retryWrites=true&w=majority`)

3. `NODE_ENV`: production || development

4. `CLIENT_DOMAIN`: Enter client domain url (e.g. `http://localhost:5000`)

5. `JWT_SECRET`: Enter your secret key (e.g. `secret`)

6. `JWT_EXPIRES_IN`: Enter expiration time (e.g. `2d`)

7. `COOKIE_EXPIRES_IN`: Enter expiration time (e.g. `2`)

8. `EMAIL_HOST`: smtp.gmail.com

9. `EMAIL_SENDER`: Enter your email sender

10. `EMAIL_PASSWORD`: Enter your password of email sender

## License

[MIT licensed](LICENSE).
