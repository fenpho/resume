<?php
	session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
	<style type="text/css">
		.box{
			width: 700px;
			height: 500px;
			border: 1px solid #ccc;
			overflow-x:hidden;
		}
		.hua{
			border-bottom: 1px solid #ccc;
			background-color: #ccc;
		}
		.hua:nth-child(2n){
			background-color: skyblue;
		}
	</style>
</head>
<?php
	if(!$_SESSION["yonghuming"]){
		echo "你没有起名字！休想黑我！！请去<a href='index.html'>登陆</a>";
		exit;
	}
?>
<body>
	<div class="box">
		<div class="hua">正在读取...</div>
	</div>
	<div class="fayan">
		<?php echo $_SESSION["yonghuming"]; ?>你好，请发言：
		<input type="text" style="width:700px" id="kk" placeholder="按回车发布"/>
	</div>
	<script type="text/javascript" src="js/jquery-1.12.3.min.js"></script>
	<script type="text/javascript">
		setInterval(function(){
			$.get("control/read.php",{"z":Math.random()},function(data){
				$(".box").html("");
				for (var i = 0; i < data.jieguo.length; i++) {
					var o = eval( "(" + data.jieguo[i] + ")");
					$(".box").append($("<div class='hua'><b>" + o.yonghuming + "</b>说：" + o.neirong + "</div>"));
				};
			});
		},1000);
		$("#kk").keydown(function(event){
			if(event.keyCode == 13){
				$.post("control/write.php",{"neirong":$("#kk").val()},function(data){
					$("#kk").val("");
				});
			}
		});
	</script>
</body>
</html>