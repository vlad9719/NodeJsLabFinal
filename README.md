##Description

This is a clone of a real-life [Twitter](https://twitter.com/). It is built with MySQL database,
NestJS and ReactJS frameworks.

## Prerequisetes

Before you start, you must have installed the following tools:

1. [Node.JS](https://nodejs.org/en/)

2. [NPM](https://www.npmjs.com/get-npm)

3. [Yarn](https://yarnpkg.com/en/)

## Installation

Step 1. Clone the repo

```$xslt
git clone https://github.com/vlad9719/NodeJsLabFinal

cd NodeJsLabFinal
```

Step 2. Make copy of ```env.example``` file into ```.env``` in ```backend``` folder:
```$xslt
cd backend

cp .env.example .env
```

Step 3. In ```.env``` file, give environmental variables corresponding values.
Get ```GOOGLE_CLIENT_ID``` and ```GOOGLE_CLIENT_SECRET``` on [Google Developers Console](https://console.developers.google.com),
put your [Gmail account](http://gmail.com/) credentials into corresponding variables in ```.env```.
Generate your ```JWT_SECRET_KEY``` with the following command:
```$xslt
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```
And assign it to the corresponding variable.

Step 4. Create a new schema ```twittar``` with MySQL Workbench.

Step 5. Install dependencies in ```backend``` folder:
```$xslt
npm install
```

Step 6. Install dependencies in ```frontend``` folder:
```$xslt
cd ..
cd frontend
yarn
```

Step 6. Create a new schema ```twittar``` with MySQL Workbench.

## Running the application

Step 0. Get back to root project directory:
```$xslt
cd ..
//you must now be in the NodeJsLabFinal root directory
```
Step 1. Start backend server (run console command in ```backend```) folder:

```$xslt
cd backend
npm start
```

Step 2. Start frontend server (open new terminal window in the ```frontend``` folder and run the command):
```$xslt
yarn start
```

Step 3. After a minute or so, both servers must have been started.
You must see corresponding messages in both consoles.
After you see those messages, if address ```localhost:3000```
has not been opened automatically in your browser, copy and paste this path into your
address bar:
````$xslt
http://localhost:3000
````

Step 4. Navigate and explore the application in your browser. Enjoy yourself :)
