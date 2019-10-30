module.exports = logger;

function logger(prefix){
    return(re, res, next) => {
        console.log(
            `${prefix} [${new Date().toISOString()}] ${req.method} to ${req.originalUrl} from ${req.get('host')}`
        );
        next();
    }
}