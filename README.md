# ScheduleSync

ScheduleSync is a WebApp which aims to streamline the scheduling process and help users to find the perfect meeting time.

## Installation
1. Clone this repository
2. Install dependencies into frontend and backend folders using `npm install` (using 2 separate terminals)
3. `npm run start` in both frontend and backend folders

## Tech Stack
### Frontend
1. [Javascript](https://www.javascript.com/)
2. [React](https://react.dev/)
### Backend
1. [MySQL](https://www.mysql.com/)
2. [Node.js](https://nodejs.org/en)

## Creating the Database
Run the following SQL queries in an IDE of your choice. This will create the necessary tables in our schema.
```sql
# Create schema, ‘signup’: 
CREATE SCHEMA `signup`;

# Login: 
CREATE TABLE `signup`.`login` (
  `loginId` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`loginId`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

# Events:
CREATE TABLE `signup`.`events` (
  `eventsId` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `start` DATETIME NOT NULL,
  `end` DATETIME NOT NULL,
  `loginId` INT NOT NULL,
  PRIMARY KEY (`eventsId`),
  INDEX `loginId_idx` (`loginId` ASC) VISIBLE,
  CONSTRAINT `loginId`
    FOREIGN KEY (`loginId`)
    REFERENCES `signup`.`login` (`loginId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

# Team:
CREATE TABLE signup.team (
  teamId INT NOT NULL AUTO_INCREMENT,
  teamName VARCHAR(50) NOT NULL,
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,
  PRIMARY KEY (`teamId`),
  UNIQUE INDEX teamName_UNIQUE (`teamName` ASC) VISIBLE);

# Form:
CREATE TABLE signup.form (
  loginId INT NOT NULL,
  teamId INT NOT NULL,
  FOREIGN KEY (loginId) REFERENCES login(loginId),
  FOREIGN KEY (teamId) REFERENCES Team(teamId),
  PRIMARY KEY (`loginId`, `teamId`));
