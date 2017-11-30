import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  //tasks: Ember.inject.service().findAll('task'),
  triggerTasks: false,
  todoSummary:/**Listens to Task items in model (model.[]). Add/Remove from list*/
  Ember.computed('model.[]', function() {
   let oModel = this.get("model") ;
    return  oModel.get("length") ;
   
  }),
  todoCompleted:/**Listens to Task items in model (model.[]). Any Change, Add/Remove/Update*/
  Ember.computed('model.[]', 'model.@each.isCompleted', function() {
    let model = this.get('model');
    return model.filterBy('isCompleted', true).get("length");
  }),
  todoIncomplete:/**Listens to Task items in model (model.[]). Any Change, Add/Remove/Update*/
  Ember.computed('model.[]', 'model.@each.isCompleted', function() {
    let model = this.get('model');
    return model.filterBy('isCompleted', false).get("length");
  }),
    addTaskTextbox: '',
    isValid: Ember.computed.match('addTaskTextbox', /^[1-9a-zA-Z\u0590-\u05fe''-'\s]{1,40}$/)/**Allow Hebrew, Latin and Valid Name chars*/,
    isDisabled: Ember.computed.not('isValid'),/**When new Task name input is not valid, the plus button is disabled and when user clicks enter, not valid message will be displayed*/  
  actions: {
    addTask(event)
    {
        if( this.get("isDisabled") == true )
        {
            alert("שם המשימה שניתן אינו חוקי")
            return false ;
        }

        /** Get new task title set by addTaskTextbox field*/
        let title = this.get('addTaskTextbox');
        if (!title.trim()) { return; }
  
        /** Create the new Task model*/
        let task = this.store.createRecord('task', {
          title: title,
          isCompleted: false
        });
  
        /** Clear the "New Task" text field*/
        this.set('addTaskTextbox', '');
  
        /** Save the new model*/
        task.save();
    }
  }
});
