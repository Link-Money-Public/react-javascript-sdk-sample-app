export default async function handler(req, res) {
  try {
    const headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    });

    const body = new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "client_credentials",
      scope: "Link-Core",
    });

    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    let accessTokenRes = await fetch(
      `${process.env.AUTH_SERVER_BASE_PATH}/v1/token`,
      requestOptions
    );

    const parsedAccessToken = await accessTokenRes.json();

    res.status(200).send({ accessToken: parsedAccessToken.access_token });
  } catch (err) {
    res.status(500).send(err);
  }
}
