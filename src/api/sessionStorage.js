import bcrypt from "bcryptjs";

async function generatePassword(password) {
  return bcrypt.hash(password, 10);
}

export async function setUserInfo(email, password) {
  const hash = await generatePassword(password);
  window.sessionStorage.setItem("user", JSON.stringify({ email, hash }));
}

export async function updateUserInfo(email, password) {
  const currentInfo = getUserInfo();
  if (email === currentInfo.email) {
    throw new Error("Email is the same");
  }

  if (password) {
    const isPasswordSame = await bcrypt.compare(password, currentInfo.hash);
    if (isPasswordSame) throw new Error("Password is the same");

    const newPassword = await generatePassword(password);
    return window.sessionStorage.setItem(
      "user",
      JSON.stringify({ email, hash: newPassword })
    );
  }

  return window.sessionStorage.setItem(
    "user",
    JSON.stringify({ email, hash: currentInfo.hash })
  );
}

export function isLoggedIn() {
  return window.sessionStorage.getItem("user") ? true : false;
}

export function getUserInfo() {
  return JSON.parse(window.sessionStorage.getItem("user"));
}

export function removeUserInfo() {
  window.sessionStorage.removeItem("user");
}
