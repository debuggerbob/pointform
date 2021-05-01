export default function generateFVID () {
    const fvid = Math.random().toString(36).substring(5) + "-" + Math.random().toString(36).substring(5) + "-" + Math.round(new Date().getTime()/1000000)
    return fvid
}