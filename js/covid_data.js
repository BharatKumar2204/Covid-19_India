window.onload = function(){
    document.getElementById('view').click();
  }
 
const api_url ='https://data.covid19india.org/v4/min/data.min.json'; // api of covid-19

var today = new Date().toISOString().slice(0, 10);// today's date

var date = new Date();
date.setDate(date.getDate()-1);
var yesterday= date.getFullYear()+ '-' + (date.getMonth()+1).toString().padStart(2, "0")+ '-'+date.getDate().toString().padStart(2, "0");//yesterday's date
 
var date1 = new Date();
date1.setDate(date.getDate()-1);
var dayBfrYes= date1.getFullYear()+ '-' + (date1.getMonth()+1).toString().padStart(2, "0")+ '-'+date1.getDate().toString().padStart(2, "0");//yesterday's date

var time = new Date().getHours(); //present hour

var covidtime;
var beforeday
 if(time>19){
    var covidtime=today;
 }
 else{
    var covidtime =yesterday;
 }



function val(){
    document.getElementById("title").innerHTML="Loading..." ;
var states=document.getElementById("states");
var states_select=String(states.options[states.selectedIndex].value);
var states_sel =String(states.options[states.selectedIndex].text);
console.log(states_select);
 async function details(){
    const response = await fetch(api_url);
    const data = await response.json();
 /*    if(data[states_select]["dates"][covidtime]){
        var covidtime=today;
        var beforeday=yesterday;
     }
    
     else{
        var covidtime =yesterday;
        var beforeday=dayBfrYes;
     }
     console.log(beforeday);
     console.log(covidtime);
     console.log(time);  */
     console.log(data[states_select]);
    var confirmed = data[states_select]
    //["dates"][covidtime]
    ["total"]["confirmed"];
    var death = data[states_select]
    //["dates"][covidtime]
    ["total"]["deceased"];
    var recovered = data[states_select]
    //["dates"][covidtime]
    ["total"]["recovered"];
    var conf = data[states_select]
    //["dates"][beforeday]
    ["total"]["confirmed"];
    var dea = data[states_select]
    //["dates"][beforeday]
    ["total"]["deceased"];
    var reco = data[states_select]
    //["dates"][beforeday]
    ["total"]["recovered"];
    var act =confirmed-recovered-death;
    console.log(confirmed-recovered-death);
    document.getElementById("title").innerHTML="" ; 
    document.getElementById("confirm").innerHTML="Confirmed Cases: "+confirmed ;
    //document.getElementById("newconf").innerHTML= " +"+(confirmed-conf) ;
    document.getElementById("newconf").style.color='#2EFF2E';
    //document.getElementById("newdea").innerHTML= " +"+(death-dea) ;
    document.getElementById("newdea").style.color='red';
    //document.getElementById("newrec").innerHTML= " +"+(recovered-reco) ;
    document.getElementById("newrec").style.color='#2EFF2E';
    document.getElementById("active").innerHTML="Active Cases: "+(act);
    //document.getElementById("act").innerHTML= " "+((act)-(conf-dea-reco)) ;
   /* if((act)-(conf-dea-reco)<0){
        document.getElementById("act").style.color='#2EFF2E';
    }
    else{
        document.getElementById("act").innerHTML= " +"+((act)-(conf-dea-reco)) ;
        document.getElementById("act").style.color='red';
    }*/
    document.getElementById("death").innerHTML="Total Death: "+death ;
    document.getElementById("recover").innerHTML="Recovered Cases: "+recovered ;
 
    if(window.myChart instanceof Chart)
    {
        window.myChart.destroy();
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Confirmed Cases', 'Recovered Cases','Active Cases' ,'Total Death'],
            datasets: [{
                label: '# of Votes',
                data: [confirmed, recovered, act, death],
                backgroundColor: [
                    '#03254c',
                    '#187bcd',
                    'skyblue',
                    '#4b92db',
                    
                ],
                borderColor:'whitesmoke',
                
                borderWidth: 1
                
            }]
            
        },
        
        
    }
    
    ); 

    

    
    
   
} 


details();  
}
 
  
 
     
 
