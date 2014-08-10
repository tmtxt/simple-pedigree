var react = require('react');
var jquery = require('jquery');

var todoView = require('views/todo.jsx');
var todoModel = require('models/todo');

var share1 = require('commons/share1');
share1();

var model = new todoModel({
  title: 'my todo',
  completed: true,
  id: 1
});
var view = todoView({model: model});

react.renderComponent(view, document.getElementById('content'));
