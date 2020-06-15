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

  DELETE_JOB_ITEM(state, index) {
    state.JobsList.records.splice(index, 1);
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
      let obj = state.TranscodingProgressList.find(o => o.ID == data.ID);
      if (obj !== undefined) {
        for (var i in state.TranscodingProgressList) {
          if (state.TranscodingProgressList[i].ID == data.ID) {
            state.TranscodingProgressList[i].Progress = data.Progress;
          }
        }
      } else {
        state.TranscodingProgressList.push(data);
      }
    } else {
      state.TranscodingProgressList.push(data);
    }
  },

  UPDATE_TRANSCODING_PROGRESS_STATUS(state, data) {
    // Delete progress finished
    for (var i in state.TranscodingProgressList) {
      if (state.TranscodingProgressList[i].ID == data.ID) {
        state.TranscodingProgressList.splice(i, 1);
      }
    }

    for (var i in state.JobsList.records) {
      if (state.JobsList.records[i].ID == data.ID) {
        state.JobsList.records[i].status = data.Message;
      }
    }
  }
};
