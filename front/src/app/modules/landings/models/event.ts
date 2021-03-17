export class IEvent {
    _id: string = ''
    landingid: string = ''
    type: string = ''
    urlID: string = ''
    userID: string = ''
    companyID: string = ''
    shortURL: string = ''
    url: string = ''
    date: Date = null
    listID: string = null
    data: any = {
        navigatorData: {
            appCodeName: navigator.appCodeName,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            geolocation: navigator.geolocation,
            language: navigator.language,
            platform: navigator.platform,
            product: navigator.product,
            productSub: navigator.productSub,
            userAgent: navigator.userAgent,
            vendor: navigator.vendor,
        },
        originData: {
            host: location.host,
            hostname: location.hostname,
            href: location.href,
            origin: location.origin,
            pathname: location.pathname,
            port: location.port,
            protocol: location.protocol,
        },
        dataLanding: null,
        date: new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" })
    }
}


