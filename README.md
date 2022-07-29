# Connex One Tech Test: API

## An API that serves a time and a metric endpoint for an authorized frontend.

---

---

**This application is hosted on [Heroku](https://dashboard.heroku.com), and can be viewed online using [this link](https://limitless-coast-44176.herokuapp.com/) (auth header must be set to test endpoints). Alternatively, if you would like to view the app locally and run the test suite, please follow the [setup](#setup) instructions.**

---

---

## Setup

**Prerequisite**: [Node](https://nodejs.org/en/) (version 16 or above)

After cloning the repo, first install the project's dependencies:

`npm install`

In order to successfully run the test suite, an auth token must be provided. Create a `.env` file in the root directory, and add the following:

`MY_SECRET_TOKEN=mysecrettoken`

Now you can run the test suite:

`npm test`
