import Razorpay from "razorpay";
import errorMessages from "../../utils/errorMessages";
import crypto from "crypto"
export class RazorpayController {
    private static instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! })

    static createOrder = async (amount: number) => {
        try {
            const razorPayOrder = await this.instance.orders.create({
                amount: amount + 100,
                currency: "INR",
                receipt: "receipt#1",
            })
            if (!razorPayOrder) throw errorMessages.razorPayOrderCreationFailed
            return razorPayOrder
        } catch (error) {
            console.log(error);

            throw errorMessages.razorPayOrderCreationFailed
        }
    }

    static verifyPayment = async (order_id: string, payment_id: string, signature: string) => {
        const generatedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(order_id + "|" + payment_id)
            .digest("hex");

        return (generatedSignature === signature)
    }

    static capture = async (paymentId: string, amount: number) => {
        try {
            console.log("paymentId ", paymentId, " amount ", amount);

            await this.instance.payments.capture(paymentId, amount, "INR")
        } catch (error) {
            console.log("error in razorpay controller", error);

            throw errorMessages.cantCpturePayment
        }
    }
}