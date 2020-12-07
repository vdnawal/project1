//set the map on live location
$(document).ready(function(){
    var capital = "";
    //set navigator
      $('#selCountry').change(function(){
        var sel_iso3 =  $('#selCountry').find(':selected').attr('data-userid');

        //alert(sel_iso3);
        $.ajax({
            url: "libs/php/countryInfo.php",
            type:"POST",
            dataType:"json",
            data:{
                country: $('#selCountry').val(),
                lang: 'en',
               
            },
            success: function(result){
                
                console.log(result);

                if(result.status.name == "ok"){

                    //page content to show html page goes here
                    $('#countryName').html(result['data'][0]['countryName']);
                    $('#capital').html(result['data'][0]['capital']);
                    $('#countryCode').html(result['data'][0]['countryCode']);
                    $('#population').html(result['data'][0]['population']);
                    $('#area').html(result['data'][0]['areaInSqKm']);
                    $('#language').html(result['data'][0]['languages']);
                    capital = result['data'][0]['capital'];
                    geoJson = result['data'][0]['geometry'];
                    cur = result['data'][0]['currencyCode'];
                    cc = result['data'][0]['countryCode'];
                    console.log(capital);
                    getWeather(capital);
                    getExrate(cur);
                    getNews(cc);
                    wikipediaData(capital);
                    
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                    alert('Country data not found');
            }
        })
        $.ajax({
            url:"libs/php/restCountriesInfo.php",
            type:"POST",
            dataType: "json",
            data:{
                code: $('#selCountry').val(),
            },

            success: function(result){
               console.log(result);
                if(result.status.name == "ok"){
                    $('#flag').attr("src",result['data'][0]['flag']);
                    $('#flag').css("width","100px");
                    $('#flag').css("width","100px");
                    $('#callingCode').html(result['data'][0]['callingCodes']);
                    $('#cioc').html(result['data'][0]['cioc']);
                    $('#region').html(result['data'][0]['region']);
                    $('#timeZone').html(result['data'][0]['timezones']);
                    $('#numCode').html(result['data'][0]['numericCode']);
                    $('#demonym').html(result['data'][0]['demonym']);
                    $('#currencyCode').html(result['data'][0]['currencies'][0]['code']);
                    $('#currencyName').html(result['data'][0]['currencies'][0]['name']);
                    $('#currencySymbol').html(result['data'][0]['currencies'][0]['symbol']);
                    
                }

            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Country data not found');
        }

        })
        //alert(sel_iso3);
        $.ajax({
                url: 'libs/php/country_bounds.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    'iso_a3' : sel_iso3
                },
                success: function(result){
                    //console.log(data);
                    countryGeoJson = result['geoJson'];;
                    createGeoJson(countryGeoJson);
                       }
         });

        //Get more information from rest countries api
       
        

    });
    let countryGeoJson = [];
    let mymap = [];
    let iso_a3 ;
    
    if (navigator.geolocation)
    {
        console.log("Geolocation is available");

        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);

      
        
    }else{
        alert("Geolocation is not supported to your browser");
    
    }


});
var geoJsonStyle = {
    "color": "blue",
    "opacity": 0.8,
    "weight": 2,
}

var geoJsonLayer = [];
//success function

function successFunction(position){
    //alert("sf");
    
    let lat ;
    let lng;
    
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log(lat,lng);
        mymap = L.map('map').setView([lat, lng],6);

        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?apikey=2e011da1ea684120b8c6bf9fa2df5a98', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mymap);

   
    
    
    
    $.ajax({
        url: 'libs/php/getCountryName.php',
        type: 'POST',
        dataType: 'json',
        data: {
            latitude: lat,
            longitude:lng
        },
        success: function(result){
            console.log(result);
          let countryName = result['results'][0]['components']['country'];
          let countryCode = result['results'][0]['components']['ISO_3166-1_alpha-2'];

          let iso_a3 = result['results'][0]['components']['ISO_3166-1_alpha-3'];

          $.ajax({
            url: "libs/php/countryInfo.php",
            type:"POST",
            dataType:"json",
            data:{
                country: countryCode,
                lang: 'en',
               
            },
            success: function(result){
                  //  alert("countryInfo");
                console.log(result);

                if(result.status.name == "ok"){
                    //page content to show html page goes here
                    $('#countryName').html(result['data'][0]['countryName']);
                    $('#capital').html(result['data'][0]['capital']);
                    $('#countryCode').html(result['data'][0]['countryCode']);
                    $('#population').html(result['data'][0]['population']);
                    $('#area').html(result['data'][0]['areaInSqKm']);
                    $('#language').html(result['data'][0]['languages']);
                    capital = (result['data'][0]['capital']);
                    geoJson = result['data'][0]['geometry'];
                    cur = result['data'][0]['currencyCode'];
                    //console.log(capital);
                    getWeather(capital);
                    getExrate(cur);
                    getNews(countryCode);
                    wikipediaData(capital);
                    
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                    alert('Country data not found');
            }
        })
        $.ajax({
            url:"libs/php/restCountriesInfo.php",
            type:"POST",
            dataType: "json",
            data:{
                code: countryCode,
            },

            success: function(result){
               console.log(result);
                if(result.status.name == "ok"){
                    $('#flag').attr("src",result['data'][0]['flag']);
                    $('#flag').css("width","100px");
                    $('#flag').css("width","100px");
                    $('#callingCode').html(result['data'][0]['callingCodes']);
                    $('#cioc').html(result['data'][0]['cioc']);
                    $('#region').html(result['data'][0]['region']);
                    $('#timeZone').html(result['data'][0]['timezones']);
                    $('#numCode').html(result['data'][0]['numericCode']);
                    $('#demonym').html(result['data'][0]['demonym']);
                    $('#currencyCode').html(result['data'][0]['currencies'][0]['code']);
                    $('#currencyName').html(result['data'][0]['currencies'][0]['name']);
                    $('#currencySymbol').html(result['data'][0]['currencies'][0]['symbol']);
                    
                }

            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Country data not found');
        }

        })  
          //
          console.log(countryName,countryCode);
          console.log(result);
            if(1){
                $('#countryName').html(result['results'][0]['components']['country']);
                $('#countryCode').html(result['results'][0]['components']['ISO_3166-1_alpha-2']);

                    
                //call the function for country information
                //countryInfo(countryCode);
                
                $(`#selCountry option[value='`+countryCode+`']`).prop('selected', true);

               // $("#selCountry").trigger('change');
               //alert(iso_a3);
                $.ajax({
                        url: 'libs/php/country_bounds.php',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            'iso_a3' : iso_a3
                        },
                        success: function(result){
                            //console.log(data);
                            countryGeoJson = result['geoJson'];;
                            createGeoJson(countryGeoJson);
                               }
                 });
                //call the function for weather information
               

            }

        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('Country not found');
    }

    });
}
function createGeoJson(geoJson) {
    //console.log("geojson data");
    console.log(geoJson);
    if(geoJsonLayer){
        mymap.removeLayer(geoJsonLayer);
    }
    geoJsonLayer = L.geoJson(geoJson, {
        style: geoJsonStyle
    }).addTo(mymap);
    mymap.fitBounds(geoJsonLayer.getBounds());
}
//error function
function errorFunction(e){
    console.log(e.message);
}




//search the country name from dropdown list

    //get info from geonames
  
 
//Weather Information
    function getWeather(capital){
        $.ajax({
            url: "libs/php/getWeather.php",
            type:'POST',
            dataType: "json",
            data:{
                capitalCity: capital
            },
            success:function(result){
                console.log(result);
                if(result.status.name == "ok"){
                    $('#feels').html(result['data']['main']['feels_like']);
                    var iconcode = result.data.weather[0].icon;;
                     var src = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    $('#wi').attr("src",src);
                    $('#humidity').html(result['data']['main']['humidity']);
                    $('#pressure').html(result['data']['main']['pressure']);
                    $('#min_temp').html(result['data']['main']['temp_min']);
                    $('#max_temp').html(result['data']['main']['temp_max']);
                    $('#sunrise').html(result['data']['sys']['sunrise']);
                    $('#sunset').html(result['data']['sys']['sunset']);
                    $('#description').html(result['data']['weather'][0]['description']);
                    $('#speed').html(result['data']['wind']['speed']);
                   
                }
            }
            

        })
    }
    function getExrate(cur){
       
        $.ajax({
            url: "libs/php/exrate.php",
            type:'POST',
            data : {cur : cur},
            dataType: "json",
            success:function(result){
                //console.log("asd");
                s = result.data.rates[cur];
               
                $("#ex_rate").html(s);               
               
                    
            }
            

        })
    }
    function getNews(cc){
       
        $.ajax({
            url: "libs/php/news.php",
            type:'POST',
            data : {cc : cc},
            dataType: "json",
            success:function(result){
            console.log(result); 
            $('#category1').html(result.data.sources[0]['category']);   
            $('#description1').html(result.data.sources[0]['description']);         
            $('#url').html("More Country Info");  
            $('#url').attr("href",result['data']['sources'][0]['url']);

            $('#category2').html(result.data.sources[1]['category']);   
            $('#description2').html(result.data.sources[1]['description']);         
            $('#url4').html("More Country Info");  
            $('#url4').attr("href",result['data']['sources'][1]['url']);

            $('#category3').html(result.data.sources[2]['category']);   
            $('#description3').html(result.data.sources[2]['description']);         
            $('#url5').html("More Country Info");  
            $('#url5').attr("href",result['data']['sources'][2]['url']);

            }
            

        })
    }
    //Wikipedia information
    function wikipediaData(capital){
        console.log("wikidata_cap");
        console.log(capital);
        $.ajax({
            url: 'libs/php/wikipedia.php',
            type:'POST',
            dataType: 'json',
            data:{
                capitalCity:capital
            },
            success:function(result){
                console.log("wiki data");
                console.log(result);
               if(result.status.name == "ok"){
                    $('#sum1').html(result['data']['geonames'][0]['summary']);
                    $('#geoId1').html(result['data']['geonames'][0]['geoNameId']);
                    $('#title1').html(result['data']['geonames'][0]['title']);
                    $('#thumb1').attr("src",result['data']['geonames'][0]['thumbnailImg']);
                    $('#thumb1').css("width","50%");
                    $('#url1').html("More Country Info");
                    $('#url1').attr("href",result['data']['geonames'][0]['wikipediaUrl']);

                    $('#sum2').html(result['data']['geonames'][1]['summary']);
                    $('#geoId2').html(result['data']['geonames'][1]['geoNameId']);
                    $('#title2').html(result['data']['geonames'][1]['title']);
                    $('#thumb2').attr("src",result['data']['geonames'][1]['thumbnailImg']);
                    $('#thumb2').css("width","50%");
                    $('#url2').html("More Country Info");
                    $('#url2').attr("href",result['data']['geonames'][1]['wikipediaUrl']);

                    $('#sum3').html(result['data']['geonames'][2]['summary']);
                    $('#geoId3').html(result['data']['geonames'][2]['geoNameId']);
                    $('#title3').html(result['data']['geonames'][2]['title']);
                    $('#thumb3').attr("src",result['data']['geonames'][2]['thumbnailImg']);
                    $('#thumb3').css("width","50%");
                    $('#url3').html("More Country Info");
                    $('#url3').attr("href",result['data']['geonames'][2]['wikipediaUrl']);

                } 
            }
        })

    }

