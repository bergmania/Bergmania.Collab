var packages = angular.module("bergmania.collab");
packages.run(["collabSignalrService", "eventsService", "$templateRequest", "$compile", "$rootScope", "$routeParams", "$timeout"
    , function(collabSignalrService, eventsService, $templateRequest, $compile, $rootScope, $routeParams, $timeout) {


        function appendTempateToElement(templatePath, element){
            $templateRequest(templatePath).then(function (template) {
                var compiled = $compile(template)($rootScope);
                angular.element(element).append(compiled);
            });
        }

        function afterTempateToElement(templatePath, element){
            $templateRequest(templatePath).then(function (template) {
                var compiled = $compile(template)($rootScope);
                angular.element(element).after(compiled);
            });
        }
    eventsService.on("app.ready", function() {

        appendTempateToElement(
            "/App_Plugins/Collab/views/appHeader/collabAppHeader.html",
            document.getElementsByClassName('umb-app-header__actions')[0]);

    });


     //TODO maybe there exists an event to hock up when the editor is ready
    $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
        
        if($routeParams.section === "content" && $routeParams.tree ==="content" && $routeParams.method ==="edit"){
            $timeout(function () {
                afterTempateToElement("/App_Plugins/Collab/views/contentEditor/collabContentEditorFooter.html", document.getElementsByClassName('umb-editor-footer-content__left-side')[0]);
            }, 1000);
            
        }
       
    });
}]);