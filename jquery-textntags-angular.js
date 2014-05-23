var app = angular.module('texttags', []);

app.directive('texttags', function () {
    return {        
        restrict: 'E',
        scope: { ngModelTags: '=', ngModel: '=' },
        template: '<textarea placeholder="Digite seu post", data-ng-model="ngModel"></textarea>',
        link: function (scope, element, attrs) {
            var target = $(element).find('textarea');
            target.textntags({
                 triggers: {'#': {
                    uniqueTags   : true,
                    syntax       : _.template('#[<%= id %>:<%= type %>:<%= title %>]'),
                    parser       : /(#)\[(\d+):([\w\s\.\-]+):([\w\s@\.,-\/#!$%\^&\*;:{}=\-_`~()]+)\]/gi,
                    parserGroups : {id: 2, type: 3, title: 4},
                }, '@': {
                    uniqueTags   : true,
                    syntax       : _.template('@[<%= title %>](<%= type %>:<%= id %>)'),
                    parser       : /(@)\[([\w\s@\.,-\/#!$%\^&\*;:{}=\-_`~()]+)\]\(([\w\s\.\-]+):(\d+)\)/gi,
                    parserGroups : {id: 4, type: 3, title: 2},
                }},
                onDataRequest: function (mode, query, triggerChar, callback) {

                    var query = query.toLowerCase();
                    var newQuery = '#' + query;

                    var found = _.filter(data[triggerChar], function (item) {
                        var name = '#' + item.name.toLowerCase();
                        return name.indexOf(newQuery) > -1;
                    });

                    callback.call(this, found);
                }
            });            

            target.bind('tagsAdded.textntags', function (e, addedTagsList) {                 
                target.textntags('getTags', function(data) {                    
                    scope.ngModelTags = data;
                    scope.$apply();
                });
            });

             target.bind('tagsRemoved.textntags', function (e, addedTagsList) {                 
                target.textntags('getTags', function(data) {                    
                    scope.ngModelTags = data;
                    scope.$apply();
                });
            });            
        }
    };
});