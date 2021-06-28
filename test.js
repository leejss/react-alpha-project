const ms = {
  content: "Hello",
  user: {
    id: 1,
    name: "jake",
    avatar: "http://tesxt.com",
  },
};

const addTime = (obj) => {
  const newMs = {
    ...obj,
    timestamp: "10-10",
  };

  console.log(newMs);
  console.log(obj.user === newMs.user);
};

addTime(ms);

