import winston from 'winston';

const logger = winston.createLogger({

transports:
new winston.transports.Console({
    level:"info",
    format: winston.format.combine(
        
        winston.format.simple()
    )
})
})

export const addLogger =(req,res,next)=>{
    req.logger=logger ;
   /* req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    req.logger.warn(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)*/
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
next();
}

const levelOptions={
    level:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        debug:4
    },
    colors:{
        fatal:'red',
        error:'yellow',
        warning:'orange',
        info:'blue',
        debug:'white'
    }
}