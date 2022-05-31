function Getinfo()
{
	var newname = document.getElementById("cityinput");
	var cityname = document.getElementById("jtxt");

	cityname.innerHTML = "City Name : " + newname.value;

	fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newname.value + '&appid=1a5eb7c168cd869ff51aebbbebc14866')
	.then(response => response.json())
	.then(data => {

        var wc =[];
        var temp = [];
        var hum = [];
        var wind = [];

		for (i = 0; i < 5; i++)
		{
            document.getElementById("day" + (i + 1) + "con").innerHTML = "Weather Condition : " + String(data.list[i].weather[0].description);
            //Number(1.3450001).toFixed(2); // 1.35
            wc.push(String(data.list[i].weather[0].description));
        }


        for (i = 0; i < 5; i++)
		{
            document.getElementById("day" + (i + 1) + "temp").innerHTML = "Temperature : " + Number(data.list[i].main.temp - 273.15).toFixed(2) + " °C";
            //Number(1.3450001).toFixed(2); // 1.35
            temp.push(Number(data.list[i].main.temp - 273.15).toFixed(2));
        }

        for (i = 0; i < 5; i++)
		{
            document.getElementById("day" + (i + 1) + "hum").innerHTML = "Humidity : " + Number(data.list[i].main.humidity).toFixed(2) + "  ";
            //Number(1.3450001).toFixed(2); // 1.35
            hum.push(Number(data.list[i].main.humidity).toFixed(2));
        }

        for (i = 0; i < 5; i++)
		{
            document.getElementById("day" + (i + 1) + "wind").innerHTML = "Wind Speed : " + Number(data.list[i].wind.speed).toFixed(2) + " km/h ";
            //Number(1.3450001).toFixed(2); // 1.35
            wind.push(Number(data.list[i].wind.speed).toFixed(2));
        }

        for (i = 0; i < 5; i++)
		{
            document.getElementById("day" + (i + 1) + "time").innerHTML = "Date and Time : " + String(data.list[i].dt_txt) + "  ";
            //Number(1.3450001).toFixed(2); // 1.35
        }

        // converting list of strings to list of integers.
        var tempn = temp.map(Number);
        var humn = hum.map(Number);
        var windn = wind.map(Number);

        console.log(tempn);
        // document.getElementById("day" + (0 + 1) + "time").innerHTML = "Date and Time : " + String(data.list[i].dt_txt) + "  ";
        // document.getElementById("day" + (1 + 1) + "time").innerHTML = "Date and Time : " + String(data.list[i].dt_txt) + "  ";
        // document.getElementById("day" + (2 + 1) + "time").innerHTML = "Date and Time : " + String(data.list[i].dt_txt) + "  ";
        // document.getElementById("day" + (3 + 1) + "time").innerHTML = "Date and Time : " + String(data.list[i].dt_txt) + "  ";
        // document.getElementById("day" + (4 + 1) + "time").innerHTML = "Date and Time : " + String(data.list[i].dt_txt) + "  ";

        //Getting Weather Icons
        for (i = 0; i < 5; i++)
        {
            document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
            	data.list[i].weather[0].icon + ".png";
        }

        // Temperature Visual Charts
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        data.addColumn('number', 'Temperature');

        data.addRows([
            [tempn[0], 0],   [tempn[1], 1],  [tempn[2], 2],  [tempn[3], 3],  [tempn[4], 4]
        ]);

        var options = {
            hAxis:
            {
                title: 'Temperatures'
            },
            vAxis:
            {
                title: 'DAYS'
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);

        // Humidity Visual Charts
        var data1 = new google.visualization.DataTable();
        data1.addColumn('number', 'X');
        data1.addColumn('number', 'Humidity');

        data1.addRows([
            [humn[0], 0],   [humn[1], 1],  [humn[2], 2],  [humn[3], 3],  [humn[4], 4]
        ]);

        var optionsh = {
            hAxis:
            {
                title: 'Humidity'
            },
            vAxis:
            {
                title: 'DAYS'
            }
        };

        var charth = new google.visualization.LineChart(document.getElementById('hchart_div'));

        charth.draw(data1, optionsh);

        // Wind Visual Charts
        var data2 = new google.visualization.DataTable();
        data2.addColumn('number', 'X');
        data2.addColumn('number', 'Wind Speed');

        data2.addRows([
            [windn[0], 0],   [windn[1], 1],  [windn[2], 2],  [windn[3], 3],  [windn[4], 4]
        ]);

        var optionsw = {
            hAxis:
            {
                title: 'Wind Speed'
            },
            vAxis:
            {
                title: 'DAYS'
            }
        };

        var chartw = new google.visualization.LineChart(document.getElementById('windchart_div'));

        chartw.draw(data2, optionsw);

        // Comparaison charts
        google.charts.load('current', {'packages':['line']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart()
        {

          var data3 = new google.visualization.DataTable();
          data3.addColumn('number', 'Days');
          data3.addColumn('number', 'Temperature');
          data3.addColumn('number', 'Humidity');
          data3.addColumn('number', 'Wind Speed');

          data3.addRows([
            [1,  tempn[0], humn[0], windn[0] ],

            [2,  tempn[1], humn[1], windn[1] ],

            [3,  tempn[2], humn[2], windn[2] ],

            [4,  tempn[3], humn[3], windn[3] ],

            [5,  tempn[4], humn[4], windn[4] ]
          ]);

          var optionsc = {
            chart:
            {
              title: 'Weather Comparison',
              subtitle: 'Temp Vs Humidity Vs Wind Speed'
            },

            width: 900,
            height: 500
          };

          var chartc = new google.charts.Line(document.getElementById('linechart_material'));

          chartc.draw(data3, google.charts.Line.convertOptions(optionsc));
        }

	})

    .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton Or It may be Wrong Input "))
}

    
function DefaultScreen()
{
    document.getElementById("cityinput").defaultValue = "Delhi";
    Getinfo();
}

// Getting the Date    
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ];
//Function to get the correct integer for the index of the days array

function CheckDay(day)
{
    if (day + d.getDay() > 6)
    {
        return day + d.getDay() - 7;
    } 
    else
    {
        return day + d.getDay();
    }
}

for (i = 0; i < 5; i++)
{
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

// Visual Charts

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(Getinfo);

// function drawBasic()
// {

//     var data = new google.visualization.DataTable();
//     data.addColumn('number', 'X');
//     data.addColumn('number', 'Temperature');

//     data.addRows([
//         [0, tempn[0]],   [1, tempn[1]],  [2, tempn[2]],  [3, tempn[3]],  [4, tempn[4]]
//     ]);

//     var options = {
//         hAxis:
//         {
//             title: 'DAYS'
//         },
//         vAxis:
//         {
//             title: 'Temperatures'
//         }
//     };

//     var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

//     chart.draw(data, options);
// }