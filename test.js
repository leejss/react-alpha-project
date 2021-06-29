const searchMessage = (messages, content) => {
  const channelMessages = [...messages];
  const regex = new RegExp(content, "gi");
  const searchResult = channelMessages.reduce((acc, ms) => {
    if (ms.content && ms.content.match(regex)) {
      acc.push(ms);
    }
    return acc;
  }, []);
  return searchResult;
};

const mss = [
  {
    content: "hello",
    timestamp: 1624814067780,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "asdad",
    timestamp: 1624822897236,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "dadasdad",
    timestamp: 1624822900987,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "workdasdadasd",
    timestamp: 1624822952696,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "saddadasd",
    timestamp: 1624823371035,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "tang",
    timestamp: 1624852708063,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "asdasd",
    timestamp: 1624852765314,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "asd",
    timestamp: 1624852767868,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "sdsaddaas",
    timestamp: 1624852769999,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "sadsadadsaasd",
    timestamp: 1624852782840,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "s",
    timestamp: 1624852787122,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "a",
    timestamp: 1624852788432,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "b",
    timestamp: 1624852789782,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "asd",
    timestamp: 1624852907864,
    user: {
      avatar: "http://gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd",
      id: "sNW7ATeQvHSujXYR3OWbwbHNGiu2",
      name: "test6",
    },
  },
  {
    content: "sd",
    timestamp: 1624881497758,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    content: "as",
    timestamp: 1624881700280,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2F9e8ee400-b50a-4386-8ffe-23021758874e.jpeg?alt=media&token=b903a219-2cb6-4750-86f6-79f260e967cd",
    timestamp: 1624884056095,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2F5ab57a54-dd24-45ef-a19c-331b1ec4d35d.jpeg?alt=media&token=331128c9-b7ff-4a6e-a5ca-d87de67ff6dc",
    timestamp: 1624884087227,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2Fb990500e-57bb-4dd3-a8f8-d11b2f61751b.jpeg?alt=media&token=6ad429d0-b8b2-4bf1-8f68-b08126682f37",
    timestamp: 1624884114590,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2F62d97f38-2a5b-4109-9548-c73634be9bf6.jpeg?alt=media&token=4ddcb30b-0993-4641-ab7c-3f0dd62138d1",
    timestamp: 1624884261322,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2F5bcbbaff-65fa-41eb-99a5-4d573a992a62.jpeg?alt=media&token=d8d949ad-2109-4661-8739-b4b36ab5d017",
    timestamp: 1624884342191,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2Fb8a06356-3e68-4783-b789-32c68c685a92.jpeg?alt=media&token=11e13952-6844-47a7-bf60-1f60c4002802",
    timestamp: 1624884521816,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2F572f449b-7662-41f5-9282-336507a8ff3e.jpeg?alt=media&token=3caadcc7-e233-4642-a3a9-33036d54d0ed",
    timestamp: 1624884710776,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2F4dd586e4-bac6-4cf8-8093-1eb885174505.jpeg?alt=media&token=0c9c5cec-6be1-4baa-9592-88445df82112",
    timestamp: 1624884717993,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2Fe55ce5bc-8bfb-4d02-8ae8-e83d52e72f0c.jpeg?alt=media&token=0d04c390-fe07-41b8-8c9b-2dc2e5149338",
    timestamp: 1624884823896,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2F89421ae9-5211-4295-b757-cea8a5e49d6f.jpeg?alt=media&token=8b5b9b16-a539-4eec-a623-ba2a30d93c17",
    timestamp: 1624884840929,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2F0f80dd61-c496-4402-babc-951dca188c2d.jpeg?alt=media&token=15862a06-21e9-45fe-982e-148c5b46baea",
    timestamp: 1624884872322,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2F0d497f83-390c-4397-8ef2-bb7c4de4b0d3.jpeg?alt=media&token=f27cd143-b542-4158-83d8-fe7fd4861eb1",
    timestamp: 1624884926003,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-slack-156cc.appspot.com/o/chat%2Fpublic%2F12131e9f-88c6-43d3-aab6-8914bc1f84cc.jpeg?alt=media&token=84db5cb4-1f69-4477-a9cf-7b5d10748fb9",
    timestamp: 1624885015507,
    user: {
      avatar: "http://gravatar.com/avatar/99fdb26cd31606300b8e00113efec81d",
      id: "7SFG75dRMfhGNkTZD2gbeYzsvrm1",
      name: "jake",
    },
  },
];

console.log(searchMessage(mss, "hello"));
