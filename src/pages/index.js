import Link from "@link.money/linkmoney-web";
import { useAccessToken } from "../hooks/use-access-token";

export default function Home() {
  const accessToken = useAccessToken();

  const handlePayByBank = async () => {
    // create session with customer information
    const sessionKeyRes = await fetch("/api/get-session-key", {
      method: "POST",
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        email: "JohnDoe@gmail.com",
        accessToken,
      }),
    });

    const { sessionKey } = await sessionKeyRes.json();

    // create link instance with session key
    const link = Link.LinkInstance({
      sessionKey,
      redirect: process.env.NEXT_PUBLIC_REDIRECT_URL,
      environment: "production",
    });

    // redirect user to Link Money client
    link.action();
  };
  const handleMakePayment = async () => {
    const paymentRes = await fetch("/api/make-payment", {
      method: "POST",
      body: JSON.stringify({
        accessToken,
        amount: {
          value: 1,
          currency: "USD",
        },
        source: {
          type: "CUSTOMER",
          id: "{CUSTOMER_ID}",
        },
        destination: {
          type: "MERCHANT",
          id: process.env.NEXT_PUBLIC_MERCHANT_ID,
        },
        softDescriptor: "Test",
        clientReferenceId: "Test",
      }),
    });
    const parsedRes = await paymentRes.json();
    console.log(parsedRes);
  };
  const handleGetCustomerInfo = async () => {
    const customerInfo = await Link.getCustomer(accessToken, "{CUSTOMER_ID}");
    console.log(customerInfo);
  };
  const handleGetCustomerAccounts = async () => {
    const customerAccounts = await Link.getAccounts(
      accessToken,
      "{CUSTOMER_ID}"
    );
    console.log(customerAccounts);
  };
  return (
    <main>
      <button onClick={handlePayByBank}>Pay by Bank</button>
      <button onClick={handleMakePayment}>Make Payment</button>
      <button onClick={handleGetCustomerInfo}>Get Customer Info</button>
      <button onClick={handleGetCustomerAccounts}>Get Customer Accounts</button>
    </main>
  );
}
