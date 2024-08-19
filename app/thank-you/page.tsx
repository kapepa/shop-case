import { NextPage } from "next";
import { Suspense } from "react";
import { ThankYou } from "./components/thank-you";

const ThankYouPage: NextPage = () => {
  return (
    <Suspense>
      <ThankYou/>
    </Suspense>
  )
}

export default ThankYouPage;