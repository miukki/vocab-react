import CustomerIamApiSdkJs from 'customer-iam-api-sdk-js'
import VocabAppServiceJsSdk from 'vocab-app-service-js-sdk'
import appConfig from '../config'

// import Storage from './Storage'
// const data = axios.create({
//   baseURL: appConfig.dataServiceBaseURL
// })
// data.interceptors.request.use(
//   function(config) {
//     return Storage.getJWT().then(jwt => {
//       return {
//         ...config,
//         ...{ headers: { common: { Authorization: `Bearer ${jwt}` } } }
//       }
//     })
//   },
//   function(error) {
//     return Promise.reject(error)
//   }
// )

export const customerIamApiSdkJs = new CustomerIamApiSdkJs(appConfig.IAM)
export const vocabAppServiceJsSdk = new VocabAppServiceJsSdk(
  appConfig.dataService
)
