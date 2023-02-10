import services from "../../services"
import { collections } from '../../app/dbConnect'

const getIntrepidProduct = async () => {
  try {
    const res = await services.intrepidService()
    if (res && res.data) {
      const data = res.data.feed.products as []
      const result = await collections.intrepidProduct?.insertMany(data)
      console.log(result)
    } else {
      console.log('No response')
    }
  } catch (err) {
    console.log(err)
  }
}

export default getIntrepidProduct