<?php
$geo_arr;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>6-12-2020 Latest</title>
 
   
    <!--Bootstrap css Links-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <!--custom css link-->
    <link rel="stylesheet" href="css/style.css">
    <!--leaflet css link-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
   
    <!--font link for logo text-->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Sonsie+One&display=swap" rel="stylesheet">
</head>
<body>
    <!--navbat Start-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
        <img src="images/logo.jpg" width="50px" alt="" class="img_logo">
        <a class="navbar-brand" href="#"><span class="logo_text"><h4>Gazzetter</h4> </span> </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          </ul>  
          <select id="selCountry"  class="custom-select"  style="width: 250px;">
            <option value="" disabled selected>Select country</option>
            
            <?php
            $countryData = json_decode(file_get_contents("countryBorders.geo.json"), true);

            $country = [];

            foreach ($countryData['features'] as $feature) {
                $temp = null;
                $temp['code'] = $feature['properties']['iso_a2'];

                $temp['isoa3'] = $feature['properties']['iso_a3'];

                $temp['name'] = $feature['properties']['name'];
                $geo_arr = json_encode($feature['geometry']);
                array_push($country, $temp);
            }
            
            
            for($i = 0; $i<count($country); $i++)
            {
                echo '<option data-userid="'.$country[$i]["isoa3"].'" value="'.$country[$i]["code"].'">'.$country[$i]["name"].'</option>';
            }
            ?>
            
        </select>
           <button class="btn btn-primary ml-2 my-2 my-sm-0 " type="submit" id="btnSearch">Search </button>
        </div>
      </nav>
    <!--navbat End-->
    <?php //print_r($geo_arr); ?>
    
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
              <div id="map"></div>
            </div>
            <div class="col-md-2 mt-3 ">
              <p>Country Name : <span id="countryName"></span></p>
              <p>Country Code : <span id="countryCode"></span></p>
              <p >Capital : <span id="capital"></span></p>
              <p >Population : <span id="population"></span>  </p>
              <p> Area (km<sup>2</sup>) : <span id="area"></span> </p>
              <p >languages : <span id="language" ></span> </p>
          </div>
          <div class="col-md-2  mt-3 ">
         
            <p><span > <img src="" alt="" id="flag" > </span></p>
            <p>Calling code : <span id="callingCode"></span></p>
            <p>Cioc : <span id="cioc"></span></p>
            <p>Region : <span id="region"></span></p>
            <p>Time Zone : <span id="timeZone">  </span></p>
            <p>Numeric code : <span id="numCode"></span></p>
            <p>Demonym : <span id="demonym"></span></p>
            <p>Currency Code: <span id="currencyCode"></span> <br>
               Name: <span id="currencyName"></span> <br> Symbol: <span id="currencySymbol"></span>
            </p>
            <p>Exchange Rate : <span id="ex_rate"></span></p>


          </div>
    </div>
  </div>

  <div class="container-fluid mt-3 ">
   <div class="row">
     <div class="col-md-4 "> 
      <h2>Weather information</h2>
      <p>Feels Like: <span id="feels"></span><img src="" id="wi" alt="Weather Icon"></p>
      <p>Humidity : <span id="humidity"></span></p>
      <p>Pressure : <span id="pressure"></span></p>
      <p>Min Temp : <span id="min_temp"></span></p>
      <p>Max Temp : <span id="max_temp"></span></p>
      <p>Sunrise : <span id="sunrise"></span></p>
      <p>Sunset : <span id="sunset"></span></p>
      <p>Description: <span id="description"></span></p>
      <p>Wind Speed :  <span id="speed"></span> </p>
     </div>
     <div class="col-md-4 ">
       <h2>Wikipedia information</h2>
         <p>Summary 1 : <span id="sum1"></span>
       <br><p>Title: <span id="title1"></span></p><br>
       <p>geoNameId:<span id="geoId1"></span></p><br>
       
        <p>Wikipedia Url: <a id="url1" style="text-decoration: none" target="_blank"></a></p>
        
        <img id="thumb1" >

        <p>Summary 2 : <span id="sum2"></span>
       <br><p>Title: <span id="title2"></span></p><br>
       <p>geoNameId:<span id="geoId2"></span></p><br>
       
        <p>Wikipedia Url: <a id="url2" style="text-decoration: none" target="_blank"></a></p>
        
        <img id="thumb2" >



       <p>Summary 3 : <span id="sum3"></span>
       <br><p>Title: <span id="title3"></span></p><br>
       <p>geoNameId:<span id="geoId3"></span></p><br>
       
        <p>Wikipedia Url: <a id="url3" style="text-decoration: none" target="_blank"></a></p>
        
        <img id="thumb3" >

     </div>
     <div class="col-md-4">
     <p>Category : <span id = "category1"></span></p>
     <p >Description :<span id="description1"></span></p>
    <p><a id="url" style="text-decoration: none" target="_blank"></a></p>
    <hr>

    <p>Category : <span id = "category2"></span></p>
     <p >Description :<span id="description2"></span></p>
    <p><a id="url4" style="text-decoration: none" target="_blank"></a></p>
<hr>
    <p>Category : <span id = "category3"></span></p>
     <p >Description :<span id="description3"></span></p>
    <p><a id="url5" style="text-decoration: none" target="_blank"></a></p>
<hr>

  
    </div>

   </div>
  </div>






<!--  JavaScript Sources -->
<!--jQuery first, then Popper.js, then Bootstrap JS-->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
 <!--Leaflet js -->
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>    
<!--my app.js link-->
<script type="text/javascript" src="libs/js/app.js"></script>
    
</body>
</html>