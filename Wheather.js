// jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req, res){
  const query=req.body.cityName;
  const apiKey="d22adb7660a044b823f5201bbb3d29f9";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit +"";

  https.get(url, function(respons){
    console.log(respons.statusCode);
    respons.on("data",function(data){
    const wheatherData=JSON.parse(data)
    const temp=wheatherData.main.temp;
    const wheatherDecription=wheatherData.weather[0].description;
    const icon=wheatherData.weather[0].icon;
    const imagrURL="http://openweathermap.org/wn/"+ icon +"@2x.png";

    res.write("<p>The Wheather Is Currently "+wheatherDecription + "</p>");
    res.write("<h1>The Temprature In " + query + " is:"+ temp +" degrees Celcius</h1>");
    res.write("<img src=" + imagrURL + ">");
    res.send()
    })
  })

});

app.listen(3000,function(){
  console.log("Server Runing on port Number 3000");
});
