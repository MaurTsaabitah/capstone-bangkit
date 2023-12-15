const loggingMiddleware = (req, res, next) => {
    const timestamp = new Date();
    const formatter = new Intl.DateTimeFormat('en-us', { timeZone: 'Asia/Jakarta' });
    const wibTime = formatter.format(timestamp);
    const method = req.method;
    const url = req.url;
    const userAgent = req.headers['user-agent'];

    console.log(`[${wibTime}] ${method} ${url} - ${userAgent}`);

    next();
}

export default loggingMiddleware;