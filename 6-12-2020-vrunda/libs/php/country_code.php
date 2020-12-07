<?php
	$countryisoa3;
    $geoJsonString = file_get_contents("../../countryBorders.geo.json");

    $geoJsonDecode = json_decode($geoJsonString,true);
    $geoJsonCountries = $geoJsonDecode['features'];
  
    foreach($geoJsonCountries as $country){
        
            //print_r($country);
            $countryisoa3 = $country['properties']['iso_a3'];
       
        }
    

   
    $output['isoa3'] = $countryisoa3;
	
	echo json_encode($output); 
	//var_dump($geo_arr);

?>