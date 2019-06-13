var appSchool = angular.module('appSchool', []); 
appSchool.controller('mainCtrl', function($scope) {
    ctrl = this;

    ctrl.sendTicket = function() {
    var data = {};
    $('#signup').find('input').each(function () {
        if (this.name === "phone")
            data[this.name] = String($(this).val()).split('').filter(x => Number(x) + 1 && x !== ' ').join('');
        else
            data[this.name] = $(this).val();
    });
    $.ajax({
        url: '/api/ticket',
        type: 'post',
        data: data,
        success: function () {
            alert('заявка была отправлена успешно');
        },
        error: function () {
            alert('ошибка, повторите отправку заявки');
        }
    });
}

ctrl.dataMiniLoad = function() { 
    $.ajax({
        url: '/api/news/',
        type: 'get',
        data: {count: 4, offset: 0},
        success: function (jsonData) {
            ctrl.newsMiniCount = jsonData.count;
            if (ctrl.newsMiniCount) {
                ctrl.newsMini = jsonData.data;
            }
            $scope.$apply();
        },
        error: function () {
            alert('при загрузке новостей произошла ошибка');
        }
    }); 
}
ctrl.dataMiniLoad();

});

appSchool.controller('newsCtrl', function($scope) {
    ctrl = this;

    ctrl.newsData = [];
    ctrl.counter = 0;
    ctrl.dataLoad = function(page) { 
        $.ajax({
            url: '/api/news/',
            type: 'get',
            data: {count: 20, offset: page},
            success: function (jsonData) {
                for (let i = 0; i < jsonData.data.length; i++)
                    ctrl.newsData.push(jsonData.data[i]);
                $scope.$apply();
            },
            error: function () {
                alert('при загрузке новостей произошла ошибка');
            }
        }); 
    }
    ctrl.dataLoad(0);

    element = $('.footer');

    $(window).scroll(function() {
        var scroll = $(window).scrollTop() + $(window).height();
        var offset = element.offset().top;
        
        if (scroll > offset && ctrl.counter == 0) {
            ctrl.counter = ctrl.counter + 20;
            ctrl.dataLoad(ctrl.counter++);
    }
    });

});

appSchool.controller('itemCtrl', function($scope, $sce) {
    ctrl = this;
    var id = window.location.search.split('=')[1];
    ctrl.dataLoad = function() { 
        $.ajax({
            url: '/api/news/'+id,
            type: 'get',
            success: function (jsonData) {
                ctrl.data = jsonData;
                ctrl.html = $sce.trustAsHtml(jsonData.html);
                $scope.$apply();
            },
            error: function () {
                alert('при загрузке произошла ошибка');
            }
        }); 
    }
    ctrl.dataLoad();
});