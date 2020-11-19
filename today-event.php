<!DOCTYPE html>
<html lang="en">
<head>
<title>Today meeting</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Share+Tech+Mono'>
<link rel="stylesheet" href="./css/style.css">

<link rel="manifest" href="/manifest.json">
<meta name="Description" content="Meeting Schedjule" />
<!-- Mendeklarasikan warna yang muncul pada address bar Chrome versi seluler -->
<meta name="theme-color" content="#414f57" />
<!-- Mendeklarasikan ikon untuk iOS -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="Today Meeting" />
<link rel="apple-touch-icon" href="img/logo/merah.png" />
<!-- Mendeklarasikan ikon untuk Windows -->
<meta name="msapplication-TileImage" content="/mg/logo/merah.png" />
<meta name="msapplication-TileColor" content="#000000" />
  
</head>

<body>

  <div class="col-9 col-s-12" style="background-image: url('background/bg.jpg');">
	<div class="left">
		<p><img src="img/logo/Putih.png" style="max-width:250px;"></p>
		<h4>On Board Meeting</4>
		<h1>Personal Account Mr. Along</h1>
		<h5>Room 1 & 2 / 1st Floor
		<br>07.00  – 12:00</h5>	
	
	</div>

	<div class="footer">
		<p>
			Mitraandalanpertama.com 
			</br>
			<img src="img/footer/color.png"> 
		</p>
	</div>
  </div>


  <div class="col-3 col-s-12">
    <div class="right">
		<div id="clock">
			<p>
			<a class="date"><b>{{ date }}</b></a>
			<br>
			<a class="time"><i>{{ time }}</i></a>
			</p>
			<script src='https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.4/vue.min.js'></script><script  src="./js/script.js"></script>
		</div>
		<hr>
			<h1 style="font-size: 35px;"> Today Event </h1>
		
		<hr>
			<h3> Scan Here to Connect Wifi </h3>
			<img src="img/wifi.png" style="width:50%;"> 
		
		<hr>
			<h3>Follow Us</h3>
			<h4>
        <a href="https://www.instagram.com/favepuriindah/?hl=id"><img src="img/sosmed/ig.png" style="max-width:35px"></a>
        <a><img src="img/sosmed/fb.png" style="max-width:35px"></a>
        <a><img src="img/sosmed/em.png" style="max-width:35px"><a> 
      </h4>
		
	</div>
  
</div>


<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js');
    });
  }
</script>

</body>
</html>

