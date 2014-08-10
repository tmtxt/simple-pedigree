var backbone = require('backbone');

module.exports = backbone.Model.extend({
  defaults: {
    title: '',
    completed: false,
    id: null
  },

  url: '/',

  toggle: function(){
    this.save({
      completed: !this.get('completed')
    });
  }
});
