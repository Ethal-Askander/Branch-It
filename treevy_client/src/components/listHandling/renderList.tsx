import React, { ChangeEvent } from "react";
import { Component } from "react";
import "../../componentStyles/listHandling/renderList.css";
import Modal from "react-modal";
import TreevyList, { ListState } from "./treevyList";

export default class RenderList extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalShow: false,
      tempString: "",
    };
  }

  /**
   * Keyboard Utility Method
   */
  onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      tempString: e.currentTarget.value,
    });
  };

  /**
   * Generates and submits a child list to it's parent children list
   *
   * @param _e: used to prevent page refresh
   * @param layer: layer of the new list being inserted
   *
   * @returns: void => sends new list to submitChildList() method
   * to be rendered
   */
  genChildList = (_e: any, layer = 1): void => {
    _e.preventDefault();
    if (this.state.tempString == "") {
      return;
    }
    const list: ListState = {
      lists: [],
      done: false,
      content: this.state.tempString,
      location: [this.props.parent.location[0] + 1, this.props.itemCount + 1],
      coordinates: [0, 0],
      parent: this.props.parent,
      width: this.props.width,
    };
    let newChildList = new TreevyList(list);
    this.props.parent.lists.push(newChildList);
    this.setState({
      tempString: "",
    });
    this.props.submitChildList(newChildList, this.props.parent.location);
    this.setState({
      modalShow: false,
    });
  };

  openModal = () => {
    if (this.state.modalShow) {
      return (
        <div className="list-modal-window">
          <form onSubmit={this.genChildList}>
            <input
              type="text"
              className="search-bar-modal"
              placeholder="Add child list"
              onChange={this.onInputChange}
              value={this.state.inputRootString}
              autoFocus
            />
          </form>
        </div>
      );
    }
  };

  setModalOn = () => {
    this.setState({
      modalShow: true,
    });
  };

  setModalOff = () => {
    this.setState({
      modalShow: false,
    });
  };

  /**
   * Requires an external function as a conditional is required
   * to avoid rendering the "invisible root node"
   */
  renderLists = () => {
    if (this.props.parent.content != "") {
      return (
        <div className="list-item">
          <div
            className="lists-container"
            style={{
              marginLeft:
                (this.props.parent.location[0] * 20).toString() + "px",
            }}
          >
            <div className="content-container">
              <span>&#8226; {this.props.parent.content}</span>
            </div>
            <div className="add-container">
              <button
                type="button"
                className="close"
                onClick={
                  this.state.modalShow ? this.setModalOff : this.setModalOn
                }
              >
                +
              </button>
            </div>
            <div className="delete-container">
              <button
                type="button"
                className="close"
                onClick={this.props.onClickDel}
              >
                -
              </button>
            </div>
          </div>
          {this.openModal()}
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderLists()}</div>;
  }
}
