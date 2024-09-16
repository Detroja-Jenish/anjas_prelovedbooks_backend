export type ErrorMessage = {
    status: number
    errorMessage: string
}
export type ErrorMessagesType = {
    bookDidNotUpdate: ErrorMessage
    bookNotFound: ErrorMessage
    awsObjectDidNotDelete: ErrorMessage
    awsDidNotGetPutURL: ErrorMessage
    invalidJWTtoken: ErrorMessage
    missingJWTtoken: ErrorMessage
    cartNotFound: ErrorMessage
    addressNotInserted: ErrorMessage
    emptyCart: ErrorMessage
    someError: ErrorMessage
    orderNotCreated: ErrorMessage
    bookNotAvialable: (bookName: string, additional?: string) => ErrorMessage
    orderNotFound: ErrorMessage
    razorPayOrderCreationFailed: ErrorMessage
    paymentNotVefied: ErrorMessage
    categoryNotFound: ErrorMessage
    alreadyInCart: ErrorMessage
    cantCpturePayment: ErrorMessage

}

const errorMessages: ErrorMessagesType = {
    cantCpturePayment: {
        status: 400,
        errorMessage: "cant capture"
    },
    alreadyInCart: {
        status: 400,
        errorMessage: "book is already in cart"
    },
    bookDidNotUpdate: {
        status: 400,
        errorMessage: "book did not update properly"
    },
    bookNotFound: {
        status: 404,
        errorMessage: "book not found"
    },
    awsObjectDidNotDelete: {
        status: 400,
        errorMessage: "unable to delete objects"
    },
    awsDidNotGetPutURL: {
        status: 404,
        errorMessage: "unable to get aws put object url"
    },
    invalidJWTtoken: {
        status: 404,
        errorMessage: "invalid jwt token"
    },
    missingJWTtoken: {
        status: 404,
        errorMessage: "Access token is missing"
    },
    cartNotFound: {
        status: 404,
        errorMessage: "Cart Not Found"
    },
    addressNotInserted: {
        status: 404,
        errorMessage: "address not inserted"
    },
    emptyCart: {
        status: 404,
        errorMessage: "Your Cart is curresntly empty"
    },
    someError: {
        status: 404,
        errorMessage: "some error"
    },
    orderNotCreated: {
        status: 404,
        errorMessage: "order not created"
    },
    bookNotAvialable: (bookName: string, additional: string = "") => ({
        status: 404,
        errorMessage: `Oops!  ${bookName}  is out of stock ${additional}`
    }),
    orderNotFound: {
        status: 404,
        errorMessage: "order not found"
    },
    razorPayOrderCreationFailed: {
        status: 404,
        errorMessage: "can not initiate razorpay order"
    },
    paymentNotVefied: {
        status: 404,
        errorMessage: "payment not verified your order has been cancled"
    },
    categoryNotFound: {
        status: 404,
        errorMessage: "category not found"
    },
}
export default errorMessages