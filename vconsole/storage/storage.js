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

    this.updateStorage();

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
    let $header = $.render(tplHeader, {}),
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

  updateStorage() {
    console.log('123');
    const domData =
      {
        type: 'locakstorage',
        key: 'birdTools_X',
        val: '0',
      };

    for (let i = 0; i < localStorage.length; i++) {
      const $new = $.render(tplItem, domData);
      $.one('.vc-log', this.$tabbox).insertAdjacentElement('beforeend', $new);
    }
    this.renderHeader();
  }

  clearLog() {
  }


} // END class

export default VConsoleStorage;