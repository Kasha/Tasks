import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
        primaryKey: 'id',
        keyForAttribute(attr) {/**Normalize attribute to fit Task model without Ember middle line addition (is-Completed back to isCompleted)*/
        return attr;
      }
});
