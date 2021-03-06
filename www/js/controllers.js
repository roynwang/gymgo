angular.module('starter.controllers', ["baiduMap"])

.controller('DashCtrl', function($scope) {
    $scope.updates = [{
        avator: "http://ionicframework.com/img/docs/mcfly.jpg",
        img: "http://ionicframework.com/img/docs/delorean.jpg",
        description: "hahahaha"
    }];
})

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('GymDetailCtrl', function($scope, $stateParams, ResourceProvider) {
    $scope.gymid = $stateParams.gymId;
    ResourceProvider.getres('gym', $scope.gymid, function(data) {
        console.log(JSON.stringify(data));
    });
})

.controller('CoachCtrl', function($scope, $stateParams, ResourceProvider) {
    $scope.coachid = $stateParams.coachid;
    //1.get coach detail
    ResourceProvider.getres('coach', $scope.coachid, function(coach) {
        $scope.coach = coach;
		console.log(coach);
        ResourceProvider.getres('timeline', coach.alias, function(timeline) {
            $scope.timeline = timeline;
			console.log(timeline);
        });
    });
})

.controller('AccountCtrl', ['$scope', '$http', 'Geo', '$ionicModal', '$ionicLoading',
    function($scope, $http, Geo, $ionicModal, $ionicLoading) {
        var longitude = 116.43183;
        var latitude = 39.99274;
        $ionicLoading.show({
            template: '<ion-spinner icon="spiral"></ion-spinner><p style="color:black">定位中</p>',
            //template: '<ion-spinner icon="dots"></ion-spinner>',
            hideOnStageChange: true
        });
        $scope.gymlist = [];
        $scope.curloc = undefined;
        $scope.mapmode = false;
        $scope.loaded = false;

        $scope.toggleDisplayMode = function() {
            $scope.mapmode = !$scope.mapmode;
        }

        $ionicModal.fromTemplateUrl('templates/gym-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        Geo.getloc(function(loc) {
            $scope.curloc = loc;
        });
        Geo.nearby(function(gymlist) {
            $scope.gymlist = gymlist;
            $ionicLoading.hide();
        });
        $scope.markerclickaction = function(gym) {
            if ($scope.gym != gym) {
                $scope.gym = gym;
            }
            $scope.modal.show();
        }
        $scope.mapOptions = {
            center: {
                longitude: longitude,
                latitude: latitude
            },
            zoom: 16,
            city: 'Beijing',
            markers: [],
            markerclick: $scope.markerclickaction
        };
    }
]);
