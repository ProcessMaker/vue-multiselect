function V(t) {
  return t === 0 ? !1 : Array.isArray(t) && t.length === 0 ? !0 : !t;
}
function Oe(t) {
  return (...e) => !t(...e);
}
function we(t, e) {
  return t === void 0 && (t = "undefined"), t === null && (t = "null"), t === !1 && (t = "false"), t.toString().toLowerCase().indexOf(e.trim()) !== -1;
}
function he(t, e, i, n) {
  return t.filter((r) => we(n(r, i), e));
}
function Se(t) {
  return t.filter((e) => !e.$isLabel);
}
function D(t, e) {
  return (i) => i.reduce((n, r) => r[t] && r[t].length ? (n.push({
    $groupLabel: r[e],
    $isLabel: !0
  }), n.concat(r[t])) : n, []);
}
function Ee(t, e, i, n, r) {
  return (s) => s.map((a) => {
    if (!a[i])
      return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."), [];
    const l = he(a[i], t, e, r);
    return l.length ? {
      [n]: a[n],
      [i]: l
    } : [];
  });
}
const X = (...t) => (e) => t.reduce((i, n) => n(i), e);
let K = 0;
const Le = {
  data() {
    return {
      search: "",
      isOpen: !1,
      preferredOpenDirection: "below",
      optimizedHeight: this.maxHeight
    };
  },
  props: {
    /**
     * Decide whether to filter the results based on search query.
     * Useful for async filtering, where we search through more complex data.
     * @type {Boolean}
     */
    internalSearch: {
      type: Boolean,
      default: !0
    },
    /**
     * Array of available options: Objects, Strings or Integers.
     * If array of objects, visible label will default to option.label.
     * If `labal` prop is passed, label will equal option['label']
     * @type {Array}
     */
    options: {
      type: Array,
      required: !0
    },
    /**
     * Equivalent to the `multiple` attribute on a `<select>` input.
     * @default false
     * @type {Boolean}
     */
    multiple: {
      type: Boolean,
      default: !1
    },
    /**
     * Presets the selected options value.
     * @type {Object||Array||String||Integer}
     */
    value: {
      type: null,
      default() {
        return [];
      }
    },
    /**
     * Key to compare objects
     * @default 'id'
     * @type {String}
     */
    trackBy: {
      type: String
    },
    /**
     * Label to look for in option Object
     * @default 'label'
     * @type {String}
     */
    label: {
      type: String
    },
    /**
     * Enable/disable search in options
     * @default true
     * @type {Boolean}
     */
    searchable: {
      type: Boolean,
      default: !0
    },
    /**
     * Clear the search input after `)
     * @default true
     * @type {Boolean}
     */
    clearOnSelect: {
      type: Boolean,
      default: !0
    },
    /**
     * Hide already selected options
     * @default false
     * @type {Boolean}
     */
    hideSelected: {
      type: Boolean,
      default: !1
    },
    /**
     * Equivalent to the `placeholder` attribute on a `<select>` input.
     * @default 'Select option'
     * @type {String}
     */
    placeholder: {
      type: String,
      default: "Select option"
    },
    /**
     * Allow to remove all selected values
     * @default true
     * @type {Boolean}
     */
    allowEmpty: {
      type: Boolean,
      default: !0
    },
    /**
     * Reset this.internalValue, this.search after this.internalValue changes.
     * Useful if want to create a stateless dropdown.
     * @default false
     * @type {Boolean}
     */
    resetAfter: {
      type: Boolean,
      default: !1
    },
    /**
     * Enable/disable closing after selecting an option
     * @default true
     * @type {Boolean}
     */
    closeOnSelect: {
      type: Boolean,
      default: !0
    },
    /**
     * Function to interpolate the custom label
     * @default false
     * @type {Function}
     */
    customLabel: {
      type: Function,
      default(t, e) {
        return V(t) ? "" : e ? t[e] : t;
      }
    },
    /**
     * Disable / Enable tagging
     * @default false
     * @type {Boolean}
     */
    taggable: {
      type: Boolean,
      default: !1
    },
    /**
     * String to show when highlighting a potential tag
     * @default 'Press enter to create a tag'
     * @type {String}
    */
    tagPlaceholder: {
      type: String,
      default: "Press enter to create a tag"
    },
    /**
     * By default new tags will appear above the search results.
     * Changing to 'bottom' will revert this behaviour
     * and will proritize the search results
     * @default 'top'
     * @type {String}
    */
    tagPosition: {
      type: String,
      default: "top"
    },
    /**
     * Number of allowed selected options. No limit if 0.
     * @default 0
     * @type {Number}
    */
    max: {
      type: [Number, Boolean],
      default: !1
    },
    /**
     * Will be passed with all events as second param.
     * Useful for identifying events origin.
     * @default null
     * @type {String|Integer}
    */
    id: {
      default: null
    },
    /**
     * Limits the options displayed in the dropdown
     * to the first X options.
     * @default 1000
     * @type {Integer}
    */
    optionsLimit: {
      type: Number,
      default: 1e3
    },
    /**
     * Name of the property containing
     * the group values
     * @default 1000
     * @type {String}
    */
    groupValues: {
      type: String
    },
    /**
     * Name of the property containing
     * the group label
     * @default 1000
     * @type {String}
    */
    groupLabel: {
      type: String
    },
    /**
     * Allow to select all group values
     * by selecting the group label
     * @default false
     * @type {Boolean}
     */
    groupSelect: {
      type: Boolean,
      default: !1
    },
    /**
     * Array of keyboard keys to block
     * when selecting
     * @default 1000
     * @type {String}
    */
    blockKeys: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * Prevent from wiping up the search value
     * @default false
     * @type {Boolean}
    */
    preserveSearch: {
      type: Boolean,
      default: !1
    },
    /**
     * Select 1st options if value is empty
     * @default false
     * @type {Boolean}
    */
    preselectFirst: {
      type: Boolean,
      default: !1
    }
  },
  mounted() {
    !this.multiple && this.max && console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."), this.preselectFirst && !this.internalValue.length && this.options.length && this.select(this.filteredOptions[0]), this.pointer = this.initialPointer();
  },
  beforeCreate() {
    this.uuid = K.toString(), K += 1;
  },
  computed: {
    internalValue() {
      return this.value || this.value === 0 ? Array.isArray(this.value) ? this.value : [this.value] : [];
    },
    filteredOptions() {
      const t = this.search || "", e = t.toLowerCase().trim();
      let i = this.options.concat();
      return this.internalSearch ? i = this.groupValues ? this.filterAndFlat(i, e, this.label) : he(i, e, this.label, this.customLabel) : i = this.groupValues ? D(this.groupValues, this.groupLabel)(i) : i, i = this.hideSelected ? i.filter(Oe(this.isSelected)) : i, this.taggable && e.length && !this.isExistingOption(e) && (this.tagPosition === "bottom" ? i.push({ isTag: !0, label: t }) : i.unshift({ isTag: !0, label: t })), i.slice(0, this.optionsLimit);
    },
    valueKeys() {
      return this.trackBy ? this.internalValue.map((t) => t[this.trackBy]) : this.internalValue;
    },
    optionKeys() {
      return (this.groupValues ? this.flatAndStrip(this.options) : this.options).map((e) => this.customLabel(e, this.label).toString().toLowerCase());
    },
    currentOptionLabel() {
      return this.multiple ? this.searchable ? "" : this.placeholder : this.internalValue.length ? this.getOptionLabel(this.internalValue[0]) : this.searchable ? "" : this.placeholder;
    }
  },
  watch: {
    internalValue() {
      this.resetAfter && this.internalValue.length && (this.search = "", this.$emit("input", this.multiple ? [] : null));
    },
    search() {
      this.$emit("search-change", this.search, this.id);
    }
  },
  methods: {
    /**
     * Returns the internalValue in a way it can be emited to the parent
     * @returns {Object||Array||String||Integer}
     */
    getValue() {
      return this.multiple ? this.internalValue : this.internalValue.length === 0 ? null : this.internalValue[0];
    },
    /**
     * Filters and then flattens the options list
     * @param  {Array}
     * @returns {Array} returns a filtered and flat options list
     */
    filterAndFlat(t, e, i) {
      return X(
        Ee(e, i, this.groupValues, this.groupLabel, this.customLabel),
        D(this.groupValues, this.groupLabel)
      )(t);
    },
    /**
     * Flattens and then strips the group labels from the options list
     * @param  {Array}
     * @returns {Array} returns a flat options list without group labels
     */
    flatAndStrip(t) {
      return X(
        D(this.groupValues, this.groupLabel),
        Se
      )(t);
    },
    /**
     * Updates the search value
     * @param  {String}
     */
    updateSearch(t) {
      this.search = t;
    },
    /**
     * Finds out if the given query is already present
     * in the available options
     * @param  {String}
     * @returns {Boolean} returns true if element is available
     */
    isExistingOption(t) {
      return this.options ? this.optionKeys.indexOf(t) > -1 : !1;
    },
    /**
     * Finds out if the given element is already present
     * in the result value
     * @param  {Object||String||Integer} option passed element to check
     * @returns {Boolean} returns true if element is selected
     */
    isSelected(t) {
      const e = this.trackBy ? t[this.trackBy] : t;
      return this.valueKeys.indexOf(e) > -1;
    },
    /**
     * When mounted, pick the first item and set the pointer to it
     * @returns {Integer}
     */
    initialPointer() {
      const t = this.options.findIndex((e) => e === this.internalValue[0]);
      return t === -1 ? 0 : t;
    },
    /**
     * Finds out if the given option is disabled
     * @param  {Object||String||Integer} option passed element to check
     * @returns {Boolean} returns true if element is disabled
     */
    isOptionDisabled(t) {
      return !!t.$isDisabled;
    },
    /**
     * Returns empty string when options is null/undefined
     * Returns tag query if option is tag.
     * Returns the customLabel() results and casts it to string.
     *
     * @param  {Object||String||Integer} Passed option
     * @returns {Object||String}
     */
    getOptionLabel(t) {
      if (V(t))
        return "";
      if (t.isTag)
        return t.label;
      if (t.$isLabel)
        return t.$groupLabel;
      let e = this.customLabel(t, this.label);
      return V(e) ? "" : e;
    },
    /**
     * Add the given option to the list of selected options
     * or sets the option as the selected option.
     * If option is already selected -> remove it from the results.
     *
     * @param  {Object||String||Integer} option to select/deselect
     * @param  {Boolean} block removing
     */
    select(t, e) {
      if (t.$isLabel && this.groupSelect) {
        this.selectGroup(t);
        return;
      }
      if (!(this.blockKeys.indexOf(e) !== -1 || this.disabled || t.$isDisabled || t.$isLabel) && !(this.max && this.multiple && this.internalValue.length === this.max) && !(e === "Tab" && !this.pointerDirty)) {
        if (t.isTag)
          this.$emit("tag", t.label, this.id), this.search = "", this.closeOnSelect && !this.multiple && this.deactivate();
        else {
          if (this.isSelected(t)) {
            e !== "Tab" && this.removeElement(t);
            return;
          }
          this.$emit("select", t, this.id), this.multiple ? this.$emit("input", this.internalValue.concat([t]), this.id) : this.$emit("input", t, this.id), this.clearOnSelect && (this.search = "");
        }
        this.closeOnSelect && this.deactivate();
      }
    },
    /**
     * Add the given group options to the list of selected options
     * If all group optiona are already selected -> remove it from the results.
     *
     * @param  {Object||String||Integer} group to select/deselect
     */
    selectGroup(t) {
      const e = this.options.find((i) => i[this.groupLabel] === t.$groupLabel);
      if (e) {
        if (this.wholeGroupSelected(e)) {
          this.$emit("remove", e[this.groupValues], this.id);
          const i = this.internalValue.filter(
            (n) => e[this.groupValues].indexOf(n) === -1
          );
          this.$emit("input", i, this.id);
        } else {
          const i = e[this.groupValues].filter(
            (n) => !(this.isOptionDisabled(n) || this.isSelected(n))
          );
          this.$emit("select", i, this.id), this.$emit(
            "input",
            this.internalValue.concat(i),
            this.id
          );
        }
        this.closeOnSelect && this.deactivate();
      }
    },
    /**
     * Helper to identify if all values in a group are selected
     *
     * @param {Object} group to validated selected values against
     */
    wholeGroupSelected(t) {
      return t[this.groupValues].every(
        (e) => this.isSelected(e) || this.isOptionDisabled(e)
      );
    },
    /**
     * Helper to identify if all values in a group are disabled
     *
     * @param {Object} group to check for disabled values
     */
    wholeGroupDisabled(t) {
      return t[this.groupValues].every(this.isOptionDisabled);
    },
    /**
     * Removes the given option from the selected options.
     * Additionally checks this.allowEmpty prop if option can be removed when
     * it is the last selected option.
     *
     * @param  {type} option description
     * @returns {type}        description
     */
    removeElement(t, e = !0) {
      if (this.disabled || t.$isDisabled)
        return;
      if (!this.allowEmpty && this.internalValue.length <= 1) {
        this.deactivate();
        return;
      }
      const i = typeof t == "object" ? this.valueKeys.indexOf(t[this.trackBy]) : this.valueKeys.indexOf(t);
      if (this.$emit("remove", t, this.id), this.multiple) {
        const n = this.internalValue.slice(0, i).concat(this.internalValue.slice(i + 1));
        this.$emit("input", n, this.id);
      } else
        this.$emit("input", null, this.id);
      this.closeOnSelect && e && this.deactivate();
    },
    /**
     * Calls this.removeElement() with the last element
     * from this.internalValue (selected element Array)
     *
     * @fires this#removeElement
     */
    removeLastElement() {
      this.blockKeys.indexOf("Delete") === -1 && this.search.length === 0 && Array.isArray(this.internalValue) && this.internalValue.length && this.removeElement(this.internalValue[this.internalValue.length - 1], !1);
    },
    /**
     * Opens the multiselect’s dropdown.
     * Sets this.isOpen to TRUE
     */
    activate() {
      this.isOpen || this.disabled || (this.adjustPosition(), this.groupValues && this.pointer === 0 && this.filteredOptions.length && (this.pointer = 1), this.isOpen = !0, this.searchable ? (this.preserveSearch || (this.search = ""), this.$nextTick(() => this.$refs.search && this.$refs.search.focus())) : this.$el.focus(), this.$emit("open", this.id));
    },
    /**
     * Closes the multiselect’s dropdown.
     * Sets this.isOpen to FALSE
     */
    deactivate() {
      this.isOpen && (this.isOpen = !1, this.searchable ? this.$refs.search && this.$refs.search.blur() : this.$el.blur(), this.preserveSearch || (this.search = ""), this.$emit("close", this.getValue(), this.id));
    },
    /**
     * Call this.activate() or this.deactivate()
     * depending on this.isOpen value.
     *
     * @fires this#activate || this#deactivate
     * @property {Boolean} isOpen indicates if dropdown is open
     */
    toggle() {
      this.isOpen ? this.deactivate() : this.activate();
    },
    /**
     * Updates the hasEnoughSpace variable used for
     * detecting where to expand the dropdown
     */
    adjustPosition() {
      if (typeof window > "u")
        return;
      const t = this.$el.getBoundingClientRect().top, e = window.innerHeight - this.$el.getBoundingClientRect().bottom;
      e > this.maxHeight || e > t || this.openDirection === "below" || this.openDirection === "bottom" ? (this.preferredOpenDirection = "below", this.optimizedHeight = Math.min(e - 40, this.maxHeight)) : (this.preferredOpenDirection = "above", this.optimizedHeight = Math.min(t - 40, this.maxHeight));
    }
  }
}, ke = {
  data() {
    return {
      pointer: 0,
      pointerDirty: !1
    };
  },
  props: {
    /**
     * Enable/disable highlighting of the pointed value.
     * @type {Boolean}
     * @default true
     */
    showPointer: {
      type: Boolean,
      default: !0
    },
    optionHeight: {
      type: Number,
      default: 40
    }
  },
  computed: {
    pointerPosition() {
      return this.pointer * this.optionHeight;
    },
    visibleElements() {
      return this.optimizedHeight / this.optionHeight;
    }
  },
  watch: {
    filteredOptions() {
      this.pointerAdjust();
    },
    isOpen() {
      this.pointerDirty = !1;
    },
    pointer() {
      this.$refs.search && this.$refs.search.setAttribute("aria-activedescendant", "option-" + this.uuid + "-" + this.pointer.toString());
    }
  },
  methods: {
    optionHighlight(t, e) {
      return {
        "multiselect__option--highlight": t === this.pointer && this.showPointer,
        "multiselect__option--selected": this.isSelected(e)
      };
    },
    groupHighlight(t, e) {
      if (!this.groupSelect)
        return [
          "multiselect__option--disabled",
          { "multiselect__option--group": e.$isLabel }
        ];
      const i = this.options.find((n) => n[this.groupLabel] === e.$groupLabel);
      return i && !this.wholeGroupDisabled(i) ? [
        "multiselect__option--group",
        { "multiselect__option--highlight": t === this.pointer && this.showPointer },
        { "multiselect__option--group-selected": this.wholeGroupSelected(i) }
      ] : "multiselect__option--disabled";
    },
    addPointerElement({ key: t } = "Enter") {
      this.filteredOptions.length > 0 && this.select(this.filteredOptions[this.pointer], t);
    },
    pointerForward() {
      this.pointer < this.filteredOptions.length - 1 && (this.pointer++, this.$refs.list.scrollTop <= this.pointerPosition - (this.visibleElements - 1) * this.optionHeight && (this.$refs.list.scrollTop = this.pointerPosition - (this.visibleElements - 1) * this.optionHeight), this.filteredOptions[this.pointer] && this.filteredOptions[this.pointer].$isLabel && !this.groupSelect && this.pointerForward()), this.pointerDirty = !0;
    },
    pointerBackward() {
      this.pointer > 0 ? (this.pointer--, this.$refs.list.scrollTop >= this.pointerPosition && (this.$refs.list.scrollTop = this.pointerPosition), this.filteredOptions[this.pointer] && this.filteredOptions[this.pointer].$isLabel && !this.groupSelect && this.pointerBackward()) : this.filteredOptions[this.pointer] && this.filteredOptions[0].$isLabel && !this.groupSelect && this.pointerForward(), this.pointerDirty = !0;
    },
    pointerReset() {
      this.closeOnSelect && (this.pointer = 0, this.$refs.list && (this.$refs.list.scrollTop = 0));
    },
    pointerAdjust() {
      this.pointer >= this.filteredOptions.length - 1 && (this.pointer = this.filteredOptions.length ? this.filteredOptions.length - 1 : 0), this.filteredOptions.length > 0 && this.filteredOptions[this.pointer].$isLabel && !this.groupSelect && this.pointerForward();
    },
    pointerSet(t) {
      this.pointer = t, this.pointerDirty = !0;
    }
  }
};
var H = {}, U = function(t) {
  return typeof t == "object" ? t !== null : typeof t == "function";
}, Te = U, z = function(t) {
  if (!Te(t))
    throw TypeError(t + " is not an object!");
  return t;
}, k = function(t) {
  try {
    return !!t();
  } catch {
    return !0;
  }
}, T = !k(function() {
  return Object.defineProperty({}, "a", { get: function() {
    return 7;
  } }).a != 7;
}), v = {}, Ve = {
  get exports() {
    return v;
  },
  set exports(t) {
    v = t;
  }
}, De = Ve.exports = typeof window < "u" && window.Math == Math ? window : typeof self < "u" && self.Math == Math ? self : Function("return this")();
typeof __g == "number" && (__g = De);
var C, Z;
function Ce() {
  if (Z)
    return C;
  Z = 1;
  var t = U, e = v.document, i = t(e) && t(e.createElement);
  return C = function(n) {
    return i ? e.createElement(n) : {};
  }, C;
}
var Pe = !T && !k(function() {
  return Object.defineProperty(Ce()("div"), "a", { get: function() {
    return 7;
  } }).a != 7;
}), _ = U, $e = function(t, e) {
  if (!_(t))
    return t;
  var i, n;
  if (e && typeof (i = t.toString) == "function" && !_(n = i.call(t)) || typeof (i = t.valueOf) == "function" && !_(n = i.call(t)) || !e && typeof (i = t.toString) == "function" && !_(n = i.call(t)))
    return n;
  throw TypeError("Can't convert object to primitive value");
}, J = z, Be = Pe, Ae = $e, Re = Object.defineProperty;
H.f = T ? Object.defineProperty : function(e, i, n) {
  if (J(e), i = Ae(i, !0), J(n), Be)
    try {
      return Re(e, i, n);
    } catch {
    }
  if ("get" in n || "set" in n)
    throw TypeError("Accessors not supported!");
  return "value" in n && (e[i] = n.value), e;
};
var je = H.f, Q = Function.prototype, Ne = /^\s*function ([^ (]*)/, Y = "name";
Y in Q || T && je(Q, Y, {
  configurable: !0,
  get: function() {
    try {
      return ("" + this).match(Ne)[1];
    } catch {
      return "";
    }
  }
});
var Ie = Object.is || function(e, i) {
  return e === i ? e !== 0 || 1 / e === 1 / i : e != e && i != i;
}, Fe = {}.toString, fe = function(t) {
  return Fe.call(t).slice(8, -1);
}, O = {}, Ge = {
  get exports() {
    return O;
  },
  set exports(t) {
    O = t;
  }
}, w = {}, Me = {
  get exports() {
    return w;
  },
  set exports(t) {
    w = t;
  }
}, b = {}, He = {
  get exports() {
    return b;
  },
  set exports(t) {
    b = t;
  }
}, Ue = He.exports = { version: "2.6.12" };
typeof __e == "number" && (__e = Ue);
var ze = b, ee = v, te = "__core-js_shared__", ie = ee[te] || (ee[te] = {});
(Me.exports = function(t, e) {
  return ie[t] || (ie[t] = e !== void 0 ? e : {});
})("versions", []).push({
  version: ze.version,
  mode: "global",
  copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
});
var qe = 0, We = Math.random(), pe = function(t) {
  return "Symbol(".concat(t === void 0 ? "" : t, ")_", (++qe + We).toString(36));
}, R = w("wks"), Xe = pe, j = v.Symbol, re = typeof j == "function", Ke = Ge.exports = function(t) {
  return R[t] || (R[t] = re && j[t] || (re ? j : Xe)("Symbol." + t));
};
Ke.store = R;
var N = fe, Ze = O("toStringTag"), Je = N(function() {
  return arguments;
}()) == "Arguments", Qe = function(t, e) {
  try {
    return t[e];
  } catch {
  }
}, Ye = function(t) {
  var e, i, n;
  return t === void 0 ? "Undefined" : t === null ? "Null" : typeof (i = Qe(e = Object(t), Ze)) == "string" ? i : Je ? N(e) : (n = N(e)) == "Object" && typeof e.callee == "function" ? "Arguments" : n;
}, et = Ye, tt = RegExp.prototype.exec, it = function(t, e) {
  var i = t.exec;
  if (typeof i == "function") {
    var n = i.call(t, e);
    if (typeof n != "object")
      throw new TypeError("RegExp exec method returned something other than an Object or null");
    return n;
  }
  if (et(t) !== "RegExp")
    throw new TypeError("RegExp#exec called on incompatible receiver");
  return tt.call(t, e);
}, rt = z, nt = function() {
  var t = rt(this), e = "";
  return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), t.unicode && (e += "u"), t.sticky && (e += "y"), e;
}, st = nt, S = RegExp.prototype.exec, at = String.prototype.replace, de = S, E = "lastIndex", I = function() {
  var t = /a/, e = /b*/g;
  return S.call(t, "a"), S.call(e, "a"), t[E] !== 0 || e[E] !== 0;
}(), F = /()??/.exec("")[1] !== void 0, lt = I || F;
lt && (de = function(e) {
  var i = this, n, r, s, a;
  return F && (r = new RegExp("^" + i.source + "$(?!\\s)", st.call(i))), I && (n = i[E]), s = S.call(i, e), I && s && (i[E] = i.global ? s.index + s[0].length : n), F && s && s.length > 1 && at.call(s[0], r, function() {
    for (a = 1; a < arguments.length - 2; a++)
      arguments[a] === void 0 && (s[a] = void 0);
  }), s;
});
var ge = de, ot = function(t, e) {
  return {
    enumerable: !(t & 1),
    configurable: !(t & 2),
    writable: !(t & 4),
    value: e
  };
}, ut = H, ct = ot, q = T ? function(t, e, i) {
  return ut.f(t, e, ct(1, i));
} : function(t, e, i) {
  return t[e] = i, t;
}, L = {}, ht = {
  get exports() {
    return L;
  },
  set exports(t) {
    L = t;
  }
}, ft = {}.hasOwnProperty, pt = function(t, e) {
  return ft.call(t, e);
}, dt = w("native-function-to-string", Function.toString), gt = v, y = q, ne = pt, P = pe("src"), W = dt, ve = "toString", vt = ("" + W).split(ve);
b.inspectSource = function(t) {
  return W.call(t);
};
(ht.exports = function(t, e, i, n) {
  var r = typeof i == "function";
  r && (ne(i, "name") || y(i, "name", e)), t[e] !== i && (r && (ne(i, P) || y(i, P, t[e] ? "" + t[e] : vt.join(String(e)))), t === gt ? t[e] = i : n ? t[e] ? t[e] = i : y(t, e, i) : (delete t[e], y(t, e, i)));
})(Function.prototype, ve, function() {
  return typeof this == "function" && this[P] || W.call(this);
});
var mt = function(t) {
  if (typeof t != "function")
    throw TypeError(t + " is not a function!");
  return t;
}, bt = mt, _t = function(t, e, i) {
  if (bt(t), e === void 0)
    return t;
  switch (i) {
    case 1:
      return function(n) {
        return t.call(e, n);
      };
    case 2:
      return function(n, r) {
        return t.call(e, n, r);
      };
    case 3:
      return function(n, r, s) {
        return t.call(e, n, r, s);
      };
  }
  return function() {
    return t.apply(e, arguments);
  };
}, m = v, x = b, yt = q, xt = L, se = _t, $ = "prototype", p = function(t, e, i) {
  var n = t & p.F, r = t & p.G, s = t & p.S, a = t & p.P, l = t & p.B, o = r ? m : s ? m[e] || (m[e] = {}) : (m[e] || {})[$], c = r ? x : x[e] || (x[e] = {}), f = c[$] || (c[$] = {}), u, h, d, g;
  r && (i = e);
  for (u in i)
    h = !n && o && o[u] !== void 0, d = (h ? o : i)[u], g = l && h ? se(d, m) : a && typeof d == "function" ? se(Function.call, d) : d, o && xt(o, u, d, t & p.U), c[u] != d && yt(c, u, g), a && f[u] != d && (f[u] = d);
};
m.core = x;
p.F = 1;
p.G = 2;
p.S = 4;
p.P = 8;
p.B = 16;
p.W = 32;
p.U = 64;
p.R = 128;
var me = p, ae = ge;
me({
  target: "RegExp",
  proto: !0,
  forced: ae !== /./.exec
}, {
  exec: ae
});
var be = function(t) {
  if (t == null)
    throw TypeError("Can't call method on  " + t);
  return t;
}, Ot = L, wt = q, G = k, St = be, _e = O, Et = ge, Lt = _e("species"), kt = !G(function() {
  var t = /./;
  return t.exec = function() {
    var e = [];
    return e.groups = { a: "7" }, e;
  }, "".replace(t, "$<a>") !== "7";
}), Tt = function() {
  var t = /(?:)/, e = t.exec;
  t.exec = function() {
    return e.apply(this, arguments);
  };
  var i = "ab".split(t);
  return i.length === 2 && i[0] === "a" && i[1] === "b";
}(), Vt = function(t, e, i) {
  var n = _e(t), r = !G(function() {
    var f = {};
    return f[n] = function() {
      return 7;
    }, ""[t](f) != 7;
  }), s = r ? !G(function() {
    var f = !1, u = /a/;
    return u.exec = function() {
      return f = !0, null;
    }, t === "split" && (u.constructor = {}, u.constructor[Lt] = function() {
      return u;
    }), u[n](""), !f;
  }) : void 0;
  if (!r || !s || t === "replace" && !kt || t === "split" && !Tt) {
    var a = /./[n], l = i(
      St,
      n,
      ""[t],
      function(u, h, d, g, xe) {
        return h.exec === Et ? r && !xe ? { done: !0, value: a.call(h, d, g) } : { done: !0, value: u.call(d, h, g) } : { done: !1 };
      }
    ), o = l[0], c = l[1];
    Ot(String.prototype, t, o), wt(
      RegExp.prototype,
      n,
      e == 2 ? function(f, u) {
        return c.call(f, this, u);
      } : function(f) {
        return c.call(f, this);
      }
    );
  }
}, Dt = z, le = Ie, Ct = it;
Vt("search", 1, function(t, e, i, n) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function(s) {
      var a = t(this), l = s == null ? void 0 : s[e];
      return l !== void 0 ? l.call(s, a) : new RegExp(s)[e](String(a));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function(r) {
      var s = n(i, r, this);
      if (s.done)
        return s.value;
      var a = Dt(r), l = String(this), o = a.lastIndex;
      le(o, 0) || (a.lastIndex = 0);
      var c = Ct(a, l);
      return le(a.lastIndex, o) || (a.lastIndex = o), c === null ? -1 : c.index;
    }
  ];
});
var Pt = fe, $t = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
  return Pt(t) == "String" ? t.split("") : Object(t);
}, Bt = $t, At = be, Rt = function(t) {
  return Bt(At(t));
}, jt = Math.ceil, Nt = Math.floor, ye = function(t) {
  return isNaN(t = +t) ? 0 : (t > 0 ? Nt : jt)(t);
}, It = ye, Ft = Math.min, Gt = function(t) {
  return t > 0 ? Ft(It(t), 9007199254740991) : 0;
}, Mt = ye, Ht = Math.max, Ut = Math.min, zt = function(t, e) {
  return t = Mt(t), t < 0 ? Ht(t + e, 0) : Ut(t, e);
}, qt = Rt, Wt = Gt, Xt = zt, Kt = function(t) {
  return function(e, i, n) {
    var r = qt(e), s = Wt(r.length), a = Xt(n, s), l;
    if (t && i != i) {
      for (; s > a; )
        if (l = r[a++], l != l)
          return !0;
    } else
      for (; s > a; a++)
        if ((t || a in r) && r[a] === i)
          return t || a || 0;
    return !t && -1;
  };
}, B, oe;
function Zt() {
  if (oe)
    return B;
  oe = 1;
  var t = k;
  return B = function(e, i) {
    return !!e && t(function() {
      i ? e.call(null, function() {
      }, 1) : e.call(null);
    });
  }, B;
}
var A = me, Jt = Kt(!1), M = [].indexOf, ue = !!M && 1 / [1].indexOf(1, -0) < 0;
A(A.P + A.F * (ue || !Zt()(M)), "Array", {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function(e) {
    return ue ? M.apply(this, arguments) || 0 : Jt(this, e, arguments[1]);
  }
});
var Qt = function() {
  var e = this, i = e.$createElement, n = e._self._c || i;
  return n("div", {
    staticClass: "multiselect",
    class: {
      "multiselect--active": e.isOpen,
      "multiselect--disabled": e.disabled,
      "multiselect--above": e.isAbove
    },
    attrs: {
      tabindex: e.searchable ? -1 : e.tabindex,
      role: "combobox",
      "aria-expanded": e.isOpen ? "true" : "false",
      "aria-owns": "listbox-" + e.uuid,
      "aria-haspopup": "listbox"
    },
    on: {
      focus: function(s) {
        return e.activate();
      },
      blur: function(s) {
        e.searchable || e.deactivate();
      },
      keydown: [function(r) {
        return !r.type.indexOf("key") && e._k(r.keyCode, "down", 40, r.key, ["Down", "ArrowDown"]) || r.target !== r.currentTarget ? null : (r.preventDefault(), e.pointerForward());
      }, function(r) {
        return !r.type.indexOf("key") && e._k(r.keyCode, "up", 38, r.key, ["Up", "ArrowUp"]) || r.target !== r.currentTarget ? null : (r.preventDefault(), e.pointerBackward());
      }],
      keypress: function(s) {
        return !s.type.indexOf("key") && e._k(s.keyCode, "enter", 13, s.key, "Enter") && e._k(s.keyCode, "tab", 9, s.key, "Tab") || (s.stopPropagation(), s.target !== s.currentTarget) ? null : e.addPointerElement(s);
      },
      keyup: function(s) {
        return !s.type.indexOf("key") && e._k(s.keyCode, "esc", 27, s.key, ["Esc", "Escape"]) ? null : e.deactivate();
      }
    }
  }, [e._t("caret", function() {
    return [n("div", {
      staticClass: "multiselect__select",
      on: {
        mousedown: function(s) {
          return s.preventDefault(), s.stopPropagation(), e.toggle();
        }
      }
    })];
  }, {
    toggle: e.toggle
  }), e._t("clear", null, {
    search: e.search
  }), n("div", {
    ref: "tags",
    staticClass: "multiselect__tags"
  }, [e._t("selection", function() {
    return [n("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: e.visibleValues.length > 0,
        expression: "visibleValues.length > 0"
      }],
      staticClass: "multiselect__tags-wrap"
    }, [e._l(e.visibleValues, function(r, s) {
      return [e._t("tag", function() {
        return [n("span", {
          key: s,
          staticClass: "multiselect__tag"
        }, [n("span", {
          domProps: {
            textContent: e._s(e.getOptionLabel(r))
          }
        }), n("i", {
          staticClass: "multiselect__tag-icon",
          attrs: {
            role: "button",
            "aria-label": "Remove Element"
          },
          on: {
            keypress: function(l) {
              return !l.type.indexOf("key") && e._k(l.keyCode, "enter", 13, l.key, "Enter") ? null : (l.preventDefault(), e.removeElement(r));
            },
            mousedown: function(l) {
              return l.preventDefault(), e.removeElement(r);
            }
          }
        })])];
      }, {
        option: r,
        search: e.search,
        remove: e.removeElement
      })];
    })], 2), e.internalValue && e.internalValue.length > e.limit ? [e._t("limit", function() {
      return [n("strong", {
        staticClass: "multiselect__strong",
        domProps: {
          textContent: e._s(e.limitText(e.internalValue.length - e.limit))
        }
      })];
    })] : e._e()];
  }, {
    search: e.search,
    remove: e.removeElement,
    values: e.visibleValues,
    isOpen: e.isOpen
  }), n("transition", {
    attrs: {
      name: "multiselect__loading"
    }
  }, [e._t("loading", function() {
    return [n("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: e.loading,
        expression: "loading"
      }],
      staticClass: "multiselect__spinner"
    })];
  })], 2), e.searchable ? n("input", {
    ref: "search",
    staticClass: "multiselect__input",
    style: e.inputStyle,
    attrs: {
      name: e.name,
      id: e.id,
      type: "text",
      autocomplete: "off",
      spellcheck: "false",
      placeholder: e.placeholder,
      "aria-placeholder": e.placeholder,
      "aria-autocomplete": "list",
      disabled: e.disabled,
      tabindex: e.tabindex,
      "aria-controls": "listbox-" + e.uuid
    },
    domProps: {
      value: e.search
    },
    on: {
      input: function(s) {
        return e.updateSearch(s.target.value);
      },
      focus: function(s) {
        return s.preventDefault(), e.activate();
      },
      blur: function(s) {
        return s.preventDefault(), e.deactivate();
      },
      keyup: function(s) {
        return !s.type.indexOf("key") && e._k(s.keyCode, "esc", 27, s.key, ["Esc", "Escape"]) ? null : e.deactivate();
      },
      keydown: [function(r) {
        return !r.type.indexOf("key") && e._k(r.keyCode, "down", 40, r.key, ["Down", "ArrowDown"]) ? null : (r.preventDefault(), e.pointerForward());
      }, function(r) {
        return !r.type.indexOf("key") && e._k(r.keyCode, "up", 38, r.key, ["Up", "ArrowUp"]) ? null : (r.preventDefault(), e.pointerBackward());
      }, function(r) {
        return !r.type.indexOf("key") && e._k(r.keyCode, "delete", [8, 46], r.key, ["Backspace", "Delete", "Del"]) ? null : (r.stopPropagation(), e.removeLastElement());
      }],
      keypress: function(s) {
        return !s.type.indexOf("key") && e._k(s.keyCode, "enter", 13, s.key, "Enter") || (s.preventDefault(), s.stopPropagation(), s.target !== s.currentTarget) ? null : e.addPointerElement(s);
      }
    }
  }) : e._e(), e.isSingleLabelVisible ? n("span", {
    staticClass: "multiselect__single",
    on: {
      mousedown: function(s) {
        return s.preventDefault(), e.toggle.apply(null, arguments);
      }
    }
  }, [e._t("singleLabel", function() {
    return [[e._v(e._s(e.currentOptionLabel))]];
  }, {
    option: e.singleValue
  })], 2) : e._e(), e.isPlaceholderVisible ? n("span", {
    staticClass: "multiselect__placeholder",
    on: {
      mousedown: function(s) {
        return s.preventDefault(), e.toggle.apply(null, arguments);
      }
    }
  }, [e._t("placeholder", function() {
    return [e._v(" " + e._s(e.placeholder) + " ")];
  })], 2) : e._e()], 2), n("transition", {
    attrs: {
      name: "multiselect"
    }
  }, [n("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: e.isOpen,
      expression: "isOpen"
    }],
    ref: "list",
    staticClass: "multiselect__content-wrapper",
    style: {
      maxHeight: e.optimizedHeight + "px"
    },
    attrs: {
      tabindex: "-1"
    },
    on: {
      focus: e.activate,
      mousedown: function(s) {
        s.preventDefault();
      }
    }
  }, [n("ul", {
    staticClass: "multiselect__content",
    style: e.contentStyle,
    attrs: {
      role: "listbox",
      id: "listbox-" + e.uuid
    }
  }, [e._t("beforeList"), e.multiple && e.max === e.internalValue.length ? n("li", [n("span", {
    staticClass: "multiselect__option"
  }, [e._t("maxElements", function() {
    return [e._v("Maximum of " + e._s(e.max) + " options selected. First remove a selected option to select another.")];
  })], 2)]) : e._e(), !e.max || e.internalValue.length < e.max ? e._l(e.filteredOptions, function(r, s) {
    return n("li", {
      key: s,
      staticClass: "multiselect__element",
      attrs: {
        id: "option-" + e.uuid + "-" + s,
        role: r && (r.$isLabel || r.$isDisabled) ? null : "option",
        "aria-selected": e.isSelected(r) ? "true" : "false",
        "aria-label": e.getOptionLabel(r) + ". " + (e.isSelected(r) ? e.deselectLabelText : e.selectLabelText)
      }
    }, [r && (r.$isLabel || r.$isDisabled) ? e._e() : n("span", {
      staticClass: "multiselect__option",
      class: e.optionHighlight(s, r),
      attrs: {
        "data-select": r && r.isTag ? e.tagPlaceholder : e.selectLabelText,
        "data-selected": e.selectedLabelText,
        "data-deselect": e.deselectLabelText
      },
      on: {
        click: function(l) {
          return l.stopPropagation(), e.select(r);
        },
        mouseenter: function(l) {
          return l.target !== l.currentTarget ? null : e.pointerSet(s);
        }
      }
    }, [e._t("option", function() {
      return [n("span", [e._v(e._s(e.getOptionLabel(r)))])];
    }, {
      option: r,
      search: e.search,
      index: s
    })], 2), r && (r.$isLabel || r.$isDisabled) ? n("span", {
      staticClass: "multiselect__option",
      class: e.groupHighlight(s, r),
      attrs: {
        "data-select": e.groupSelect && e.selectGroupLabelText,
        "data-deselect": e.groupSelect && e.deselectGroupLabelText
      },
      on: {
        mouseenter: function(l) {
          if (l.target !== l.currentTarget)
            return null;
          e.groupSelect && e.pointerSet(s);
        },
        mousedown: function(l) {
          return l.preventDefault(), e.selectGroup(r);
        }
      }
    }, [e._t("option", function() {
      return [n("span", [e._v(e._s(e.getOptionLabel(r)))])];
    }, {
      option: r,
      search: e.search,
      index: s
    })], 2) : e._e()]);
  }) : e._e(), n("li", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: e.showNoResults && e.filteredOptions.length === 0 && e.search && !e.loading,
      expression: "showNoResults && (filteredOptions.length === 0 && search && !loading)"
    }]
  }, [n("span", {
    staticClass: "multiselect__option"
  }, [e._t("noResult", function() {
    return [e._v("No elements found. Consider changing the search query.")];
  }, {
    search: e.search
  })], 2)]), n("li", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: e.showNoOptions && e.options.length === 0 && !e.search && !e.loading,
      expression: "showNoOptions && (options.length === 0 && !search && !loading)"
    }]
  }, [n("span", {
    staticClass: "multiselect__option"
  }, [e._t("noOptions", function() {
    return [e._v("List is empty.")];
  })], 2)]), e._t("afterList")], 2)])])], 2);
}, Yt = [];
function ei(t, e, i, n, r, s, a, l) {
  var o = typeof t == "function" ? t.options : t;
  e && (o.render = e, o.staticRenderFns = i, o._compiled = !0), n && (o.functional = !0), s && (o._scopeId = "data-v-" + s);
  var c;
  if (a ? (c = function(h) {
    h = h || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !h && typeof __VUE_SSR_CONTEXT__ < "u" && (h = __VUE_SSR_CONTEXT__), r && r.call(this, h), h && h._registeredComponents && h._registeredComponents.add(a);
  }, o._ssrRegister = c) : r && (c = l ? function() {
    r.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), c)
    if (o.functional) {
      o._injectStyles = c;
      var f = o.render;
      o.render = function(d, g) {
        return c.call(g), f(d, g);
      };
    } else {
      var u = o.beforeCreate;
      o.beforeCreate = u ? [].concat(u, c) : [c];
    }
  return {
    exports: t,
    options: o
  };
}
const ti = {
  name: "vue-multiselect",
  mixins: [Le, ke],
  props: {
    /**
     * name attribute to match optional label element
     * @default ''
     * @type {String}
     */
    name: {
      type: String,
      default: ""
    },
    /**
     * String to show when pointing to an option
     * @default 'Press enter to select'
     * @type {String}
     */
    selectLabel: {
      type: String,
      default: "Press enter to select"
    },
    /**
     * String to show when pointing to an option
     * @default 'Press enter to select'
     * @type {String}
     */
    selectGroupLabel: {
      type: String,
      default: "Press enter to select group"
    },
    /**
     * String to show next to selected option
     * @default 'Selected'
     * @type {String}
     */
    selectedLabel: {
      type: String,
      default: "Selected"
    },
    /**
     * String to show when pointing to an already selected option
     * @default 'Press enter to remove'
     * @type {String}
     */
    deselectLabel: {
      type: String,
      default: "Press enter to remove"
    },
    /**
     * String to show when pointing to an already selected option
     * @default 'Press enter to remove'
     * @type {String}
     */
    deselectGroupLabel: {
      type: String,
      default: "Press enter to deselect group"
    },
    /**
     * Decide whether to show pointer labels
     * @default true
     * @type {Boolean}
     */
    showLabels: {
      type: Boolean,
      default: !0
    },
    /**
     * Limit the display of selected options. The rest will be hidden within the limitText string.
     * @default 99999
     * @type {Integer}
     */
    limit: {
      type: Number,
      default: 99999
    },
    /**
     * Sets maxHeight style value of the dropdown
     * @default 300
     * @type {Integer}
     */
    maxHeight: {
      type: Number,
      default: 300
    },
    /**
     * Function that process the message shown when selected
     * elements pass the defined limit.
     * @default 'and * more'
     * @param {Int} count Number of elements more than limit
     * @type {Function}
     */
    limitText: {
      type: Function,
      default: (t) => `and ${t} more`
    },
    /**
     * Set true to trigger the loading spinner.
     * @default False
     * @type {Boolean}
     */
    loading: {
      type: Boolean,
      default: !1
    },
    /**
     * Disables the multiselect if true.
     * @default false
     * @type {Boolean}
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * Fixed opening direction
     * @default ''
     * @type {String}
     */
    openDirection: {
      type: String,
      default: ""
    },
    /**
     * Shows slot with message about empty options
     * @default true
     * @type {Boolean}
     */
    showNoOptions: {
      type: Boolean,
      default: !0
    },
    showNoResults: {
      type: Boolean,
      default: !0
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isSingleLabelVisible() {
      return (this.singleValue || this.singleValue === 0) && (!this.isOpen || !this.searchable) && !this.visibleValues.length;
    },
    isPlaceholderVisible() {
      return !this.internalValue.length && (!this.searchable || !this.isOpen);
    },
    visibleValues() {
      return this.multiple ? this.internalValue.slice(0, this.limit) : [];
    },
    singleValue() {
      return this.internalValue[0];
    },
    deselectLabelText() {
      return this.showLabels ? this.deselectLabel : "";
    },
    deselectGroupLabelText() {
      return this.showLabels ? this.deselectGroupLabel : "";
    },
    selectLabelText() {
      return this.showLabels ? this.selectLabel : "";
    },
    selectGroupLabelText() {
      return this.showLabels ? this.selectGroupLabel : "";
    },
    selectedLabelText() {
      return this.showLabels ? this.selectedLabel : "";
    },
    inputStyle() {
      return this.searchable || this.multiple && this.value && this.value.length ? this.isOpen ? { width: "100%" } : { width: "0", position: "absolute", padding: "0" } : "";
    },
    contentStyle() {
      return this.options.length ? { display: "inline-block" } : { display: "block" };
    },
    isAbove() {
      return this.openDirection === "above" || this.openDirection === "top" ? !0 : this.openDirection === "below" || this.openDirection === "bottom" ? !1 : this.preferredOpenDirection === "above";
    },
    showSearchInput() {
      return this.searchable && (this.hasSingleSelectedSlot && (this.visibleSingleValue || this.visibleSingleValue === 0) ? this.isOpen : !0);
    }
  }
}, ce = {};
var ii = /* @__PURE__ */ ei(
  ti,
  Qt,
  Yt,
  !1,
  ri,
  null,
  null,
  null
);
function ri(t) {
  for (let e in ce)
    this[e] = ce[e];
}
const ni = /* @__PURE__ */ function() {
  return ii.exports;
}();
export {
  ni as Multiselect,
  ni as default,
  Le as multiselectMixin,
  ke as pointerMixin
};
