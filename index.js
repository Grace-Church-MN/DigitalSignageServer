const http = require("http");
const {
	exec
} = require('child_process');

const host = 'localhost';
const port = 7000;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// true = input on Digital Signage; false = input on CCTV/Airtame //
let currentInput = true;

const requestListener = function(req, res) {
	let data = '';
	req.on('data', chunk => {
		data += chunk;
	})
	req.on('end', async () => {

		if (data == 'lg_off') {
			exec('php /home/rock/DigitalSignageServer/lg_off.php');
			res.setHeader("Content-Type", "application/json");
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'post');
			res.setHeader('Access-Control-Max-Age', 5000);
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'lg_on') {
			exec(`wakeonlan <mac here>`);
			res.setHeader("Content-Type", "application/json");
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'post');
			res.setHeader('Access-Control-Max-Age', 5000);
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else {
			res.setHeader("Content-Type", "application/json");
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'post');
			res.setHeader('Access-Control-Max-Age', 5000);
			res.writeHead(404);
			res.end(`{"message": "Error path does not exist."}`);
		}
	})
};

const server = http.createServer(requestListener);
server.listen(port, () => {
	console.log(`Server is running on http://${host}:${port}`);
});
