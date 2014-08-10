var index = require('views/index.jsx');

var react = require('react');
var jquery = require('jquery');

var Todos = require('models/todos');

var TodoList = new Todos();
TodoList.add([{title: 'todo 1', completed: false, id: 1},
              {title: 'todo 2', completed: true, id: 2},
              {title: 'todo 3', completed: true, id: 3}]);

react.renderComponent(index({collection: TodoList}), document.getElementById('content'));

require('./log.js');

throw new Exception();
