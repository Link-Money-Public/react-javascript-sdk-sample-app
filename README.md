# React Javascript SDK Sample App

This is a public code sample demonstrating how to integrate the Link Money Pay by Bank Web SDK into your own react application

## Requirements

Please ensure that you have interfaced with someone at Link Money in order to whitelist your redirect url. Also ensure that you have a valid client ID and secret from your merchant backend plus a valid merchant ID provided by Link Money. In order to acquire a valid Link Money merchant ID, [please reach out to us](https://www.link.money/contact).

## Installation

In order to have a working example application you will have to refer to the `.env.example` for which environment variables are required.

Once you have all the necessary values, you can create a standard `.env` file with your production values.

Within the `index.js` you can enter your test customer data when generating a session.

You can also adjust the `/api/make-payment` body to your needs.

Your sample app should look like this:

<hr />

and once you click the "Pay by Bank" button you should be shot over to our Link Money Client, which looks like this:

## Linking and Payment

The linking and payment process can be broken into four steps.

1.  `/api/get-access-token` endpoint generates an access token.
2.  Clicking the `Pay by Bank` button will then generate the session key via the `/api/get-session-token` endpoint.
3.  User’s account is linked using the Link Money Pay by Bank SDK with a customer ID being generated.
4.  You can now make a payment request using the appropriate tokens plus the customer ID.

For further information please refer to [our documentation](https://developer.link.money/).

## Customer Information and Accounts

Once you have successfully created a customer within our system and retrieved a customer id, you can then easliy retrieve that customer's information and accounts using the SDK.

1.  Save customer ID upon returning from linking flow.
2.  Enter the customer ID into either the `getCustomer` or `getAccounts` functions provided by the SDK.
3.  Click the associated button.

For further information please refer to [our documentation](https://developer.link.money/products/sdks#get-customer-by-id).
