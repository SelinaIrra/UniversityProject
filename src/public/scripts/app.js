var appAdmin = angular.module('appAdmin', ['ngRoute']) 
	.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/adminNews', {
		  templateUrl: 'adminNews.html',
		  controller: 'newsCtrl'
		})
		.when('/adminTicket', {
			templateUrl: 'adminTicket.html',
			controller: 'ticketCtrl'
		  })
		.otherwise({
		  redirectTo: '/admin.html'
		});
	}]);

appAdmin.controller('mainCtrl', function($scope) {});

appAdmin.controller('newsCtrl', function($scope) {
	ctrl = this;
   
    ctrl.dataLoad = function() { 
		$.ajax({
			url: '/api/news/all',
			type: 'get',
			success: function (jsonData) {
				ctrl.data = jsonData;
				$scope.$apply();
			},
			error: function () {
				alert('при загрузке произошла ошибка');
			}
		}); 
	}
	
	ctrl.dataLoad();
	
	ctrl.showBlockUpdateNews = function(i) {
		ctrl.updatedNews = ctrl.data[i].id;
		ctrl.titleBlock = 'Обновление новости';
		$('#inTitle').val(ctrl.data[i].title);
		ctrl.newsImg = ctrl.data[i].image; 
		$('#inHtml').val(ctrl.data[i].html);
		$('#inText').val(ctrl.data[i].text);
		$('#modal').show();
	}

	ctrl.showBlockAddNews = function() {
		ctrl.titleBlock = 'Добавление новости';
		$('#modal').show();
	}

	ctrl.deleteImg = function() {
		ctrl.newsImg = "";
		$('#inImg').val('');
		$('#image').attr('src', '');

	}

	$scope.changeImg = function() {
		let img = document.getElementById('inImg').files;
		if (img.length > 1)
			return alert('To many files');
		if (img.length) {
			let fileReader = new FileReader();
			fileReader.onload = function (fileLoadEvent) {
				ctrl.newsImg = fileLoadEvent.target.result;
				$scope.$apply();
			}
			fileReader.readAsDataURL(img[0])
		}
	} 

	ctrl.closeModal = function() {
		ctrl.updatedNews = null;
		ctrl.newsImg = null; 
		$('#inTitle').val('');
		$('#inImg').val('');
		$('#inHtml').val('');
		$('#inText').val('');
		$('#modal').hide();
	}

	ctrl.save = function() {
		let title = $('#inTitle').val();
		let html = $('#inHtml').val();
		let text = $('#inText').val();
		let img = document.getElementById('inImg').files;
		if (img.length > 1) {
			return alert('To many files');
		}
		if (img.length) {
			img = ctrl.newsImg;
		} else {
			img = null;
		}
		if (ctrl.titleBlock == 'Добавление новости')
			ctrl.addNews(title, img, text, html);
		else 
			ctrl.updateNews(ctrl.updatedNews, title, img, text, html);
		ctrl.closeModal();
	}

	ctrl.deleteNews = function(idNews) {
		$.ajax({
			url: '/api/news',
			type: 'delete',
			data: {id: idNews},
            success: function (jsonData) {
				alert('новость удалена')
                ctrl.dataLoad();
            },
            error: function () {
                alert('новость не удалена');
            }
        }); 
	}
	
	ctrl.updateNews = function(idNews, title, img, text, html) {
		$.ajax({
			url: '/api/news',
			type: 'patch',
			data: {id: idNews, title: title, image: img, html: html, text: text},
            success: function (jsonData) {
				alert('новость обновлена')
                ctrl.dataLoad();
            },
            error: function () {
                alert('новость не обновлена');
            }
        }); 
	}
	
	ctrl.addNews = function(title, img, text, html) {
		$.ajax({
			url: '/api/news',
			type: 'post',
			data: {title: title, image: img, html: html, text: text},
            success: function (jsonData) {
				alert('новость добавлена')
                ctrl.dataLoad();
            },
            error: function () {
                alert('новость не добавлена');
            }
        }); 
	}
});

appAdmin.controller('ticketCtrl', function($scope) {
	ctrl = this;
   
    ctrl.dataLoad = function() { 
        $.ajax({
            url: '/api/ticket',
            type: 'get',
            success: function (jsonData) {
                ctrl.data = jsonData.data;
                $scope.$apply();
            },
            error: function () {
                alert('при загрузке произошла ошибка');
            }
        }); 
    }
	ctrl.dataLoad();
	
	ctrl.deleteTicket = function(idTicket) {
		$.ajax({
			url: '/api/ticket',
			type: 'delete',
			data: {id: idTicket},
            success: function (jsonData) {
				alert('заявка удалена')
                ctrl.dataLoad();
            },
            error: function () {
                alert('заявка не удалена');
            }
        }); 
	}
});
