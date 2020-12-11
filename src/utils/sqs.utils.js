const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const sendQueueMessage = (info, queueName) => {
    const params = {
        DelaySeconds: 10,
        MessageBody: JSON.stringify(info),
        QueueUrl: "http://localstack:4576/queue/" + queueName
    };
    sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.error("Queue fail", JSON.stringify({ "stack error": err, "parameters": params }));
        } else {
            console.log("Queue Success", JSON.stringify(data));
        }
    });
}
const queueStats = (products) => {     
    const productObject = {
        products: products,
        qty: products.length
    };
    sendQueueMessage(productObject, "estadisticas");
}

const queueNotifications = (data) => { 
    let o = new Intl.DateTimeFormat("en" , {
        timeStyle: "medium",
        dateStyle: "short"
    });
    if (data.event == "signup"){
        data.info = "user created at " + o.format(Date.now()) ;
    } else {
        data.info = "user login at " + o.format(Date.now()) ;
    }
    sendQueueMessage(data, "notificaciones");
}
module.exports = {queueStats, queueNotifications};