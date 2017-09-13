/**
 * A Front-End Console Panel for Mobile Webpage
 *
 * @author WechatFE
 */

// classes
import VConsole from './core/core.js';
import VConsolePlugin from './lib/plugin.js';
// built-in tabs
import DefaultTab from './log/default.js';
import SystemTab from './log/system.js';
import NetworkTab from './network/network.js';
import StorageTab from './storage/storage.js';

// here we go
const vConsole = new VConsole();

const plugin = {
  DefaultTab: DefaultTab,
  SystemTab: SystemTab,
  NetworkTab: NetworkTab
}

const defaultTab = new DefaultTab('default', 'Log'); 
vConsole.addPlugin(defaultTab); 

const systemTab = new SystemTab('system','System'); 
vConsole.addPlugin(systemTab); 

const storageTab = new StorageTab('storage','Storage'); 
vConsole.addPlugin(storageTab); 

function addPlugin(plugin) {
  vConsole.addPlugin(plugin); 
}

// export
vConsole.VConsolePlugin = VConsolePlugin;

export default {addPlugin, plugin};