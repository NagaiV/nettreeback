function AddNetwork2(parentId) {
  const propsIndex = parentId.split('-')[1] - 1
  const parentElement = document.getElementById(parentId)
  parentElement.style.maxHeight = '245px'
  parentElement.style.margin = '1em 35%'
  parentElement.style.overflowY = 'scroll'
  let networkChildCount = parentElement.childNodes.length
  var form = document.createElement('form')

  const networKeyId = `nk-${networkChildCount}`
  const networValueId = `nv-${networkChildCount}`

  handleNetworkPKey = () => {
    const elNId = NetworkValue.id.split('-')[1]
    let val = undefined
    if (Network.network.netprops[elNId]) {
      val = Object.values(Network.network.netprops[elNId])[0]
    }

    const data = { [NetworkKey.value]: val ? val : '' }
    Network.network.netprops[elNId] = data
    showNodeInHtml()
  }

  handleNetworkPValue = () => {
    const elNId = NetworkValue.id.split('-')[1]
    let key = ''
    if (Network.network.netprops[elNId]) {
      key = Object.keys(Network.network.netprops[elNId])[0]
    }

    const data = { [key]: NetworkValue.value }
    Network.network.netprops[elNId] = data
    showNodeInHtml()
  }

  var NetworkKey = document.createElement('input')
  NetworkKey.setAttribute('type', 'text')
  NetworkKey.setAttribute('id', networKeyId)
  NetworkKey.setAttribute('name', 'networkKey')
  NetworkKey.setAttribute('placeholder', 'Property Name')
  NetworkKey.onchange = handleNetworkPKey

  var NetworkValue = document.createElement('input')
  NetworkValue.setAttribute('type', 'text')
  NetworkValue.setAttribute('name', 'networkValue')
  NetworkValue.setAttribute('id', networValueId)
  NetworkValue.setAttribute('placeholder', 'Property Value')
  NetworkValue.onchange = handleNetworkPValue

  const transhIcon = document.createElement('i')
  transhIcon.setAttribute('class', 'fa fa-trash-o')
  transhIcon.style.fontSize = '15px'

  var NetworkRemoveButton = document.createElement('button')
  NetworkRemoveButton.setAttribute('type', 'button')
  NetworkRemoveButton.append(transhIcon)
  NetworkRemoveButton.onclick = () => RemoveElem(parentId, networKeyId)

  form.append(NetworkKey)

  form.append(NetworkValue)
  form.append(NetworkRemoveButton)

  parentElement.appendChild(form)
  showNodeInHtml()
}

function RemoveElem(parentId, networKeyId) {
  const elementIndex = networKeyId.split('-')[1] - 1
  delete Network.network.netprops[elementIndex]
  Network.network.netprops = Network.network.netprops.filter((np) => np != null)
  const child = document.getElementById(networKeyId)
  child.parentElement.remove()
  showNodeInHtml()
}
function handleAddNpropsNetwork() {
  Network.network.netprops = [...Network.network.netprops, {}]
  const elementLength = Network.network.netprops.length
  const elementSectionId = `e-${elementLength}`

  const myNet = document.getElementById('network')

  const elementSection = document.createElement('p')
  elementSection.setAttribute('id', elementSectionId)

  myNet.appendChild(elementSection)

  AddNetwork2(elementSectionId)
  showNodeInHtml()
}
handleAddNpropsNetwork()
