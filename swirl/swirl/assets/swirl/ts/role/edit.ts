///<reference path="../core/core.ts" />
namespace Swirl.Role {
    import Dispatcher = Swirl.Core.Dispatcher;

    export class EditPage {
        constructor() {
            $("#table-perms").find("tr").each((i, elem) => {
                let $tr = $(elem);
                let $cbs = $tr.find("td :checkbox");
                $tr.find("th>:checkbox").prop("checked", $cbs.length == $cbs.filter(":checked").length);
            });

            // bind events
            Dispatcher.bind("#table-perms", "change")
                .on("check-row", this.checkRow.bind(this))
                .on("check", this.check.bind(this))
        }

        private checkRow(e: JQueryEventObject) {
            let $cb = $(e.target);
            let checked = $cb.prop("checked");
            $cb.closest("th").next("td").find(":checkbox").prop("checked", checked);
        }

        private check(e: JQueryEventObject) {
            let $cb = $(e.target);
            let $cbs = $cb.closest("td").find(":checkbox");
            let checked = $cbs.length == $cbs.filter(":checked").length;
            $cb.closest("td").prev("th").find(":checkbox").prop("checked", checked);
        }
    }
}