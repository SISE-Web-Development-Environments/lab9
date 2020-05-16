async function displayLocation() {
  try {
    const user = await getUser(1);
    const interests = await getInterests(user.userId);
    const location = await getLocation(interests[0]);
    console.log(location);
  } catch (error) {
    console.log(error.message);
  }
}

displayLocation();

//TODO correct
async function getUser() {
  // find user
  const user = { userId: Id, name: "Eran" };
  if (user) return user;
  else throw new Error("user not found");
}

// async function getInterests() {
// async function getLocation() {
