# Deezer favorites to playlist

I made this app to be able to public share favorites song from Deezer.
But during the developement, I realized this is already possible 😭

There is already a such public existing playlist, that can be accessed here https://www.deezer.com/fr/profile/:accoundId/loved

Anyway, this project is still a nice starter.

- The back is serverless, aws lambda written in node (typescript)
- The front is really not finished

## Setup

Run this command to initialize a new project in a new working directory.

```
npm install
```

Create and complete .env file

```sh
# Generate app ID and SECRET here: https://developers.deezer.com/myapps
APP_ID=""
APP_SECRET=""
```

## Usage

**Deploy**

```
$ npx serverless deploy
```

## TODO

- use runtime: nodejs18.x, then use the new availible native fetch API instead of axios
- setup cors on a specific domain
