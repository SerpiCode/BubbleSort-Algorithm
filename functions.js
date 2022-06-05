$(document).ready(function()
{
  var generate = $("#generate");
  var sort = $("#sort");

  var table = $(".cell");
  var permission = true;

  // Returns a random Integer number
  function generateRandomInteger(max)
  {
    return Math.floor(Math.random() * max) + 1;
  }

  // Generates a new array with random numbers (from 1 to 10)
  function generate_new_array()
  {
    if (permission == true)
      for (var i = 0; i < table.length; i++)
        table.eq(i).text(generateRandomInteger(10));
  }

  generate.click(generate_new_array);

  // Slows down for loop execution
  const sleep = (time) =>
  {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  // Bubblesort algorithm that sorts the array
  const bubblesort = async () =>
  {
    if (permission == true)
    {
      permission = false;
      var size = Number(table.length);

      for (var i = 0; i < table.length; i++)
      {
        for (var j = i + 1; j < table.length; j++)
        {
          if (Number(table.eq(j).text()) < Number(table.eq(i).text()))
          {
            await sleep(1000);

            table.eq(i).animate({backgroundColor: "#ff851b"}).animate({backgroundColor: "#808080"});
            table.eq(j).animate({backgroundColor: "#ef5350"}).animate({backgroundColor: "#808080"});

            var temp = table.eq(j).text();

            table.eq(j).text(table.eq(i).text());
            table.eq(i).text(temp);
          }

          if (i == (size - 2))
            permission = true;
        }
      }
    }
  }

  sort.click(bubblesort);
});
