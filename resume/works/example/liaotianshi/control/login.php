<?php
	session_start();
	$yonghuming = $_POST["yonghuming"];

	//正则验证
	if(preg_match("/[\<\>]/",$yonghuming)){
		echo "0";
		exit;
	}

	$_SESSION["yonghuming"] = $yonghuming;

	echo "1";

?>