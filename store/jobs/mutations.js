export const mutations = {
  SET_JOBS_LIST(state, data) {
    state.JobsList = data;
  },

  SET_UPLOAD_LIST(state, data) {
    if(state.UploadList.length === 0) {
      state.UploadList.push(data);
    }else {
      const index = state.UploadList.findIndex(x => x.upload_id === data.upload_id)
      // here you can check specific property for an object whether it exist in your array or not
      if (index === -1){
        state.UploadList.push(data);
      }
    }
  },

  SPINER_LOAD(state, status) {
    state.RequestLoad = status;
  },

  DELETE_JOB_ITEM(state, index) {
    state.JobsList.records.splice(index, 1);
  },

  UPDATE_UPLOAD_LIST(state, data) {
    if(state.UploadList.length > 0) {
      for (var i = 0; i < state.UploadList.length; i++) {
        if (state.UploadList[i].upload_id == data.uid) {
            state.UploadList[i].progress = data.progress;
            state.UploadList[i].total = data.total;
            state.UploadList[i].loaded = data.loaded;
        }
      }
    }
  },

  DELETE_UPLOAD_LIST(state, data) {
    for (var i = 0; i < state.UploadList.length; i++) {
      if (state.UploadList[i].upload_id == data.uid) {
        state.UploadList.splice(i, 1);
      }
    }
  },

  SET_UPLOAD_TO_JOB_LIST(state, data) {
    state.JobsList.records.push(...data);
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
