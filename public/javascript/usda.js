// api key: Qrani6RonhXSZdvyBJ8X4aF5HrnR5WnVLAK8rXGo

$(document).ready(function() {
  var nameArray = [];
  var input = $("#food-input");

  $("#food-input").on("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      var name = $("#food-input").val();
      var inputName = name.toLowerCase();

      if (nameArray.includes(inputName)) {
        alert("Already searched for " + name);
      } else {
        nameArray.push(inputName);
        var queryURL =
          "https://api.nal.usda.gov/ndb/search/?format=json&q=" +
          name +
          "&sort=n&max=10000&api_key=Qrani6RonhXSZdvyBJ8X4aF5HrnR5WnVLAK8rXGo";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(res) {
          // console.log(res.list.item);
          $.post("/api/USDA", { foods: res.list.item }, getUSDA);
        });
      }
    }
  });

  function getUSDA() {
    $.get("/api/USDA", function(data) {
      if (data) {
        data.forEach(function(item) {
          var itemId = item.id;
          var nutriKey = item.ndbno;
          var button = $("<button>Add to List</button>");
          button.attr("ndbno", item.ndbno);
          button.addClass("addedItem");
          var itemName = item.name;
          button.attr("itemName", itemName);
          var productLi = $("<li>" + item.name + "</li>");
          productLi.append(button);
          $("#two").append(productLi);
        });
      }
    });
  }

  $(document).on("click", ".addedItem", function(event) {
    event.preventDefault();
    console.log(this);
    var appendName = $(this).attr("itemName");
    $("#four").append(appendName);
    var number = $(this).attr("ndbno");
    var nutritionURL =
      "https://api.nal.usda.gov/ndb/reports/?ndbno=" +
      number +
      "&type=b&format=json&api_key=Qrani6RonhXSZdvyBJ8X4aF5HrnR5WnVLAK8rXGo";
    $.ajax({
      url: nutritionURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      response.report.food.nutrients.forEach(function(nutrients) {
        $("#four").append(
          "<li>" + nutrients.name + ":  " + nutrients.value + "</li>"
        );
      });
      $("#four").append("<br> " + "---------------");
    });
  });
});
