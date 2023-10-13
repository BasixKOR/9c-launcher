import { action, makeObservable, observable } from "mobx";
import { NodeInfo } from "src/config";

export default class RpcStore {
  public constructor() {
    makeObservable(this);
  }

  @observable
  public node: NodeInfo | null = null;

  @action
  public setNode(node: NodeInfo) {
    this.node = node;
  }
}
