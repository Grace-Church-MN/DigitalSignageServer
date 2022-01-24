const http = require("http");
const {
	exec
} = require('child_process');

const host = 'localhost';
const port = 7000;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const requestListener = function(req, res) {
	let data = '';
	req.on('data', chunk => {
		data += chunk;
	})
	req.on('end', async () => {

		if (data == 'power') {
			console.log('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_POWER');
			exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_POWER');
			await sleep(200);
			exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_POWER');
			res.setHeader("Content-Type", "application/json");
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'power_sharp') {
			console.log('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_POWER');
			exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_POWER');
			res.setHeader("Content-Type", "application/json");
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'power_and_vol') {
			console.log('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_POWER');
			exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_POWER');
			await sleep(10000);
			for (let i = 0; i < 30; i++) {
				exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_VOLUMEUP');
				await sleep(200);
			}
			res.setHeader("Content-Type", "application/json");
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'vol_up') {
			console.log('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_VOLUMEUP');
			exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_VOLUMEUP');
			res.setHeader("Content-Type", "application/json");
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'vol_15') {
			for (let i = 0; i < 15; i++) {
				exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_VOLUMEUP');
				await sleep(200);
			}
			res.setHeader("Content-Type", "application/json");
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'vol_down') {
			console.log('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO VOL_DWN');
			exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO VOL_DWN');
			res.setHeader("Content-Type", "application/json");
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'mute') {
			console.log('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_MUTE');
			exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_MUTE');
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

const server = http.createServer((requestListener) => {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'POST',
		'Access-Control-Max-Age': 5000,
	};
});
server.listen(port, () => {
	console.log(`Server is running on http://${host}:${port}`);
});
