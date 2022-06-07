const http = require("http");
const {
	exec
} = require('child_process');

const host = 'localhost';
const port = 7000;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// false = input on Digital Signage; true = input on CCTV/Airtame //
let currentInput = false;

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
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'post');
			res.setHeader('Access-Control-Max-Age', 5000);
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'power_sharp') {
			console.log('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_POWER');
			exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_POWER');
			res.setHeader("Content-Type", "application/json");
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'post');
			res.setHeader('Access-Control-Max-Age', 5000);
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'lg_serial_off') {
			exec(`echo 'ka 01 00' > /dev/ttyS0`);
			res.setHeader("Content-Type", "application/json");
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'post');
			res.setHeader('Access-Control-Max-Age', 5000);
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'lg_serial_on') {
			exec(`echo 'ka 01 01' > /dev/ttyS0`);
			res.setHeader("Content-Type", "application/json");
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'post');
			res.setHeader('Access-Control-Max-Age', 5000);
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
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'post');
			res.setHeader('Access-Control-Max-Age', 5000);
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'vol_up') {
			console.log('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_VOLUMEUP');
			exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_VOLUMEUP');
			res.setHeader("Content-Type", "application/json");
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'post');
			res.setHeader('Access-Control-Max-Age', 5000);
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'vol_15') {
			for (let i = 0; i < 15; i++) {
				exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_VOLUMEUP');
				await sleep(200);
			}
			res.setHeader("Content-Type", "application/json");
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'post');
			res.setHeader('Access-Control-Max-Age', 5000);
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'vol_down') {
			console.log('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO VOL_DWN');
			exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO VOL_DWN');
			res.setHeader("Content-Type", "application/json");
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'post');
			res.setHeader('Access-Control-Max-Age', 5000);
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'mute') {
			console.log('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_MUTE');
			exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO KEY_MUTE');
			res.setHeader("Content-Type", "application/json");
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'post');
			res.setHeader('Access-Control-Max-Age', 5000);
			res.writeHead(200);
			res.end(`{"message": "success"}`);
		} else if (data == 'input') {
			console.log('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO INPUT');
			if (currentInput) {
				exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO INPUT');
				sleep(200);
				exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO INPUT');
			} else {
				exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO INPUT');
				sleep(200);
				exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO INPUT');
				sleep(200);
				exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO INPUT');
				sleep(200);
				exec('irsend SEND_ONCE --device=/var/run/lirc/lircd VIZIO INPUT');
			}

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
