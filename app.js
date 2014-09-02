var http = require('http'),
  	fs = require('fs');
var historial = [];

var server = http.createServer(function(req,res){
	//Abrimos el fichero index.html
	fs.readFile('./index.html',function(err,data)
	{
		if(!err)
		{
			res.writeHead(200,'text/html');
			res.end(data,'utf-8');
		}else
		{
			throw err;
		}
	});
}).listen(3000,'127.0.0.1');

console.log("Conexión establecida...");

var io = require('socket.io').listen(server);

io.on('connection',function(socket)
{
	//Nada mas conectar, envia el historial de la conversacion
	socket.emit('show historial',historial);//enviamos un historial de mensajes

	//Cuando recibimos de un cliente la peticion de  send mensaje
	socket.on('send mensaje',function(data)
	{
		//Enviamos a todos los clientes el mensaje 
		socket.emit('put mensaje',data);
		socket.broadcast.emit('put mensaje',data);
		historial.push(data);
	});
});