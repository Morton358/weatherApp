# Widget Weather App

Web-app that displays a dashboard with weather widgets. It is possible to add,
remove or refresh a widget. Widgets contain the weather information, like temperature, cloud percentage and rain amount for
a chosen city. City list is persisted and will be visible after refreshing the page. The city input field is an autocomplete field - it is suggest the city name based on user input.

## Getting Started

Copy the code of progect with command `git clone`

Then in folder where you run git clone go to weatherApp folder -> **client** folder and create the `.env.development` file with this content:

```
REACT_APP_SERVER_HOST="http://localhost:3001"

REACT_APP_API_HOST="http://localhost:5263"

REACT_APP_API_TOKEN='ba721f9895d5cebe18697546d08580b3bd7faee8'

REACT_APP_API_AUTHORIZATION='Bearer ba721f9895d5cebe18697546d08580b3bd7faee8'

SKIP_PREFLIGHT_CHECK=true

```

Then go back to the root folder and go to the folder **server** and create the `.env` file with this content:

```
SERVER_PORT=3001

SERVER_URI='http://localhost:3001'

API_BASE_URL='http://localhost:5263/api'

API_AUTHORIZATION='Bearer ba721f9895d5cebe18697546d08580b3bd7faee8'

API_TOKEN='ba721f9895d5cebe18697546d08580b3bd7faee8'

```

After that please run:

```
yarn OR npm install - in root folder
yarn OR npm install - in client folder
yarn OR npm install - in server folder
yarn dev in root folder
```

## Running the tests

Tests was created with:

- Jest

At folder client/ run:

```
yarn test
```

## Built With

- NodeJS
- create-react-app
- typescript
- Express JS
- AntDesign
- Redux
- Redux Saga

## Authors

- **Volodymyr Kovalchuk**

## License

This project is licensed under the MIT License
