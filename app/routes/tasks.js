import Route from '@ember/routing/route';
//var $Promise = require('../../modules/_core').Promise;
import Ember from 'ember';

export default Route.extend({
model() {
  return this.store.findAll('task');
    }
});