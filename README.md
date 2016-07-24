# swipejs
一个翻页小插件。依赖zepto,使用前需确保已引入zepto。

## 创建可滑动的h5
示例:

    new Swipe("#app");

## 可配置项

    new Swipe("#app", {
                 duration: 200,
                 easing: 'linear',
                 complete: function () {
                             do something... 
                           }
            });
            