<?php
	
	//print_r($_POST);
    $countryIsoAlpha3 = $_POST["iso_a3"];
    $countryData = json_decode(file_get_contents("../../countryBorders.geo.json"), true);

            $country = [];

            foreach ($countryData['features'] as $feature) {
                $temp = null;
                if($countryIsoAlpha3 == $feature['properties']['iso_a3'])
                {
                    $temp['isoa3'] = $feature['properties']['iso_a3'];

               
                    $temp['geometry'] = $feature['geometry'];
                    array_push($country, $temp);
                }
               
            }
  // print_r($country);
    $output['geoJson'] = $country[0]['geometry'];
    $output['isoa3'] =$country[0]['isoa3'];
	header('Content-Type: application/json; charset=UTF-8');
	//print_r($output);
	echo json_encode($output); 
	//var_dump($geo_arr);

?>