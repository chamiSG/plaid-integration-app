# Plaid API Integration App

## 1. Installation

Alternatively, if you use ssh:

```bash
git clone git@github.com:chamiSG/plaid-integration-app.git
```

#### Special instructions for Windows

Note - because this repository makes use of symbolic links, to run this on a Windows machine, make sure you have checked the "enable symbolic links" box when you download Git to your local machine. Then you can run the above commands to clone the quickstart. Otherwise, you may open your Git Bash terminal as an administrator and use the following command when cloning the project

```bash
git clone -c core.symlinks=true git@github.com:chamiSG/plaid-integration-app.git
```

## 2. Set up your environment variables

```bash
cp .env.example .env
```

Copy `.env.example` to a new file called `.env` and fill out the environment variables inside. At
minimum `PLAID_CLIENT_ID` and `PLAID_SECRET` must be filled out. Get your Client ID and secrets from
the dashboard: [https://dashboard.plaid.com/developers/keys](https://dashboard.plaid.com/developers/keys)

> NOTE: `.env` files are a convenient local development tool. Never run a production application
> using an environment file with secrets in it.

## 3. Run

#### 1. Running the backend

Once started with one of the commands below, the app will be running on http://localhost:8000 for the backend. Enter the additional commands in step 2 to run the frontend which will run on http://localhost:3000.

##### Node

```bash
$ cd ./node
$ npm install
$ ./start.sh
```

#### 2. Running the frontend

```bash
cd ./frontend
npm ci
npm start
```

## Test credentials

In Sandbox, you can log in to any supported institution (except Capital One) using `user_good` as the username and `pass_good` as the password. If prompted to enter a 2-factor authentication code, enter `1234`.

In Production, use real-life credentials.
