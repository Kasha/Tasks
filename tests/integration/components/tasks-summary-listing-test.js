import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tasks-summary-listing', 'Integration | Component | tasks summary listing', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tasks-summary-listing}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tasks-summary-listing}}
      template block text
    {{/tasks-summary-listing}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
