const genericLink = {
  name: '',
  leftNode: '',
  rightnode: '',
  lprops: [
    {
      name: '',
      label: '',
    },
  ],
}
const genericNode = {
  name: '',
  nprops: [],
}

let Network = {
  network: {
    name: '',
    netprops: [],
    nodes: [],
    links: [],
  },
}

async function handleSubmitNetwork() {
  const response = await fetch('http://localhost:', {
    method: 'POST',
    body: Network, // string or object
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const myJson = await response.json()
}

var network = document.getElementById('network')
var node = document.getElementById('node')
var link = document.getElementById('link')

const showNodeInHtml = () => {
  networkElem = document.getElementById('genNet')
  networkElem.innerHTML = JSON.stringify(Network, undefined, 6)
}

var hanldeAddLinkName
var hanldeAddLinkLeftNode
var hanldeAddLinkRightNode
var handleAddNodeName
var handleAddLinkLabel
var handleNetworkPName
var handleNetworkPValue
var handleNetworkPKey
var handleAddElement
var handleNodePKey
var handleNodePValue

const handleNetworkName = (e) => {
  val = document.getElementById('NetworkName').value
  Network.network.name = val
  showNodeInHtml()
}
