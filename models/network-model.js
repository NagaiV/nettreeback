import { model, Schema } from 'mongoose'

const NetworkSchema = new Schema(
  {
    network: {
      type: Object,
    },
  },
  { timestamps: true }
)

const Network = model('network', NetworkSchema)
export default Network
