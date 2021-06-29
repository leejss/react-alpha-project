export const getFileExtension = (filetype) => {
  return filetype.split("/")[1];
};

export const searchMessage = (messages, content) => {
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
