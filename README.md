## 1. Getting started

Online Banking app it's a simple project for the customer to signup for the service then recieve an email with verification code to can login.
After login successfully he can create an acount to make deposit and withdraw transaction but can't do transfer transaction unless he has 2 accounts at least.

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM
- A MongoDB database. Not needed if you use the provided `docker-compose` file.
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 1.2 Installation

```bash
$ npm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing your environment variables used for development.

```bash
# development
$ cp .env.example .env.development

# production
$ cp .env.example .env.production
```

For a standard development configuration, you can leave the default values.

## 1.3 Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 1.4 Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### 1.5 Docker

- Running `docker-compose up -d` is all you need. It will:

  - Build custom local image enabled for production.
  - Start container from that image with port 5005 open (on localhost).
  - Mounts the pwd to the app dir in container.
  - Database volume is created and seeded for the the first time only.

- To rebuild the image after new changes, you would:

  - Execute `docker-compose down`, to perform cleanup.
  - Execute `git pull`, to get the latest changes.
  - Execute `docker-compose up --build -d`, to rebuild the image.
  - You can run all above commands using `./rebuild` script.

  ```bash
    #!/bin/bash
    docker-compose down
    git pull
    docker-compose up --build -d
  ```

  - Execute `chmod +x ./rebuild.sh` to give the script execution permissions.
  - Execute `./rebuild.sh`.

## 2. Git commits guidelines

- feat (feature)
- fix (bug fix)
- docs (documentation)
- style (formatting, missing semi colons, …)
- refactor (code change that neither fixes a bug nor adds a feature)
- test (when adding missing tests)
- chore (maintain; no production code change)

## 3. Git workflow guidelines

This workflow uses two branches to record the history of the project. The main branch stores the official release history, and the develop branch serves as an integration branch for features. It's also convenient to tag all commits in the main branch with a version number.

Each new feature should reside in its own branch, which can be pushed to the central repository for backup/collaboration. But, instead of branching off of main, feature branches use develop as their parent branch. When a feature is complete, it gets merged back into develop.

Once develop has acquired enough features for a release (or a predetermined release date is approaching), you fork a staging branch off of develop. Creating this branch starts the next release cycle, so no new features can be added after this point—only bug fixes, documentation generation, and other release-oriented tasks should go in this branch. Once it's ready to ship, the staging branch gets merged into main and tagged with a version number. In addition, it should be merged back into develop, which may have progressed since the staging was initiated.
