const http = require("http");
const { exec } = require('child_process');

const host = 'localhost';
const port = 7000;

const requestListener = function (req, res) {
	let data = '';
	req.on('data', chunk => {
		data += chunk;
	})
	req.on('end', () => {

		if(data == 'power'){
			console.log('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_POWER');
			exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_POWER');
			res.setHeader("Content-Type", "application/json");
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else {
			res.setHeader("Content-Type", "application/json");
			res.writeHead(404);
			res.end(`{"message": "Error path does not exist."}`);
		}
	})
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`);
});
