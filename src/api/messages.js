import axiosInstance from "./axiosInstance";
import { updateUser } from "./users";

export async function getMessages(user) {
  if (user && user.api_key) {
    return axiosInstance.get(`${user.api_key}/latest`).then(({ data }) => {
      return data.record;
    });
  }

  return [];
}

export async function addNewMessage(message, user) {
  if (user && user.api_key) {
    return addMessageToExisingChat(message, user);
  } else {
    return addMessageToNewChat(message, user);
  }
}

async function addMessageToNewChat(message, user) {
  const { data } = await axiosInstance.post("", [
    {
      message,
      time: new Date().getTime(),
      received: false,
    },
  ]);
  const updatedUser = await updateUser({
    ...user,
    api_key: data.metadata.id,
  });

  return {
    messages: data.record,
    user: updatedUser,
  };
}

async function addMessageToExisingChat(message, user) {
  const messages = await getMessages(user);
  return axiosInstance
    .put(user.api_key, [
      ...messages,
      {
        message,
        time: new Date().getTime(),
        received: false,
      },
    ])
    .then(({ data }) => {
      return data.record;
    });
}
