import HTTP_STATUS_CODES from "@/lib/constants"

export const handle200 = (res, responseObject?) => {
    return res.status(HTTP_STATUS_CODES.HTTP_OK).json({status: "success", message: responseObject ? responseObject.message : "Success"})
}

export const handle400 = (res, responseObject?) => {
    return res.status(HTTP_STATUS_CODES.HTTP_BAD_REQUEST).json({status: "error", message: responseObject ? responseObject.message : "Bad Request", errorType: "RequestError"})
}

export const handle401 = (res, responseObject?) => {
    return res.status(HTTP_STATUS_CODES.HTTP_UNAUTHORIZED).json({status: "error", message: responseObject ? responseObject.message : "Unauthorized", errorType: "RequestError"})
}

export const handle402 = (res, responseObject?) => {
    return res.status(HTTP_STATUS_CODES.HTTP_PAYMENT_REQUIRED).json({status: "error", message: responseObject ? responseObject.message : "Payment Required", errorType: "RequestError"})
}

export const handle403 = (res, responseObject?) => {
    return res.status(HTTP_STATUS_CODES.HTTP_FORBIDDEN).json({status: "error", message: responseObject ? responseObject.message : "Forbidden", errorType: "RequestError"})
}

export const handle404 = (res, responseObject?) => {
    return res.status(HTTP_STATUS_CODES.HTTP_NOT_FOUND).json({status: "error", message: responseObject ? responseObject.message : "Not Found", errorType: "ResourceError"})
}

export const handle405 = (res, responseObject?) => {
    return res.status(HTTP_STATUS_CODES.HTTP_METHOD_NOT_ALLOWED).json({status: "error", message: responseObject ? responseObject.message : "Method Not Allowed", errorType: "ResourceError"})
}

export const handle409 = (res, responseObject?) => {
    return res.status(HTTP_STATUS_CODES.HTTP_CONFLICT).json({status: "error", message: responseObject ? responseObject.message : "Resource Already Exists", errorType: "ResourceError"})
}

export const handle500 = (res, responseObject?) => {
    return res.status(HTTP_STATUS_CODES.HTTP_INTERNAL_SERVER_ERROR).json({status: "error", message: responseObject ? responseObject.message : "Internal Server Error", errorType: "InternalError"})
}

export const handle502 = (res, responseObject?) => {
    return res.status(HTTP_STATUS_CODES.HTTP_BAD_GATEWAY).json({status: "error", message: responseObject ? responseObject.message : "Bad Gateway", errorType: "InternalError"})
}