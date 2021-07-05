export const baseurl = process.env.NODE_ENV !== "production" ? "http://localhost:3000"  : ""

export const stableVersion = "v1"

export const baseApiUrl = `${baseurl}/api/${stableVersion}`
