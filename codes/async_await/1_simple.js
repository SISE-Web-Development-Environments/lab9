async function displayUser() {
  try {
    const user = await getUser(1);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
}

async function getUser() {
  // find user
  const user = { userId: Id, name: "Eran" };
  if (user) return user;
  else throw new Error("user not found");
}

displayUser();
