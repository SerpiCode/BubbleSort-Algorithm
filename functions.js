$(document).ready(function()
{
  // #### LIGHT AND DARK MODE ####

  // Change between light and dark mode

  var toggle_btn;
  var all_content;

  const main = document.querySelector("#fmain");

  var dark_mode = false;

  // Colors:

  // Dark:

  var bgc1 = "#1f1f1f";
  var ac1 = "#bb86fc";

  // Light:

  var bgc2 = "#f5f5f5";
  var ac2 = "##2fa3d9";

  // Variables for later:

  var generate;
  var sort;

  var table;

  // #### CODE ####

  function declare()
  {
    toggle_btn = document.querySelector(".toggle-btn");
    all_content = document.querySelector(".all-content");

    generate = $("#generate");
    sort = $("#sort");

    table = $(".table-cell");
  }

  declare();

  function toggleAnimation()
  {
    if (permission)
    {
      dark_mode = !dark_mode;

      let clone = all_content.cloneNode(true);

      if (dark_mode)
      {
        clone.classList.remove("light");
        clone.classList.add("dark");
      }
      else
      {
        clone.classList.remove("dark");
        clone.classList.add("light");
      }

      clone.classList.add("newdiv");
      main.appendChild(clone);

      document.body.classList.add("stop-scrolling");

      clone.addEventListener("animationend", () =>
      {
        all_content.remove();
        clone.classList.remove("newdiv");

        document.body.classList.remove("stop-scrolling");

        // Reset the variables
        declare();
        events();
      });
    }
  }

  // #### GENERATE NEW ARRAY AND SORT ARRAY ####

  var permission = true;

  // Returns a random Integer number
  function generateRandomInteger(max)
  {
    return Math.floor(Math.random() * max) + 1;
  }

  // Generates a new array with random numbers (from 1 to 10)
  function generate_new_array()
  {
    if (permission)
    for (var i = 0; i < table.length; i++)
    table.eq(i).text(generateRandomInteger(10));
  }

  // Slows down for loop execution
  const sleep = (time) =>
  {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  // Bubblesort algorithm that sorts the array
  const bubblesort = async () =>
  {
    if (permission)
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

            if (dark_mode)
            {
              table.eq(i).animate({backgroundColor: ac1}).animate({backgroundColor: bgc1}, 'slow', function ()
              {
                $(this).removeAttr('style');
              });
              table.eq(j).animate({backgroundColor: ac1}).animate({backgroundColor: bgc1}, 'slow', function ()
              {
                $(this).removeAttr('style');
              });
            }
            else
            {
              table.eq(i).animate({backgroundColor: ac2}).animate({backgroundColor: bgc2}, 'slow', function ()
              {
                $(this).removeAttr('style');
              });
              table.eq(j).animate({backgroundColor: ac2}).animate({backgroundColor: bgc2}, 'slow', function ()
              {
                $(this).removeAttr('style');
              });
            }

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

  function events()
  {
    toggle_btn.addEventListener("click", toggleAnimation);

    generate.click(generate_new_array);
    sort.click(bubblesort);
  }

  events();

});
