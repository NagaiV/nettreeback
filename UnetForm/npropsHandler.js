function AddParentNode() {
  let nodeChildCount = node.childNodes.length
  var form = document.createElement('form')
  const nodeParentId = `np-${nodeChildCount}`

  const NodeParent = document.createElement('p')
  NodeParent.setAttribute('id', nodeParentId)
  node.appendChild(NodeParent)

  AddNode(nodeParentId)
  showNodeInHtml()
}

function AddNode(nodeParentId) {
  const nodeParentIndex = nodeParentId.split('-')[1]
  const nodeParentElem = document.getElementById(nodeParentId)

  let dymmyGenericNode = JSON.stringify(genericNode)
  dymmyGenericNode = JSON.parse(dymmyGenericNode)

  const nodeChildCount = nodeParentElem.childNodes.length

  const elemId = `nc-${nodeChildCount}-${nodeParentIndex}` //nc-elementIndex-nodeIndex
  const nodeChildNpropsParentId = `p-${elemId}`

  Network.network.nodes = [...Network.network.nodes, { ...dymmyGenericNode }]

  handleAddNodeName = (elemId) => {
    const nodeName = document.getElementById(elemId).value
    const nId = elemId.split('-')[2]

    Network.network.nodes[nId].name = nodeName
    showNodeInHtml()
  }

  var form = document.createElement('form')
  const label = document.createElement('label')
  label.textContent = 'Name:'

  var NodeName = document.createElement('input')
  NodeName.setAttribute('type', 'text')
  NodeName.setAttribute('name', 'nodeName')
  NodeName.setAttribute('id', elemId)
  NodeName.setAttribute('placeholder', 'Node name')
  NodeName.onchange = () => handleAddNodeName(elemId)

  const AddNprops = document.createElement('button')
  AddNprops.setAttribute('type', 'button')
  AddNprops.innerHTML = 'Add nprops'

  AddNprops.onclick = () => AddNodeNrops(nodeChildNpropsParentId)

  const elementSection = document.createElement('p')
  elementSection.innerHTML = `Properties`

  label.appendChild(NodeName)
  form.append(label)
  form.append(AddNprops)

  const NodeChild = document.createElement('p')
  NodeChild.style.maxHeight = '245px'
  NodeChild.style.margin = '1em 35%'
  NodeChild.style.overflowY = 'scroll'
  NodeChild.setAttribute('id', nodeChildNpropsParentId)
  NodeChild.appendChild(elementSection)
  nodeParentElem.appendChild(form)
  nodeParentElem.appendChild(NodeChild)

  AddNodeNrops(nodeChildNpropsParentId)
}

function AddNewNodeElement(nodeParentId) {
  const nodeParentIndex = nodeParentId.split('-')[1]
  const nodeParentElem = document.getElementById(nodeParentId)
  const nodeChildCount = nodeParentElem.childNodes.length - 1
  const elementIndex = nodeParentId.split('-')[1] + 1

  const elemId = `nc-${nodeChildCount}-${nodeParentIndex}`
  const nodeChildNpropsParentId = `p-${elemId}`

  //ADD new nprop in Network object here

  const elementSection = document.createElement('p')
  const elemtNo = parseInt(nodeChildNpropsParentId.split('-')[2]) + 1
  elementSection.innerHTML = `Element ${elemtNo}`

  const NodeChild = document.createElement('p')
  NodeChild.setAttribute('id', nodeChildNpropsParentId)
  NodeChild.appendChild(elementSection)
  nodeParentElem.appendChild(NodeChild)

  AddNodeNrops(nodeChildNpropsParentId)
}

function AddNodeNrops(parentId) {
  const NodeIndex = parentId.split('-')[3]
  var parentElement = document.getElementById(parentId)
  var form = document.createElement('form')

  const nodeNameChildCount = parentElement.childNodes.length
  const elemtRefID = parentId.split('-')[2]
  const nodeRefID = parentId.split('-')[3]
  const NodePropertyKeyId = `npk-${NodeIndex}-${nodeNameChildCount}-${elemtRefID}-${nodeRefID}` // npk stand for node property key
  const NodePropetyValueId = `npv-${NodeIndex}-${nodeNameChildCount}-${elemtRefID}-${nodeRefID}` // npv stand for node property value

  function handleNodePKey(pId, NodePropertyKeyId) {
    const parentId = pId.split('-')[3]
    const childId = pId.split('-')[2]
    const npropIndex = NodePropertyKeyId.split('-')[2] - 1

    const keyVal = document.getElementById(NodePropertyKeyId).value
    const valVal = Network.network.nodes[parentId].nprops[npropIndex]
      ? Object.values(Network.network.nodes[parentId].nprops[npropIndex])[0]
      : ''

    let data = {
      [keyVal]: valVal,
    }

    Network.network.nodes[parentId].nprops[npropIndex] = data
    showNodeInHtml()
  }

  function handleNodePValue(pId, NodePropetyValueId) {
    const childIndex = parseInt(NodePropetyValueId.split('-')[2]) - 1
    const parentId = pId.split('-')[3]
    const childId = pId.split('-')[2]

    const valueVal = document.getElementById(NodePropetyValueId).value

    const keyVall = Object.keys(
      Network.network.nodes[parentId].nprops[childIndex]
    )[0]

    let data

    if (keyVall) {
      data = { [keyVall]: valueVal }
    } else {
      data = {
        '': valueVal,
      }
    }

    Network.network.nodes[parentId].nprops[childIndex] = data
    showNodeInHtml()
  }

  var NodePropertyKey = document.createElement('input')
  NodePropertyKey.setAttribute('type', 'text')
  NodePropertyKey.setAttribute('id', NodePropertyKeyId)
  NodePropertyKey.setAttribute('name', 'networkKey')
  NodePropertyKey.setAttribute('placeholder', 'Property Name')
  NodePropertyKey.onchange = () => handleNodePKey(parentId, NodePropertyKeyId)

  var NodePropetyValue = document.createElement('input')
  NodePropetyValue.setAttribute('type', 'text')
  NodePropetyValue.setAttribute('name', 'networkValue')
  NodePropetyValue.setAttribute('id', NodePropetyValueId)
  NodePropetyValue.setAttribute('placeholder', 'Property Value')
  NodePropetyValue.onchange = () =>
    handleNodePValue(parentId, NodePropetyValueId)

  const transhIcon = document.createElement('i')
  transhIcon.setAttribute('class', 'fa fa-trash-o')
  transhIcon.style.fontSize = '15px'

  var RemoveNodeNprops = document.createElement('button')
  RemoveNodeNprops.setAttribute('type', 'button')
  RemoveNodeNprops.append(transhIcon)
  RemoveNodeNprops.onclick = () => removeNprops(parentId, NodePropertyKeyId)

  form.append(NodePropertyKey)
  form.append(NodePropetyValue)
  form.append(RemoveNodeNprops)

  parentElement.append(form)
  showNodeInHtml()
}

function removeNprops(parentId, elemtId) {
  const parentIndex = elemtId.split('-')[1]
  const elementIndex = elemtId.split('-')[2] - 1

  delete Network.network.nodes[parentIndex].nprops[elementIndex]

  Network.network.nodes[parentIndex].nprops = Network.network.nodes[
    parentIndex
  ].nprops.filter((np) => np != null)

  const child = document.getElementById(elemtId)
  child.parentElement.remove()
  showNodeInHtml()
}
