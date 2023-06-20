/* 服务器index.js文件 */ 
 
const http = require('http');
const WebSocketServer = require('websocket').server;
const moment = require('moment')
 
// 创建HTTP服务器
const httpServer = http.createServer((req,res)=>{
    res.writeHead(404);
    res.end();
})
 
// 创建websocket服务器
const wsServer = new WebSocketServer({
    httpServer,
    autoAcceptConnections : true    // 自动接受连接
})
 
// 监控接入
wsServer.on('connect',(connection)=>{
    // 监控数据信息message
    connection.on('message',(msg)=>{
        console.log('>> message' , msg);
        if( msg.type === 'utf8' ){
            var data = {
                content : '[自动回复] : 请等待用户接入回复...',
                date : moment(new Date()).format('YYYY-D-M , h:mm a')
            }
            connection.sendUTF( JSON.stringify(data) )
        }
    })
 
    // 监控关闭
    connection.on('close',()=>{
        console.log('Socket服务关闭');
    })
    
})
 
// 监听 3000 端口
httpServer.listen('3000',()=>{
    console.log('SERVER RUNNING ...')
})