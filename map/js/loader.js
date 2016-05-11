var entries = <?php
	$dir = new DirectoryIterator(dirname("../data/entries/entries/"));
	$result = '{[';
	foreach($dir as $file){
		if(!$file->isDot()){
			//echo $file->getFilename();
			$result .= file_get_contents("../data/entries/$file");
		}
	}
	$result .= "]}";
	echo $result;
?>;