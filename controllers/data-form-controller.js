import { NetworkModel } from '../models/index.js'
import path from 'path'

const dataForm = async (req, res) => {
  try {
    const rootPath = path.resolve()
    const filePath = path.join(rootPath, 'UnetForm/UnetForm.html')
    res.sendFile(filePath)
  } catch (error) {
    console.log('error', error)
    return res.status(500).send('Server error!')
  }
}

const allNetworks = async (req, res) => {
  try {
    const networks = await NetworkModel.find()
    return res.send({ message: 'Saved networks', data: networks })
  } catch (error) {
    console.log('error', error)
    return res.status(500).send('Server error!')
  }
}

const saveNetwork = async (req, res) => {
  try {
    console.log('req.body', req.body)

    // const network = JSON.parse(req.body.network)
    const network = req.body.network
    const newNet = new NetworkModel({ network })
    await newNet.save()

    return res.send({ message: 'Network saved', data: newNet })
  } catch (error) {
    console.log('error', error)
    return res.status(500).send('Server error!')
  }
}

export { dataForm, saveNetwork, allNetworks }
