# quadient-qap-xero

Connect to a Xero Organisation and make calls to `accounts` and `invoices` - I recommend connecting to the Demo company.

Follow the intructions below to setup the `backend` and the `frontend`.

## Scoping the Solution

### Accounts

- get all accounts https://developer.xero.com/documentation/api/accounting/accounts

### Vendors

- filter by ACCPAY (vendors === supplier invoice) - where=Type="ACCPAY" https://developer.xero.com/documentation/api/accounting/types#invoices
- using "where" because Invoice.Type is an OPTIMISED ELEMENT https://developer.xero.com/documentation/api/accounting/invoices#optimised-use-of-the-where-filter
- https://api.xero.com/api.xro/2.0/Invoices?where=Type%3D%22ACCPAY%22

## Getting Started

To run locally, you'll need a local web server with PHP support.

- MAMP is a good option [Download MAMP](https://www.mamp.info/en/downloads/)

# Backend

### Download this code

- Clone (or download) this repo into your local server webroot
- if downloaded, rename folder from `quadient-qap-xero-main` to `quadient-qap-xero`
- Launch a terminal app and change to the `backend` directory
- Download dependencies with Composer using the following command:

```
cd backend
```

then

```
composer install
```

## Create a Xero App

To obtain your API keys, follow these steps and create a Xero app

- Create a [free Xero user account](https://www.xero.com/us/signup/api/) (if you don't have one)
- Login to https://developer.xero.com/app/manage > Configuration
- Click "New App" link
- Enter your App name, company url, privacy policy url.
- Enter the redirect URI (your callback url - i.e. `http://localhost:8888/quadient-qap-xero/backend/callback.php`)
- Agree to terms and condition and click "Create App".
- Click "Generate a secret" button.
- Copy your client id and client secret and save for use later.
- Add client ID, client secret and redirect URI to backend/.env (.env file should be in the format of .env.example)
- Click the "Save" button. You secret is now hidden.

## Configure API keys

You'll need to update your .env file for clientId, clientSecret and redirectUri

Sample PHP code from backend/authorization.php

```php

$provider = new \League\OAuth2\Client\Provider\GenericProvider([
  'clientId'                =>  $_ENV['CLIENT_ID'],
  'clientSecret'            =>  $_ENV['CLIENT_SECRET'],
  'redirectUri'             => $_ENV['REDIRECT_URI'],
  'urlAuthorize'            => 'https://login.xero.com/identity/connect/authorize',
  'urlAccessToken'          => 'https://identity.xero.com/connect/token',
  'urlResourceOwnerDetails' => 'https://api.xero.com/api.xro/2.0/Organisation'
]);

```

## Take it for a spin

Launch your browser and navigate to http://localhost:8888/quadient-qap-xero/backend/ (or whatever the correct path is).

- You should see a connect to xero link.
- Click the link, login to Xero (if you aren't already)
- Grant access to your user account and select the Demo company to connect to.
- Navigate to http://localhost:8888/quadient-quap-xero/backend/fetch-qap-data.php

# Frontend

## Setup React App (_vite_)

From directory root

```
cd frontend
```

Download dependencies with

```
npm install
```

Start the development server with

```
npm run dev
```

then navigate to resulting URL.
