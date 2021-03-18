function removeAllChildNodes(parent) {
  console.log(parent);
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export default removeAllChildNodes;
