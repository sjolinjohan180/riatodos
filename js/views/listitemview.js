define([
  'underscore',
  'backbone',
  'text!templates/aside-list.html'
], function (_, Backbone, asideList) {

  var ListView = Backbone.View.extend({

    tagName: 'li',

    template: _.template(asideList),

    /**
     * Events.
     */

    events: {
      'click .delete': 'deleteList',
    },

    /**
     * Initalize list view.
     */

    initialize: function () {
       this.listenTo(this.model,"change:tasks",this.render,this);
    },

    /**
     * Render list.
     */

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    /**
     * Delete list.
     */

    deleteList: function (e) {
      this.model.destroy();
      this.$(e.target).closest('li').slideUp(function () {
        $(this).remove();
      });
    }

  });

  return ListView;

});