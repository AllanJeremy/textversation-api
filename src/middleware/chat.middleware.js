const Api = require("../lib/api");
const Chat = require("../modules/chat");

module.exports.sendMessage = (req,res,next)=>{
    Api.attachErrorHandler(res,
        Chat.sendMessage(req.params.chatId,req.body.data).then((response)=>{
            const data = {
                message: req.body.data
            };
            const responseStatus = 201;
            let responseData = Api.getResponse(true,"Successfully sent message",data,responseStatus);

            res.status(responseData.statusCode).json(responseData);
            next();
        })
    );
};
