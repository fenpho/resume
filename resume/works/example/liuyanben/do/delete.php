<?php
	$id = $_GET["id"];
	//链接数据库
	$conn = mysql_connect("127.0.0.1","root","123456");
	//选择数据库
	mysql_select_db("liuyanben",$conn);
	//设置字符集
	mysql_query("SET NAMES UTF8");
	//查询得到的结果是个混沌状态，不是数组
 

	$result = mysql_query("DELETE FROM liuyanben WHERE id = {$id}");
	 
	if($result == 1){
		echo "ok";
	}else{
		echo "wrong";
	}
	mysql_close($conn);
?>