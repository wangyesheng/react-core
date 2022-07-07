import { updateQueue } from "./Component";

export function addEvent(dom, eventType, handler) {
  const store = dom.store || (dom.store = {});
  store[eventType] = handler;
  if (!document[eventType]) {
    document[eventType] = dispatchEvent;
  }
}

const syntheticEvent = {}; // 合成事件对象
function dispatchEvent(e) {
  // debugger
  let { target, type } = e;
  const eventType = "on" + type;
  updateQueue.isBatchingUpdate = true;
  createSyntheticEvent(e);
  while (target) {
    const handler = target.store && target.store[eventType];
    handler && handler.call(target, syntheticEvent);
    target = target.parentNode;
  }

  //   for (let key in syntheticEvent) {
  //     syntheticEvent[key] = null;
  //   }
  updateQueue.batchUpdate();
}

/**
 * 根据原生的事件对象创建出一个合成的事件对象
 * @param {*} nativeEvent
 */
function createSyntheticEvent(nativeEvent) {
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key];
  }
}
