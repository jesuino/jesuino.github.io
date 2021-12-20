define(
  "ace/mode/textile",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text",
    "ace/mode/textile_highlight_rules",
    "ace/mode/matching_brace_outdent",
  ],
  function (e, t, n) {
    var r = e("../lib/oop"),
      i = e("./text").Mode,
      s = e("./textile_highlight_rules").TextileHighlightRules,
      o = e("./matching_brace_outdent").MatchingBraceOutdent,
      u = function () {
        (this.HighlightRules = s), (this.$outdent = new o());
      };
    r.inherits(u, i),
      function () {
        (this.getNextLineIndent = function (e, t, n) {
          return e == "intag" ? n : "";
        }),
          (this.checkOutdent = function (e, t, n) {
            return this.$outdent.checkOutdent(t, n);
          }),
          (this.autoOutdent = function (e, t, n) {
            this.$outdent.autoOutdent(t, n);
          }),
          (this.$id = "ace/mode/textile");
      }.call(u.prototype),
      (t.Mode = u);
  }
),
  define(
    "ace/mode/textile_highlight_rules",
    ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"],
    function (e, t, n) {
      var r = e("../lib/oop"),
        i = e("./text_highlight_rules").TextHighlightRules,
        s = function () {
          this.$rules = {
            start: [
              {
                token: function (e) {
                  return e.charAt(0) == "h" ? "markup.heading." + e.charAt(1) : "markup.heading";
                },
                regex: "h1|h2|h3|h4|h5|h6|bq|p|bc|pre",
                next: "blocktag",
              },
              { token: "keyword", regex: "[\\*]+|[#]+" },
              { token: "text", regex: ".+" },
            ],
            blocktag: [
              { token: "keyword", regex: "\\. ", next: "start" },
              { token: "keyword", regex: "\\(", next: "blocktagproperties" },
            ],
            blocktagproperties: [
              { token: "keyword", regex: "\\)", next: "blocktag" },
              { token: "string", regex: "[a-zA-Z0-9\\-_]+" },
              { token: "keyword", regex: "#" },
            ],
          };
        };
      r.inherits(s, i), (t.TextileHighlightRules = s);
    }
  ),
  define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    var r = e("../range").Range,
      i = function () {};
    (function () {
      (this.checkOutdent = function (e, t) {
        return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1;
      }),
        (this.autoOutdent = function (e, t) {
          var n = e.getLine(t),
            i = n.match(/^(\s*\})/);
          if (!i) return 0;
          var s = i[1].length,
            o = e.findMatchingBracket({ row: t, column: s });
          if (!o || o.row == t) return 0;
          var u = this.$getIndent(e.getLine(o.row));
          e.replace(new r(t, 0, t, s - 1), u);
        }),
        (this.$getIndent = function (e) {
          return e.match(/^\s*/)[0];
        });
    }.call(i.prototype),
      (t.MatchingBraceOutdent = i));
  });
