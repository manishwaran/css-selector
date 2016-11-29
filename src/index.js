import cssPath from './css-path';

const checkCommonParent = (a,b) => a.is(b) ? a : checkCommonParent(a.parent(), b.parent());

const nthChildStr = (ele) => {
  let str = `${ele.parent().prop('tagName').toLowerCase()}:nth-child(`;
  ele.parent().children().each((idx, child) => {
    if(ele.is(child)) str+=`${idx+1})`;
  })
  return str;
}

const childToParentTraversal = (child, par, path=[]) => {
  if(par.is(child)) return path;
  path.unshift(nthChildStr(child))
  path = childToParentTraversal(child.parent(), par, path)
  return path;
}

const checkCommonPath = (path1, path2) => path1 === path2;

const getCommonSelector = (ele1, ele2, $) => {
  const commonParent = checkCommonParent(ele1, ele2);
  const ele1Path = childToParentTraversal(ele1, commonParent).slice(1).join(' > ');
  const ele2Path = childToParentTraversal(ele2, commonParent).slice(1).join(' > ');
  console.log(ele2Path);
  console.log(ele1Path);
  if (checkCommonPath(ele1Path, ele2Path)) {
    const path = cssPath(commonParent, $);
    const commonSelector = `${path} * ${ele1Path}`;
    return commonSelector;
  } else {
    return false;
  }

}


export {
  cssPath,
  nthChildStr,
  getCommonSelector,
  checkCommonParent,
  childToParentTraversal,
}