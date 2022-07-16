<?php
$f = fsockopen($"IP_ADDR", 9761, $errno, $errstr, 10);
if (!$f) {
	echo "$errstr ($errno)<br />\n";
} else {
	$msg = "ka 000 00";
	fwrite($f, $msg);
	fclose($f);
}
?>
