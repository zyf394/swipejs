# swipejs
一个翻页小插件。依赖zepto,使用前需确保已引入zepto。

## 创建可滑动的h5
使用步骤:

#### 创建html结构:

    <div id="app">
        <section>
            <p>PAGE 1</p>
        </section>
        <section>
            <p>PAGE 2</p>
        </section>
        <section>
            <p>PAGE 3</p>
        </section>
        <section>
            <p>PAGE 4</p>
        </section>
        <section>
            <p>PAGE 5</p>
        </section>
    </div>
    
#### 引入zepto和swipejs

    <script src="zepto.min.js"></script>
    <script src="swipe.js"></script>

#### 创建swipe实例

    <script>
        new Swipe('#app');
    </script>


## 可配置项

| key | value| description |
| --- | --- | --- |
| duration | 秒或毫秒,例如:1s(1秒)、200(毫秒)| 动画过渡时长 |
| easing | 可选值:'linear','ease-in','ease-out','ease-in-out' | 动画过渡曲线 |
| delay | 秒或毫秒,例如:1s(1秒)、200(毫秒)| 动画启动延迟时间 |

    new Swipe("#app", {
                 duration: 200,
                 easing: 'linear',
                 delay: 1000
            });
            