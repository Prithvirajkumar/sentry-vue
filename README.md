# Vue Demo
This project was created using Vue CLI - https://cli.vuejs.org/guide/creating-a-project.html#vue-create
- Error Monitoring...Performance Monitoring...Release Health...
- BrowserTracing (Performance)  

## Setup
Create a .env and enter your DSN. See .env.example for an example.

## Run
npm install - this will install all dependencies
./run.sh - this will build the files and will also serve the built file. This will also handle uploading of sourcemaps

## Demo
1. Home page
This page is slowed down using back end configurations, performance drops can be viewed under the 'home' transaction.
Selecting checkout will generate an Internal Server Error

2. About Us page
This page is slowed down using front end configurations, performance drops can be viewed under the 'about' transaction.

3. Manually Trigger Errors page
This page allows you to generate errors by triggering them using buttons
