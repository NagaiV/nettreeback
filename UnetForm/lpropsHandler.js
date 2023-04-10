function AddLink2() {
  let linkChildCount = link.childNodes.length
  var form = document.createElement('form')
  const linkParentId = `lp-${linkChildCount}`

  const LinkParent = document.createElement('p')
  LinkParent.setAttribute('id', linkParentId)
  link.appendChild(LinkParent)

  AddLinkData(linkParentId)
}

function AddLinkData(linkParentId) {
  const linkParentIndex = linkParentId.split('-')[1]
  const linkParentElem = document.getElementById(linkParentId)

  let dymmyGenericLink = JSON.stringify(genericLink)
  dymmyGenericLink = JSON.parse(dymmyGenericLink)

  const linkChildCount = linkParentElem.childNodes.length

  const linkNameId = `ln-${linkChildCount}-${linkParentIndex}` //ln-elementIndex-linkIndex
  const linkLeftNodeId = `lfn-${linkChildCount}-${linkParentIndex}`
  const linkRightNodeId = `lrn-${linkChildCount}-${linkParentIndex}`
  const linkChildNpropsParentId = `p-${linkNameId}`

  Network.network.links = [...Network.network.links, { ...dymmyGenericLink }]

  handleAddLinkName = (linkNameId) => {
    const linkName = document.getElementById(linkNameId).value
    const lId = linkNameId.split('-')[2]
    Network.network.links[lId].name = linkName
    showNodeInHtml()
  }

  handleAddLinkLeftNode = (linkLeftNodeId) => {
    const linkLeftNode = document.getElementById(linkLeftNodeId).value
    const lId = linkLeftNodeId.split('-')[2]
    Network.network.links[lId].leftNode = linkLeftNode
    showNodeInHtml()
  }

  handleAddLinkRightNode = (linkRightNodeId) => {
    const linkRightNode = document.getElementById(linkRightNodeId).value
    const lId = linkRightNodeId.split('-')[2]
    Network.network.links[lId].rightnode = linkRightNode
    showNodeInHtml()
  }

  var form = document.createElement('form')
  const labelName = document.createElement('label')
  labelName.textContent = 'Name:'

  var LinkName = document.createElement('input')
  LinkName.setAttribute('type', 'text')
  LinkName.setAttribute('name', 'linkName')
  LinkName.setAttribute('id', linkNameId)
  LinkName.setAttribute('placeholder', 'Link name')
  LinkName.onchange = () => handleAddLinkName(linkNameId)

  const labelLeftNode = document.createElement('label')
  labelLeftNode.textContent = 'Left Node:'
  labelLeftNode.style.marginLeft = '10px'

  var LinkLeftNode = document.createElement('input')
  LinkLeftNode.setAttribute('type', 'text')
  LinkLeftNode.setAttribute('name', 'left node')
  LinkLeftNode.setAttribute('id', linkLeftNodeId)
  LinkLeftNode.setAttribute('placeholder', 'link left node')
  LinkLeftNode.onchange = () => handleAddLinkLeftNode(linkLeftNodeId)

  const labelRightNode = document.createElement('label')
  labelRightNode.textContent = 'Right Node:'
  labelRightNode.style.marginLeft = '10px'

  var LinkRightNode = document.createElement('input')
  LinkRightNode.setAttribute('type', 'text')
  LinkRightNode.setAttribute('name', 'right node')
  LinkRightNode.setAttribute('id', linkRightNodeId)
  LinkRightNode.setAttribute('placeholder', 'link right node')
  LinkRightNode.onchange = () => handleAddLinkRightNode(linkRightNodeId)

  const AddLprops = document.createElement('button')
  AddLprops.setAttribute('type', 'button')
  AddLprops.innerHTML = 'Add lprops'
  AddLprops.style.marginLeft = '10px'

  AddLprops.onclick = () => AddLinkLprops(linkChildNpropsParentId)

  const linkElementSection = document.createElement('p')
  linkElementSection.innerHTML = `Properties`

  labelName.appendChild(LinkName)
  labelLeftNode.appendChild(LinkLeftNode)
  labelRightNode.appendChild(LinkRightNode)

  form.append(labelName)
  form.append(labelLeftNode)
  form.append(labelRightNode)
  form.append(AddLprops)

  const linkChild = document.createElement('p')
  linkChild.style.maxHeight = '245px'
  linkChild.style.margin = '1em 35%'
  linkChild.style.overflowY = 'scroll'
  linkChild.setAttribute('id', linkChildNpropsParentId)
  linkChild.appendChild(linkElementSection)
  linkParentElem.appendChild(form)
  linkParentElem.appendChild(linkChild)

  AddLinkLprops(linkChildNpropsParentId)
}

function AddLinkLprops(linkParentId) {
  const LinkIndex = linkParentId.split('-')[3]
  var parentElement = document.getElementById(linkParentId)
  var form = document.createElement('form')

  const linkNameChildCount = parentElement.childNodes.length
  const elemtRefID = linkParentId.split('-')[2]
  const linkRefID = linkParentId.split('-')[3]
  const LinkPropertyKeyId = `lpk-${LinkIndex}-${linkNameChildCount}-${elemtRefID}-${linkRefID}` // lpk stand for node property key
  const LinkPropetyValueId = `lpv-${LinkIndex}-${linkNameChildCount}-${elemtRefID}-${linkRefID}` // lpv stand for node property value

  function handleLinkPKey(pId, LinkPropertyKeyId) {
    const parentId = pId.split('-')[3]
    const childId = pId.split('-')[2]
    const lpropIndex = LinkPropertyKeyId.split('-')[2] - 1

    const keyVal = document.getElementById(LinkPropertyKeyId).value
    const valVal = Network.network.links[parentId].lprops[lpropIndex]
      ? Object.values(Network.network.links[parentId].lprops[lpropIndex])[0]
      : ''

    let data = {
      [keyVal]: valVal,
    }

    Network.network.links[parentId].lprops[lpropIndex] = data
    showNodeInHtml()
  }

  function handleLinkPValue(pId, LinkPropetyValueId) {
    const childIndex = parseInt(LinkPropetyValueId.split('-')[2]) - 1
    const parentId = pId.split('-')[3]
    const childId = pId.split('-')[2]

    const valueVal = document.getElementById(LinkPropetyValueId).value

    const keyVall = Object.keys(
      Network.network.links[parentId].lprops[childIndex]
    )[0]

    let data

    if (keyVall) {
      data = { [keyVall]: valueVal }
    } else {
      data = {
        '': valueVal,
      }
    }

    Network.network.links[parentId].lprops[childIndex] = data
    showNodeInHtml()
  }

  var LinkPropertyKey = document.createElement('input')
  LinkPropertyKey.setAttribute('type', 'text')
  LinkPropertyKey.setAttribute('id', LinkPropertyKeyId)
  LinkPropertyKey.setAttribute('name', 'linkKey')
  LinkPropertyKey.setAttribute('placeholder', 'Property Name')
  LinkPropertyKey.onchange = () =>
    handleLinkPKey(linkParentId, LinkPropertyKeyId)

  var LinkPropetyValue = document.createElement('input')
  LinkPropetyValue.setAttribute('type', 'text')
  LinkPropetyValue.setAttribute('name', 'linkValue')
  LinkPropetyValue.setAttribute('id', LinkPropetyValueId)
  LinkPropetyValue.setAttribute('placeholder', 'Property Value')
  LinkPropetyValue.onchange = () =>
    handleLinkPValue(linkParentId, LinkPropetyValueId)

  const transhIcon = document.createElement('i')
  transhIcon.setAttribute('class', 'fa fa-trash-o')
  transhIcon.style.fontSize = '15px'

  var RemoveLinkLprop = document.createElement('button')
  RemoveLinkLprop.setAttribute('type', 'button')
  RemoveLinkLprop.append(transhIcon)
  RemoveLinkLprop.onclick = () => removeLprops(linkParentId, LinkPropertyKeyId)

  form.append(LinkPropertyKey)
  form.append(LinkPropetyValue)
  form.append(RemoveLinkLprop)

  parentElement.append(form)
  showNodeInHtml()
}

function removeLprops(parentId, elemtId) {
  const parentIndex = elemtId.split('-')[1]
  const elementIndex = elemtId.split('-')[2] - 1

  delete Network.network.links[parentIndex].lprops[elementIndex]

  Network.network.links[parentIndex].lprops = Network.network.links[
    parentIndex
  ].lprops.filter((lp) => lp != null)

  const child = document.getElementById(elemtId)
  child.parentElement.remove()
  showNodeInHtml()
}
