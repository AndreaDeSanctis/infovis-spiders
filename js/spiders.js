function run() {

    var configuration = 0;

    // base svg
    var svg = d3.select("body").append("svg")
        .attr('width', 1500)
        .attr('height', 1500);

    // open json and update the drawing
    d3.json("data/spiders.json").then(function (data) {
        updateScene(data, configuration);

        // increment the configuration counter and update the drawing
        svg.on('click', function () {
            if (configuration == 4)
                configuration = -1;
            configuration = configuration + 1;

            updateScene(data, configuration);
        });
    });

    // support functions
    function selectPoint(d, angle, randomic) {
        x = (d.width * Math.cos(angle)) + randomic * d.horizontal;
        y = (d.length * Math.sin(angle)) + randomic * d.vertical + d.length;
        return [x, y]
    }

    function sideLength(diagonal) {
        return diagonal / Math.sqrt(2)
    }

    function drawNow(g) {

        // randomizers for the starting position
        randomic = Math.random()

        g.append("ellipse")
            .attr('cx', function (d) {
                return randomic * d.horizontal
            })
            .attr('cy', function (d) {
                return randomic * d.vertical + d.length
            })
            .attr('rx', function (d) {
                return d.width
            })
            .attr('ry', function (d) {
                return d.length
            })
            .attr("stroke-width", 5)
            .attr("stroke", "black")
            .attr("class", "body")
            .attr("fill", "darkred");

        // front right leg
        g.append("polyline")
            .attr("points", function (d) {
                [x, y] = selectPoint(d, -Math.PI / 4, randomic);
                s = sideLength(d.leg / 1.5)
                return [x, y, x + s, y - s];
            })
            .attr("class", "front_right_leg")
            .attr("fill", "None")
            .attr("stroke-width", 5)
            .attr("stroke", "black");

        // front left leg
        g.append("polyline")
            .attr("points", function (d) {
                [x, y] = selectPoint(d, -Math.PI * 3 / 4, randomic);
                s = sideLength(d.leg / 1.5)
                return [x, y, x - s, y - s];
            })
            .attr("class", "front_left_leg")
            .attr("fill", "None")
            .attr("stroke-width", 5)
            .attr("stroke", "black");

        // middle right leg 1
        g.append("polyline")
            .attr("points", function (d) {
                [x, y] = [randomic * d.horizontal + d.width, randomic * d.vertical + d.length];
                s = sideLength(d.leg / 1.5);
                return [x, y, x + d.leg / 1.5, y + s];
            })
            .attr("class", "middle_right_leg_1")
            .attr("fill", "None")
            .attr("stroke-width", 5)
            .attr("stroke", "black");

        // middle left leg 1
        g.append("polyline")
            .attr("points", function (d) {
                [x, y] = [randomic * d.horizontal - d.width, randomic * d.vertical + d.length];
                s = sideLength(d.leg / 1.5);
                return [x, y, x - d.leg / 1.5, y + s];
            })
            .attr("class", "middle_left_leg_1")
            .attr("fill", "None")
            .attr("stroke-width", 5)
            .attr("stroke", "black");

        // middle right leg 2
        g.append("polyline")
            .attr("points", function (d) {
                [x, y] = [randomic * d.horizontal + d.width, randomic * d.vertical + d.length];
                s = sideLength(d.leg * 3 / 4);
                return [x, y, x + d.leg / 4, y - s, x + d.leg / 4 + s, y - s];
            })
            .attr("class", "middle_right_leg_2")
            .attr("fill", "None")
            .attr("stroke-width", 5)
            .attr("stroke", "black");

        // middle left leg 2
        g.append("polyline")
            .attr("points", function (d) {
                [x, y] = [randomic * d.horizontal - d.width, randomic * d.vertical + d.length];
                s = sideLength(d.leg * 3 / 4);
                return [x, y, x - d.leg / 4, y - s, x - d.leg / 4 - s, y - s];
            })
            .attr("class", "middle_left_leg_2")
            .attr("fill", "None")
            .attr("stroke-width", 5)
            .attr("stroke", "black");

        // back right leg
        g.append("polyline")
            .attr("points", function (d) {
                [x, y] = selectPoint(d, Math.PI / 4, randomic);
                s = sideLength(d.leg / 4)
                return [x, y, x + s, y + s, x + s, y + d.leg];
            })
            .attr("class", "back_right_leg")
            .attr("fill", "None")
            .attr("stroke-width", 5)
            .attr("stroke", "black");

        // back left leg
        g.append("polyline")
            .attr("points", function (d) {
                [x, y] = selectPoint(d, Math.PI * 3 / 4, randomic);
                s = sideLength(d.leg / 4)
                return [x, y, x - s, y + s, x - s, y + d.leg];
            })
            .attr("class", "back_left_leg")
            .attr("fill", "None")
            .attr("stroke-width", 5)
            .attr("stroke", "black");

        g.on("click", function () {
            d3.select(this)
                .attr("class", "dead");
        });

        // returning the modified object, it will be drawn
        return g;
    }



    var idx = 0;

    // draw the scene
    function updateScene(data, configuration) {

        idx++;
        var currentConfiguration = data[configuration]["spiders"];

        svg.selectAll("g[class^=alive]").data(currentConfiguration).join(

            // Enter

            function (enter) {
                if (idx <= 1) {
                    g = enter.append("g")
                        .attr('id', function (d) {
                            return d.id;
                        })
                        .attr('class', function (d) {
                            return d.alive;
                        });

                    g = drawNow(g);
                }
            },

            // Update

            function (update) {
                if (configuration != 0 && configuration != -1) {
                    tx = d3.transition().duration(700)

                    update.select(".body")
                        .transition(tx)
                        .attr('cx', function (d) {
                            return d.horizontal
                        })
                        .attr('cy', function (d) {
                            return d.vertical + d.length
                        })
                        .attr('rx', function (d) {
                            return d.width
                        })
                        .attr('ry', function (d) {
                            return d.length
                        })
                        .attr("stroke-width", 5)
                        .attr("stroke", "black")
                        .attr("fill", "darkred");

                    // front right leg
                    update.select(".front_right_leg")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = selectPoint(d, -Math.PI / 4, 1);
                            s = sideLength(d.leg / 1.5)
                            return [x, y, x + s, y - s];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // front left leg
                    update.select(".front_left_leg")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = selectPoint(d, -Math.PI * 3 / 4, 1);
                            s = sideLength(d.leg / 1.5)
                            return [x, y, x - s, y - s];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // middle right leg 1
                    update.select(".middle_right_leg_1")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = [d.horizontal + d.width, d.vertical + d.length];
                            s = sideLength(d.leg / 1.5);
                            return [x, y, x + d.leg / 1.5, y + s];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // middle left leg 1
                    update.select(".middle_left_leg_1")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = [d.horizontal - d.width, d.vertical + d.length];
                            s = sideLength(d.leg / 1.5);
                            return [x, y, x - d.leg / 1.5, y + s];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // middle right leg 2
                    update.select(".middle_right_leg_2")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = [d.horizontal + d.width, d.vertical + d.length];
                            s = sideLength(d.leg * 3 / 4);
                            return [x, y, x + d.leg / 4, y - s, x + d.leg / 4 + s, y - s];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // middle left leg 2
                    update.select(".middle_left_leg_2")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = [d.horizontal - d.width, d.vertical + d.length];
                            s = sideLength(d.leg * 3 / 4);
                            return [x, y, x - d.leg / 4, y - s, x - d.leg / 4 - s, y - s];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // back right leg
                    update.select(".back_right_leg")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = selectPoint(d, Math.PI / 4, 1);
                            s = sideLength(d.leg / 4)
                            return [x, y, x + s, y + s, x + s, y + d.leg];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // back left leg
                    update.select(".back_left_leg")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = selectPoint(d, Math.PI * 3 / 4, 1);
                            s = sideLength(d.leg / 4)
                            return [x, y, x - s, y + s, x - s, y + d.leg];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    update.on("click", function () {
                        d3.select(this)
                            .attr("class", "dead");
                    });
                } else {

                    randomic2 = Math.random()

                    tx = d3.transition().duration(700)

                    update.select(".body")
                        .transition(tx)
                        .attr('cx', function (d) {
                            return randomic2*d.horizontal
                        })
                        .attr('cy', function (d) {
                            return randomic2*d.vertical + d.length
                        })
                        .attr('rx', function (d) {
                            return d.width
                        })
                        .attr('ry', function (d) {
                            return d.length
                        })
                        .attr("stroke-width", 5)
                        .attr("stroke", "black")
                        .attr("fill", "darkred");

                    // front right leg
                    update.select(".front_right_leg")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = selectPoint(d, -Math.PI / 4, randomic2);
                            s = sideLength(d.leg / 1.5)
                            return [x, y, x + s, y - s];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // front left leg
                    update.select(".front_left_leg")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = selectPoint(d, -Math.PI * 3 / 4, randomic2);
                            s = sideLength(d.leg / 1.5)
                            return [x, y, x - s, y - s];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // middle right leg 1
                    update.select(".middle_right_leg_1")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = [randomic2*d.horizontal + d.width, randomic2*d.vertical + d.length];
                            s = sideLength(d.leg / 1.5);
                            return [x, y, x + d.leg / 1.5, y + s];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // middle left leg 1
                    update.select(".middle_left_leg_1")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = [randomic2*d.horizontal - d.width, randomic2*d.vertical + d.length];
                            s = sideLength(d.leg / 1.5);
                            return [x, y, x - d.leg / 1.5, y + s];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // middle right leg 2
                    update.select(".middle_right_leg_2")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = [randomic2*d.horizontal + d.width, randomic2*d.vertical + d.length];
                            s = sideLength(d.leg * 3 / 4);
                            return [x, y, x + d.leg / 4, y - s, x + d.leg / 4 + s, y - s];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // middle left leg 2
                    update.select(".middle_left_leg_2")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = [randomic2*d.horizontal - d.width, randomic2*d.vertical + d.length];
                            s = sideLength(d.leg * 3 / 4);
                            return [x, y, x - d.leg / 4, y - s, x - d.leg / 4 - s, y - s];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // back right leg
                    update.select(".back_right_leg")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = selectPoint(d, Math.PI / 4, randomic2);
                            s = sideLength(d.leg / 4)
                            return [x, y, x + s, y + s, x + s, y + d.leg];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    // back left leg
                    update.select(".back_left_leg")
                        .transition(tx)
                        .attr("points", function (d) {
                            [x, y] = selectPoint(d, Math.PI * 3 / 4, randomic2);
                            s = sideLength(d.leg / 4)
                            return [x, y, x - s, y + s, x - s, y + d.leg];
                        })
                        .attr("fill", "None")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

                    update.on("click", function () {
                        d3.select(this)
                            .attr("class", "dead");
                    });
                }
            });
    }
}