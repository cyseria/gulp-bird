/**
 * vConsole Storage
 *
 * @author chenmanqing
 */

import $ from '../lib/query.js';
import * as tool from '../lib/tool.js';
import VConsolePlugin from '../lib/plugin.js';
import tplHeader from './header.html';
import tplTabbox from './tabbox.html';
import tplItem from './item.html';

class VConsoleStorage extends VConsolePlugin {

  constructor(...args) {
    super(...args);

    this.$tabbox = $.render(tplTabbox, {});
    this.$header = null;

    this.reqList = {}; // URL as key, request item as value
    this.domList = {}; // URL as key, dom item as value

    this.isReady = false;
    this.isShow = false;
    this.isInBottom = true; // whether the panel is in the bottom
    this._open = undefined; // the origin function
    this._send = undefined;

  }

  onRenderTab(callback) {
    callback(this.$tabbox);
  }

  onAddTool(callback) {
    let that = this;
    let toolList = [{
      name: 'Delete',
      global: false,
      onClick: function (e) {
        that.clearLog();
      }
    }];
    callback(toolList);
  }

  onReady() {
    var that = this;
    that.isReady = true;

    // header
    this.renderHeader();

  }

  onRemove() {

  }

  onShow() {
    this.isShow = true;
    if (this.isInBottom == true) {
      this.scrollToBottom();
    }
  }

  onHide() {
    this.isShow = false;
  }

  onShowConsole() {
    if (this.isInBottom == true) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    let $box = $.one('.vc-content');
    $box.scrollTop = $box.scrollHeight - $box.offsetHeight;
  }

  renderHeader() {
    let count = Object.keys(this.reqList).length,
      $header = $.render(tplHeader, { count: count }),
      $logbox = $.one('.vc-log', this.$tabbox);
    if (this.$header) {
      // update
      this.$header.parentNode.replaceChild($header, this.$header);
    } else {
      // add
      $logbox.parentNode.insertBefore($header, $logbox);
    }
    this.$header = $header;
  }

  clearLog() {
  }

  renderHeader() {
  }

} // END class

export default VConsoleStorage;