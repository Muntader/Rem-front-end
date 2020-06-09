export const mutations = {
  SET_JOBS_LIST(state, data) {
    state.JobsList = data;
  },

  SET_UPLOAD_LIST(state, data) {
    state.UploadList.push(data);
  },

  SPINER_LOAD(state, status) {
    state.RequestLoad = status;
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
        console.log(data.ID + "-" + state.TranscodingProgressList[i].ID);
        if (state.TranscodingProgressList[i].ID == data.ID) {
          state.TranscodingProgressList[i].Progress = data.Progress;
        } else {
          state.TranscodingProgressList.push(data);
        }
      }
    } else {
      console.log("push");
      state.TranscodingProgressList.push(data);
    }
  },

  UPDATE_TRANSCODING_PROGRESS_STATUS(state, data) {
    for (var i in state.JobsList.records) {
      console.log(state.JobsList.records[i].ID + "-" + data.ID);
      if (state.JobsList.records[i].ID == data.ID) {
        console.log(data.Message);
        state.JobsList.records[i].status = data.Message;
      }
    }
  }
};
