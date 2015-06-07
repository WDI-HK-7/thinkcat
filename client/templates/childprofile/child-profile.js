var child = Session.get("child");
var _dep = new Deps.Dependency();
var gameVariable;

Template.childProfile.onRendered(function () {
  // Use the Packery jQuery plugin
  child = Session.get("child");
  _dep.changed();
});


var buildStatsChart = function(title, data, htmlId) {

  $(htmlId).highcharts({
      
    chart: {
      type: 'spline',
      backgroundColor: null
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
    
    legend: {
      enabled: false
    },

    xAxis: {
      lineColor: 'black',
      tickColor: 'black',
      labels: {
        enabled: false
      },
      title: {
        text: 'Time'
      }
    },
    
    yAxis: {
      max: 105,
      gridLineWidth: 0,
      title: {
        text: 'score'
      },
      labels: {
        enabled: false
      }
    },
    
    tooltip: {
      formatter: function () {
        return '<b>' + child.name + '</b>' + ' scored <b>' + this.point.y + '%</b><br/>at ' + this.point.time;
      }
    },
    
    plotOptions: {
      spline: {
        lineWidth: 8,
        states: {
          hover: {
            lineWidth: 9
          }
        },
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 3,
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

var buildAvgCompareChart = function(title, data, htmlId) {

  $(htmlId).highcharts({
      
    chart: {
      type: 'column',
      backgroundColor: null
    },
    
    title: {
      text: title
    },
    
    credits: {
      enabled: false
    },
    
    subtitle: {
      text: 'your average vs. other kids at your age'
    },
    
    legend: {
      align: 'right',
      enabled: true
    },

    xAxis: {
      lineColor: 'black',
      tickColor: 'black',
      labels: {
        enabled: false
      }
    },
    
    yAxis: {
      max: 105,
      gridLineWidth: 0,
      title: {
        text: 'score'
      },
      labels: {
        enabled: false
      }
    },
    
    tooltip: {
      formatter: function () {
        return "<b>" + this.series.name + "'s</b> average score <b> " + this.point.y + "%";
      }
    },
    
    // plotOptions: {
    //   column: {
    //     pointPadding: 0.2,
    //     borderWidth: 0
    //   }
    // },
    
    series: data
  });
}

var getScoreAvg = function (database, params) {
  var sum = 0;
  var count = database.find(params).count();
  var gameData = database.find(params);
  gameData.map(function(obj){
    sum += obj.score;
  });

  return Math.floor(sum/count) || "-";
};

/*
 * Call the function to built the chart when the template is rendered
 */
// Template.childProfile.rendered = function() {    
//     builtArea();
// }


Template.childProfile.helpers({

  childInfo: function() {
    _dep.depend();
    var childInfo = Children.findOne({_id: child.id});
    return childInfo;
  },

  mathsGameStats: function() {
    _dep.depend();
    return getScoreAvg(MathsGame, {child_id: child.id});
  },

  coloursGameStats: function() {
    _dep.depend();
    return getScoreAvg(ColoursGame, {child_id: child.id});
  },
  
  shapesGameStats: function() {
    _dep.depend();
    return getScoreAvg(ShapesGame, {child_id: child.id});
  }

});

var getGameData = function(database, params) {
  var gameData = database.find(params, {createdaAt: -1});
  var chartData = gameData.map(function(obj){
    return {time: obj.createdAt, y: obj.score};
  });
  return chartData;
}

Template.childProfile.events({

  "click #play-button-dash": function () {
    Router.go('/' + gameVariable);
  },

  "click #maths-game-chart": function() {
    gameVariable = "mathGame"
    var chartData = getGameData(MathsGame, {child_id: child.id});
    var gameScoreSeries = {
      name: "Maths Game",
      data: chartData
    }
    var childAvg = getScoreAvg(MathsGame, {child_id: child.id});
    var ageAvg = getScoreAvg(MathsGame, {child_age: child.age});
    var avgSeries = [
      {name: child.name, data: [childAvg]},
      {name: child.age + "yr olds", data: [ageAvg]}
    ];

    if (chartData.length > 1) {
      buildStatsChart('Maths Game', gameScoreSeries, '#game-stats-chart');
      buildAvgCompareChart('Maths Game', avgSeries, '#game-avg-comparison');
      buildStatsChart('Maths Game', gameScoreSeries, '#game-stats-chart2');
      buildAvgCompareChart('Maths Game', avgSeries, '#game-avg-comparison2');
    } else {
      $('.game-stats-chart').html("<h1>You haven't played enough, play more!</h1>");
      $('.game-avg-comparison').html('');
    }

  },

  "click #colours-game-chart": function() {
    gameVariable = "colours"
    var chartData = getGameData(ColoursGame, {child_id: child.id});
    var gameScoreSeries = {
      name: "Colours Game",
      data: chartData
    }
    var childAvg = getScoreAvg(ColoursGame, {child_id: child.id});
    var ageAvg = getScoreAvg(ColoursGame, {child_age: child.age});
    var avgSeries = [
      {name: child.name, data: [childAvg]},
      {name: child.age + "yr olds", data: [ageAvg]}
    ];

    if (chartData.length > 1) {
      buildStatsChart('Colours Game', gameScoreSeries, '#game-stats-chart');
      buildAvgCompareChart('Colours Game', avgSeries, '#game-avg-comparison');
      buildStatsChart('Colours Game', gameScoreSeries, '#game-stats-chart2');
      buildAvgCompareChart('Colours Game', avgSeries, '#game-avg-comparison2');
    } else {
      $('.game-stats-chart').html("<h1>You haven't played enough, play more!</h1>");
      $('.game-avg-comparison').html('');
    }

  },
  
  "click #shapes-game-chart": function() {
    gameVariable = "shapes"
    var chartData = getGameData(ShapesGame, {child_id: child.id});
    var gameScoreSeries = {
      name: "Shapes Game",
      data: chartData
    }
    var childAvg = getScoreAvg(ShapesGame, {child_id: child.id});
    var ageAvg = getScoreAvg(ShapesGame, {child_age: child.age});
    var avgSeries = [
      {name: child.name, data: [childAvg]},
      {name: child.age + "yr olds", data: [ageAvg]}
    ];

    if (chartData.length > 1) {
      buildStatsChart('Shapes Game', gameScoreSeries, '#game-stats-chart');
      buildAvgCompareChart('Shapes Game', avgSeries, '#game-avg-comparison');
      buildStatsChart('Shapes Game', gameScoreSeries, '#game-stats-chart2');
      buildAvgCompareChart('Shapes Game', avgSeries, '#game-avg-comparison2');
    } else {
      $('.game-stats-chart').html("<h1>You haven't played enough, play more!</h1>");
      $('.game-avg-comparison').html('');
    }
  },

  "click .maths-game": function(event, template) {
    Router.go('/mathGame');
  },
  
  "click .colours-game": function(event, template) {
    Router.go('/colours');
  },

  "click .game-three": function(event, template) {
    Router.go('/game/3');
  },

  "click .game-four": function(event, template) {
    Router.go('/shapes')
  }

});