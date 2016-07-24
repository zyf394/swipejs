var Swipe = function (selector, options) {
    // 选择容器
    this.$container = $(selector);
    this.$sections = this.$container.children();

    // 设置默认值和配置参数
    this.defaultOptions = {
        duration: 200,
        easing: 'linear',
        complete: function () {
        }
    };
    this.options = options ? $.extend({}, this.defaultOptions, options) : this.defaultOptions;

    // 设置初始值
    this.page = 1;
    this.screenH = document.documentElement.clientHeight || document.body.clientHeight;

    // 初始化
    this.init();
};
// 初始化
Swipe.prototype.init = function () {
    var me = this;
    me.setSize();
    me.bindEvents();
};
// 绑定翻页事件
Swipe.prototype.bindEvents = function () {
    var me = this,
        touch = {},
        scrollBar = me.$container;
    scrollBar.on('touchstart',function(e){
        touch.x1 = e.touches[0].pageX;
        touch.y1 = e.touches[0].pageY;
    });
    scrollBar.on("touchmove", function (e) {
        e.preventDefault();
        touch.x2 = e.touches[0].pageX;
        touch.y2 = e.touches[0].pageY;
    });
    scrollBar.on("touchend",function(e){
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {
            scrollBar.trigger('swipe') &&
            scrollBar.trigger('swipe' + (me.swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
            touch = {};
        }
    });
    scrollBar.on("swipeUp", function () {
        me.goDown();
    });
    scrollBar.on("swipeDown ", function () {
        me.goUp();
    });
};
// 设置容器和元素样式
Swipe.prototype.setSize = function () {
    var me = this,
        scrollBar = me.$container,
        sections = this.$sections;
    scrollBar.css({"width":"100%"});
    sections.css({"height": me.screenH,"width":"100%"});
};
// 判断手势滑动方向
Swipe.prototype.swipeDirection = function(x1, x2, y1, y2){
    var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2);
    return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
};
// 翻到下一页
Swipe.prototype.goDown = function () {
    var me = this,
        allPages = this.$sections.length,
        scrollBar = me.$container;

    if (me.page == allPages) {
        scrollBar.animate({
            "-webkit-transform": "translate3d(0," + (-me.screenH) * (allPages - 1) + "px,0)",
            "transform": "translate3d(0," + (-me.screenH) * (allPages - 1) + "px,0)"
        }, me.options);

    } else {
        scrollBar.animate({
            "-webkit-transform": "translate3d(0," + (-me.screenH) * me.page + "px,0)",
            "transform": "translate3d(0," + (-me.screenH) * me.page + "px,0)"
        }, me.options);
        me.page++;
    }
};
// 翻到上一页
Swipe.prototype.goUp = function () {
    var me = this,
        allPages = this.$sections.length,
        scrollBar = me.$container;
    if (me.page == 1) {
        scrollBar.animate({
            "-webkit-transform": "translate3d(0,0,0)",
            "transform": "translate3d(0,0,0)"
        }, me.options);
    } else {
        me.page--;
        scrollBar.animate({
            "-webkit-transform": "translate3d(0," + (-me.screenH * (me.page - 1)) + "px,0)",
            "transform": "translate3d(0," + (-me.screenH * (me.page - 1)) + "px,0)"
        }, me.options);
    }
};

module.exports = Swipe;