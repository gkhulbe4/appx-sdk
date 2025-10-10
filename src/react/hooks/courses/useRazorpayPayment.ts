import { RazorpayOptions } from "../../../types/razorTypes";
import { useAppx } from "../../useAppx";

const COMMON_RAZORPAY_KEY = "rzp_live_ClassXCommonKey";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function useRazorpayPayment() {
  const { razorPayKey, sdk } = useAppx();

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

      const options = {
        key: razorPayKey || COMMON_RAZORPAY_KEY,
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
      };

      if (razorPayKey != null) {
        const rzp = new window.Razorpay(options);
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
