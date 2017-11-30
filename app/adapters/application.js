import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
   host:'http://localhost:8000/api',/**Laravel hard coded api url*/
   handleResponse(status, headers, payload, requestData) {
    
    if (payload && payload._errors) {
      payload.errors = payload._errors;
      delete payload._errors;
    }
    return this._super(...arguments);
  },
  buildURL (modelName, id, snapshot, requestType, query)
  /**Modify Server Requests to work with Laravel Listener, instead of sending the Task ID as URI (additional route directory) ID is sent using query string id
  https://www.emberjs.com/api/ember-data/2.15/classes/DS.JSONAPIAdapter */
  {
    let sURL = this._super.apply(this, arguments);
    if( requestType == "updateRecord" || requestType == "deleteRecord" )
    {
        sURL = this.get("host") + "/" + modelName + "s" + "?id=" + id ;
    }
    return sURL ;
  }
});
