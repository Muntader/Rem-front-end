export const mutations = {
  SET_USER: function (state, user) {
    state.AccessKey = user.access_key;
    this.$cookies.set('access_key', user.access_key)
  }
};
