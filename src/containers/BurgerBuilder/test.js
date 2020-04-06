$(document).ready(function () {
    var x = 50,
        y = 50,
        i,
        j,
        uX = 0,
        uY = 0,
        move = 0,
        pts = 0,
        speed = 150;
    $("body").append("<div class='container'></div>");
    for (i = 0; i <= x; i++) {
        for (j = 0; j <= y; j++) {
            $(".container").append("<span id=" + i + "-" + j + "></span>");
        }
        $(".container").append("<hr/>");
    }

    $("#0-0").addClass("user");
    $("body").append(
        "<br/>" +
        "<span id='up'>UP</span>" +
        "<br/><span id='right'>RIGHT</span>" +
        "<span id='pts'>points</span>" +
        "<span id='left'>LEFT</span>" +
        "<br/><span id='down'>DOWN</span>" +
        "<br/>"
    );
    Point();
    $("#up").click(function () {
        move = 1;
    });
    $("#down").click(function () {
        move = 2;
    });
    $("#right").click(function () {
        move = 3;
    });
    $("#left").click(function () {
        move = 4;
    });

    var loop = setInterval(function () {
        Move();
    }, speed);

    function Point() {
        rX = Math.floor(Math.random() * x);
        rY = Math.floor(Math.random() * y);
        $("#" + rX + "-" + rY).addClass("point");
        $("#pts").text(pts);
    }

    function over() {
        alert("Game Over, Try again Reloading the browser.");
        clearInterval(loop);
    }

    function Move() {
        if (move > 0) {
            $("#" + uX + "-" + uY)
            .attr("class", "oldUser")
            .delay(speed * pts)
            .queue(function () {
                $(this).attr("class", "");
            });

            Clear(uX, uY);

            switch (move) {
                case 1:
                    uX--;
                    break;
                case 2:
                    uX++;
                    break;
                case 3:
                    uY--;
                    break;
                case 4:
                    uY++;
                    break;
                default:
                    break;
            }

            if (uX > x || uX < 0 || uY > y || uY < 0) {
                over();
            }
            $(".user").removeClass("user");
            if ($("#" + uX + "-" + uY).hasClass("oldUser")) {
                over();
            } else {
                $("#" + uX + "-" + uY).addClass("user");
            }

            if (uX == rX && uY == rY) {
                pts++;
                $(".point").removeClass("point");
                Point();
            }
        }

        function Clear(a, b) {
            setTimeout(function () {
                $("#" + a + "-" + b).clearQueue();
            }, speed * pts + 10);
        }
    }
});
