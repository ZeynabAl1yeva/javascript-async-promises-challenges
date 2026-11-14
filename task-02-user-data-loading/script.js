const users = [
  { id: 1, name: "Ali", age: 21 },
  { id: 2, name: "Leyla", age: 23 },
  { id: 3, name: "Murad", age: 20 },
  { id: 4, name: "Zeynəb", age: 20 }
];

const posts = [
  { id: 1, userId: 1, title: "Learning JavaScript" },
  { id: 2, userId: 1, title: "My First Project" },
  { id: 3, userId: 2, title: "Web Development" },
  { id: 4, userId: 3, title: "Async Programming" },
  { id: 5, userId: 3, title: "Understanding Promises" }
];

const comments = [
  { id: 1, userId: 1, text: "Great post" },
  { id: 2, userId: 1, text: "Very helpful" },
  { id: 3, userId: 2, text: "Nice work" },
  { id: 4, userId: 3, text: "Thanks for sharing" }
];
function getUser(userId) {
  return new Promise((resolve, reject) => {
    console.log("Loading user...");
    setTimeout(() => {
      const user = users.find((user) => user.id == userId);
      if (user) {
        resolve(`User: ${user.name}\nAge: ${user.age}`);
      } else {
        reject("Error: User not found!");
      }
    }, 1000);
  });
}
function getUserPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const Posts = posts.filter((post) => post.userId == userId);
      resolve(Posts);
    }, 1500);
  });
}
function getUserComments(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const Comments = comments.filter((comment) => comment.userId == userId);
      resolve(Comments);
    }, 1800);
  });
}
const userId = 1;
getUser(userId)
  .then((result) => {
    console.log(result);
    console.log();
    console.log("Loading posts and comments...");
    return Promise.all([getUserPosts(userId), getUserComments(userId)]);
  })
  .then(([userPosts, userComments]) => {
    console.log();
    if (userPosts.length === 0) {
      console.log("This user has no posts");
    } else {
      console.log("Posts:");
      userPosts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
      });
    }
    console.log();
    if (userComments.length === 0) {
      console.log("This user has no comments");
    } else {
      console.log("Comments:");
      userComments.forEach((comment, index) => {
        console.log(`${index + 1}. ${comment.text}`);
      });
    }
    console.log();
    console.log("Data loaded successfully!");
  })
  .catch((error) => console.log(error));
