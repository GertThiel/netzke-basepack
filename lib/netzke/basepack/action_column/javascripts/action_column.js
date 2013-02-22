Ext.define('Ext.grid.column.NetzkeAction', {
    extend: 'Ext.grid.column.Action',
    alias: ['widget.netzkeactioncolumn'],

    constructor: function(config) {
        var me = this,
            cfg = Ext.apply({}, config),
            i,
            item;

        me.callParent([cfg]);

        me.renderer = function(actions, meta) {
          // previous renderer
          var v = Ext.isFunction(cfg.renderer) ? cfg.renderer.apply(this, arguments)||'' : '',
              actions = Ext.isEmpty(actions) ? [] : Ext.decode(actions),
              l = actions.length,
              action;

          meta.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';

          for (i = 0; i < l; i++) {
            action = actions[i];
            if (!action.hidden) {
              v += '<img alt="' + (action.altText || me.altText) + '" src="' + (action.icon || Ext.BLANK_IMAGE_URL) +
                  '" class="' + Ext.baseCSSPrefix + 'action-col-icon ' + Ext.baseCSSPrefix + 'action-col-' + String(i) + ' ' +  (action.iconCls || '') +
                  ' ' + (Ext.isFunction(action.getClass) ? action.getClass.apply(action.scope||me.scope||me, arguments) : (me.iconCls || '')) + '"' +
                  ((action.tooltip) ? ' data-qtip="' + action.tooltip + '"' : '') +
                  ' data-name="' + action.name + '"' +
                  ((action.handler) ? ' data-handler="' + action.handler + '"' : '') + ' />';
            }
          }

          return v;
        };
    },

    processEvent : function(type, view, cell, recordIndex, cellIndex, e, record, row){
        var me = this,
            target = e.getTarget(),
            match = target.className.match("x-action-col-icon"),
            fn, grid;
        if (match) {
            if (type == 'click') {
                grid = me.ownerCt.ownerCt;
                fn = (target.getAttribute("data-handler") || "").camelize(true);
                fn = Ext.isFunction(grid[fn]) ? grid[fn] : undefined;
                if (fn) {
                  // If the grid's records have been grouped, record's
                  // and record view's indexes can get out of sync:
                  // http://www.sencha.com/forum/showthread.php?171022
                  if (grid.getStore().groupers.length > 0) {
                    var rec_id;

                    // When fetching the record id from the hidden id
                    // column we must beware of an optional special column
                    if (Ext.get(row.children[0]).hasCls("x-grid-cell-special")) {
                        rec_id = parseInt(row.children[1].textContent);
                    } else {
                        rec_id = parseInt(row.children[0].textContent);
                    }

                    record = grid.getStore().getById( rec_id );
                  }

                  fn.call(grid, record, target, e);
                } else {
                  Netzke.warning("Undefined handler for column action '" + target.getAttribute("data-name") + "'");
                }
            } else if (type == 'mousedown') {
                return false;
            }
        }
        return me.callParent(arguments);
    }
});
