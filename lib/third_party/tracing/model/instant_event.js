/**
Copyright (c) 2013 The Chromium Authors. All rights reserved.
Use of this source code is governed by a BSD-style license that can be
found in the LICENSE file.
**/

require("../base/units/time_stamp.js");
require("./timed_event.js");

'use strict';

/**
 * @fileoverview Provides the InstantEvent class.
 */
global.tr.exportTo('tr.model', function() {
  var InstantEventType = {
    GLOBAL: 1,
    PROCESS: 2
  };

  function InstantEvent(category, title, colorId, start, args) {
    tr.model.TimedEvent.call(this);

    this.category = category || '';
    this.title = title;
    this.colorId = colorId;
    this.start = start;
    this.args = args;

    this.type = undefined;
  };

  InstantEvent.prototype = {
    __proto__: tr.model.TimedEvent.prototype
  };

  function GlobalInstantEvent(category, title, colorId, start, args) {
    InstantEvent.apply(this, arguments);
    this.type = InstantEventType.GLOBAL;
  };

  GlobalInstantEvent.prototype = {
    __proto__: InstantEvent.prototype,
    get userFriendlyName() {
      return 'Global instant event ' + this.title + ' @ ' +
          tr.b.u.TimeStamp.format(start);
    }
  };

  function ProcessInstantEvent(category, title, colorId, start, args) {
    InstantEvent.apply(this, arguments);
    this.type = InstantEventType.PROCESS;
  };

  ProcessInstantEvent.prototype = {
    __proto__: InstantEvent.prototype,

    get userFriendlyName() {
      return 'Process-level instant event ' + this.title + ' @ ' +
          tr.b.u.TimeStamp.format(start);
    }
  };

  tr.model.EventRegistry.register(
      InstantEvent,
      {
        name: 'instantEvent',
        pluralName: 'instantEvents',
        singleViewElementName: 'tr-ui-a-single-instant-event-sub-view',
        multiViewElementName: 'tr-ui-a-multi-instant-event-sub-view'
      });

  return {
    GlobalInstantEvent: GlobalInstantEvent,
    ProcessInstantEvent: ProcessInstantEvent,

    InstantEventType: InstantEventType,
    InstantEvent: InstantEvent
  };
});
