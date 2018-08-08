// api key: Qrani6RonhXSZdvyBJ8X4aF5HrnR5WnVLAK8rXGo

$(document).ready(function () {

  var nameArray = [];

  $("#add-food").on("click", function (event) {
    event.preventDefault();
    var name = $("#food-input").val();
    var inputName = name.toLowerCase();

    if(nameArray.includes(inputName)){
      alert("FUCK");
    }

    else{
    nameArray.push(inputName);
    var queryURL = "https://api.nal.usda.gov/ndb/search/?format=json&q=" + name + "&sort=n&max=10000&api_key=Qrani6RonhXSZdvyBJ8X4aF5HrnR5WnVLAK8rXGo";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (res) {
      // console.log(res.list.item);
      $.post("/api/USDA", { foods: res.list.item }, getUSDA);
    });
  }
  });


  function getUSDA() {
    $.get("/api/USDA", function (data) {
      if (data) {
        data.forEach(function (item) {
          var itemId = item.id;
          var itemIdArray = [];
          itemIdArray.push(itemId);
          console.log(itemId);
            var append= $("#two").append("<li>" + item.name + " || " + "Nutrition: " + item.ndbno + "<button>Add to List</button>"  + "</li>");
            append.addClass("appendedButton");
            console.log(append);
            var nutriArray = [];
            var nutriKey = item.ndbno;
            nutriArray.push(nutriKey);
            console.log(item.ndbno);
        });
      }
    });
  }


  $(".appendedButton").on("click", function (event) {
    event.preventDefault();
    var number = $("#number-input").val();
    var nutritionURL = "https://api.nal.usda.gov/ndb/reports/?ndbno=" + number + "&type=b&format=json&api_key=Qrani6RonhXSZdvyBJ8X4aF5HrnR5WnVLAK8rXGo";
    $.ajax({
      url: nutritionURL,
      method: "GET"
    }).then(function (response) {
      response.report.food.nutrients.forEach(function (nutrients) {
        $("#four").append("<li>" + nutrients.name + ":  " + nutrients.value + "</li>");
      });

    });
  });
});
