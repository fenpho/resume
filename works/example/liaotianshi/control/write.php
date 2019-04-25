<?php
	session_start();
	header("Content-type: application/json");
	//得到信息
	$yonghuming = $_SESSION["yonghuming"];
	$neirong = $_POST["neirong"];

	//正则验证
	if(preg_match("/[\<\>]/",$neirong)){
		echo '{"result":"wrong"}';
		exit;
	}
	
 
	 
	//创建一个连接。连接哪个数据库服务器、用户名、密码
	$conn = mysql_connect("localhost","root","123456");
	//选择一个数据库
	mysql_select_db("liaotianshi",$conn);

	//设置一下字符集 mysql_query就是执行SQL的意思
	mysql_query("SET NAMES UTF8");

	//执行一条SQL语句，SQL语句操作数据库的语句。SQL是独立的语言，PHP、JavaEE、.net、pethon都在用SQL语句
	$result = mysql_query("INSERT INTO liaotianshi (yonghuming,neirong) VALUES ('{$yonghuming}','{$neirong}')");
 
	if($result == 1){
		echo '{"result":"ok"}';
	}else{
		echo '{"result":"wrong"}';
	}
	//关闭数据库
	mysql_close($conn);
?>