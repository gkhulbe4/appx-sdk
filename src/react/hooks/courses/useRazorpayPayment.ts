import { RazorpayOptions } from "../../../types/razorTypes";
import { useAppx } from "../../useAppx";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  );
}

export function useRazorpayPayment() {
  const { sdk } = useAppx();

  async function insertRzpOptions(options: RazorpayOptions) {
    try {
      const res = await sdk.razorpay.insertRazorPayOptions(options);
      return res;
    } catch (error) {
      console.error("Error inserting Razorpay options:", error);
      throw error;
    }
  }

  async function makePayment(
    userId: string,
    userName: string,
    userEmail: string,
    userContact: string,
    userToken: string,
    courseId: string,
    handlingFee: string,
    coupon: string,
    currency: string,
    courseName: string,
    courseThumbnail: string,
    courseDescription: string,
    baseUrl: string,
    itemType: string,
    itemId: string
  ) {
    try {
      const res = await sdk.courses.createOrder(
        userId,
        courseId,
        handlingFee,
        coupon,
        currency
      );

      if (res.status !== 200) {
        console.error("Order creation failed", res);
        return;
      }

      const razorPayKey = await sdk.razorpay.getRazorPayKey(baseUrl, userToken);

      const options = {
        key: razorPayKey,
        currency,
        name: courseName,
        description: courseDescription,
        image: courseThumbnail,
        amount: res.amount,
        order_id: res.order_id,
        payment_capture: 1,
        notes: {
          base_url: baseUrl,
          user_id: userId,
          item_type: itemType,
          item_id: itemId,
          amount: res.amount,
          source: "newwebsite",
        },
        prefill: {
          name: userName,
          email: userEmail,
          contact: userContact,
        },
        token: userToken,
        handler: function (response: any) {
          console.log("Payment successful:", response);
        },
        modal: {
          ondismiss: function () {
            sdk.razorpay
              .insertLeadsData(
                userId,
                itemId,
                itemType,
                "Payment cancelled",
                "website"
              )
              .catch(console.error);

            sdk.razorpay.cancelPayment(res.order_id).catch(console.error);
          },
        },
      };

      console.log("Razorpay options:", options);

      if (isIOS() == false) {
        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response: any) {
          console.log("Payment failed:", response.error);
          sdk.razorpay
            .insertLeadsData(
              userId,
              itemId,
              itemType,
              "Payment failed",
              "website"
            )
            .catch(console.error);
        });

        rzp.open();
      } else {
        const response = await insertRzpOptions(options);
        if (response?.data) {
          window.location.href = `https://checkout.classx.co.in/payment-ios?id=${response.data}`;
        } else {
          console.error("Failed to insert Razorpay options", response);
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  }

  return { makePayment };
}

export default useRazorpayPayment;
