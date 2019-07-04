angular.module('bergmania.collab').controller('collabAppHeaderController',
        [
            'eventsService', 'collabSignalrService', 'overlayService',
            function(eventsService, collabSignalrService, overlayService) {
                var vm = this;
 
                vm.onlineUsersDialog = null;
                vm.userInfo = collabSignalrService.getUserInfo();
                
                eventsService.on("collab.userInfoUpdated", function (event, userInfo) {
                    vm.userInfo = userInfo;
                });

                vm.toggleOnlineUsers = function () {
                    // Open discard changes overlay
                    var overlay = {
                        "view": "/App_Plugins/Collab/views/overlays/onlineUsers.html",
                        "title": "Online Backoffice Users",
                        "userInfo": vm.userInfo,
                        "clickItem": clickItem,
                        "tableProperties" : [
                            { alias: "url", header: "Url" }  
                        ],
                        "position":"right",
                        close: function() {
                            overlayService.close();
                        }
                    };

                    overlayService.open(overlay);
                };
                
                
                function clickItem(item){
                    var overlay = {
                        "view": "/App_Plugins/Collab/views/overlays/singleOnlineUser.html",
                        "title": item.name,
                        "item": item,
                        "position":"right",
                        "submitButtonLabel" : "Back",
                        submit: function() {
                            vm.toggleOnlineUsers();
                        },
                        close: function() {
                            overlayService.close();
                        }
                    };

                    overlayService.open(overlay);
                }
            }
        ]);

angular.module('bergmania.collab').controller('Collab.contentEditorController',
    [
        'eventsService','collabSignalrService', '$routeParams', 'usersResource',
        function(eventsService, collabSignalrService, $routeParams, usersResource) {
            var vm = this;
            
            updateUsersOnThisPage(collabSignalrService.getUserInfo());
            
            eventsService.on("collab.userInfoUpdated", function (event, userInfo) {
                updateUsersOnThisPage(userInfo);
            });
            
            function  updateUsersOnThisPage(userInfo){
                
               
                var usersOnThisPage = [];

                for (var i=0;i<userInfo.length;i++){
                    if(userInfo[i].section === $routeParams.section
                        && userInfo[i].tree === $routeParams.tree
                        && userInfo[i].method === $routeParams.method
                        && userInfo[i].id === $routeParams.id
                    ){
                        usersResource.getUser(userInfo[i].userId).then(function(user){
                            usersOnThisPage.push(user);
                        });
                       
                    }
                }
                console.log("UPDATE", usersOnThisPage);
                vm.userInfo = usersOnThisPage;
            }
        }
    ]);