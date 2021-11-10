// ==UserScript==
// @name         Epitech Timeline tools
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://intra.epitech.digital/course/*
// @icon         https://www.google.com/s2/favicons?domain=epitech.digital
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('li.activity.label .dropdown-menu').append(`
        <a href="#" class="dropdown-item insert-timeline" data-action="insert" role="menuitem">
            <i class="icon fa fa-calendar" aria-hidden="true"></i>
            <span class="menu-action-text">
                Update or add Timeline
            </span>
        </a>
    `);

    $('li.activity.label .dropdown-menu a.insert-timeline').click(insert_timeline)

    function insert_timeline() {
        if (typeof events == "undefined") {
            console.log("undefined")
            saveTimeline($(this), [{name:'Kick-off', start:'2021/11/02 9:30', end:'2021/11/02'}, {name:'Bootstrap', start:'2021/11/02 10:00'}, {name:'Project delivery', start:'2021/11/02', end:'2021/11/07 23:42', deadline:true}, {name:'Keynote', start:'2021/11/08', end:'2021/11/14'}, {name:'Feedback and Retrospective', start:'2021/11/08', end:'2021/11/14'}])
        } else {
            saveTimeline($(this), events.reverse())
        }
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    var moodleSession = getCookie('MoodleSession')

    var myHeaders = new Headers();
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Cache-Control", "max-age=0");
    myHeaders.append("sec-ch-ua", "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"Windows\"");
    myHeaders.append("Upgrade-Insecure-Requests", "1");
    myHeaders.append("Origin", `${"https"}://intra.epitech.digital`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36");
    myHeaders.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
    myHeaders.append("Sec-Fetch-Site", "same-origin");
    myHeaders.append("Sec-Fetch-Mode", "navigate");
    myHeaders.append("Sec-Fetch-User", "?1");
    myHeaders.append("Sec-Fetch-Dest", "document");
    myHeaders.append("Accept-Language", "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,ko;q=0.6");
    myHeaders.append("Cookie", "MoodleSession=" + moodleSession);

    function printMessageInEditor(message, isError) {
        if (!isError)
            console.log(message)
        else
            console.warn(message)
    }

    function saveTimeline(elem, eventsList) {

        let module_id = "666";
        try {
            module_id = elem.closest('li').attr('id').split('-')[1];
        } catch (_) {printMessageInEditor('No module_id found', true)}
        let sesskey = "7lHVBMhDvr";
        try {
            sesskey = M.cfg.sesskey;
        } catch (_) {printMessageInEditor('No seskey found', true)}


        var urlencoded = new URLSearchParams();

        var output = code.replace("\"project-timeline-data\"", "\"project-timeline-data\"" + " data-events='" + JSON.stringify(eventsList) + "'")

        urlencoded.append("introeditor[text]", output)
        urlencoded.append("update", module_id);
        urlencoded.append("sesskey", sesskey);
        urlencoded.append("_qf__mod_label_mod_form", "1");
        urlencoded.append("introeditor[format]", "1");
        urlencoded.append("availabilityconditionsjson", "{\"op\":\"&\",\"c\":[],\"showc\":[]}");


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`${"https"}://intra.epitech.digital/course/modedit.php`, requestOptions)
            .then(result => {printMessageInEditor('Timeline successfully saved !');location.reload();})
            .catch(error => printMessageInEditor('An error occurred while trying to save the Timeline', true));
    }

})();
var code = '<div class="project-timeline-container" style="display:block"> <script src="https://code.jquery.com/jquery-3.6.0.min.js" type="text/javascript"></script> <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js"></script> <script src="https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js"></script> <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/animations/perspective-subtle.css"/> <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css"> <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"></script> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/idea.min.css" integrity="sha512-Rfc5zQIp95eozfMCdS3B4MItUxU8orNje/t1OEhf7XwIk0DTCuMH2LG0NIgP8UGYK9L39WfUNI1c4IsM5yY/PA==" crossorigin="anonymous" referrerpolicy="no-referrer" /> <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script> <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script> <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"> <link href="https://cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet"> <style>#editor{position:relative;width:100%;max-height:20em;overflow:auto}.container,.project-timeline{width:100%;margin:0;padding:0}.project-timeline{position:relative;font-family:"Poppins",sans-serif;font-size:.9375rem;font-weight:400;line-height:1.5;color:#343a40;overflow:hidden}.timeline-event{margin-top:4px;margin-bottom:4px;border-radius:.05em;position:relative;padding:.2em .3em;color:white;background-color:#eef5f9;border-color:#eef5f9;cursor:pointer}.timeline-event span{overflow:hidden;white-space:nowrap;display:block}.timeline-event:hover{filter:brightness(115%);transition:all .25s;box-shadow:rgba(0,0,0,0.24) 0 3px 8px}.timeline-vertical-line{position:absolute;display:block;height:100%;width:.5em;top:0;cursor:help}.timeline-vertical-line div{position:relative;margin-left:50%;height:100%;width:0}.timeline-vertical-line:hover div{transition:all .25s}.timeline-vertical-line.deadline div{border-left-style:dashed;border-left-color:#343a40;border-left-width:thin}.timeline-vertical-line.deadline:hover div{transition:all .2s}.timeline-vertical-line.today div{width:.2em;margin-left:.4em;background:repeating-linear-gradient(45deg,#1ea4ec,#1ea4ec 4px,#1f8bc5 4px,#1f8bc5 10px);animation:AnimationName 1.5s linear infinite;transition:all 1s}.timeline-vertical-line.today:hover div{transition:all 1s;animation:AnimationName .5s linear infinite}@keyframes AnimationName{0%{background-position:100% 0}100%{background-position:100% 14px}}.gradient-red,.project-timeline [class*="feedback"],.project-timeline [class*="retro"]{background-image:linear-gradient(to right,#d43f3a,#d9403c,#dd413e,#e24241,#e74343)}.gradient-yellow,.project-timeline [class*="kick"]{background-image:linear-gradient(to right,#e6c51c,#e9ca25,#ebcf2d,#eed535,#f0da3c)}.gradient-cyan,.project-timeline [class*="boot"]{background-image:linear-gradient(to right,#60aef2,#5eb3f4,#5cb8f5,#5cbcf6,#5cc1f7)}.gradient-blue,.project-timeline [class*="project"]{background-image:linear-gradient(to right,#0967eb,#0077ee,#0085ef,#0093ee,#139feb)}.gradient-green,.project-timeline [class*="checkpoint"],.project-timeline [class*="follow"]{background-image:linear-gradient(to right,#37914e,#39974e,#3b9e4e,#3ea44e,#41ab4e)}.gradient-orange,.project-timeline [class*="keynote"],.project-timeline [class*="soutenance"],.project-timeline [class*="review"]{background-image:linear-gradient(to right,#e5710b,#eb740f,#f27712,#f87915,#ff7c18)}.gradient-purple,.project-timeline [class*=""]{background-image:linear-gradient(to right,#a63d7c,#ad3d79,#b33d77,#b93e73,#bf3f70)}.tippy-box[data-theme~=\'digital\']{background-color:#ced4da;color:#212529;font-family:"Poppins",sans-serif;font-size:.8203125rem;border-radius:.05em}.tippy-content{padding:0;margin:0}.tippy-content span{padding:.5em;display:block}hr{border-style:solid;border-width:1px 0 0 0;padding:0;margin:0;opacity:.3}.tippy-box[data-theme~=\'digital\']>.tippy-svg-arrow{fill:#ced4da}.tippy-box[data-theme~=\'digital\'][data-placement^=\'top\']>.tippy-arrow::before{border-top-color:#ced4da}.tippy-box[data-theme~=\'digital\'][data-placement^=\'bottom\']>.tippy-arrow::before{border-bottom-color:#ced4da}.tippy-box[data-theme~=\'digital\'][data-placement^=\'left\']>.tippy-arrow::before{border-left-color:#ced4da}.tippy-box[data-theme~=\'digital\'][data-placement^=\'right\']>.tippy-arrow::before{border-right-color:#ced4da}.project-timeline .project-timeline-footer{width:100%;height:20px;background:#ced4da;margin-top:1em}.project-timeline .project-timeline-footer [class*=date]{padding-left:.5em;padding-right:.5em}.project-timeline .project-timeline-footer .date-end{position:absolute;right:0}.project-timeline-subtitle{text-align:center}.infinite-date{width:5%;height:calc(100% - .025em);position:absolute;top:0;right:-8%;background:inherit;border-radius:.05em;-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-ms-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg);background-size:1000% 100%;background-position-x:100%}.infinite-date::after{content:\'\';width:50%;height:100%;position:absolute;left:-100%;background:inherit;background-size:1000% 100%;background-position-x:100%;border-radius:.05em}.timeline-event:hover .infinite-date{transition:all .25s;box-shadow:rgba(0,0,0,0.24) 0 -3px 8px}.timeline-event:hover .infinite-date::after{transition:all .25s;box-shadow:rgba(0,0,0,0.24) 0 -3px 8px}.timeline-editor{display:none}body.editing .timeline-editor{display:block}body.editing .timeline-editor #editor{display:block;margin-bottom:1em;background-color:#fff}body.editing .timeline-editor hr{margin-bottom:1em;margin-top:1em}body.editing .timeline-editor-toolbar{position:relative;display:flex;flex-direction:row;min-width:0;word-wrap:break-word;background-color:#fff;-webkit-background-clip:border-box;background-clip:border-box;border:1px solid #d7dfe3}body.editing .timeline-editor-toolbar button{margin:.4em;font-size:.8em}.timeline-editor-message{text-align:right;flex-grow:1;margin-right:.4em;font-size:.8203125rem;margin-bottom:auto;margin-top:auto}</style> <div id="project-timeline-data"></div> <script>\n\n        let events = $("#project-timeline-data").data(\'events\')\n        if (!events)\n            events = [{name:\'Kick-off\', start:\'2021/11/02 9:30\', end:\'2021/11/02\'}, {name:\'Bootstrap\', start:\'2021/11/02 10:00\'}, {name:\'Project delivery\', start:\'2021/11/02\', end:\'2021/11/07 23:42\', deadline:true}, {name:\'Keynote\', start:\'2021/11/08\', end:\'2021/11/14\'}, {name:\'Feedback and Retrospective\', start:\'2021/11/08\', end:\'2021/11/14\'}]\n    </script> <h4>Timeline</h4> <div class="timeline-editor"> <h5>Edit your timeline</h5> <div class="timeline-editor-toolbar"> <button class="btn btn-primary" onclick="saveTimeline()" id="button-save-timeline" title="Save the current configurations">Save timeline</button> <button class="btn btn-primary" onclick="previewTimeline()" id="button-preview-timeline" title="Preview the timeline without saving it">Preview timeline</button> <p class="timeline-editor-message"></p> </div> <div id="editor"></div> <h5 style="text-align:center">↓</h5> </div> <div class="container"> <div class="project-timeline"> <div class="project-timeline-footer" title="Timeline footer"> <span class="date-start">jan. 1 2024</span> <span class="date-end">jan. 1 2024</span> </div> </div> <p class="project-timeline-subtitle" tabindex="0"><strong>Project duration : </strong></p> </div> <script>\n        //Utils functions\n        let toKebabCase = str =>\n            str &&\n            str\n                .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)\n                .map(x => x.toLowerCase())\n                .join(\'-\');\n\n        function toTimestamp(strDate, isEndOfDay){\n            if (!strDate)\n                return 0;\n            if (isEndOfDay && !strDate.includes(\':\'))\n                strDate += \' 23:59:59\'\n            let datum = Date.parse(strDate);\n            return datum/1000;\n        }\n\n        function formateDate(dateStr) {\n            if (!dateStr)\n                return \'infinite\';\n            let date = new Date(dateStr)\n            let m = date.toLocaleString(\'default\', { month: \'short\' })\n            let d = date.toLocaleString(\'default\', { day:  \'numeric\'})\n            let y = date.toLocaleString(\'default\', { year:  \'numeric\'})\n            let h = dateStr.includes(\':\') ? date.toLocaleTimeString(\'default\', {hour: \'2-digit\', minute:\'2-digit\'}) : \'\'\n            return `${m} ${d} ${h} ${y}`;\n        }\n\n        function datesToFormattedInterval(startDateStr, endDateStr) {\n\n            let formattedStartDate = formateDate(startDateStr)\n            let formattedEndDate = formateDate(endDateStr)\n\n\n            if (formattedEndDate && formattedStartDate.endsWith(formattedEndDate.slice(-2)))\n                return `${formattedStartDate.slice(0, formattedStartDate.length - 5)} to ${formattedEndDate}`;\n            return `${formattedStartDate} to ${formattedEndDate}`;\n        }\n\n        function dateToRatio(date, is_end_of_day = false) {\n            let ratio = (toTimestamp(date, is_end_of_day) - timeline_start_timestamp) * 100 / timeline_end_timestamp\n            if (ratio < 1)\n                ratio = 0\n            if (date > 10)\n                ratio = 100\n            return ratio\n        }\n\n        function printMessageInEditor(message, isError = false) {\n            $(\'.timeline-editor-message\').html(message)\n        }\n\n        //Global variables\n        let timeline_start_timestamp =  toTimestamp(events[0].start)\n        let timeline_end_timestamp =  toTimestamp(events[events.length - 1].end, true) - timeline_start_timestamp\n        let total_nb_days;\n        let last_deadline;\n        let last_deadline_nb_days;\n\n        let timeline = $(\'.project-timeline\');\n    </script> <script>\n        //<![CDATA[\n        //Editor\n\n        hljs.configure({   // optionally configure hljs\n            languages: [\'json\']\n        });\n\n        var options = {\n            modules: {\n                syntax: true, // Include syntax module\n                toolbar: []\n            }\n        };\n        var editor = new Quill(\'#editor\', options);\n\n        var events_as_text = JSON.stringify(events, null, 2)\n\n        var events_as_delta = events_as_text.split(\'\\n\').map(line => {return [\n            {\'insert\':line},\n            {\'insert\':\'\\n\', \'attributes\': {\'code-block\': true}}\n        ]}).flat() //Format text for editor\n\n        editor.setContents(events_as_delta)\n\n        function previewTimeline() {\n            let output;\n            try {\n                output = JSON.parse(editor.getText());\n            } catch(e) {\n                printMessageInEditor(\'Can\\\'t parse timeline configurations\', true)\n                return false;\n            }\n\n            if (output)\n                events = output;\n            generateTimeline();\n            printMessageInEditor(\'Timeline preview successfully rendered\')\n            return true;\n        }\n        function getCookie(name) {\n            const value = `; ${document.cookie}`;\n            const parts = value.split(`; ${name}=`);\n            if (parts.length === 2) return parts.pop().split(\';\').shift();\n        }\n\n        var moodleSession = getCookie(\'MoodleSession\')\n\n        var myHeaders = new Headers();\n        myHeaders.append("Connection", "keep-alive");\n        myHeaders.append("Cache-Control", "max-age=0");\n        myHeaders.append("sec-ch-ua", "\\"Google Chrome\\";v=\\"95\\", \\"Chromium\\";v=\\"95\\", \\";Not A Brand\\";v=\\"99\\"");\n        myHeaders.append("sec-ch-ua-mobile", "?0");\n        myHeaders.append("sec-ch-ua-platform", "\\"Windows\\"");\n        myHeaders.append("Upgrade-Insecure-Requests", "1");\n        myHeaders.append("Origin", \'https\'+\'://intra.epitech.digital\');\n        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");\n        myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36");\n        myHeaders.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");\n        myHeaders.append("Sec-Fetch-Site", "same-origin");\n        myHeaders.append("Sec-Fetch-Mode", "navigate");\n        myHeaders.append("Sec-Fetch-User", "?1");\n        myHeaders.append("Sec-Fetch-Dest", "document");\n        myHeaders.append("Accept-Language", "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,ko;q=0.6");\n        myHeaders.append("Cookie", "MoodleSession=" + moodleSession);\n\n        function saveTimeline() {\n\n            if (!previewTimeline())\n                return;\n\n            $("#project-timeline-data").attr(\'data-events\', JSON.stringify(events.reverse()))\n            events.reverse()\n\n\n            let module_id = "10506";\n            try {\n                module_id = timeline.closest(\'li\').attr(\'id\').split(\'-\')[1];\n                printMessageInEditor(\'No module_id found\', true)\n            } catch (_) {}\n            let sesskey = "7lHVBMhDvr";\n            try {\n                sesskey = M.cfg.sesskey;\n                printMessageInEditor(\'No sesskey found\', true)\n            } catch (_) {}\n\n\n            var urlencoded = new URLSearchParams();\n\n            urlencoded.append("introeditor[text]", $(\'.project-timeline-container\').parent().html())\n            urlencoded.append("update", module_id);\n            urlencoded.append("sesskey", sesskey);\n            urlencoded.append("_qf__mod_label_mod_form", "1");\n            urlencoded.append("introeditor[format]", "1");\n            urlencoded.append("availabilityconditionsjson", "{\\"op\\":\\"&\\",\\"c\\":[],\\"showc\\":[]}");\n\n\n            var requestOptions = {\n                method: \'POST\',\n                headers: myHeaders,\n                body: urlencoded,\n                redirect: \'follow\'\n            };\n\n            fetch(\'https\' + \'://intra.epitech.digital/course/modedit.php\', requestOptions)\n                .then(result => printMessageInEditor(\'Timeline successfully saved !\'))\n                .catch(error => printMessageInEditor(\'An error occurred while trying to save the Timeline\', true));\n        }\n        //]]>\n    </script> <script>\n        //<![CDATA[\n\n        function generateTimeline() {\n            $(\'.timeline-event\').remove();\n            $(\'.timeline-vertical-line\').remove();\n            $(\'.date-start\').html(formateDate(events[0].start))\n            $(\'.date-end\').html(formateDate(events[events.length - 1].end))\n\n            timeline_start_timestamp =  toTimestamp(events[0].start)\n            timeline_end_timestamp =  toTimestamp(events[events.length - 1].end, true) - timeline_start_timestamp\n            total_nb_days = Math.round(timeline_end_timestamp / (3600 * 24));\n            last_deadline = events.reverse().find(event => event.deadline);\n            last_deadline_nb_days = last_deadline ? Math.round((toTimestamp(last_deadline.end, true) - timeline_start_timestamp) / (3600 * 24)) : undefined;\n\n            timeline = $(\'.project-timeline\');\n\n            events.forEach(event => {\n                var start_ratio = dateToRatio(event.start)\n                var end_ratio = dateToRatio(event.end, true)\n\n                //Set size of 25% for infinite intervals\n                if (!event.end)\n                    end_ratio = 25\n\n                let event_nb_days = Math.round((end_ratio - start_ratio) / 100 * total_nb_days);\n                let elem = \'<div class="gradient-red \'+toKebabCase(event.name)+\' timeline-event" tabindex="0" style="margin-left: \'+start_ratio+\'%; width: \'+(end_ratio - start_ratio)+\'%;" aria-label="\'+ event_nb_days+\' day\'+(event_nb_days > 1 ? \'s\' : \'\') +\', \' + datesToFormattedInterval(event.start, event.end)+\'"><span>\'+event.name+\'</span>\'+(event.end ? \'\' : \'<div class="infinite-date"></div>\')+\'</div> \';\n                timeline.prepend(elem)\n                tippy(`.${toKebabCase(event.name)}`, {\n                    content: \'<span>\'+event.name+\'</span><hr><span><strong>Dates: </strong>\'+datesToFormattedInterval(event.start, event.end)+ (event.end ? (\'<br> <strong>Duration: </strong>\' + event_nb_days+\' day\'+(event_nb_days > 1 ? \'s\' : \'\')) : "")+\'</span>\',\n                    animation: \'perspective-subtle\',\n                    allowHTML: true,\n                    theme: "digital"\n                });\n\n                if (event.deadline) {\n                    timeline.append(`<div class="timeline-vertical-line deadline" tabindex="0" style="left: calc(${end_ratio}% - 0.25em)" title="`+\'Deadline : \'+`${formateDate(event.end)}"><div></div></div>`)\n                }\n            })\n            let today_ratio = dateToRatio(new Date(Date.now()).toString());\n            let days_left = last_deadline_nb_days - Math.round((today_ratio / 100) * total_nb_days)\n            if (days_left < 0)\n                days_left = 0;\n            if (days_left > total_nb_days)\n                days_left = total_nb_days\n            timeline.append(`<div class="timeline-vertical-line today" tabindex="0" style="left: calc(${today_ratio}% - 0.5em)" title="${\'Today : \'}${days_left +\' day\'+ (days_left > 1 ? \'s\' : "") +\' left\'}"><div></div></div>`)\n\n            $(\'.project-timeline-subtitle strong\').html(\'Project duration : \' + last_deadline_nb_days + \' day\' + (last_deadline_nb_days > 1 ? \'s\' : \'\'))\n        }\n\n        generateTimeline();\n        //]]>\n    </script> </div>';