export default async function handler(req, res) {
  try {
    const {
      amount,
      source,
      destination,
      paymentType,
      softDescriptor,
      clientReferenceId,
      accessToken,
    } = JSON.parse(req.body);

    const parsedAmount = {
      value: parseFloat(amount.value),
      currency: amount.currency,
    };

    const headers = new Headers({
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    const body = JSON.stringify({
      source: source,
      destination: destination,
      amount: parsedAmount,
      paymentType,
      softDescriptor,
      requestKey: "Random Value",
      clientReferenceId,
    });

    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    const paymentRes = await fetch(
      process.env.LINK_API_BASE_PATH + "/core/v1/payments",
      requestOptions
    );

    const parsedPaymentRes = await paymentRes.json();

    res.status(200).send(parsedPaymentRes);
  } catch (err) {
    res.status(500).send(err);
  }
}
