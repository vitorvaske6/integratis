# INTEGRATIS #
Integratis it's an API that integrates python scripts wich can return its results through the endpoints or the execution status.

## Usage ##
To properly use the app you will need to create an user and initiate session, then, you will need to register the test.py script using the following json: 
```
{
    "title": "Script Test",
    "description": "Script sample description",
    "path": "./test.py",
    "cron": "*/5 * * * *",
    "requiredParams": "{ 'function': 'test' }"
}
// users function 
{
    "title": "Script Users",
    "description": "Script sample description",
    "path": "./test.py",
    "cron": "*/5 * * * *",
    "requiredParams": "{ 'function': 'users' }"
}
```

The cron property will define how often the script will run ( use this site to learn about crons: https://crontab.guru/#*/5_*_*_*_* ).
The requiredParams property will allow you to execute the script passing arguments.


## Dependencies ##
To install dependencies run:
```
yarn add dependencies
yarn add dependencies
```

## Run ##
To run the project:
```
yarn dev
```

## Config Folder ##
The config folder holds the global variables used to run the application, integrate with the UI and create sessions.

Create the config folder in the root, then create the files below:

## default.ts ## 

### Create an default export ###
```
export default {

};
```

#### Its variables include: ####
##### Scripts #####
```
    scripts:{
        path: './src/scripts'
    },
```
##### Server #####
```
    server:{
        port: ,
        dbUri:"MongoDB Connection String",
        host:""
    },
```
##### UI Server #####
```
    uiServer:{
        port: ,
        host:""
    },
```
##### Metrics Server ##### 
```
    metricsServer:{
        port: ,
        host:""
    },
```
##### Access Tokens ##### 
For keys generation go to: https://travistidwell.com/jsencrypt/demo/
```
    saltWorkFactor: 10,
    accessTokenTimeToExpire: '15m',
    refreshTokenTimeToExpire: '1y',
    publicKey:`PUBLIC KEY`,
    privateKey:`PRIVATE KEY`
```


