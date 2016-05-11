<?php
	$dir = new DirectoryIterator(dirname("../data/entries/entries/"));
	foreach($dir as $file){
		if(!$file->isDot()){
			//echo $file->getFilename();
			$string .= file_get_contents("../data/entries/$file").",";
		}
	}
	$string = substr($string, 0, -1);
	$result = "loadMarkers({\"entries\":[$string],";

	$dir = new DirectoryIterator(dirname("../data/locations/locations/"));
	$string = "";
	foreach($dir as $file){
		if(!$file->isDot()){
			//echo $file->getFilename();
			$string .= file_get_contents("../data/locations/$file").",";
		}
	}
	$string = substr($string, 0, -1);
	$result .= "\"locations\":[$string],";

	$dir = new DirectoryIterator(dirname("../data/profiles/profiles/"));
	$string = "";
	foreach($dir as $file){
		if(!$file->isDot()){
			//echo $file->getFilename();
			$string .= file_get_contents("../data/profiles/$file").",";
		}
	}
	$string = substr($string, 0, -1);

	$result .= "\"profiles\":[$string]})";
	header("content-type: application/javascript");
	echo $result;
?>