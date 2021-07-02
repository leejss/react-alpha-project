type StarChannel = {
    name: string
    details: string
    createdBy: User
};

type User = {
  starred: StarChannel;
  name: string;
  avatar: string;
};

/*
    userkey
        starred
            channelkey
                name
                details
                createdBy
                    name
                    avatar
        name
        avatar
*/