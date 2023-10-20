import { instance } from "./instance";

export const getData = () => {
  return instance.get("/todos");
};

export const postData = (data) => {
  return instance.post("/todos", data);
};
