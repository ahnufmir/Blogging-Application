const { validateToken } = require("../services/authentication");


function checkForCookieAuhtentication(cookieName){
    return ((req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) return next();

        try{
            const payload = validateToken(tokenCookieValue);
            console.log(payload);
            req.user = payload;
        }
        catch(error){
        }
        return next();
    })
}

module.exports = {
    checkForCookieAuhtentication
}