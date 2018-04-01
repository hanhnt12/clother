import Api from '@/services/Api'
import END_POINT from '@/utils/endpoint'

export default {
  register (credentials) {
    return Api().post(END_POINT.USER_REGISTER, credentials)
  }
}
