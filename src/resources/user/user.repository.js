export default (userModel) => ({
  create: async (props) => userModel.create(props),

  getByUserName: async (username) => {
    const user = await userModel.findOne({ where: { username } });

    if (user === null) {
      throw new Error('User not found!');
    }

    return user;
  }
});
