export const mutations = {
  SET_JOBS_LIST(state, data) {
    state.JobsList = data;
  },

  SET_UPLOAD_LIST(state, data) {
    state.UploadList.push(data);
  },

  UPDATE_UPLOAD_LIST(state, data) {
    for (var i in state.UploadList) {
      if (state.UploadList[i].uid == data.uid) {
        state.UploadList[i].progress = data.progress;
      }
    }
  },

  DELETE_UPLOAD_LIST(state, data) {
    for (var i in state.UploadList) {
      if (state.UploadList[i].uid == data.uid) {
        state.UploadList.splice(i, 1);
      }
    }
  },

  SET_TRANSCODING_PROGRESS_LIST(state, data) {
    if (state.TranscodingProgressList.length > 0) {
      for (var i in state.TranscodingProgressList) {
        if (state.TranscodingProgressList[i].ID == data.ID) {
          state.TranscodingProgressList[i].Progress = data.Progress;
        } else {
          state.TranscodingProgressList.push(data);
        }
      }
    } else {
      console.log(data);
      state.TranscodingProgressList.push(data);
    }
  }
};
