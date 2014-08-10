var React = require('react');
var component = require('backbone-react-component');

var TodoView = require('views/todo.jsx');

var share3 = require('commons/share3');

module.exports = React.createClass({

  mixins: [component.mixin],
  
  toggleAllComplete: function(){
    var completed = !this.refs.toggleAllCheckbox.state.checked;
    this.getCollection().each(function(todo){
      todo.save({'completed': completed});
    });
  },
  
  addTodo: function(e){
    if(e.keyCode === 13){
      var title = this.refs.new_todo.getDOMNode().value.trim();
      this.getCollection().add({title: title, completed: false,
                                id: this.getCollection().length + 1});
      this.refs.new_todo.getDOMNode().value = '';
    }
  },
  
  render: function(){
    var todos = this.getCollection().map(function(todo){
      return <TodoView key={todo.get('id')} model={todo} />;
    });

    return (
      <section id="todoapp">
        <header id="header">
          <h1>todos</h1>
          <input id="todonew" placeholder="What needs to be done?" autofocus
                 onKeyPress={this.addTodo} ref="new_todo"/>
        </header>
        <section id="main">            
          <input id="toggle-all" ref="toggleAllCheckbox" type="checkbox" onClick={this.toggleAllComplete} />
          <label htmlFor="toggle-all">Mark all complete</label>
          <ul id="todo-list">
            {todos}
          </ul>
        </section>
        <footer id="footer"></footer>
      </section>
    );
  }
});
