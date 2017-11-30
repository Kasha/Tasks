import Component from '@ember/component';
import Ember from 'ember';
import EmberObject, {
  computed,
  observer
} from '@ember/object';

export default Component.extend({
  isEditing:false,  
  /**Computed value for displaying or not, Task Text in View mode*/
  displayView:  computed("isEditing", function()
  {
    /**htmlSafe Fix for Safe attribute https://emberjs.com/deprecations/v1.x/#toc_binding-style-attributes */
    if( this.get("isEditing") == false )
    {
      return Ember.String.htmlSafe('display:block;') ;
    }
    return Ember.String.htmlSafe('display:none;') ;
  }),
  /**Computed value for displaying or not, Task Text in Edit mode*/
  displayEdit:  computed("isEditing", function()
  {
    /**htmlSafe Fix for Safe attribute https://emberjs.com/deprecations/v1.x/#toc_binding-style-attributes */
    if( this.get("isEditing") == true )
    {
      return Ember.String.htmlSafe('display:block;') ;
    }
    return Ember.String.htmlSafe('display:none;') ;
  }),
    init()
    {
      this.set("isEditing", false );   
      this._super(...arguments);
    },
    updateTaskTextbox:computed('updateTaskTextbox', function()
    {
      var oTask = this.get('task') ;
      //console.log("updateTaskTextbox:computed after updateTaskTextbox:") ; 
      return oTask.get('title') ;
    } ),
    actions: {
    toggleIsCompleted(event) {
      /** Toggle task isCompleted, update ember store and database on server*/
      let bChecked = event.target.checked ;
      var oTask = this.get('task') ;
      oTask.set('isCompleted', bChecked) ;
      oTask.save() ;
    },
    removeTask(event)
    {
      /** Remove Task, update ember store and database on server*/
      var oTask = this.get('task') ;
      oTask.destroyRecord() ; 
    },
    setTaskEditModeOn: function() {
      /** Set Task to Edit Mode, user could edit task title*/
      //console.log("setTaskEditModeOn:"+this.get('updateTaskTextbox')) ;
      this.set('isEditing', true);
      return false ;
     },
     setTaskEditModeOff: function() {
      /** Set Task to View Mode*/
      //console.log("setTaskEditModeOff:"+this.get('updateTaskTextbox')) ;
      this.set('isEditing', false);
      return false ;
     },
    updateTask: function() {
      /** Update Task Title, update ember store and database on server*/
      //console.log("updateTask:"+this.get('updateTaskTextbox')) ;
      var oTask = this.get('task') ;
       /** Set Task to View Mode*/
      this.set('isEditing', false);
      oTask.set('title', this.get('updateTaskTextbox'));
      oTask.save() ;
      return false ;
    },
    setTaskValue: function() {
      /** Toggle task isCompleted, update ember store and database on server*/
      //console.log("setTaskValue:"+this.get('updateTaskTextbox')) ;
      var oTask = this.get('task') ;
      this.set('updateTaskTextbox', oTask.get('title')) ;
      //console.log("setTaskValue after set:"+this.get('updateTaskTextbox')) ;
    },
}
});
