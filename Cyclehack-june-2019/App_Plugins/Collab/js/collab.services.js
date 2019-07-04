(function () {
    "use strict";

    function collabSignalrService($rootScope, $location, $routeParams, eventsService) {
        var instance = this;

        var initialized = false;
        var lock = false;
        instance.userInfo = [];
        $.connection.collabHub.client.updateOnlineUsers = function (userInfo) {
            instance.userInfo = userInfo;
            eventsService.emit("collab.userInfoUpdated", userInfo);
        };


        function init() {

            if (initialized === false && lock === false) {
                lock = true;

                if (Umbraco.Sys.ServerVariables.isDebuggingEnabled) {
                    $.connection.hub.logging = true;
                }

                $.connection.hub.start();
                initialized = true;
                lock = false;

                $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
                    $.connection.collabHub.server.heartbeat({
                        url: $location.path(),
                        section: $routeParams.section,
                        tree: $routeParams.tree,
                        method: $routeParams.method,
                        id: $routeParams.id
                    });
                });
            }
        };

        init();
        
        return {
            getUserInfo: function getUserInfo(){
                return instance.userInfo;
            }
        };
    }

    angular.module("bergmania.collab").factory("collabSignalrService", collabSignalrService);

})();
