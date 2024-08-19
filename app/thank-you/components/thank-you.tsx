"use client"

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { getPaymentStatus } from "../actions";
import { useSearchParams } from "next/navigation";

const ThankYou: FC = () => {
  const searchParsm = useSearchParams();
  const getOrderId = searchParsm.get("orderId") || "";

  const {} = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId: getOrderId }),
    retry: true,
    retryDelay: 500,
  })

  return (
    <div>
      ThankYou
    </div>
  )
}

export { ThankYou }