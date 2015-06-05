var child = Session.get("child");

var buildStatsChart = function(title, data) {

  $('#game-stats-container').highcharts({
      
    chart: {
      type: 'area'
    },
    
    title: {
      text: title
    },
    
    credits: {
      enabled: false
    },
    
    subtitle: {
      text: 'recent scores'
    },
    
    xAxis: {
      allowDecimals: false,
      labels: {
        formatter: function () {
          return this.value; // clean, unformatted number for year
        }
      }
    },
    
    yAxis: {
      title: {
        text: 'score'
      },
      labels: {
        formatter: function () {
          return this.value / 1000 + '%';
        }
      }
    },
    
    tooltip: {
      pointFormat: child.name + ' scored <b>{point.y}%</b><br/>at {point.x}'
    },
    
    plotOptions: {
      area: {
        // pointStart: 1940,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    },
    
    series: [data]
  });
}



/*
 * Call the function to built the chart when the template is rendered
 */
// Template.childProfile.rendered = function() {    
//     builtArea();
// }


Template.childProfile.helpers({

  childInfo: function() {
    var childInfo = Children.findOne({_id: child.id});
    return childInfo;
  },

  mathsGameStats: function() {
    var sum = 0;
    var count = MathsGame.find({child_id: child.id}).count();
    var mathsGameData = MathsGame.find({child_id: child.id});
    mathsGameData.map(function(obj){
      sum += obj.score;
    });
    console.log(sum + " and " + count);
    return Math.floor(sum/count);
  },

  coloursGameStats: function() {
    var sum = 0
    var count = ColoursGame.find({child_id: child.id}).count();
    var coloursGameData = ColoursGame.find({child_id: child.id});
    coloursGameData.map(function(obj){
      sum += obj.score;
    });
    console.log(sum + " and " + count);
    console.log(coloursGameData.fetch());
    return Math.floor(sum/count);
  }

});

Template.childProfile.events({
  "click #maths-game-chart": function() {
    var mathsGameData = MathsGame.find({child_id: child.id}, {createdaAt: -1});
    var chartData = mathsGameData.map(function(obj){
      return obj.score;
    });
    var series = {
      name: "Maths Game",
      data: chartData
    }
    buildStatsChart('Maths Game', series);
    console.log(series);
  },

  "click .maths-game": function(event, template) {
    Router.go('/mathGame')
  },
  
  "click .colours-game": function(event, template) {
    Router.go('/colours');
  },

  "click .game-three": function(event, template) {
    Router.go('/game/3')
  },

  "click .game-four": function(event, template) {
    Router.go('/game/4')
  }

});