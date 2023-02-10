import axios from 'axios'
const { CUSTOM_INTREPID_URL, CUSTOM_INTREPID_KEY } = process.env

class Services {
  intrepidService = () => axios.get(`${CUSTOM_INTREPID_URL}${CUSTOM_INTREPID_KEY}`, {
    headers: {
      Accept: 'application/json'
    }
  })
}

export default new Services()