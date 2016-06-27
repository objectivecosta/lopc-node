"use strict";

class Router {
  constructor(app) {
    this.app = app; 
  }

  addRoute(method, route, responder) {
    if (method == 'GET') {
      this.app.get(route, responder);
    } else if (method == 'POST') {
      this.app.post(route, responder);
    } else if (method == 'PUT') {
      this.app.put(route, responder);
    } else if (method == 'DELETE') {
      this.app.delete(route, responder);
    }
  }
}

module.exports = Router;
