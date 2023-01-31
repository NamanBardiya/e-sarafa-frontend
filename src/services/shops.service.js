import http from "../http-common";

class ShopsService {
  getAll() {
    return http.get("/shops");
  }

  findByName(name) {
    return http.get(`/shops/${name}`);
  }

  updateShop(name) {
    return http.patch(`/shops/${name}`);
  }

  create(data) {
    return http.post("/shops", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}


export default new ShopsService();
