<?php
	if(isset($_GET["paixu"])){
		$paixu = $_GET["paixu"];
	}else{
		$paixu = 1;
	}
	
	//链接数据库
	$conn = mysql_connect("liuyanben","root","123456");
	//选择数据库
	mysql_select_db("liuyanben",$conn);
	//设置字符集
	mysql_query("SET NAMES UTF8");
	//查询得到的结果是个混沌状态，不是数组

	//根据前端传过来的paixu参数，来调整正序、倒叙
	if($paixu == 1){
		$sql = "SELECT * FROM liuyanben";
	}else if($paixu == 0){
		$sql = "SELECT * FROM liuyanben ORDER BY id DESC";
	}

	$result = mysql_query($sql);
	//存放总结果数组
	$arr = array("jieguo" => array());
	
	while($row = mysql_fetch_array($result)){
		array_push($arr["jieguo"], json_encode($row));
	}

	$json = json_encode($arr);
	print_r($json);

	mysql_close($conn);
?>