## Description

This is a clone of a real-life [Twitter](https://twitter.com/). It is built with MySQL database,
NestJS and ReactJS frameworks.

## Prerequisites

You must have [Docker](https://www.docker.com/) installed on your machine.

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

## Running the application

Step 4. Build docker images

```$xslt
cd ..
docker-compose build
```

Step 5. Run the application
```$xslt
docker-compose up
```

Step 6. After a couple of minutes, both servers must have been started.
After all services are started (Database, Backend server and Frontend server),
, copy and paste this path into your browser address bar:
````$xslt
http://localhost:3000
````

Step 7. Navigate and explore the application in your browser. Enjoy yourself :)
