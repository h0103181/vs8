/** get date as a YYYYMMDD string
 * @returns {string} */
function get_date_str() {
    let date = new Date();
    return (date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()).toString();
}

/** get time as a HHMMSS string
 *  @returns {string} */
function get_time_str() {
    let date = new Date();
    return (date.getHours() * 10000 + date.getMinutes() * 100 + date.getSeconds()).toString().padStart(6, '0');
}

/** get date time as YYYYMMDD_HHMMSS
 * @returns {string} */
function get_datetime_str() {
    return get_date_str() + "_" + get_time_str();
}

/** suffle an arr inplace
 * @returns {void} */
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

/** random between two numbers
 * @returns {number} */
function rand_between(lb, ub) {
    return lb + Math.random() * (ub - lb);
}

/** deep copy by using JSON */
function deepcopy(from) {
    return JSON.parse(JSON.stringify(from));
}

/** * add ele, text, or html ele some parent
 * 
 *  param: {ele, tag, text, html, class, style} 
 * @returns {HTMLElement} */
function add(param) {
    //set parent
    let ele = document.body;
    if ('ele' in param) ele = param.ele;
    //set child
    /** @type HTMLElement */
    let p;
    if ('tag' in param) {
        p = document.createElement(param.tag);
        if ('class' in param) {
            p.classList.add(...param.class.split(' ').filter((str) => { return str.length > 0 }));
        }
        if ('style' in param) {
            p.style.cssText = param.style;
        }
        ele.appendChild(p);
        let newparam = deepcopy(param);
        delete newparam.tag;
        newparam.ele = p;
        add(newparam);
    } else {
        if ('text' in param) {
            p = document.createTextNode(param.text);
            ele.appendChild(p);
        }
        if ('html' in param) {
            ele.insertAdjacentHTML('beforeend', param.html);
        }
    }
    return p;
}

/** wait for events such as button click
 * 
 * param: {ele,type} 
 * @returns {Promise<Event>} */
function wait_event(param) {
    if (!('ele' in param)) param.ele = document.body;
    return new Promise((resolve) => {
        param.ele.addEventListener(param.type, (e) => { resolve(e); }, { once: true });
    });
}

/** wait timeout
 * @returns {Promise} */
function wait_timeout(ms) {
    return new Promise((resolve) => { setTimeout(resolve, ms); });
}

/** wait game frame out
 * 
 * @returns {Promise<DOMHighResTimeStamp>} */
function wait_frame_out() {
    return new Promise((resolve) => {
        window.requestAnimationFrame(function(timestamp) { resolve(timestamp); });
    });
}

/** parse cookie
 * @return Object
 */
function parse_cookie(cookie_str = document.cookie) {
    let out = {};
    for (let val of cookie_str.split(';')) {
        if (val) {
            let m;
            if (m = val.match(/(.*?)=(.*)/)) out[decodeURIComponent(m[1].trim())] = decodeURIComponent(m[2].trim());
            else out[decodeURIComponent(val.trim())] = '';
        }
    }
    return out;
}

/** print_r -- php-like print_r() for debug
 * @return void
 */
function print_r(obj) {
    add({ text: JSON.stringify(obj) });
}

/** detect mobile
 * @returns {boolean} */
function is_mobile() {
    return navigator.userAgent.match(/mobile/i);
}

/** detect chrome
 * @returns {boolean} */
function is_chrome() {
    return navigator.userAgent.match(/chrome/i);
}

/** detect touch
 * @returns {boolean}  */
function is_touch() {
    return ('ontouchstart' in window);
}