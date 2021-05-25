import axiosInstance from "./axiosInstance";
import uniqid from "uniqid";

const usersId = process.env.REACT_APP_API_USER_ID;

export function getUsers() {
  return axiosInstance
    .get(`/${usersId}/latest`)
    .then(({ data }) => data.record);
}

export async function getUser(userId) {
  const users = await getUsers();
  return users.find((user) => user.id === userId);
}

export async function addNewUser(email) {
  const users = await getUsers();
  return axiosInstance
    .put(usersId, [
      ...users,
      {
        id: uniqid(),
        email,
      },
    ])
    .then(({ data }) => data.record);
}

export async function updateUser(user) {
  const users = await getUsers();
  const updatedUsers = users.map((fetchedUser) =>
    fetchedUser.id === user.id ? user : fetchedUser
  );
  return axiosInstance
    .put(usersId, updatedUsers)
    .then(({ data }) =>
      data.record.find((updatedUser) => updatedUser.id === user.id)
    );
}
