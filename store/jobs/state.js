export const state = () => ({
  JobsList: {
    total_record: 0,
    record: []
  },
  RequestLoad: true,
  UploadList: [],
  TranscodingProgressList: [],
  ServerActive: {
    domain: null,
    key: null,
    name: null
  }
});
