export default async function handler(req, res) {
  try {
    const { firstName, lastName, email, accessToken } = JSON.parse(req.body);

    const headers = new Headers({
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      product: "Pay",
    });

    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    let sessionKeyRes = await fetch(
      `${process.env.LINK_API_BASE_PATH}/session/v1/sessions`,
      requestOptions
    );

    const parsedSessionKeyRes = await sessionKeyRes.json();

    res.status(200).send({ sessionKey: parsedSessionKeyRes.sessionKey });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
