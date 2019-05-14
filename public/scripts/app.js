"use strict";
angular.module("angular-animate", []).directive("animatectrl", [function() {
    return {
        restrict: "A",
        link: function(scope, element) {
            element.click(function() {
                var animate = $(this).attr("data-animated");
                $(this).closest(".panel").addClass(animate).delay(1e3).queue(function(next) {
                    $(this).removeClass(animate),
                        next()
                })
            })
        }
    }
}]),
    angular.module("SensationApp", ["ngRoute", "ngAnimate", "ngSanitize", "ui.bootstrap", "easypiechart", "textAngular", "ui.tree", "ngMap", "ngTagsInput", "slick", "ui.select", "selectApp", "ui.calendar", "tablesorting", "inlineedittable", "TodoApp", "app.controllers", "app.directives", "app.localization", "app.nav", "app.ui.ctrls", "app.ui.directives", "app.form.validation", "app.ui.form.ctrls", "app.ui.form.directives", "app.tables", "app.task", "app.chart.ctrl", "app.chart.directives", "angular-animate", "app.calendar", "app.ui.jvectormap", "xeditable", "FullscreenApp", "galleryApp", "datatables"]).config(["$routeProvider",
        function($routeProvider) {
            var routes, setRoutes;
            return routes = ["dashboard/dashboard-v1", "ui/typography", "ui/buttons", "ui/icons", "ui/grids", "ui/widgets", "ui/components", "ui/timeline", "ui/nested-lists", "ui/fontawesome", "ui/animation", "ui/panel", "ui/xeditable", "maps/gmap", "maps/vectormap", "tables/static", "tables/dynamic", "tables/responsive", "forms/elements", "forms/layouts", "forms/validation", "forms/select", "forms/wizard", "charts/flot", "charts/morris", "charts/highcharts", "pages/404", "pages/500", "pages/blank", "pages/forgot-password", "pages/invoice", "pages/lock-screen", "pages/profile", "pages/signin", "pages/signup", "pages/directory", "pages/faq", "pages/gallery", "mail/compose", "mail/inbox", "mail/mailview", "tasks/tasks", "calender/calender", "ngtable/ngtable", "settings/settings-panel"],
                setRoutes = function(route) {
                    var config, url;
                    return url = "/" + route,
                        config = {
                            templateUrl: "views/" + route + ".html"
                        },
                        $routeProvider.when(url, config),
                        $routeProvider
                },
                routes.forEach(function(route) {
                    return setRoutes(route)
                }),
                $routeProvider.when("/", {
                    redirectTo: "dashboard/dashboard-v1"
                }).when("/404", {
                    templateUrl: "views/pages/404.html"
                }).otherwise({
                    redirectTo: "/404"
                })
        }]),
    function() {
        angular.module("app.calendar", ["ui.calendar", "ui.bootstrap"])
    } (),
    function() {
        var calendarCtrl;
        calendarCtrl = function($scope) {
            var d, date, m, y;
            date = new Date,
                d = date.getDate(),
                m = date.getMonth(),
                y = date.getFullYear(),
                $scope.events = [{
                    title: "All Day Event",
                    start: new Date(y, m, 1)
                },
                    {
                        title: "Long Event",
                        start: new Date(y, m, d - 5),
                        end: new Date(y, m, d - 2)
                    },
                    {
                        title: "Go Hiking",
                        start: new Date(y, m, d - 1),
                        className: ["fc-event-warning"]
                    },
                    {
                        id: 999,
                        title: "Repeating Event",
                        start: new Date(y, m, d - 3, 16, 0),
                        allDay: !1,
                        className: ["fc-event-success"]
                    },
                    {
                        id: 999,
                        title: "Repeating Event",
                        start: new Date(y, m, d + 4, 16, 0),
                        allDay: !1,
                        className: ["fc-event-success"]
                    },
                    {
                        title: "Birthday Party",
                        start: new Date(y, m, d + 1, 11, 0),
                        end: new Date(y, m, d + 1, 12, 30),
                        allDay: !1,
                        className: ["fc-event-danger"]
                    },
                    {
                        title: "Shopping",
                        start: new Date(y, m, d + 2, 9, 0),
                        end: new Date(y, m, d + 2, 12, 0),
                        allDay: !1,
                        className: ["fc-event-success"]
                    },
                    {
                        title: "Click for Google",
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 29),
                        url: "http://google.com/"
                    },
                    {
                        title: "Shopping",
                        start: new Date(y, m + 1, 8)
                    }],
                $scope.calEventsExt = {
                    color: "#f00",
                    textColor: "yellow",
                    events: [{
                        type: "party",
                        title: "Lunch",
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        allDay: !1
                    },
                        {
                            type: "party",
                            title: "Lunch 2",
                            start: new Date(y, m, d, 12, 0),
                            end: new Date(y, m, d, 14, 0),
                            allDay: !1
                        },
                        {
                            type: "party",
                            title: "Click for Google",
                            start: new Date(y, m, 28),
                            end: new Date(y, m, 29),
                            url: "http://google.com/"
                        }]
                },
                $scope.alertOnEventClick = function(event) {
                    $scope.alertMessage = event.title + " was clicked "
                },
                $scope.alertOnDrop = function(event) {
                    $scope.alertMessage = "Event Droped on " + event.start.format()
                },
                $scope.alertOnResize = function(event) {
                    $scope.alertMessage = "Event end date was moved to " + event.end.format()
                },
                $scope.addRemoveEventSource = function(sources, source) {
                    var canAdd;
                    canAdd = 0,
                        angular.forEach(sources,
                            function(value, key) {
                                sources[key] === source && (sources.splice(key, 1), canAdd = 1)
                            }),
                    0 === canAdd && sources.push(source)
                },
                $scope.addEvent = function() {
                    $scope.events.push({
                        title: "New Event",
                        start: new Date(y, m, d),
                        end: new Date(y, m, d + 1)
                    })
                },
                $scope.remove = function(index) {
                    $scope.events.splice(index, 1)
                },
                $scope.changeView = function(view) {
                    $scope.myCalendar1.fullCalendar("changeView", view)
                },
                $scope.renderCalender = function(view, calendar) {
                    calendar && calendar.fullCalendar("render")
                },
                $scope.uiConfig = {
                    calendar: {
                        height: 575,
                        editable: !0,
                        header: {
                            left: "prev,next today",
                            center: "title",
                            right: "month,basicWeek,basicDay"
                        },
                        eventClick: $scope.alertOnEventClick,
                        eventDrop: $scope.alertOnDrop,
                        eventResize: $scope.alertOnResize
                    }
                },
                $scope.eventSources = [$scope.events]
        },
            angular.module("app.calendar").controller("calendarCtrl", ["$scope", calendarCtrl])
    } (),
    angular.module("ui.calendar", []).constant("uiCalendarConfig", {}).controller("uiCalendarCtrl", ["$scope", "$timeout",
        function($scope, $timeout) {
            var sourceSerialId = 1,
                eventSerialId = 1,
                sources = $scope.eventSources,
                extraEventSignature = $scope.calendarWatchEvent ? $scope.calendarWatchEvent: angular.noop,
                wrapFunctionWithScopeApply = function(functionToWrap) {
                    var wrapper;
                    return functionToWrap && (wrapper = function() {
                        var args = arguments;
                        $timeout(function() {
                            functionToWrap.apply(this, args)
                        })
                    }),
                        wrapper
                };
            this.eventsFingerprint = function(e) {
                return e.__uiCalId || (e.__uiCalId = eventSerialId++),
                "" + e.__uiCalId + (e.id || "") + (e.title || "") + (e.url || "") + ( + e.start || "") + ( + e.end || "") + (e.allDay || "") + (e.className || "") + extraEventSignature(e) || ""
            },
                this.sourcesFingerprint = function(source) {
                    return source.__id || (source.__id = sourceSerialId++)
                },
                this.allEvents = function() {
                    for (var arraySources = [], i = 0, srcLen = sources.length; srcLen > i; i++) {
                        var source = sources[i];
                        if (angular.isArray(source)) arraySources.push(source);
                        else if (angular.isObject(source) && angular.isArray(source.events)) {
                            var extEvent = {};
                            for (var key in source)"_uiCalId" !== key && "events" !== key && (extEvent[key] = source[key]);
                            for (var eI = 0; eI < source.events.length; eI++) angular.extend(source.events[eI], extEvent);
                            arraySources.push(source.events)
                        }
                    }
                    return Array.prototype.concat.apply([], arraySources)
                },
                this.changeWatcher = function(arraySource, tokenFn) {
                    var self, getTokens = function() {
                            for (var token, el, array = angular.isFunction(arraySource) ? arraySource() : arraySource, result = [], i = 0, n = array.length; n > i; i++) el = array[i],
                                token = tokenFn(el),
                                map[token] = el,
                                result.push(token);
                            return result
                        },
                        subtractAsSets = function(a, b) {
                            var i, n, result = [],
                                inB = {};
                            for (i = 0, n = b.length; n > i; i++) inB[b[i]] = !0;
                            for (i = 0, n = a.length; n > i; i++) inB[a[i]] || result.push(a[i]);
                            return result
                        },
                        map = {},
                        applyChanges = function(newTokens, oldTokens) {
                            var i, n, el, token, replacedTokens = {},
                                removedTokens = subtractAsSets(oldTokens, newTokens);
                            for (i = 0, n = removedTokens.length; n > i; i++) {
                                var removedToken = removedTokens[i];
                                el = map[removedToken],
                                    delete map[removedToken];
                                var newToken = tokenFn(el);
                                newToken === removedToken ? self.onRemoved(el) : (replacedTokens[newToken] = removedToken, self.onChanged(el))
                            }
                            var addedTokens = subtractAsSets(newTokens, oldTokens);
                            for (i = 0, n = addedTokens.length; n > i; i++) token = addedTokens[i],
                                el = map[token],
                            replacedTokens[token] || self.onAdded(el)
                        };
                    return self = {
                        subscribe: function(scope, onChanged) {
                            scope.$watch(getTokens,
                                function(newTokens, oldTokens) {
                                    onChanged && onChanged(newTokens, oldTokens) === !1 || applyChanges(newTokens, oldTokens)
                                },
                                !0)
                        },
                        onAdded: angular.noop,
                        onChanged: angular.noop,
                        onRemoved: angular.noop
                    }
                },
                this.getFullCalendarConfig = function(calendarSettings, uiCalendarConfig) {
                    var config = {};
                    return angular.extend(config, uiCalendarConfig),
                        angular.extend(config, calendarSettings),
                        angular.forEach(config,
                            function(value, key) {
                                "function" == typeof value && (config[key] = wrapFunctionWithScopeApply(config[key]))
                            }),
                        config
                }
        }]).directive("uiCalendar", ["uiCalendarConfig", "$locale",
        function(uiCalendarConfig, $locale) {
            var tValues = function(data) {
                    var r, k;
                    r = [];
                    for (k in data) r[k] = data[k];
                    return r
                },
                dtf = $locale.DATETIME_FORMATS;
            return uiCalendarConfig = angular.extend({
                    monthNames: tValues(dtf.MONTH),
                    monthNamesShort: tValues(dtf.SHORTMONTH),
                    dayNames: tValues(dtf.DAY),
                    dayNamesShort: tValues(dtf.SHORTDAY)
                },
                uiCalendarConfig || {}),
                {
                    restrict: "A",
                    scope: {
                        eventSources: "=ngModel",
                        calendarWatchEvent: "&"
                    },
                    controller: "uiCalendarCtrl",
                    link: function(scope, elm, attrs, controller) {
                        function getOptions() {
                            var fullCalendarConfig, calendarSettings = attrs.uiCalendar ? scope.$parent.$eval(attrs.uiCalendar) : {};
                            fullCalendarConfig = controller.getFullCalendarConfig(calendarSettings, uiCalendarConfig),
                                options = {
                                    eventSources: sources
                                },
                                angular.extend(options, fullCalendarConfig);
                            var options2 = {};
                            for (var o in options)"eventSources" !== o && (options2[o] = options[o]);
                            return JSON.stringify(options2)
                        }
                        var sources = scope.eventSources,
                            sourcesChanged = !1,
                            eventSourcesWatcher = controller.changeWatcher(sources, controller.sourcesFingerprint),
                            eventsWatcher = controller.changeWatcher(controller.allEvents, controller.eventsFingerprint),
                            options = null;
                        scope.destroy = function() {
                            scope.calendar = attrs.calendar ? scope.$parent[attrs.calendar] = elm.html("") : elm.html("")
                        },
                            scope.init = function() {
                                scope.calendar.fullCalendar(options)
                            },
                            eventSourcesWatcher.onAdded = function(source) {
                                scope.calendar.fullCalendar("addEventSource", source),
                                    sourcesChanged = !0
                            },
                            eventSourcesWatcher.onRemoved = function(source) {
                                scope.calendar.fullCalendar("removeEventSource", source),
                                    sourcesChanged = !0
                            },
                            eventsWatcher.onAdded = function(event) {
                                scope.calendar.fullCalendar("renderEvent", event)
                            },
                            eventsWatcher.onRemoved = function(event) {
                                scope.calendar.fullCalendar("removeEvents",
                                    function(e) {
                                        return e === event
                                    })
                            },
                            eventsWatcher.onChanged = function(event) {
                                scope.calendar.fullCalendar("updateEvent", event)
                            },
                            eventSourcesWatcher.subscribe(scope),
                            eventsWatcher.subscribe(scope,
                                function() {
                                    return sourcesChanged === !0 ? (sourcesChanged = !1, !1) : void 0
                                }),
                            scope.$watch(getOptions,
                                function() {
                                    scope.destroy(),
                                        scope.init()
                                })
                    }
                }
        }]),
    angular.module("app.chart.ctrl", []).controller("chartCtrl", ["$scope",
        function($scope) {
            $scope.easypiechartxs1 = {
                percent: 45,
                options: {
                    animate: {
                        duration: 1e3,
                        enabled: !0
                    },
                    barColor: $scope.color.danger,
                    lineCap: "round",
                    size: 80,
                    lineWidth: 7
                }
            },
                $scope.easypiechartxs2 = {
                    percent: 60,
                    options: {
                        animate: {
                            duration: 1e3,
                            enabled: !0
                        },
                        barColor: $scope.color.danger,
                        lineCap: "round",
                        size: 80,
                        lineWidth: 7
                    }
                },
                $scope.easypiechartxs3 = {
                    percent: 75,
                    options: {
                        animate: {
                            duration: 1e3,
                            enabled: !0
                        },
                        barColor: $scope.color.danger,
                        lineCap: "round",
                        size: 80,
                        lineWidth: 7
                    }
                },
                $scope.easypiechartxs4 = {
                    percent: 80,
                    options: {
                        animate: {
                            duration: 1e3,
                            enabled: !0
                        },
                        barColor: $scope.color.danger,
                        lineCap: "round",
                        size: 80,
                        lineWidth: 7
                    }
                },
                $scope.gaugeChart1 = {
                    data: {
                        maxValue: 3e3,
                        animationSpeed: 40,
                        val: 1375
                    },
                    options: {
                        lines: 12,
                        angle: 0,
                        lineWidth: .47,
                        pointer: {
                            length: .6,
                            strokeWidth: .03,
                            color: "#000000"
                        },
                        limitMax: "true",
                        colorStart: "#FF7857",
                        colorStop: "#FF7857",
                        strokeColor: "#EEEEEE",
                        generateGradient: !0,
                        percentColors: [[0, $scope.color.success], [1, $scope.color.success]]
                    }
                }
        }]).controller("morrisChartCtrl", ["$scope",
        function($scope) {
            var barColor, barData, comboColor, comboData, donutColor, donutData, simpleColor, simpleData;
            simpleData = [{
                year: "2008",
                value: 10
            },
                {
                    year: "2009",
                    value: 15
                },
                {
                    year: "2010",
                    value: 5
                },
                {
                    year: "2011",
                    value: 15
                },
                {
                    year: "2012",
                    value: 10
                },
                {
                    year: "2013",
                    value: 15
                },
                {
                    year: "2014",
                    value: 12
                }],
                simpleColor = [$scope.color.danger],
                $scope.simple1 = {
                    data: simpleData,
                    type: "line",
                    options: {
                        xkey: "year",
                        ykeys: ["value"],
                        labels: ["Value"],
                        lineWidth: "3",
                        lineColors: simpleColor
                    }
                },
                $scope.simple2 = {
                    data: simpleData,
                    type: "area",
                    options: {
                        xkey: "year",
                        ykeys: ["value"],
                        labels: ["Value"],
                        lineWidth: "3",
                        lineColors: simpleColor
                    }
                },
                comboData = [{
                    days: "1",
                    a: 400,
                    b: 130
                },
                    {
                        days: "2",
                        a: 350,
                        b: 180
                    },
                    {
                        days: "3",
                        a: 400,
                        b: 140
                    },
                    {
                        days: "4",
                        a: 400,
                        b: 250
                    },
                    {
                        days: "5",
                        a: 450,
                        b: 230
                    },
                    {
                        days: "6",
                        a: 550,
                        b: 170
                    },
                    {
                        days: "7",
                        a: 480,
                        b: 200
                    }],
                comboColor = ["#29B7D3", "#3CBC8D"],
                $scope.combo1 = {
                    data: comboData,
                    type: "line",
                    options: {
                        xkey: "days",
                        ykeys: ["a", "b"],
                        labels: ["Product A", "Product B"],
                        lineWidth: "3",
                        lineColors: comboColor
                    }
                },
                $scope.combo2 = {
                    data: comboData,
                    type: "area",
                    options: {
                        xkey: "days",
                        ykeys: ["a", "b"],
                        labels: ["Value A", "Value B"],
                        lineWidth: "2",
                        lineColors: comboColor
                    }
                },
                barData = [{
                    year: "2009",
                    a: 20,
                    b: 16,
                    c: 12
                },
                    {
                        year: "2010",
                        a: 10,
                        b: 22,
                        c: 30
                    },
                    {
                        year: "2011",
                        a: 5,
                        b: 14,
                        c: 20
                    },
                    {
                        year: "2012",
                        a: 5,
                        b: 12,
                        c: 19
                    },
                    {
                        year: "2013",
                        a: 20,
                        b: 19,
                        c: 13
                    },
                    {
                        year: "2014",
                        a: 28,
                        b: 22,
                        c: 20
                    }],
                barColor = [$scope.color.danger, $scope.color.warning, $scope.color.success],
                $scope.bar1 = {
                    data: barData,
                    type: "bar",
                    options: {
                        xkey: "year",
                        ykeys: ["a", "b", "c"],
                        labels: ["Value A", "Value B", "Value C"],
                        barColors: barColor
                    }
                },
                $scope.bar2 = {
                    data: barData,
                    type: "bar",
                    options: {
                        xkey: "year",
                        ykeys: ["a", "b", "c"],
                        labels: ["Value A", "Value B", "Value C"],
                        barColors: barColor,
                        stacked: !0
                    }
                },
                donutColor = [$scope.color.danger, $scope.color.warning, $scope.color.success, $scope.color.info],
                donutData = [{
                    label: "Download Sales",
                    value: 12
                },
                    {
                        label: "In-Store Sales",
                        value: 30
                    },
                    {
                        label: "Mail-Order Sales",
                        value: 20
                    },
                    {
                        label: "Online Sales",
                        value: 19
                    }],
                $scope.donut1 = {
                    data: donutData,
                    type: "donut",
                    options: {
                        xkey: "year"
                    }
                },
                $scope.donut2 = {
                    data: donutData,
                    type: "donut",
                    options: {
                        xkey: "year",
                        colors: donutColor
                    }
                },
                $scope.donut3 = {
                    data: donutData,
                    type: "donut",
                    options: {
                        xkey: "year",
                        formatter: "return '$' + y;"
                    }
                }
        }]).controller("flotChartCtrl", ["$scope",
        function($scope) {
            var areaChart, barChart, barChartB, barChartV, i, singlelineChart, lineChart1, lineChart2, lineChart3, lineChart4, lineChart5, lineChart6, lineChart7;
            for (lineChart1 = {},
                     lineChart1.data1 = [[1, 12], [2, 10], [3, 31], [4, 13], [5, 65], [6, 10], [7, 14]], lineChart1.data2 = [[1, 6], [2, 8], [3, 24], [4, 7], [5, 12], [6, 5], [7, 7]], $scope.line1 = {},
                     $scope.line1.data = [{
                         data: lineChart1.data1,
                         label: "Uploads"
                     },
                         {
                             data: lineChart1.data2,
                             label: "Downloads"
                         }], $scope.line1.options = {
                series: {
                    lines: {
                        show: !1
                    },
                    splines: {
                        show: !0,
                        tension: .4,
                        lineWidth: 1,
                        fill: .4
                    },
                    points: {
                        radius: 2,
                        show: !0,
                        lineWidth: 1
                    },
                    shadowSize: 0
                },
                colors: [$scope.color.info, $scope.color.success],
                tooltip: !0,
                tooltipOpts: {
                    content: function(label, x, y) {
                        return '<div class="hover-title" style="color:#000000"></div><b style="color:#e74c3c">' + y.toLocaleString() + " </b><span style='color:#000000'>" + label.toLowerCase() + "</span>"
                    }
                },
                grid: {
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "#d1d4d7",
                    borderWidth: {
                        top: 0,
                        right: 0,
                        bottom: 1,
                        left: 0
                    },
                    color: "#d1d4d7",
                    margin: {
                        left: 30
                    }
                },
                xaxis: {
                    ticks: [[1, "Sun"], [2, "Mon"], [3, "Tue"], [4, "Wed"], [5, "Thu"], [6, "Fri"], [7, "Sat"]],
                    mode: "time",
                    tickColor: "#fff"
                },
                yaxis: {
                    ticks: 4
                }
            },
                     lineChart2 = {},
                     lineChart2.data1 = [["Jan", 7], ["Feb", 10], ["Mar", 8], ["April", 14], ["May", 8], ["June", 10], ["July", 8], ["Aug", 12], ["Sept", 10], ["Oct", 8], ["Nov", 10], ["Dec", 14]], $scope.line2 = {},
                     $scope.line2.data = [{
                         data: lineChart2.data1,
                         label: "New Visitors"
                     }], $scope.line2.options = {
                series: {
                    lines: {
                        show: !0,
                        lineWidth: 2,
                        color: "#ffffff",
                        fill: !1
                    },
                    points: {
                        show: !0,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 4
                    }
                },
                colors: [$scope.color.danger],
                tooltip: !0,
                tooltipOpts: {
                    defaultTheme: !1
                },
                xaxis: {
                    mode: "categories",
                    show: !0
                },
                yaxis: {
                    show: !0
                },
                grid: {
                    hoverable: !0,
                    clickable: !0,
                    borderWidth: 0,
                    borderColor: "#ffffff"
                },
                legend: {
                    show: !1
                }
            },
                     lineChart3 = {},
                     lineChart3.data1 = [["Jan", 7], ["Feb", 10], ["Mar", 8], ["April", 14], ["May", 8], ["June", 10], ["July", 8], ["Aug", 12], ["Sept", 10], ["Oct", 8], ["Nov", 10], ["Dec", 14]], $scope.line3 = {},
                     $scope.line3.data = [{
                         data: lineChart3.data1,
                         label: "New Orders"
                     }], $scope.line3.options = {
                series: {
                    lines: {
                        show: !0,
                        lineWidth: 2,
                        fill: !1
                    },
                    points: {
                        show: !0,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 4
                    }
                },
                colors: [$scope.color["default"]],
                tooltip: !0,
                tooltipOpts: {
                    content: function(label, x, y) {
                        return '<div class="hover-title"></div><b style="color:#e74c3c">' + y.toLocaleString() + " </b><span>" + label.toLowerCase() + "</span>"
                    }
                },
                xaxis: {
                    mode: "categories",
                    show: !0
                },
                yaxis: {
                    show: !0
                },
                grid: {
                    hoverable: !0,
                    clickable: !0,
                    borderWidth: 0,
                    borderColor: "#ffffff"
                },
                legend: {
                    show: !1
                }
            },
                     lineChart4 = {},
                     lineChart4.data1 = [["Jan", 7], ["Feb", 10], ["Mar", 8], ["April", 14], ["May", 8], ["June", 10], ["July", 8], ["Aug", 12], ["Sept", 10], ["Oct", 8], ["Nov", 10], ["Dec", 14]], $scope.line4 = {},
                     $scope.line4.data = [{
                         data: lineChart4.data1,
                         label: "Total Sales"
                     }], $scope.line4.options = {
                series: {
                    lines: {
                        show: !0,
                        lineWidth: 2,
                        fill: !1
                    },
                    points: {
                        show: !0,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: "#ffffff",
                        radius: 4
                    }
                },
                colors: [$scope.color.success],
                tooltip: !0,
                tooltipOpts: {
                    content: function(label, x, y) {
                        return '<div class="hover-title"></div><b style="color:#e74c3c">' + y.toLocaleString() + " </b><span>" + label.toLowerCase() + "</span>"
                    }
                },
                xaxis: {
                    mode: "categories",
                    show: !0
                },
                yaxis: {
                    show: !0
                },
                grid: {
                    hoverable: !0,
                    clickable: !0,
                    borderWidth: 0,
                    borderColor: "#ffffff"
                },
                legend: {
                    show: !1
                }
            },
                     lineChart5 = {},
                     lineChart5.data1 = [["Mon", 12], ["Tue", 8], ["Wed", 6], ["Thu", 8], ["Fri", 4], ["Sat", 6], ["Sun", 8]], $scope.line5 = {},
                     $scope.line5.data = [{
                         data: lineChart5.data1,
                         label: "Customer feedback"
                     }], $scope.line5.options = {
                series: {
                    lines: {
                        show: !0,
                        lineWidth: 2,
                        fill: !1
                    },
                    points: {
                        show: !0,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: "#ffffff",
                        radius: 4
                    }
                },
                colors: [$scope.color.warning],
                tooltip: !0,
                tooltipOpts: {
                    content: function(label, x, y) {
                        return '<div class="hover-title"></div><b style="color:#e74c3c">' + y.toLocaleString() + " </b><span>" + label.toLowerCase() + "</span>"
                    }
                },
                xaxis: {
                    mode: "categories"
                },
                grid: {
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "#eee",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                legend: {
                    show: !1
                }
            },
                     lineChart6 = {},
                     lineChart6.data1 = [["Mon", 5], ["Tue", 8], ["Wed", 6], ["Thu", 9], ["Fri", 7], ["Sat", 4], ["Sun", 8]], $scope.line6 = {},
                     $scope.line6.data = [{
                         data: lineChart6.data1,
                         label: "Net Earning"
                     }], $scope.line6.options = {
                series: {
                    lines: {
                        show: !0,
                        lineWidth: 2,
                        fill: !1
                    },
                    points: {
                        show: !0,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 4
                    }
                },
                colors: [$scope.color.primary],
                tooltip: !0,
                tooltipOpts: {
                    content: function(label, x, y) {
                        return '<div class="hover-title"></div><b style="color:#e74c3c">' + y.toLocaleString() + " </b><span>" + label.toLowerCase() + "</span>"
                    }
                },
                xaxis: {
                    mode: "categories"
                },
                grid: {
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "#eee",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                legend: {
                    show: !1
                }
            },
                     lineChart7 = {},
                     lineChart7.data1 = [["Mon", 4], ["Tue", 8], ["Wed", 10], ["Thu", 8], ["Fri", 9], ["Sat", 7]], $scope.line7 = {},
                     $scope.line7.data = [{
                         data: lineChart7.data1,
                         label: "Server Performance"
                     }], $scope.line7.options = {
                series: {
                    lines: {
                        show: !0,
                        lineWidth: 2,
                        fill: !1
                    },
                    points: {
                        show: !0,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 4
                    }
                },
                colors: [$scope.color.success],
                tooltip: !0,
                tooltipOpts: {
                    content: function(label, x, y) {
                        return '<div class="hover-title"></div><b style="color:#e74c3c">' + y.toLocaleString() + " </b><span>" + label.toLowerCase() + "</span>"
                    }
                },
                xaxis: {
                    mode: "categories"
                },
                grid: {
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "#eee",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                legend: {
                    show: !1
                }
            },
                     singlelineChart = {},
                     singlelineChart.data1 = [[1, 400], [2, 350], [3, 400], [4, 400], [5, 450], [6, 550], [7, 480], [8, 550], [9, 500], [10, 610], [11, 520], [12, 570]], $scope.singlelineflot = {},
                     $scope.singlelineflot.data = [{
                         data: singlelineChart.data1,
                         label: "Sales"
                     }], $scope.singlelineflot.options = {
                series: {
                    lines: {
                        show: !0,
                        fill: !0,
                        lineWidth: 2,
                        fillColor: {
                            colors: ["rgba(255,255,255,.0)", "rgba(36,138,175,.8)"]
                        }
                    },
                    points: {
                        show: !0,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 5
                    }
                },
                colors: [$scope.color.primary],
                tooltip: !0,
                tooltipOpts: {
                    defaultTheme: !1
                },
                grid: {
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "#eeeeee",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                xaxis: {
                    ticks: [[1, "Jan."], [2, "Feb."], [3, "Mar."], [4, "Apr."], [5, "May"], [6, "June"], [7, "July"], [8, "Aug."], [9, "Sept."], [10, "Oct."], [11, "Nov."], [12, "Dec."]]
                }
            },
                     areaChart = {},
                     areaChart.data1 = [[1, 400], [2, 350], [3, 400], [4, 400], [5, 450], [6, 550], [7, 480], [8, 550], [9, 500], [10, 610], [11, 520], [12, 570]], areaChart.data2 = [[1, 200], [2, 250], [3, 240], [4, 280], [5, 230], [6, 250], [7, 200], [8, 300], [9, 240], [10, 300], [11, 320], [12, 370]], $scope.area = {},
                     $scope.area.data = [{
                         data: areaChart.data1,
                         label: "Value A",
                         lines: {
                             fill: !0
                         },
                         points: {
                             show: !0
                         }
                     },
                         {
                             data: areaChart.data2,
                             label: "Value B",
                             lines: {
                                 fill: !1
                             },
                             points: {
                                 show: !0
                             },
                             yaxis: 2
                         }], $scope.area.options = {
                series: {
                    lines: {
                        show: !0,
                        fill: !1
                    },
                    points: {
                        show: !0,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 5
                    },
                    shadowSize: 0
                },
                grid: {
                    hoverable: !1,
                    clickable: !1,
                    tickColor: "#eeeeee",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                colors: [$scope.color.info, $scope.color.success],
                tooltip: !0,
                tooltipOpts: {
                    defaultTheme: !0
                },
                xaxis: {
                    mode: "time"
                },
                yaxes: [{},
                    {
                        position: "right"
                    }]
            },
                     barChart = {},
                     barChart.data1 = [[1, 20], [2, 10], [3, 5], [4, 5], [5, 20], [6, 28]], barChart.data2 = [[1, 16], [2, 22], [3, 14], [4, 12], [5, 19], [6, 22]], barChart.data3 = [[1, 12], [2, 30], [3, 20], [4, 19], [5, 13], [6, 20]], $scope.barChart = {},
                     $scope.barChart.data = [{
                         label: "Value A",
                         data: barChart.data1
                     },
                         {
                             label: "Value B",
                             data: barChart.data2
                         },
                         {
                             label: "Value C",
                             data: barChart.data3
                         }], $scope.barChart.options = {
                series: {
                    stack: !0,
                    bars: {
                        show: !0,
                        fill: 1,
                        barWidth: .4,
                        horizontal: !1,
                        order: 1
                    }
                },
                grid: {
                    hoverable: !0,
                    borderWidth: 1,
                    tickColor: "#eeeeee",
                    borderColor: "#eeeeee"
                },
                tooltip: !0,
                tooltipOpts: {
                    defaultTheme: !1
                },
                colors: [$scope.color.success, $scope.color.warning, $scope.color.danger]
            },
                     barChartV = {},
                     barChartV.data1 = [], i = 0; 20 > i;) barChartV.data1.push([i, Math.sin(i)]),
                ++i;
            return $scope.barChart3 = {},
                $scope.barChart3.data = [{
                    label: "Value A",
                    data: barChartV.data1
                }],
                $scope.barChart3.options = {
                    series: {
                        stack: !0,
                        bars: {
                            show: !0,
                            fillColor: {
                                colors: [{
                                    opacity: .5
                                },
                                    {
                                        opacity: .9
                                    }]
                            },
                            barWidth: .6,
                            horizontal: !1
                        }
                    },
                    grid: {
                        hoverable: !0,
                        borderWidth: 1,
                        tickColor: "#eeeeee",
                        borderColor: "#eeeeee"
                    },
                    tooltip: !0,
                    tooltipOpts: {
                        defaultTheme: !1
                    },
                    yaxis: {
                        font: {
                            color: "#ccc"
                        },
                        min: -2,
                        max: 2
                    },
                    colors: [$scope.color.info]
                },
                barChartB = {},
                barChartB.data1 = [[1, 5], [2, 6], [3, 7], [4, 8], [5, 9], [6, 12], [7, 9], [8, 8], [9, 7], [10, 6], [11, 5]],
                $scope.barChart4 = {},
                $scope.barChart4.data = [{
                    label: "Value A",
                    data: barChartB.data1
                }],
                $scope.barChart4.options = {
                    series: {
                        stack: !0,
                        bars: {
                            show: !0,
                            fillColor: {
                                colors: [{
                                    opacity: .5
                                },
                                    {
                                        opacity: .9
                                    }]
                            },
                            barWidth: .6,
                            horizontal: !1
                        }
                    },
                    grid: {
                        hoverable: !0,
                        borderWidth: 1,
                        tickColor: "#eeeeee",
                        borderColor: "#eeeeee"
                    },
                    tooltip: !0,
                    tooltipOpts: {
                        defaultTheme: !1
                    },
                    xaxis: {
                        font: {
                            color: "#ccc"
                        }
                    },
                    yaxis: {
                        font: {
                            color: "#ccc"
                        }
                    },
                    colors: [$scope.color.info]
                },
                $scope.pieChart = {},
                $scope.pieChart.data = [{
                    label: "Download Sales",
                    data: 12
                },
                    {
                        label: "In-Store Sales",
                        data: 30
                    },
                    {
                        label: "Mail-Order Sales",
                        data: 20
                    },
                    {
                        label: "Online Sales",
                        data: 19
                    }],
                $scope.pieChart.options = {
                    series: {
                        pie: {
                            show: !0
                        }
                    },
                    legend: {
                        show: !1
                    },
                    grid: {
                        hoverable: !0,
                        clickable: !0
                    },
                    colors: [$scope.color.primary, $scope.color.success, $scope.color.info, $scope.color.warning, $scope.color.danger]
                },
                $scope.donutChart = {},
                $scope.donutChart.data = [{
                    label: "Download Sales",
                    data: 12
                },
                    {
                        label: "In-Store Sales",
                        data: 30
                    },
                    {
                        label: "Mail-Order Sales",
                        data: 20
                    },
                    {
                        label: "Online Sales",
                        data: 19
                    }],
                $scope.donutChart.options = {
                    series: {
                        pie: {
                            show: !0,
                            innerRadius: .6
                        }
                    },
                    legend: {
                        show: !0
                    },
                    grid: {
                        hoverable: !0,
                        clickable: !0
                    },
                    colors: ["#91C854", "#00B1E1", "#63D3E9", "#FFD66A", "#ED5466", "#6BCCB4"]
                },
                $scope.donutChart2 = {},
                $scope.donutChart2.data = [{
                    label: "Download Sales",
                    data: 12
                },
                    {
                        label: "In-Store Sales",
                        data: 30
                    },
                    {
                        label: "Mail-Order Sales",
                        data: 20
                    },
                    {
                        label: "Online Sales",
                        data: 19
                    },
                    {
                        label: "Direct Sales",
                        data: 15
                    }],
                $scope.donutChart2.options = {
                    series: {
                        pie: {
                            show: !0,
                            innerRadius: .45
                        }
                    },
                    legend: {
                        show: !1
                    },
                    grid: {
                        hoverable: !0,
                        clickable: !0
                    },
                    colors: [$scope.color.danger, $scope.color.info, $scope.color.success, $scope.color.warning, $scope.color.primary]
                }
        }]).controller("sparklineCtrl", ["$scope",
        function($scope) {
            $scope.largeChart1 = {
                data: [50.32, 45.23, 47.56, 36.25, 53.85, 40.15, 41.25, 50.15, 57.14, 36.15, 97.26, 50.15, 45.32, 47.19, 37.75, 25.15, 56.34, 50.35, 47.25, 53.15],
                options: {
                    type: "line",
                    lineWidth: 3,
                    lineColor: $scope.color.info,
                    fillColor: $scope.color.info,
                    spotColor: $scope.color.danger,
                    highlightLineColor: "#fff",
                    spotRadius: 2,
                    minSpotColor: $scope.color.danger,
                    maxSpotColor: $scope.color.danger,
                    width: "100%",
                    height: "150px"
                }
            },
                $scope.largeChart2 = {
                    data: [5.6, 6, 7, 8, 7, 8.2, 8.7, 9, 11, 12, 11, 9, 8.7, 8.2, 7, 8, 7, 6, 5.6],
                    options: {
                        type: "bar",
                        barColor: $scope.color.success,
                        barWidth: 12,
                        width: "100%",
                        height: "150px"
                    }
                },
                $scope.simpleChart2 = {
                    data: [5, 6, 7, 10, 12, 14, 11, 9, 8.9, 8.7, 7, 8, 7, 6, 5.6],
                    options: {
                        type: "bar",
                        width: "100%",
                        height: "30px",
                        barColor: $scope.color.info
                    }
                },
                $scope.simpleChart3 = {
                    data: [4, 3, 2],
                    options: {
                        type: "pie",
                        width: "115px",
                        height: "115px",
                        sliceColors: [$scope.color.warning, $scope.color.danger, $scope.color.success]
                    }
                },
                $scope.largeChart3 = {
                    data: [3, 2],
                    options: {
                        type: "pie",
                        sliceColors: [$scope.color.success, $scope.color.info],
                        width: "150px",
                        height: "150px"
                    }
                }
        }]),
    angular.module("app.chart.directives", []).directive("gaugeChart", [function() {
        return {
            restrict: "A",
            scope: {
                data: "=",
                options: "="
            },
            link: function(scope, ele) {
                var data, gauge, options;
                return data = scope.data,
                    options = scope.options,
                    gauge = new Gauge(ele[0]).setOptions(options),
                    gauge.maxValue = data.maxValue,
                    gauge.animationSpeed = data.animationSpeed,
                    gauge.set(data.val)
            }
        }
    }]).directive("flotChart", [function() {
        return {
            restrict: "A",
            scope: {
                data: "=",
                options: "="
            },
            link: function(scope, ele) {
                var data, options, plot;
                return data = scope.data,
                    options = scope.options,
                    plot = $.plot(ele[0], data, options)
            }
        }
    }]).directive("flotChartRealtime", [function() {
        return {
            restrict: "A",
            link: function(scope, ele) {
                var data, getRandomData, plot, totalPoints, update, updateInterval;
                return data = [],
                    totalPoints = 300,
                    getRandomData = function() {
                        var i, prev, res, y;
                        for (data.length > 0 && (data = data.slice(1)); data.length < totalPoints;) prev = data.length > 0 ? data[data.length - 1] : 50,
                            y = prev + 10 * Math.random() - 5,
                            0 > y ? y = 0 : y > 100 && (y = 100),
                            data.push(y);
                        for (res = [], i = 0; i < data.length;) res.push([i, data[i]]),
                            ++i;
                        return res
                    },
                    update = function() {
                        plot.setData([getRandomData()]),
                            plot.draw(),
                            setTimeout(update, updateInterval)
                    },
                    data = [],
                    totalPoints = 300,
                    updateInterval = 200,
                    plot = $.plot(ele[0], [getRandomData()], {
                        series: {
                            lines: {
                                show: !0,
                                fill: !1
                            },
                            shadowSize: 0
                        },
                        yaxis: {
                            min: 0,
                            max: 100
                        },
                        xaxis: {
                            show: !1
                        },
                        grid: {
                            hoverable: !0,
                            borderWidth: 1,
                            borderColor: "#eeeeee"
                        },
                        colors: ["#70b1cf"]
                    }),
                    update()
            }
        }
    }]).directive("sparkline", [function() {
        return {
            restrict: "A",
            scope: {
                data: "=",
                options: "="
            },
            link: function(scope, ele) {
                var data, options, sparklineDraw;
                return data = scope.data,
                    options = scope.options,
                    sparklineDraw = function() {
                        return ele.sparkline(data, options)
                    },
                    $(window).resize(function() {
                        var sparkResize;
                        return clearTimeout(sparkResize),
                            sparkResize = setTimeout(sparklineDraw, 200)
                    }),
                    sparklineDraw()
            }
        }
    }]).directive("morrisChart", [function() {
        return {
            restrict: "A",
            scope: {
                data: "=",
                type: "=",
                options: "="
            },
            link: function(scope, ele) {
                var data, func, options, type;
                switch (data = scope.data, type = scope.type) {
                    case "line":
                        return options = angular.extend({
                                element: ele[0],
                                data: data
                            },
                            scope.options),
                            new Morris.Line(options);
                    case "area":
                        return options = angular.extend({
                                element: ele[0],
                                data: data
                            },
                            scope.options),
                            new Morris.Area(options);
                    case "bar":
                        return options = angular.extend({
                                element: ele[0],
                                data: data
                            },
                            scope.options),
                            new Morris.Bar(options);
                    case "donut":
                        return options = angular.extend({
                                element: ele[0],
                                data: data
                            },
                            scope.options),
                        options.formatter && (func = new Function("y", "data", options.formatter), options.formatter = func),
                            new Morris.Donut(options)
                }
            }
        }
    }]),
    angular.module("app.ui.form.ctrls", ["lazyModel"]).controller("lazyModelCtrl",
        function($scope) {
            $scope.user = {
                name: "Square Design"
            }
        }).controller("TagsDemoCtrl", ["$scope",
        function($scope) {
            return $scope.tags = ["Tag1", "Tag2"]
        }]).controller("DatepickerDemoCtrl", ["$scope",
        function($scope) {
            return $scope.today = function() {
                return $scope.dt = new Date
            },
                $scope.today(),
                $scope.showWeeks = !0,
                $scope.toggleWeeks = function() {
                    return $scope.showWeeks = !$scope.showWeeks
                },
                $scope.clear = function() {
                    return $scope.dt = null
                },
                $scope.disabled = function(date, mode) {
                    return "day" === mode && (0 === date.getDay() || 6 === date.getDay())
                },
                $scope.toggleMin = function() {
                    var _ref;
                    return _ref = void 0,
                        $scope.minDate = null != (_ref = $scope.minDate) ? _ref: {
                            "null": new Date
                        }
                },
                $scope.toggleMin(),
                $scope.open = function($event) {
                    return $event.preventDefault(),
                        $event.stopPropagation(),
                        $scope.opened = !0
                },
                $scope.dateOptions = {
                    "year-format": "'yy'",
                    "starting-day": 1
                },
                $scope.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "shortDate"],
                $scope.format = $scope.formats[0]
        }]).controller("TimepickerDemoCtrl", ["$scope",
        function($scope) {
            return $scope.mytime = new Date,
                $scope.hstep = 1,
                $scope.mstep = 15,
                $scope.options = {
                    hstep: [1, 2, 3, 4, 5],
                    mstep: [1, 5, 10, 15, 25, 30]
                },
                $scope.ismeridian = !0,
                $scope.toggleMode = function() {
                    return $scope.ismeridian = !$scope.ismeridian
                },
                $scope.update = function() {
                    var d;
                    return d = void 0,
                        d = new Date,
                        d.setHours(14),
                        d.setMinutes(0),
                        $scope.mytime = d
                },
                $scope.changed = function() {
                    return void 0
                },
                $scope.clear = function() {
                    return $scope.mytime = null
                }
        }]).controller("TypeaheadCtrl", ["$scope",
        function($scope) {
            return $scope.selected = void 0,
                $scope.states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        }]).controller("RatingDemoCtrl", ["$scope",
        function($scope) {
            return $scope.rate = 7,
                $scope.max = 10,
                $scope.isReadonly = !1,
                $scope.hoveringOver = function(value) {
                    $scope.overStar = value,
                        $scope.percent = 100 * (value / $scope.max)
                },
                $scope.ratingStates = [{
                    stateOn: "glyphicon-ok-sign",
                    stateOff: "glyphicon-ok-circle"
                },
                    {
                        stateOn: "glyphicon-star",
                        stateOff: "glyphicon-star-empty"
                    },
                    {
                        stateOn: "glyphicon-heart",
                        stateOff: "glyphicon-ban-circle"
                    },
                    {
                        stateOn: "glyphicon-heart"
                    },
                    {
                        stateOff: "glyphicon-off"
                    }]
        }]),
    angular.module("app.ui.form.directives", []).directive("uiRangeSlider", [function() {
        return {
            restrict: "A",
            link: function(scope, ele) {
                return ele.slider()
            }
        }
    }]).directive("uiFileUpload", [function() {
        return {
            restrict: "A",
            link: function(scope, ele) {
                return ele.bootstrapFileInput()
            }
        }
    }]).directive("uiSpinner", [function() {
        return {
            restrict: "A",
            compile: function(ele) {
                return ele.addClass("ui-spinner"),
                    {
                        post: function() {
                            return ele.spinner()
                        }
                    }
            }
        }
    }]).directive("uiWizardForm", [function() {
        return {
            link: function(scope, ele) {
                return ele.steps()
            }
        }
    }]),
    angular.module("app.form.validation", []).controller("wizardFormCtrl", ["$scope",
        function($scope) {
            return $scope.wizard = {
                firstName: "some name",
                lastName: "",
                email: "",
                password: "",
                age: "",
                address: ""
            },
                $scope.isValidateStep1 = function() {
                    return void 0
                },
                $scope.finishedWizard = function() {
                    return void 0
                }
        }]).controller("formConstraintsCtrl", ["$scope",
        function($scope) {
            var original;
            return original = void 0,
                $scope.form = {
                    required: "",
                    minlength: "",
                    maxlength: "",
                    length_rage: "",
                    type_something: "",
                    confirm_type: "",
                    foo: "",
                    email: "",
                    url: "",
                    num: "",
                    minVal: "",
                    maxVal: "",
                    valRange: "",
                    pattern: ""
                },
                original = angular.copy($scope.form),
                $scope.revert = function() {
                    return $scope.form = angular.copy(original),
                        $scope.form_constraints.$setPristine()
                },
                $scope.canRevert = function() {
                    return ! angular.equals($scope.form, original) || !$scope.form_constraints.$pristine
                },
                $scope.canSubmit = function() {
                    return $scope.form_constraints.$valid && !angular.equals($scope.form, original)
                }
        }]).controller("signinCtrl", ["$scope",
        function($scope) {
            var original;
            return $scope.user = {
                email: "",
                password: ""
            },
                $scope.showInfoOnSubmit = !1,
                original = angular.copy($scope.user),
                $scope.revert = function() {
                    return $scope.user = angular.copy(original),
                        $scope.form_signin.$setPristine()
                },
                $scope.canRevert = function() {
                    return ! angular.equals($scope.user, original) || !$scope.form_signin.$pristine
                },
                $scope.canSubmit = function() {
                    return $scope.form_signin.$valid && !angular.equals($scope.user, original)
                },
                $scope.submitForm = function() {
                    return $scope.showInfoOnSubmit = !0,
                        $scope.revert()
                }
        }]).controller("signupCtrl", ["$scope",
        function($scope) {
            var original;
            return original = void 0,
                $scope.user = {
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    age: ""
                },
                $scope.showInfoOnSubmit = !1,
                original = angular.copy($scope.user),
                $scope.revert = function() {
                    return $scope.user = angular.copy(original),
                        $scope.form_signup.$setPristine(),
                        $scope.form_signup.confirmPassword.$setPristine()
                },
                $scope.canRevert = function() {
                    return ! angular.equals($scope.user, original) || !$scope.form_signup.$pristine
                },
                $scope.canSubmit = function() {
                    return $scope.form_signup.$valid && !angular.equals($scope.user, original)
                },
                $scope.submitForm = function() {
                    return $scope.showInfoOnSubmit = !0,
                        $scope.revert()
                }
        }]).directive("validateEquals", [function() {
        return {
            require: "ngModel",
            link: function(scope, ele, attrs, ngModelCtrl) {
                var validateEqual;
                return validateEqual = function(value) {
                    var valid;
                    return valid = value === scope.$eval(attrs.validateEquals),
                        ngModelCtrl.$setValidity("equal", valid),
                        "function" == typeof valid ? valid({
                            value: void 0
                        }) : void 0
                },
                    ngModelCtrl.$parsers.push(validateEqual),
                    ngModelCtrl.$formatters.push(validateEqual),
                    scope.$watch(attrs.validateEquals,
                        function(newValue, oldValue) {
                            return newValue !== oldValue ? ngModelCtrl.$setViewValue(ngModelCtrl.$ViewValue) : void 0
                        })
            }
        }
    }]);
var app;
app = angular.module("selectApp", ["ngSanitize", "ui.select"]),
    app.filter("propsFilter",
        function() {
            return function(items, props) {
                var out;
                return out = [],
                    angular.isArray(items) ? items.forEach(function(item) {
                        var i, itemMatches, keys, prop, text;
                        for (itemMatches = !1, keys = Object.keys(props), i = 0; i < keys.length;) {
                            if (prop = keys[i], text = props[prop].toLowerCase(), -1 !== item[prop].toString().toLowerCase().indexOf(text)) {
                                itemMatches = !0;
                                break
                            }
                            i++
                        }
                        itemMatches && out.push(item)
                    }) : out = items,
                    out
            }
        }),
    app.controller("SelectCtrl",
        function($scope, $http, $timeout) {
            $scope.disabled = void 0,
                $scope.searchEnabled = void 0,
                $scope.enable = function() {
                    $scope.disabled = !1
                },
                $scope.disable = function() {
                    $scope.disabled = !0
                },
                $scope.enableSearch = function() {
                    $scope.searchEnabled = !0
                },
                $scope.disableSearch = function() {
                    $scope.searchEnabled = !1
                },
                $scope.clear = function() {
                    $scope.person.selected = void 0,
                        $scope.address.selected = void 0,
                        $scope.country.selected = void 0
                },
                $scope.someGroupFn = function(item) {
                    return item.name[0] >= "A" && item.name[0] <= "M" ? "From A - M": item.name[0] >= "N" && item.name[0] <= "Z" ? "From N - Z": void 0
                },
                $scope.personAsync = {
                    selected: "wladimir@email.com"
                },
                $scope.peopleAsync = [],
                $timeout(function() {
                        $scope.peopleAsync = [{
                            name: "Adam",
                            email: "adam@email.com",
                            age: 12,
                            country: "United States"
                        },
                            {
                                name: "Amalie",
                                email: "amalie@email.com",
                                age: 12,
                                country: "Argentina"
                            },
                            {
                                name: "Estefanía",
                                email: "estefania@email.com",
                                age: 21,
                                country: "Argentina"
                            },
                            {
                                name: "Adrian",
                                email: "adrian@email.com",
                                age: 21,
                                country: "Ecuador"
                            },
                            {
                                name: "Wladimir",
                                email: "wladimir@email.com",
                                age: 30,
                                country: "Ecuador"
                            },
                            {
                                name: "Samantha",
                                email: "samantha@email.com",
                                age: 30,
                                country: "United States"
                            },
                            {
                                name: "Nicole",
                                email: "nicole@email.com",
                                age: 43,
                                country: "Colombia"
                            },
                            {
                                name: "Natasha",
                                email: "natasha@email.com",
                                age: 54,
                                country: "Ecuador"
                            },
                            {
                                name: "Michael",
                                email: "michael@email.com",
                                age: 15,
                                country: "Colombia"
                            },
                            {
                                name: "Nicolás",
                                email: "nicole@email.com",
                                age: 43,
                                country: "Colombia"
                            }]
                    },
                    3e3),
                $scope.counter = 0,
                $scope.someFunction = function(item, model) {
                    $scope.counter++,
                        $scope.eventResult = {
                            item: item,
                            model: model
                        }
                },
                $scope.removed = function(item, model) {
                    $scope.lastRemoved = {
                        item: item,
                        model: model
                    }
                },
                $scope.tagTransform = function(newTag) {
                    var item;
                    return item = {
                        name: newTag,
                        email: newTag.toLowerCase() + "@email.com",
                        age: "unknown",
                        country: "unknown"
                    }
                },
                $scope.person = {},
                $scope.people = [{
                    name: "Adam",
                    email: "adam@email.com",
                    age: 12,
                    country: "United States"
                },
                    {
                        name: "Amalie",
                        email: "amalie@email.com",
                        age: 12,
                        country: "Argentina"
                    },
                    {
                        name: "Estefanía",
                        email: "estefania@email.com",
                        age: 21,
                        country: "Argentina"
                    },
                    {
                        name: "Adrian",
                        email: "adrian@email.com",
                        age: 21,
                        country: "Ecuador"
                    },
                    {
                        name: "Wladimir",
                        email: "wladimir@email.com",
                        age: 30,
                        country: "Ecuador"
                    },
                    {
                        name: "Samantha",
                        email: "samantha@email.com",
                        age: 30,
                        country: "United States"
                    },
                    {
                        name: "Nicole",
                        email: "nicole@email.com",
                        age: 43,
                        country: "Colombia"
                    },
                    {
                        name: "Natasha",
                        email: "natasha@email.com",
                        age: 54,
                        country: "Ecuador"
                    },
                    {
                        name: "Michael",
                        email: "michael@email.com",
                        age: 15,
                        country: "Colombia"
                    },
                    {
                        name: "Nicolás",
                        email: "nicolas@email.com",
                        age: 43,
                        country: "Colombia"
                    }],
                $scope.availableColors = ["Red", "Green", "Blue", "Yellow", "Magenta", "Maroon", "Umbra", "Turquoise"],
                $scope.multipleDemo = {},
                $scope.multipleDemo.colors = ["Blue", "Red"],
                $scope.multipleDemo.colors2 = ["Blue", "Red"],
                $scope.multipleDemo.selectedPeople = [$scope.people[5], $scope.people[4]],
                $scope.multipleDemo.selectedPeople2 = $scope.multipleDemo.selectedPeople,
                $scope.multipleDemo.selectedPeopleWithGroupBy = [$scope.people[8], $scope.people[6]],
                $scope.multipleDemo.selectedPeopleSimple = ["samantha@email.com", "wladimir@email.com"],
                $scope.address = {},
                $scope.refreshAddresses = function(address) {
                    var params;
                    return params = {
                        address: address,
                        sensor: !1
                    },
                        $http.get("http://maps.googleapis.com/maps/api/geocode/json", {
                            params: params
                        }).then(function(response) {
                            $scope.addresses = response.data.results
                        })
                },
                $scope.country = {},
                $scope.countries = [{
                    name: "Afghanistan",
                    code: "AF"
                },
                    {
                        name: "Åland Islands",
                        code: "AX"
                    },
                    {
                        name: "Albania",
                        code: "AL"
                    },
                    {
                        name: "Algeria",
                        code: "DZ"
                    },
                    {
                        name: "American Samoa",
                        code: "AS"
                    },
                    {
                        name: "Andorra",
                        code: "AD"
                    },
                    {
                        name: "Angola",
                        code: "AO"
                    },
                    {
                        name: "Anguilla",
                        code: "AI"
                    },
                    {
                        name: "Antarctica",
                        code: "AQ"
                    },
                    {
                        name: "Antigua and Barbuda",
                        code: "AG"
                    },
                    {
                        name: "Argentina",
                        code: "AR"
                    },
                    {
                        name: "Armenia",
                        code: "AM"
                    },
                    {
                        name: "Aruba",
                        code: "AW"
                    },
                    {
                        name: "Australia",
                        code: "AU"
                    },
                    {
                        name: "Austria",
                        code: "AT"
                    },
                    {
                        name: "Azerbaijan",
                        code: "AZ"
                    },
                    {
                        name: "Bahamas",
                        code: "BS"
                    },
                    {
                        name: "Bahrain",
                        code: "BH"
                    },
                    {
                        name: "Bangladesh",
                        code: "BD"
                    },
                    {
                        name: "Barbados",
                        code: "BB"
                    },
                    {
                        name: "Belarus",
                        code: "BY"
                    },
                    {
                        name: "Belgium",
                        code: "BE"
                    },
                    {
                        name: "Belize",
                        code: "BZ"
                    },
                    {
                        name: "Benin",
                        code: "BJ"
                    },
                    {
                        name: "Bermuda",
                        code: "BM"
                    },
                    {
                        name: "Bhutan",
                        code: "BT"
                    },
                    {
                        name: "Bolivia",
                        code: "BO"
                    },
                    {
                        name: "Bosnia and Herzegovina",
                        code: "BA"
                    },
                    {
                        name: "Botswana",
                        code: "BW"
                    },
                    {
                        name: "Bouvet Island",
                        code: "BV"
                    },
                    {
                        name: "Brazil",
                        code: "BR"
                    },
                    {
                        name: "British Indian Ocean Territory",
                        code: "IO"
                    },
                    {
                        name: "Brunei Darussalam",
                        code: "BN"
                    },
                    {
                        name: "Bulgaria",
                        code: "BG"
                    },
                    {
                        name: "Burkina Faso",
                        code: "BF"
                    },
                    {
                        name: "Burundi",
                        code: "BI"
                    },
                    {
                        name: "Cambodia",
                        code: "KH"
                    },
                    {
                        name: "Cameroon",
                        code: "CM"
                    },
                    {
                        name: "Canada",
                        code: "CA"
                    },
                    {
                        name: "Cape Verde",
                        code: "CV"
                    },
                    {
                        name: "Cayman Islands",
                        code: "KY"
                    },
                    {
                        name: "Central African Republic",
                        code: "CF"
                    },
                    {
                        name: "Chad",
                        code: "TD"
                    },
                    {
                        name: "Chile",
                        code: "CL"
                    },
                    {
                        name: "China",
                        code: "CN"
                    },
                    {
                        name: "Christmas Island",
                        code: "CX"
                    },
                    {
                        name: "Cocos (Keeling) Islands",
                        code: "CC"
                    },
                    {
                        name: "Colombia",
                        code: "CO"
                    },
                    {
                        name: "Comoros",
                        code: "KM"
                    },
                    {
                        name: "Congo",
                        code: "CG"
                    },
                    {
                        name: "Congo, The Democratic Republic of the",
                        code: "CD"
                    },
                    {
                        name: "Cook Islands",
                        code: "CK"
                    },
                    {
                        name: "Costa Rica",
                        code: "CR"
                    },
                    {
                        name: "Cote D'Ivoire",
                        code: "CI"
                    },
                    {
                        name: "Croatia",
                        code: "HR"
                    },
                    {
                        name: "Cuba",
                        code: "CU"
                    },
                    {
                        name: "Cyprus",
                        code: "CY"
                    },
                    {
                        name: "Czech Republic",
                        code: "CZ"
                    },
                    {
                        name: "Denmark",
                        code: "DK"
                    },
                    {
                        name: "Djibouti",
                        code: "DJ"
                    },
                    {
                        name: "Dominica",
                        code: "DM"
                    },
                    {
                        name: "Dominican Republic",
                        code: "DO"
                    },
                    {
                        name: "Ecuador",
                        code: "EC"
                    },
                    {
                        name: "Egypt",
                        code: "EG"
                    },
                    {
                        name: "El Salvador",
                        code: "SV"
                    },
                    {
                        name: "Equatorial Guinea",
                        code: "GQ"
                    },
                    {
                        name: "Eritrea",
                        code: "ER"
                    },
                    {
                        name: "Estonia",
                        code: "EE"
                    },
                    {
                        name: "Ethiopia",
                        code: "ET"
                    },
                    {
                        name: "Falkland Islands (Malvinas)",
                        code: "FK"
                    },
                    {
                        name: "Faroe Islands",
                        code: "FO"
                    },
                    {
                        name: "Fiji",
                        code: "FJ"
                    },
                    {
                        name: "Finland",
                        code: "FI"
                    },
                    {
                        name: "France",
                        code: "FR"
                    },
                    {
                        name: "French Guiana",
                        code: "GF"
                    },
                    {
                        name: "French Polynesia",
                        code: "PF"
                    },
                    {
                        name: "French Southern Territories",
                        code: "TF"
                    },
                    {
                        name: "Gabon",
                        code: "GA"
                    },
                    {
                        name: "Gambia",
                        code: "GM"
                    },
                    {
                        name: "Georgia",
                        code: "GE"
                    },
                    {
                        name: "Germany",
                        code: "DE"
                    },
                    {
                        name: "Ghana",
                        code: "GH"
                    },
                    {
                        name: "Gibraltar",
                        code: "GI"
                    },
                    {
                        name: "Greece",
                        code: "GR"
                    },
                    {
                        name: "Greenland",
                        code: "GL"
                    },
                    {
                        name: "Grenada",
                        code: "GD"
                    },
                    {
                        name: "Guadeloupe",
                        code: "GP"
                    },
                    {
                        name: "Guam",
                        code: "GU"
                    },
                    {
                        name: "Guatemala",
                        code: "GT"
                    },
                    {
                        name: "Guernsey",
                        code: "GG"
                    },
                    {
                        name: "Guinea",
                        code: "GN"
                    },
                    {
                        name: "Guinea-Bissau",
                        code: "GW"
                    },
                    {
                        name: "Guyana",
                        code: "GY"
                    },
                    {
                        name: "Haiti",
                        code: "HT"
                    },
                    {
                        name: "Heard Island and Mcdonald Islands",
                        code: "HM"
                    },
                    {
                        name: "Holy See (Vatican City State)",
                        code: "VA"
                    },
                    {
                        name: "Honduras",
                        code: "HN"
                    },
                    {
                        name: "Hong Kong",
                        code: "HK"
                    },
                    {
                        name: "Hungary",
                        code: "HU"
                    },
                    {
                        name: "Iceland",
                        code: "IS"
                    },
                    {
                        name: "India",
                        code: "IN"
                    },
                    {
                        name: "Indonesia",
                        code: "ID"
                    },
                    {
                        name: "Iran, Islamic Republic Of",
                        code: "IR"
                    },
                    {
                        name: "Iraq",
                        code: "IQ"
                    },
                    {
                        name: "Ireland",
                        code: "IE"
                    },
                    {
                        name: "Isle of Man",
                        code: "IM"
                    },
                    {
                        name: "Israel",
                        code: "IL"
                    },
                    {
                        name: "Italy",
                        code: "IT"
                    },
                    {
                        name: "Jamaica",
                        code: "JM"
                    },
                    {
                        name: "Japan",
                        code: "JP"
                    },
                    {
                        name: "Jersey",
                        code: "JE"
                    },
                    {
                        name: "Jordan",
                        code: "JO"
                    },
                    {
                        name: "Kazakhstan",
                        code: "KZ"
                    },
                    {
                        name: "Kenya",
                        code: "KE"
                    },
                    {
                        name: "Kiribati",
                        code: "KI"
                    },
                    {
                        name: "Korea, Democratic People's Republic of",
                        code: "KP"
                    },
                    {
                        name: "Korea, Republic of",
                        code: "KR"
                    },
                    {
                        name: "Kuwait",
                        code: "KW"
                    },
                    {
                        name: "Kyrgyzstan",
                        code: "KG"
                    },
                    {
                        name: "Lao People's Democratic Republic",
                        code: "LA"
                    },
                    {
                        name: "Latvia",
                        code: "LV"
                    },
                    {
                        name: "Lebanon",
                        code: "LB"
                    },
                    {
                        name: "Lesotho",
                        code: "LS"
                    },
                    {
                        name: "Liberia",
                        code: "LR"
                    },
                    {
                        name: "Libyan Arab Jamahiriya",
                        code: "LY"
                    },
                    {
                        name: "Liechtenstein",
                        code: "LI"
                    },
                    {
                        name: "Lithuania",
                        code: "LT"
                    },
                    {
                        name: "Luxembourg",
                        code: "LU"
                    },
                    {
                        name: "Macao",
                        code: "MO"
                    },
                    {
                        name: "Macedonia, The Former Yugoslav Republic of",
                        code: "MK"
                    },
                    {
                        name: "Madagascar",
                        code: "MG"
                    },
                    {
                        name: "Malawi",
                        code: "MW"
                    },
                    {
                        name: "Malaysia",
                        code: "MY"
                    },
                    {
                        name: "Maldives",
                        code: "MV"
                    },
                    {
                        name: "Mali",
                        code: "ML"
                    },
                    {
                        name: "Malta",
                        code: "MT"
                    },
                    {
                        name: "Marshall Islands",
                        code: "MH"
                    },
                    {
                        name: "Martinique",
                        code: "MQ"
                    },
                    {
                        name: "Mauritania",
                        code: "MR"
                    },
                    {
                        name: "Mauritius",
                        code: "MU"
                    },
                    {
                        name: "Mayotte",
                        code: "YT"
                    },
                    {
                        name: "Mexico",
                        code: "MX"
                    },
                    {
                        name: "Micronesia, Federated States of",
                        code: "FM"
                    },
                    {
                        name: "Moldova, Republic of",
                        code: "MD"
                    },
                    {
                        name: "Monaco",
                        code: "MC"
                    },
                    {
                        name: "Mongolia",
                        code: "MN"
                    },
                    {
                        name: "Montserrat",
                        code: "MS"
                    },
                    {
                        name: "Morocco",
                        code: "MA"
                    },
                    {
                        name: "Mozambique",
                        code: "MZ"
                    },
                    {
                        name: "Myanmar",
                        code: "MM"
                    },
                    {
                        name: "Namibia",
                        code: "NA"
                    },
                    {
                        name: "Nauru",
                        code: "NR"
                    },
                    {
                        name: "Nepal",
                        code: "NP"
                    },
                    {
                        name: "Netherlands",
                        code: "NL"
                    },
                    {
                        name: "Netherlands Antilles",
                        code: "AN"
                    },
                    {
                        name: "New Caledonia",
                        code: "NC"
                    },
                    {
                        name: "New Zealand",
                        code: "NZ"
                    },
                    {
                        name: "Nicaragua",
                        code: "NI"
                    },
                    {
                        name: "Niger",
                        code: "NE"
                    },
                    {
                        name: "Nigeria",
                        code: "NG"
                    },
                    {
                        name: "Niue",
                        code: "NU"
                    },
                    {
                        name: "Norfolk Island",
                        code: "NF"
                    },
                    {
                        name: "Northern Mariana Islands",
                        code: "MP"
                    },
                    {
                        name: "Norway",
                        code: "NO"
                    },
                    {
                        name: "Oman",
                        code: "OM"
                    },
                    {
                        name: "Pakistan",
                        code: "PK"
                    },
                    {
                        name: "Palau",
                        code: "PW"
                    },
                    {
                        name: "Palestinian Territory, Occupied",
                        code: "PS"
                    },
                    {
                        name: "Panama",
                        code: "PA"
                    },
                    {
                        name: "Papua New Guinea",
                        code: "PG"
                    },
                    {
                        name: "Paraguay",
                        code: "PY"
                    },
                    {
                        name: "Peru",
                        code: "PE"
                    },
                    {
                        name: "Philippines",
                        code: "PH"
                    },
                    {
                        name: "Pitcairn",
                        code: "PN"
                    },
                    {
                        name: "Poland",
                        code: "PL"
                    },
                    {
                        name: "Portugal",
                        code: "PT"
                    },
                    {
                        name: "Puerto Rico",
                        code: "PR"
                    },
                    {
                        name: "Qatar",
                        code: "QA"
                    },
                    {
                        name: "Reunion",
                        code: "RE"
                    },
                    {
                        name: "Romania",
                        code: "RO"
                    },
                    {
                        name: "Russian Federation",
                        code: "RU"
                    },
                    {
                        name: "Rwanda",
                        code: "RW"
                    },
                    {
                        name: "Saint Helena",
                        code: "SH"
                    },
                    {
                        name: "Saint Kitts and Nevis",
                        code: "KN"
                    },
                    {
                        name: "Saint Lucia",
                        code: "LC"
                    },
                    {
                        name: "Saint Pierre and Miquelon",
                        code: "PM"
                    },
                    {
                        name: "Saint Vincent and the Grenadines",
                        code: "VC"
                    },
                    {
                        name: "Samoa",
                        code: "WS"
                    },
                    {
                        name: "San Marino",
                        code: "SM"
                    },
                    {
                        name: "Sao Tome and Principe",
                        code: "ST"
                    },
                    {
                        name: "Saudi Arabia",
                        code: "SA"
                    },
                    {
                        name: "Senegal",
                        code: "SN"
                    },
                    {
                        name: "Serbia and Montenegro",
                        code: "CS"
                    },
                    {
                        name: "Seychelles",
                        code: "SC"
                    },
                    {
                        name: "Sierra Leone",
                        code: "SL"
                    },
                    {
                        name: "Singapore",
                        code: "SG"
                    },
                    {
                        name: "Slovakia",
                        code: "SK"
                    },
                    {
                        name: "Slovenia",
                        code: "SI"
                    },
                    {
                        name: "Solomon Islands",
                        code: "SB"
                    },
                    {
                        name: "Somalia",
                        code: "SO"
                    },
                    {
                        name: "South Africa",
                        code: "ZA"
                    },
                    {
                        name: "South Georgia and the South Sandwich Islands",
                        code: "GS"
                    },
                    {
                        name: "Spain",
                        code: "ES"
                    },
                    {
                        name: "Sri Lanka",
                        code: "LK"
                    },
                    {
                        name: "Sudan",
                        code: "SD"
                    },
                    {
                        name: "Suriname",
                        code: "SR"
                    },
                    {
                        name: "Svalbard and Jan Mayen",
                        code: "SJ"
                    },
                    {
                        name: "Swaziland",
                        code: "SZ"
                    },
                    {
                        name: "Sweden",
                        code: "SE"
                    },
                    {
                        name: "Switzerland",
                        code: "CH"
                    },
                    {
                        name: "Syrian Arab Republic",
                        code: "SY"
                    },
                    {
                        name: "Taiwan, Province of China",
                        code: "TW"
                    },
                    {
                        name: "Tajikistan",
                        code: "TJ"
                    },
                    {
                        name: "Tanzania, United Republic of",
                        code: "TZ"
                    },
                    {
                        name: "Thailand",
                        code: "TH"
                    },
                    {
                        name: "Timor-Leste",
                        code: "TL"
                    },
                    {
                        name: "Togo",
                        code: "TG"
                    },
                    {
                        name: "Tokelau",
                        code: "TK"
                    },
                    {
                        name: "Tonga",
                        code: "TO"
                    },
                    {
                        name: "Trinidad and Tobago",
                        code: "TT"
                    },
                    {
                        name: "Tunisia",
                        code: "TN"
                    },
                    {
                        name: "Turkey",
                        code: "TR"
                    },
                    {
                        name: "Turkmenistan",
                        code: "TM"
                    },
                    {
                        name: "Turks and Caicos Islands",
                        code: "TC"
                    },
                    {
                        name: "Tuvalu",
                        code: "TV"
                    },
                    {
                        name: "Uganda",
                        code: "UG"
                    },
                    {
                        name: "Ukraine",
                        code: "UA"
                    },
                    {
                        name: "United Arab Emirates",
                        code: "AE"
                    },
                    {
                        name: "United Kingdom",
                        code: "GB"
                    },
                    {
                        name: "United States",
                        code: "US"
                    },
                    {
                        name: "United States Minor Outlying Islands",
                        code: "UM"
                    },
                    {
                        name: "Uruguay",
                        code: "UY"
                    },
                    {
                        name: "Uzbekistan",
                        code: "UZ"
                    },
                    {
                        name: "Vanuatu",
                        code: "VU"
                    },
                    {
                        name: "Venezuela",
                        code: "VE"
                    },
                    {
                        name: "Vietnam",
                        code: "VN"
                    },
                    {
                        name: "Virgin Islands, British",
                        code: "VG"
                    },
                    {
                        name: "Virgin Islands, U.S.",
                        code: "VI"
                    },
                    {
                        name: "Wallis and Futuna",
                        code: "WF"
                    },
                    {
                        name: "Western Sahara",
                        code: "EH"
                    },
                    {
                        name: "Yemen",
                        code: "YE"
                    },
                    {
                        name: "Zambia",
                        code: "ZM"
                    },
                    {
                        name: "Zimbabwe",
                        code: "ZW"
                    }]
        }),
    angular.module("FullscreenApp", []).directive("fullscreenMode", [function() {
        return {
            restrict: "A",
            template: '<a href="javascript:void(0)" ng-click="toggleFullscreen()" class="expand" id="toggle-fullscreen"> <i class="fa fa-expand fa-lg"></i> </a>',
            controller: function($scope) {
                $scope.toggleFullscreen = function() {
                    $(document).toggleFullScreen(),
                        $("#toggle-fullscreen .fa").toggleClass("fa-expand fa-compress")
                }
            }
        }
    }]).directive("fullscreenWidget", [function() {
        return {
            restrict: "A",
            link: function(scope, element) {
                element.click(function() {
                    var panel = $(this).closest(".panel");
                    panel.toggleClass("widget-fullscreen"),
                        $(this).toggleClass("fa-expand fa-compress"),
                        $("body").toggleClass("fullscreen-widget-active")
                })
            }
        }
    }]);
var App = angular.module("galleryApp", []);
App.controller("galleryCtrl",
    function($scope) {
        $scope.list1 = [{
            src: "images/gallery/image1.png",
            name: "IMG_001.jpg"
        },
            {
                src: "images/gallery/image2.png",
                name: "IMG_002.jpg"
            },
            {
                src: "images/gallery/image3.png",
                name: "IMG_003.jpg"
            },
            {
                src: "images/gallery/image4.png",
                name: "IMG_004.jpg"
            },
            {
                src: "images/gallery/image5.png",
                name: "IMG_005.jpg"
            },
            {
                src: "images/gallery/image1.png",
                name: "IMG_006.jpg"
            },
            {
                src: "images/gallery/image2.png",
                name: "IMG_007.jpg"
            },
            {
                src: "images/gallery/image3.png",
                name: "IMG_008.jpg"
            },
            {
                src: "images/gallery/image4.png",
                name: "IMG_009.jpg"
            },
            {
                src: "images/gallery/image5.png",
                name: "IMG_0010.jpg"
            },
            {
                src: "images/gallery/image1.png",
                name: "IMG_0011.jpg"
            },
            {
                src: "images/gallery/image1.png",
                name: "IMG_0012.jpg"
            },
            {
                src: "images/gallery/image1.png",
                name: "IMG_0013.jpg"
            },
            {
                src: "images/gallery/image1.png",
                name: "IMG_0014.jpg"
            },
            {
                src: "images/gallery/image1.png",
                name: "IMG_0015.jpg"
            },
            {
                src: "images/gallery/image1.png",
                name: "IMG_0016.jpg"
            },
            {
                src: "images/gallery/image1.png",
                name: "IMG_0017.jpg"
            },
            {
                src: "images/gallery/image1.png",
                name: "IMG_0018.jpg"
            },
            {
                src: "images/gallery/image1.png",
                name: "IMG_0019.jpg"
            },
            {
                src: "images/gallery/image1.png",
                name: "IMG_0020.jpg"
            }],
            $scope.checkAll = function() {
                $scope.selectedAll = $scope.selectedAll ? !0 : !1,
                    angular.forEach($scope.list1,
                        function(item) {
                            item.Selected = $scope.selectedAll
                        })
            }
    });
var app;
app = angular.module("inlineedittable", ["ngTable"]).controller("inlineeditCtrl",
    function($scope, $filter, ngTableParams) {
        var data;
        data = [{
            id: 1,
            pn: "product 1",
            ct: "Mens/Footwear",
            qt: "125",
            lm: 138661285100,
            ln: "Smith",
            fn: "John",
            dc: "2/2/2015",
            em: "$245.85",
            ph: "$245.85",
            ac: "On Hold",
            dl: !1
        },
            {
                id: 2,
                pn: "product 2",
                ct: "Mens/Footwear",
                qt: "200",
                lm: 138661285200,
                ln: "Taylor",
                fn: "Lisa",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "Processing",
                dl: !1
            },
            {
                id: 3,
                pn: "product 3",
                ct: "Mens/Footwear",
                qt: "350",
                lm: 138661285300,
                ln: "Jones",
                fn: "James",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "Cancelled",
                dl: !1
            },
            {
                id: 4,
                pn: "product 4",
                ct: "Mens/Footwear",
                qt: "145",
                lm: 138661285400,
                ln: "Wong",
                fn: "Paul",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "Pending",
                dl: !1
            },
            {
                id: 5,
                pn: "product 5",
                ct: "Mens/Footwear",
                qt: "450",
                lm: 138661285500,
                ln: "King",
                fn: "Alice",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "Dispatch",
                dl: !1
            },
            {
                id: 6,
                pn: "product 6",
                ct: "Mens/Footwear",
                qt: "650",
                lm: 138661285600,
                ln: "Brown",
                fn: "Jan",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "On Hold",
                dl: !1
            },
            {
                id: 7,
                pn: "product 7",
                ct: "Mens/Footwear",
                qt: "750",
                lm: 138661285700,
                ln: "Garcia",
                fn: "Ami",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "Processing",
                dl: !1
            },
            {
                id: 8,
                pn: "product 8",
                ct: "Mens/Footwear",
                qt: "856",
                lm: 138661285800,
                ln: "Green",
                fn: "Jack",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "Pending",
                dl: !1
            },
            {
                id: 9,
                pn: "product 9",
                ct: "Mens/Footwear",
                qt: "1425",
                lm: 138661285900,
                ln: "Liesen",
                fn: "Abraham",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "Cancelled",
                dl: !1
            },
            {
                id: 10,
                pn: "product 10",
                ct: "Mens/Footwear",
                qt: "2545",
                lm: 138661286e3,
                ln: "Bower",
                fn: "Angela",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "Processing",
                dl: !1
            },
            {
                id: 11,
                pn: "product 11",
                ct: "Mens/Footwear",
                qt: "4515",
                lm: 138661286100,
                ln: "Davidoff",
                fn: "Fjodor",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "Dispatch",
                dl: !1
            },
            {
                id: 12,
                pn: "product 12",
                ct: "Mens/Footwear",
                qt: "5645",
                lm: 138661286200,
                ln: "Vitrovic",
                fn: "Biljana",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "Dispatch",
                dl: !1
            },
            {
                id: 13,
                pn: "product 13",
                ct: "Mens/Footwear",
                qt: "2315",
                lm: 138661286300,
                ln: "Valet",
                fn: "Guillaume",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "Dispatch",
                dl: !1
            },
            {
                id: 14,
                pn: "product 14",
                ct: "Mens/Footwear",
                qt: "2112",
                lm: 138661286400,
                ln: "Tran",
                fn: "Min",
                dc: "2/2/2015",
                em: "$245.85",
                ph: "$245.85",
                ac: "Pending",
                dl: !1
            }],
            $scope.tableParams = new ngTableParams({
                    page: 1,
                    count: 10
                },
                {
                    total: data.length,
                    getData: function($defer, params) {
                        var orderedData;
                        orderedData = params.sorting() ? $filter("orderBy")(data, params.orderBy()) : data,
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                    }
                }),
            $scope.editId = -1,
            $scope.setEditId = function(pid) {
                $scope.editId = pid
            }
    }),
    function() {
        var app;
        app = angular.module("tablesorting", ["ngTable"]).controller("ngTableCtrl",
            function($scope, $filter, ngTableParams) {
                var data;
                data = [{
                    name: "Moroni",
                    age: 50
                },
                    {
                        name: "Tiancum",
                        age: 43
                    },
                    {
                        name: "Jacob",
                        age: 27
                    },
                    {
                        name: "Nephi",
                        age: 29
                    },
                    {
                        name: "Enos",
                        age: 34
                    },
                    {
                        name: "Tiancum",
                        age: 43
                    },
                    {
                        name: "Jacob",
                        age: 27
                    },
                    {
                        name: "Nephi",
                        age: 29
                    },
                    {
                        name: "Enos",
                        age: 34
                    },
                    {
                        name: "Tiancum",
                        age: 43
                    },
                    {
                        name: "Jacob",
                        age: 27
                    },
                    {
                        name: "Nephi",
                        age: 29
                    },
                    {
                        name: "Enos",
                        age: 34
                    },
                    {
                        name: "Tiancum",
                        age: 43
                    },
                    {
                        name: "Jacob",
                        age: 27
                    },
                    {
                        name: "Nephi",
                        age: 29
                    },
                    {
                        name: "Enos",
                        age: 34
                    }],
                    $scope.tableParams = new ngTableParams({
                            page: 1,
                            count: 10,
                            filter: {
                                name: "M"
                            },
                            sorting: {
                                name: "asc"
                            }
                        },
                        {
                            total: data.length,
                            getData: function($defer, params) {
                                var orderedData;
                                return orderedData = params.sorting() ? $filter("orderBy")(data, params.orderBy()) : data,
                                    orderedData = params.filter() ? $filter("filter")(data, params.filter()) : data,
                                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                            }
                        }),
                    $scope.editId = -1,
                    $scope.setEditId = function(pid) {
                        $scope.editId = pid
                    }
            })
    }.call(this),
    angular.module("app.directives", []).directive("imgHolder", [function() {
        return {
            restrict: "A",
            link: function(scope, ele) {
                return Holder.run({
                    images: ele[0]
                })
            }
        }
    }]).directive("panelToggle", [function() {
        return {
            restrict: "A",
            link: function(scope, element) {
                element.click(function() {
                    $(this).parent().parent().next().slideToggle("fast"),
                        $(this).toggleClass("fa-chevron-down fa-chevron-up")
                })
            }
        }
    }]).directive("widgetClose", [function() {
        return {
            restrict: "A",
            link: function(scope, element) {
                element.click(function() {
                    $(this).parent().parent().parent().fadeOut()
                })
            }
        }
    }]).directive("toggleProfile", [function() {
        return {
            restrict: "A",
            template: '<a href="javascript:void(0)" ng-click="toggleProfile()"> <i class="fa fa-user fa-lg"></i> </a>',
            controller: function($scope) {
                $scope.toggleProfile = function() {
                    $("#settings").slideToggle()
                }
            }
        }
    }]).directive("customPage",
        function() {
            return {
                restrict: "A",
                controller: ["$scope", "$element", "$location",
                    function($scope, $element, $location) {
                        var addBg, path;
                        return path = function() {
                            return $location.path()
                        },
                            addBg = function(path) {
                                switch ($element.removeClass("body-wide body-lock"), path) {
                                    case "/404":
                                    case "/pages/404":
                                    case "/pages/500":
                                    case "/pages/signin":
                                    case "/pages/signup":
                                    case "/pages/forgot-password":
                                        return $element.addClass("body-wide");
                                    case "/pages/lock-screen":
                                        return $element.addClass("body-wide body-lock")
                                }
                            },
                            addBg($location.path()),
                            $scope.$watch(path,
                                function(newVal, oldVal) {
                                    return newVal !== oldVal ? addBg($location.path()) : void 0
                                })
                    }]
            }
        }).directive("rightSidebar", [function() {
        return {
            restrict: "A",
            link: function(scope, element) {
                element.click(function() {
                    $(this).hasClass("open") ? ($(".rsidebar").animate({
                            right: "-250px"
                        },
                        150), $(this).removeClass("open").addClass("closed")) : ($(".rsidebar").animate({
                            right: "0px"
                        },
                        150), $(this).removeClass("closed").addClass("open"))
                })
            }
        }
    }]).directive("toggleSettings", [function() {
        return {
            restrict: "A",
            link: function(scope, element) {
                element.click(function() {
                    $(this).hasClass("open") ? ($("#config").animate({
                            right: "-300px"
                        },
                        150), $(this).removeClass("open").addClass("closed")) : ($("#config").animate({
                            right: "0px"
                        },
                        150), $(this).removeClass("closed").addClass("open"))
                })
            }
        }
    }]).directive("skycon", [function() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                var skycons = new Skycons({
                    color: attrs.color || "#ffffff"
                });
                skycons.add("icon1", Skycons.CLEAR_DAY),
                    skycons.add("icon2", Skycons.PARTLY_CLOUDY_NIGHT),
                    skycons.play()
            }
        }
    }]).directive("goBack", [function() {
        return {
            restrict: "A",
            controller: ["$scope", "$element", "$window",
                function($scope, $element, $window) {
                    return $element.on("click",
                        function() {
                            return $window.history.back()
                        })
                }]
        }
    }]),
    angular.module("app.localization", []).factory("localize", ["$http", "$rootScope", "$window",
        function($http, $rootScope, $window) {
            var localize;
            return localize = {
                language: "",
                resourceFileLoaded: !1,
                successCallback: function(data) {
                    return localize.dictionary = data,
                        localize.resourceFileLoaded = !0,
                        $rootScope.$broadcast("localizeResourcesUpdated")
                },
                setLanguage: function(value) {
                    return localize.language = value.toLowerCase().split("-")[0],
                        localize.initLocalizedResources()
                },
                setUrl: function(value) {
                    return localize.url = value,
                        localize.initLocalizedResources()
                },
                buildUrl: function() {
                    return localize.language || (localize.language = ($window.navigator.userLanguage || $window.navigator.language).toLowerCase(), localize.language = localize.language.split("-")[0]),
                    "/../i18n/resources-locale_" + localize.language + ".js"
                },
                initLocalizedResources: function() {
                    var url;
                    return url = localize.url || localize.buildUrl(),
                        $http({
                            method: "GET",
                            url: url,
                            cache: !1
                        }).success(localize.successCallback).error(function() {
                            return $rootScope.$broadcast("localizeResourcesUpdated")
                        })
                },
                getLocalizedString: function(value) {
                    var result, valueLowerCase;
                    return localize.dictionary && value ? (valueLowerCase = value.toLowerCase(), result = "" === localize.dictionary[valueLowerCase] ? value: localize.dictionary[valueLowerCase]) : result = value,
                        result
                }
            }
        }]).directive("i18n", ["localize",
        function(localize) {
            var i18nDirective;
            return i18nDirective = {
                restrict: "EA",
                updateText: function(ele, input, placeholder) {
                    var result;
                    return result = void 0,
                        result = void 0,
                        "i18n-placeholder" === input ? (result = localize.getLocalizedString(placeholder), ele.attr("placeholder", result)) : input.length >= 1 ? (result = localize.getLocalizedString(input), ele.text(result)) : void 0
                },
                link: function(scope, ele, attrs) {
                    return scope.$on("localizeResourcesUpdated",
                        function() {
                            return i18nDirective.updateText(ele, attrs.i18n, attrs.placeholder)
                        }),
                        attrs.$observe("i18n",
                            function(value) {
                                return i18nDirective.updateText(ele, value, attrs.placeholder)
                            })
                }
            }
        }]).controller("LangCtrl", ["$scope", "localize",
        function($scope, localize) {
            localize.setLanguage("ZH-CN");
            return $scope.lang = "中文",
                $scope.setLang = function(lang) {
                    switch (lang) {
                        case "English":
                            localize.setLanguage("EN-US");
                            break;
                        case "Deutsch":
                            localize.setLanguage("DE-DE");
                            break;
                        case "français":
                            localize.setLanguage("FR-FR");
                            break;
                        case "Italiano":
                            localize.setLanguage("IT-IT");
                            break;
                        case "Portugal":
                            localize.setLanguage("PT-BR");
                            break;
                        case "??????? ????":
                            localize.setLanguage("RU-RU");
                            break;
                        case "中文":
                            localize.setLanguage("ZH-ZH");
                            break;
                        default:
                            localize.setLanguage("ZH-CN");
                    }
                    return $scope.lang = lang
                }
        }]),
    angular.module("app.controllers", ["angular-loading-bar", "ngTable"]).config(["cfpLoadingBarProvider",
        function(cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = !1
        }]).controller("AppCtrl", ["$scope", "$rootScope",
        function($scope) {
            var $window;
            $window = $(window),
                $scope.main = {
                    brand: "AdminPro",
                    name: "P Square Design"
                },
                $scope.admin = {
                    layout: !1,
                    menu: !1,
                    fixedHeader: !0,
                    fixedSidebar: !0,
                    themeID: "11",
                    navbarHeaderColor: "bg-dark",
                    logo: "bg-dark",
                    asideColor: "bg-white"
                },
                $scope.color = {
                    primary: "#248AAF",
                    success: "#3CBC8D",
                    info: "#29B7D3",
                    purple: "#7266ba",
                    warning: "#FAC552",
                    danger: "#E9422E"
                },
                $scope.initWaves = function() {
                    Waves.displayEffect()
                }
        }]).controller("HeaderCtrl", ["$scope",
        function() {}]).controller("NavContainerCtrl", ["$scope",
        function() {}]).controller("NavCtrl", ["$scope", "taskStorage", "filterFilter",
        function($scope, taskStorage, filterFilter) {
            var tasks;
            return tasks = $scope.tasks = taskStorage.get(),
                $scope.taskRemainingCount = filterFilter(tasks, {
                    completed: !1
                }).length,
                $scope.$on("taskRemaining:changed",
                    function(event, count) {
                        return $scope.taskRemainingCount = count
                    })
        }]),
    angular.module("app.nav", []).directive("toggleNavCollapsedMin", ["$rootScope",
        function($rootScope) {
            return {
                restrict: "A",
                link: function(scope, ele) {
                    var app;
                    return app = $("#app"),
                        ele.on("click",
                            function(e) {
                                return app.hasClass("nav-collapsed-min") ? app.removeClass("nav-collapsed-min") : (app.addClass("nav-collapsed-min"), $rootScope.$broadcast("nav:reset")),
                                    e.preventDefault()
                            })
                }
            }
        }]).directive("collapseNav", [function() {
        return {
            restrict: "A",
            link: function(scope, ele) {
                var $a, $aRest, $app, $lists, $listsRest, $nav, $window, prevWidth, updateClass;
                return $window = $(window),
                    $lists = ele.find("ul").parent("li"),
                    $a = $lists.children("a"),
                    $listsRest = ele.children("li").not($lists),
                    $aRest = $listsRest.children("a"),
                    $app = $("#app"),
                    $nav = $("#nav-container"),
                    $a.on("click",
                        function(event) {
                            var $parent, $this;
                            return $app.hasClass("nav-collapsed-min") || $nav.hasClass("nav-horizontal") && $window.width() >= 768 ? !1 : ($this = $(this), $parent = $this.parent("li"), $lists.not($parent).removeClass("open").find("ul").slideUp(), $parent.toggleClass("open").find("ul").slideToggle(), event.preventDefault())
                        }),
                    $aRest.on("click",
                        function() {
                            return $lists.removeClass("open").find("ul").slideUp()
                        }),
                    scope.$on("nav:reset",
                        function() {
                            return $lists.removeClass("open").find("ul").slideUp()
                        }),
                    prevWidth = $window.width(),
                    updateClass = function() {
                        var currentWidth;
                        return currentWidth = $window.width(),
                        768 > currentWidth && $app.removeClass("nav-collapsed-min"),
                        768 > prevWidth && currentWidth >= 768 && $nav.hasClass("nav-horizontal") && $lists.removeClass("open").find("ul").slideUp(),
                            prevWidth = currentWidth
                    },
                    $window.resize(function() {
                        var t;
                        return clearTimeout(t),
                            t = setTimeout(updateClass, 300)
                    })
            }
        }
    }]).directive("toggleOffCanvas", [function() {
        return {
            restrict: "A",
            link: function(scope, ele) {
                return ele.on("click",
                    function() {
                        return $("#app").toggleClass("on-canvas")
                    })
            }
        }
    }]),
    angular.module("slick", []).directive("slick",
        function($timeout) {
            return {
                restrict: "AEC",
                scope: {
                    initOnload: "=",
                    data: "=",
                    currentIndex: "=",
                    accessibility: "@",
                    adaptiveHeight: "@",
                    arrows: "@",
                    asNavFor: "@",
                    appendArrows: "@",
                    appendDots: "@",
                    autoplay: "@",
                    autoplaySpeed: "@",
                    centerMode: "@",
                    centerPadding: "@",
                    cssEase: "@",
                    customPaging: "&",
                    dots: "@",
                    draggable: "@",
                    easing: "@",
                    fade: "@",
                    focusOnSelect: "@",
                    infinite: "@",
                    initialSlide: "@",
                    lazyLoad: "@",
                    onBeforeChange: "&",
                    onAfterChange: "&",
                    onInit: "&",
                    onReInit: "&",
                    onSetPosition: "&",
                    pauseOnHover: "@",
                    pauseOnDotsHover: "@",
                    responsive: "@",
                    rtl: "@",
                    slide: "@",
                    slidesToShow: "@",
                    slidesToScroll: "@",
                    speed: "@",
                    swipe: "@",
                    swipeToSlide: "@",
                    touchMove: "@",
                    touchThreshold: "@",
                    useCSS: "@",
                    variableWidth: "@",
                    vertical: "@",
                    prevArrow: "@",
                    nextArrow: "@"
                },
                link: function(scope, element, attrs) {
                    var destroySlick, initializeSlick, isInitialized;
                    return destroySlick = function() {
                        return $timeout(function() {
                            var slider;
                            return slider = $(element),
                                slider.unslick(),
                                slider.find(".slick-list").remove(),
                                slider
                        })
                    },
                        initializeSlick = function() {
                            return $timeout(function() {
                                var currentIndex, slider;
                                return slider = $(element),
                                null != scope.currentIndex && (currentIndex = scope.currentIndex),
                                    slider.slick({
                                        accessibility: "false" !== scope.accessibility,
                                        adaptiveHeight: "true" === scope.adaptiveHeight,
                                        arrows: "false" !== scope.arrows,
                                        asNavFor: scope.asNavFor ? scope.asNavFor: void 0,
                                        appendArrows: $(scope.appendArrows ? scope.appendArrows: element),
                                        appendDots: $(scope.appendDots ? scope.appendDots: element),
                                        autoplay: "true" === scope.autoplay,
                                        autoplaySpeed: null != scope.autoplaySpeed ? parseInt(scope.autoplaySpeed, 10) : 3e3,
                                        centerMode: "true" === scope.centerMode,
                                        centerPadding: scope.centerPadding || "50px",
                                        cssEase: scope.cssEase || "ease",
                                        customPaging: attrs.customPaging ? scope.customPaging: void 0,
                                        dots: "true" === scope.dots,
                                        draggable: "false" !== scope.draggable,
                                        easing: scope.easing || "linear",
                                        fade: "true" === scope.fade,
                                        focusOnSelect: "true" === scope.focusOnSelect,
                                        infinite: "false" !== scope.infinite,
                                        initialSlide: scope.initialSlide || 0,
                                        lazyLoad: scope.lazyLoad || "ondemand",
                                        onBeforeChange: attrs.onBeforeChange ? scope.onBeforeChange: void 0,
                                        onAfterChange: function(sl, index) {
                                            return attrs.onAfterChange && scope.onAfterChange(),
                                                null != currentIndex ? scope.$apply(function() {
                                                    return currentIndex = index,
                                                        scope.currentIndex = index
                                                }) : void 0
                                        },
                                        onInit: function(sl) {
                                            return attrs.onInit && scope.onInit(),
                                                null != currentIndex ? sl.slideHandler(currentIndex) : void 0
                                        },
                                        onReInit: attrs.onReInit ? scope.onReInit: void 0,
                                        onSetPosition: attrs.onSetPosition ? scope.onSetPosition: void 0,
                                        pauseOnHover: "false" !== scope.pauseOnHover,
                                        responsive: scope.responsive || void 0,
                                        rtl: "true" === scope.rtl,
                                        slide: scope.slide || "div",
                                        slidesToShow: null != scope.slidesToShow ? parseInt(scope.slidesToShow, 10) : 1,
                                        slidesToScroll: null != scope.slidesToScroll ? parseInt(scope.slidesToScroll, 10) : 1,
                                        speed: null != scope.speed ? parseInt(scope.speed, 10) : 300,
                                        swipe: "false" !== scope.swipe,
                                        swipeToSlide: "true" === scope.swipeToSlide,
                                        touchMove: "false" !== scope.touchMove,
                                        touchThreshold: scope.touchThreshold ? parseInt(scope.touchThreshold, 10) : 5,
                                        useCSS: "false" !== scope.useCSS,
                                        variableWidth: "true" === scope.variableWidth,
                                        vertical: "true" === scope.vertical,
                                        prevArrow: scope.prevArrow ? $(scope.prevArrow) : void 0,
                                        nextArrow: scope.nextArrow ? $(scope.nextArrow) : void 0
                                    }),
                                    scope.$watch("currentIndex",
                                        function(newVal) {
                                            return null != currentIndex && null != newVal && newVal !== currentIndex ? slider.slickGoTo(newVal) : void 0
                                        })
                            })
                        },
                        scope.initOnload ? (isInitialized = !1, scope.$watch("data",
                            function(newVal) {
                                return null != newVal ? (isInitialized && destroySlick(), initializeSlick(), isInitialized = !0) : void 0
                            })) : initializeSlick()
                }
            }
        }),
    angular.module("app.tables", []).controller("tableCtrl", ["$scope", "$filter",
        function($scope, $filter) {
            var init;
            return $scope.stores = [{
                name: "Nijiya Market",
                price: "$$",
                sales: 292,
                rating: 4
            },
                {
                    name: "Eat On Monday Truck",
                    price: "$",
                    sales: 119,
                    rating: 4.3
                },
                {
                    name: "Tea Era",
                    price: "$",
                    sales: 874,
                    rating: 4
                },
                {
                    name: "Rogers Deli",
                    price: "$",
                    sales: 347,
                    rating: 4.2
                },
                {
                    name: "MoBowl",
                    price: "$$$",
                    sales: 24,
                    rating: 4.6
                },
                {
                    name: "The Milk Pail Market",
                    price: "$",
                    sales: 543,
                    rating: 4.5
                },
                {
                    name: "Nob Hill Foods",
                    price: "$$",
                    sales: 874,
                    rating: 4
                },
                {
                    name: "Scratch",
                    price: "$$$",
                    sales: 643,
                    rating: 3.6
                },
                {
                    name: "Gochi Japanese Fusion Tapas",
                    price: "$$$",
                    sales: 56,
                    rating: 4.1
                },
                {
                    name: "Cost Plus World Market",
                    price: "$$",
                    sales: 79,
                    rating: 4
                },
                {
                    name: "Bumble Bee Health Foods",
                    price: "$$",
                    sales: 43,
                    rating: 4.3
                },
                {
                    name: "Costco",
                    price: "$$",
                    sales: 219,
                    rating: 3.6
                },
                {
                    name: "Red Rock Coffee Co",
                    price: "$",
                    sales: 765,
                    rating: 4.1
                },
                {
                    name: "99 Ranch Market",
                    price: "$",
                    sales: 181,
                    rating: 3.4
                },
                {
                    name: "Mi Pueblo Food Center",
                    price: "$",
                    sales: 78,
                    rating: 4
                },
                {
                    name: "Cucina Venti",
                    price: "$$",
                    sales: 163,
                    rating: 3.3
                },
                {
                    name: "Sufi Coffee Shop",
                    price: "$",
                    sales: 113,
                    rating: 3.3
                },
                {
                    name: "Dana Street Roasting",
                    price: "$",
                    sales: 316,
                    rating: 4.1
                },
                {
                    name: "Pearl Cafe",
                    price: "$",
                    sales: 173,
                    rating: 3.4
                },
                {
                    name: "Posh Bagel",
                    price: "$",
                    sales: 140,
                    rating: 4
                },
                {
                    name: "Artisan Wine Depot",
                    price: "$$",
                    sales: 26,
                    rating: 4.1
                },
                {
                    name: "Hong Kong Chinese Bakery",
                    price: "$",
                    sales: 182,
                    rating: 3.4
                },
                {
                    name: "Starbucks",
                    price: "$$",
                    sales: 97,
                    rating: 3.7
                },
                {
                    name: "Tapioca Express",
                    price: "$",
                    sales: 301,
                    rating: 3
                },
                {
                    name: "House of Bagels",
                    price: "$",
                    sales: 82,
                    rating: 4.4
                }],
                $scope.searchKeywords = "",
                $scope.filteredStores = [],
                $scope.row = "",
                $scope.select = function(page) {
                    var end, start;
                    return start = (page - 1) * $scope.numPerPage,
                        end = start + $scope.numPerPage,
                        $scope.currentPageStores = $scope.filteredStores.slice(start, end)
                },
                $scope.onFilterChange = function() {
                    return $scope.select(1),
                        $scope.currentPage = 1,
                        $scope.row = ""
                },
                $scope.onNumPerPageChange = function() {
                    return $scope.select(1),
                        $scope.currentPage = 1
                },
                $scope.onOrderChange = function() {
                    return $scope.select(1),
                        $scope.currentPage = 1
                },
                $scope.search = function() {
                    return $scope.filteredStores = $filter("filter")($scope.stores, $scope.searchKeywords),
                        $scope.onFilterChange()
                },
                $scope.order = function(rowName) {
                    return $scope.row !== rowName ? ($scope.row = rowName, $scope.filteredStores = $filter("orderBy")($scope.stores, rowName), $scope.onOrderChange()) : void 0
                },
                $scope.numPerPageOpt = [3, 5, 10, 20],
                $scope.numPerPage = $scope.numPerPageOpt[2],
                $scope.currentPage = 1,
                $scope.currentPageStores = [],
                (init = function() {
                    return $scope.search(),
                        $scope.select($scope.currentPage)
                })()
        }]),
    angular.module("app.task", []).factory("taskStorage",
        function() {
            var DEMO_TASKS, STORAGE_ID;
            return STORAGE_ID = "tasks",
                DEMO_TASKS = '[ {"title": "Finish homework", "completed": true}, {"title": "Try Google glass", "completed": false}, {"title": "Make a call", "completed": true}, {"title": "Build a snowman :)", "completed": false}, {"title": "Apply for monster university!", "completed": false}, {"title": "Play games with friends", "completed": true}, {"title": "Learn Swift", "completed": false}, {"title": "Shopping", "completed": false} ]',
                {
                    get: function() {
                        return JSON.parse(localStorage.getItem(STORAGE_ID) || DEMO_TASKS)
                    },
                    put: function(tasks) {
                        return localStorage.setItem(STORAGE_ID, JSON.stringify(tasks))
                    }
                }
        }).directive("taskFocus", ["$timeout",
        function($timeout) {
            return {
                link: function(scope, ele, attrs) {
                    return scope.$watch(attrs.taskFocus,
                        function(newVal) {
                            return newVal ? $timeout(function() {
                                    return ele[0].focus()
                                },
                                0, !1) : void 0
                        })
                }
            }
        }]).controller("taskCtrl", ["$scope", "taskStorage", "filterFilter", "$rootScope",
        function($scope, taskStorage, filterFilter, $rootScope) {
            var tasks;
            return tasks = $scope.tasks = taskStorage.get(),
                $scope.newTask = "",
                $scope.remainingCount = filterFilter(tasks, {
                    completed: !1
                }).length,
                $scope.editedTask = null,
                $scope.statusFilter = {
                    completed: !1
                },
                $scope.filter = function(filter) {
                    switch (filter) {
                        case "all":
                            return $scope.statusFilter = "";
                        case "active":
                            return $scope.statusFilter = {
                                completed: !1
                            };
                        case "completed":
                            return $scope.statusFilter = {
                                completed: !0
                            }
                    }
                },
                $scope.add = function() {
                    var newTask;
                    return newTask = $scope.newTask.trim(),
                        0 !== newTask.length ? (tasks.push({
                            title: newTask,
                            completed: !1
                        }), logger.logSuccess('New task: "' + newTask + '" added'), taskStorage.put(tasks), $scope.newTask = "", $scope.remainingCount++) : void 0
                },
                $scope.edit = function(task) {
                    return $scope.editedTask = task
                },
                $scope.doneEditing = function(task) {
                    return $scope.editedTask = null,
                        task.title = task.title.trim(),
                        task.title ? logger.log("Task updated") : $scope.remove(task),
                        taskStorage.put(tasks)
                },
                $scope.remove = function(task) {
                    var index;
                    return $scope.remainingCount -= task.completed ? 0 : 1,
                        index = $scope.tasks.indexOf(task),
                        $scope.tasks.splice(index, 1),
                        taskStorage.put(tasks),
                        logger.logError("Task removed")
                },
                $scope.completed = function(task) {
                    return $scope.remainingCount += task.completed ? -1 : 1,
                        taskStorage.put(tasks),
                        task.completed ? $scope.remainingCount > 0 ? logger.log(1 === $scope.remainingCount ? "Almost there! Only " + $scope.remainingCount + " task left": "Good job! Only " + $scope.remainingCount + " tasks left") : logger.logSuccess("Congrats! All done :)") : void 0
                },
                $scope.clearCompleted = function() {
                    return $scope.tasks = tasks = tasks.filter(function(val) {
                        return ! val.completed
                    }),
                        taskStorage.put(tasks)
                },
                $scope.markAll = function(completed) {
                    return tasks.forEach(function(task) {
                        return task.completed = completed
                    }),
                        $scope.remainingCount = completed ? 0 : tasks.length,
                        taskStorage.put(tasks),
                        completed ? logger.logSuccess("Congrats! All done :)") : void 0
                },
                $scope.$watch("remainingCount == 0",
                    function(val) {
                        return $scope.allChecked = val
                    }),
                $scope.$watch("remainingCount",
                    function(newVal) {
                        return $rootScope.$broadcast("taskRemaining:changed", newVal)
                    })
        }]),
    angular.module("TodoApp", []).controller("TodoCtrl", ["$scope",
        function($scope) {
            $scope.todos = [{
                text: "To-Do List ",
                done: !0
            },
                {
                    text: "To-Do List 2",
                    done: !1
                },
                {
                    text: "To-Do List 3",
                    done: !1
                }],
                $scope.addTodo = function() {
                    $scope.todos.push({
                        text: $scope.todoText,
                        done: !1
                    }),
                        $scope.todoText = ""
                },
                $scope.remaining = function() {
                    var count;
                    return count = 0,
                        angular.forEach($scope.todos,
                            function(todo) {
                                count += todo.done ? 0 : 1
                            }),
                        count
                },
                $scope.archive = function() {
                    var oldTodos;
                    oldTodos = $scope.todos,
                        $scope.todos = [],
                        angular.forEach(oldTodos,
                            function(todo) {
                                todo.done || $scope.todos.push(todo)
                            })
                }
        }]),
    angular.module("app.ui.jvectormap", []).directive("uiJvectormap", [function() {
        return {
            restrict: "A",
            scope: {
                options: "="
            },
            link: function(scope, ele) {
                var options;
                return options = scope.options,
                    ele.vectorMap(options)
            }
        }
    }]).controller("jvectormapCtrl", ["$scope",
        function($scope) {
            var world_marker_data;
            return world_marker_data = [{
                latLng: [41.9, 12.45],
                name: "Vatican City"
            },
                {
                    latLng: [55.75, 37.61],
                    name: "Moscow"
                },
                {
                    latLng: [52.52, 13.4],
                    name: "Berlin"
                },
                {
                    latLng: [37.77, -122.41],
                    name: "San Francisco"
                },
                {
                    latLng: [3.2, 73.22],
                    name: "Maldives"
                },
                {
                    latLng: [32.71, -117.16],
                    name: "San Diego"
                },
                {
                    latLng: [40.71, -74],
                    name: "New York"
                },
                {
                    latLng: [47.6, -122.33],
                    name: "Seattle"
                },
                {
                    latLng: [1.3, 103.8],
                    name: "Singapore"
                },
                {
                    latLng: [41.87, -87.62],
                    name: "Chicago"
                },
                {
                    latLng: [26.02, 50.55],
                    name: "Bahrain"
                },
                {
                    latLng: [43.73, 7.41],
                    name: "Monaco"
                },
                {
                    latLng: [ - .52, 166.93],
                    name: "Nauru"
                },
                {
                    latLng: [ - 8.51, 179.21],
                    name: "Tuvalu"
                },
                {
                    latLng: [43.93, 12.46],
                    name: "San Marino"
                },
                {
                    latLng: [47.14, 9.52],
                    name: "Liechtenstein"
                },
                {
                    latLng: [40.71, -74],
                    name: "New York"
                },
                {
                    latLng: [29.76, -95.36],
                    name: "Houston"
                },
                {
                    latLng: [1.46, 173.03],
                    name: "Kiribati"
                },
                {
                    latLng: [ - 21.13, -175.2],
                    name: "Tonga"
                },
                {
                    latLng: [15.3, -61.38],
                    name: "Dominica"
                }],
                $scope.Jvusamap = {
                    map: "us_aea_en",
                    zoomButtons: !1,
                    markers: world_marker_data,
                    normalizeFunction: "polynomial",
                    regionsSelectable: !0,
                    markersSelectable: !0,
                    backgroundColor: "#ffffff",
                    scaleColors: ["#C8EEFF", "#0071A4"],
                    zoomOnScroll: !1,
                    hoverOpacity: .7,
                    hoverColor: !1,
                    markerStyle: {
                        initial: {
                            fill: "#fad733"
                        },
                        selected: {
                            fill: "#ffffff"
                        }
                    },
                    regionStyle: {
                        initial: {
                            fill: "#23b7e5"
                        },
                        selected: {
                            fill: "#27c24c"
                        }
                    },
                    series: {
                        markers: [{
                            attribute: "r",
                            scale: [5, 15],
                            values: [187.7, 255.16, 310.69, 605.17, 248.31, 107.35, 217.22]
                        }]
                    },
                    backgroundColor: "#fff",
                    regionsSelectable: !0,
                    markersSelectable: !0,
                    markers: [{
                        latLng: [40.71, -74],
                        name: "New York"
                    },
                        {
                            latLng: [34.05, -118.24],
                            name: "Los Angeles"
                        },
                        {
                            latLng: [41.87, -87.62],
                            name: "Chicago"
                        },
                        {
                            latLng: [29.76, -95.36],
                            name: "Houston"
                        },
                        {
                            latLng: [39.95, -75.16],
                            name: "Philadelphia"
                        },
                        {
                            latLng: [38.62, -90.19],
                            name: "St. Louis,MO"
                        },
                        {
                            latLng: [38.9, -77.03],
                            name: "Washington"
                        },
                        {
                            latLng: [37.36, -122.03],
                            name: "Silicon Valley"
                        }]
                },
                $scope.Jvworldmap = {
                    map: "world_mill_en",
                    zoomButtons: !1,
                    markers: world_marker_data,
                    normalizeFunction: "polynomial",
                    regionsSelectable: !0,
                    markersSelectable: !0,
                    backgroundColor: "#ffffff",
                    scaleColors: ["#C8EEFF", "#0071A4"],
                    zoomOnScroll: !1,
                    hoverOpacity: .7,
                    hoverColor: !1,
                    markerStyle: {
                        initial: {
                            fill: "#fad733"
                        },
                        selected: {
                            fill: "#ffffff"
                        }
                    },
                    regionStyle: {
                        initial: {
                            fill: "#23b7e5"
                        },
                        selected: {
                            fill: "#27c24c"
                        }
                    },
                    series: {
                        markers: [{
                            attribute: "r",
                            scale: [5, 15],
                            values: [187.7, 255.16, 310.69, 605.17, 248.31, 107.35, 217.22]
                        }]
                    },
                    backgroundColor: "#fff",
                    regionsSelectable: !0,
                    markersSelectable: !0
                }
        }]),
    angular.module("app.ui.ctrls", []).controller("starrating",
        function($scope) {
            $scope.toggleClass = function($event, className) {
                className = className || "is-open",
                    $($event.target).toggleClass(className)
            }
        }).controller("AlertDemoCtrl", ["$scope",
        function($scope) {
            return $scope.alerts = [{
                type: "success",
                msg: "Well done! You successfully read this important alert message."
            },
                {
                    type: "info",
                    msg: "Heads up! This alert needs your attention, but it is not super important."
                },
                {
                    type: "warning",
                    msg: "Warning! Best check yo self, you're not looking too good."
                },
                {
                    type: "danger",
                    msg: "Oh snap! Change a few things up and try submitting again."
                }],
                $scope.addAlert = function() {
                    var num, type;
                    switch (num = Math.ceil(4 * Math.random())) {
                        case 0:
                            type = "info";
                            break;
                        case 1:
                            type = "success";
                            break;
                        case 2:
                            type = "info";
                            break;
                        case 3:
                            type = "warning";
                            break;
                        case 4:
                            type = "danger"
                    }
                    return $scope.alerts.push({
                        type: type,
                        msg: "Another alert!"
                    })
                },
                $scope.closeAlert = function(index) {
                    return $scope.alerts.splice(index, 1)
                }
        }]).controller("ProgressDemoCtrl", ["$scope",
        function($scope) {
            return $scope.max = 200,
                $scope.random = function() {
                    var type, value;
                    value = Math.floor(100 * Math.random() + 10),
                        type = 25 > value ? "success": 50 > value ? "info": 75 > value ? "warning": "danger",
                        $scope.showWarning = "danger" === type || "warning" === type,
                        $scope.dynamic = value,
                        $scope.type = type
                },
                $scope.random()
        }]).controller("AccordionDemoCtrl", ["$scope",
        function($scope) {
            return $scope.oneAtATime = !0,
                $scope.groups = [{
                    title: "Dynamic Group Header - 1",
                    content: "Dynamic Group Body - 1"
                },
                    {
                        title: "Dynamic Group Header - 2",
                        content: "Dynamic Group Body - 2"
                    },
                    {
                        title: "Dynamic Group Header - 3",
                        content: "Dynamic Group Body - 3"
                    }],
                $scope.items = ["Item 1", "Item 2", "Item 3"],
                $scope.status = {
                    isFirstOpen: !0,
                    isFirstDisabled: !1
                },
                $scope.addItem = function() {
                    var newItemNo;
                    newItemNo = $scope.items.length + 1,
                        $scope.items.push("Item " + newItemNo)
                }
        }]).controller("CollapseDemoCtrl", ["$scope",
        function($scope) {
            return $scope.isCollapsed = !1
        }]).controller("ModalDemoCtrl", ["$scope", "$modal", "$log",
        function($scope, $modal, $log) {
            return $scope.items = ["item1", "item2", "item3"],
                $scope.open = function() {
                    var modalInstance;
                    modalInstance = $modal.open({
                        templateUrl: "myModalContent.html",
                        controller: "ModalInstanceCtrl",
                        resolve: {
                            items: function() {
                                return $scope.items
                            }
                        }
                    }),
                        modalInstance.result.then(function(selectedItem) {
                                $scope.selected = selectedItem
                            },
                            function() {
                                $log.info("Modal dismissed at: " + new Date)
                            })
                }
        }]).controller("ModalInstanceCtrl", ["$scope", "$modalInstance", "items",
        function($scope, $modalInstance, items) {
            return $scope.items = items,
                $scope.selected = {
                    item: $scope.items[0]
                },
                $scope.ok = function() {
                    $modalInstance.close($scope.selected.item)
                },
                $scope.cancel = function() {
                    $modalInstance.dismiss("cancel")
                }
        }]).controller("PaginationDemoCtrl", ["$scope",
        function($scope) {
            return $scope.totalItems = 64,
                $scope.currentPage = 4,
                $scope.setPage = function(pageNo) {
                    return $scope.currentPage = pageNo
                },
                $scope.maxSize = 5,
                $scope.bigTotalItems = 175,
                $scope.bigCurrentPage = 1
        }]).controller("TabsDemoCtrl",
        function($scope) {
            $scope.tabs = [{
                title: "Dynamic Title 1",
                content: "Dynamic content 1"
            },
                {
                    title: "Dynamic Title 2",
                    content: "Dynamic content 2",
                    disabled: !0
                }]
        }).controller("TreeDemoCtrl", ["$scope",
        function($scope) {
            return $scope.list = [{
                id: 1,
                title: "Item 1",
                items: []
            },
                {
                    id: 2,
                    title: "Item 2",
                    items: [{
                        id: 21,
                        title: "Item 2.1",
                        items: [{
                            id: 211,
                            title: "Item 2.1.1",
                            items: []
                        },
                            {
                                id: 212,
                                title: "Item 2.1.2",
                                items: []
                            }]
                    },
                        {
                            id: 22,
                            title: "Item 2.2",
                            items: [{
                                id: 221,
                                title: "Item 2.2.1",
                                items: []
                            },
                                {
                                    id: 222,
                                    title: "Item 2.2.2",
                                    items: []
                                }]
                        }]
                },
                {
                    id: 3,
                    title: "Item 3",
                    items: []
                },
                {
                    id: 4,
                    title: "Item 4",
                    items: [{
                        id: 41,
                        title: "Item 4.1",
                        items: []
                    }]
                }],
                $scope.selectedItem = {},
                $scope.options = {},
                $scope.remove = function(scope) {
                    scope.remove()
                },
                $scope.toggle = function(scope) {
                    scope.toggle()
                },
                $scope.newSubItem = function(scope) {
                    var nodeData;
                    nodeData = scope.$modelValue,
                        nodeData.items.push({
                            id: 10 * nodeData.id + nodeData.items.length,
                            title: nodeData.title + "." + (nodeData.items.length + 1),
                            items: []
                        })
                }
        }]).controller("MapDemoCtrl", ["$scope", "$http", "$interval",
        function($scope, $http, $interval) {
            var i, markers;
            for (markers = [], i = 0; 8 > i;) markers[i] = new google.maps.Marker({
                title: "Marker: " + i
            }),
                i++;
            return $scope.GenerateMapMarkers = function() {
                var d, lat, lng, loc, numMarkers;
                for (d = new Date, $scope.date = d.toLocaleString(), numMarkers = Math.floor(4 * Math.random()) + 4, i = 0; numMarkers > i;) lat = 43.66 + Math.random() / 100,
                    lng = -79.4103 + Math.random() / 100,
                    loc = new google.maps.LatLng(lat, lng),
                    markers[i].setPosition(loc),
                    markers[i].setMap($scope.map),
                    i++
            },
                $interval($scope.GenerateMapMarkers, 2e3)
        }]).controller("invoiceCtrl", ["$scope", "$window",
        function($scope) {
            return $scope.printInvoice = function() {
                var originalContents, popupWin, printContents;
                return originalContents = void 0,
                    popupWin = void 0,
                    printContents = void 0,
                    printContents = document.getElementById("invoice").innerHTML,
                    originalContents = document.body.innerHTML,
                    popupWin = window.open(),
                    popupWin.document.open(),
                    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /><link rel="stylesheet" type="text/css" href="styles/bootstrap.css" /></head><body onload="window.print()">' + printContents + "</html>"),
                    popupWin.document.close()
            }
        }]),
    angular.module("app.ui.directives", []).directive("uiNotCloseOnClick", [function() {
        return {
            restrict: "A",
            compile: function(ele) {
                return ele.on("click",
                    function(event) {
                        return event.stopPropagation()
                    })
            }
        }
    }]).directive("slimScroll", [function() {
        return {
            restrict: "A",
            link: function(scope, ele, attrs) {
                return ele.slimScroll({
                    height: attrs.scrollHeight || "100%"
                })
            }
        }
    }]),
    app.run(function(editableOptions) {
        editableOptions.theme = "bs3"
    }),
    app.controller("SelectLocalCtrl",
        function($scope, $filter) {
            $scope.user = {
                status: 2
            },
                $scope.statuses = [{
                    value: 1,
                    text: "status1"
                },
                    {
                        value: 2,
                        text: "status2"
                    },
                    {
                        value: 3,
                        text: "status3"
                    },
                    {
                        value: 4,
                        text: "status4"
                    }],
                $scope.showStatus = function() {
                    var selected = $filter("filter")($scope.statuses, {
                        value: $scope.user.status
                    });
                    return $scope.user.status && selected.length ? selected[0].text: "Not set"
                }
        }),
    app.controller("Html5InputsCtrl",
        function($scope) {
            $scope.user = {
                email: "email@example.com",
                tel: "123-45-67",
                number: 29,
                range: 10,
                url: "http://example.com",
                search: "blabla",
                color: "#6a4415",
                date: null,
                time: "12:30",
                datetime: null,
                month: null,
                week: null
            }
        }),
    app.controller("TextareaCtrl",
        function($scope) {
            $scope.user = {
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            }
        }),
    app.controller("CheckboxCtrl",
        function($scope) {
            $scope.user = {
                remember: !0
            }
        }),
    app.controller("TextBtnCtrl",
        function($scope) {
            $scope.user = {
                name: "Awesome user"
            }
        });