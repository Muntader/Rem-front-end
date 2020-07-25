export const actions = {
  async login({commit}, {key}) {
    console.log('xxxxxx')

    await this.$nodeServerApi.post('/api/auth/login', {key: key}).then(
      response => {
        if (response.status === 200) {
          commit('SET_USER', response.data)
          window.location.reload(true)
        }
      },
      error => {
        console.log(error)
      }
    );
  },
  async logout({commit}) {
    await this.$nodeServerApi.$post('/api/auth/logout')
    commit('SET_USER', null)
  }
};
