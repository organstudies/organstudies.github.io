+++

title = "随时更新的装修记"
date = "2024-06-18T17:17:44+09:00"
draft = false
tags = ["Hugo"]
categories = ["Cyber Superstition"]

+++

# 时间轴
{{< timeline date="2024.6.10" title="建站" description="使用Book主题建立博客雏形" tags="内装工事"  >}}
{{< timeline date="2024.6.13" title="Channel Talk" description="在右下角添加了聊天小组件" tags="内装工事"  >}}
{{< timeline date="2024.6.16" title="热力图" description="在About页面添加了热力图" tags="内装工事"  >}}
{{< timeline date="2024.6.19" title="图片轮播" description="在短代码加入图片轮播" tags="失败工事"  >}}
{{< timeline date="2024.6.20" title="搬移博文" description="把大部分博文搬移成功" tags="美美入住"  >}}
{{< timeline date="2024.6.20" title="补充still one place to go页面" description="补充前两年的live记录" tags="美美入住"  >}}


# 使用的短代码

## 参考


十分冒昧地附上参考链接，我使用的短代码基本上是复制粘贴，个别稍微修改了一点点。


[在Stack主题上可行的短代码们](https://www.sleepymoon.cyou/2023/hugo-shortcodes/)


[如何给 Hugo 博客添加热力图](https://blog.douchi.space/hugo-blog-heatmap/#gsc.tab=0)


## 热力图


因为我的博客外观随着浏览器系统外观变化，所以给热力图写了一个dark模式，用了我个人比较喜欢的颜色。

{{< details "Heatmap" >}}




<div 
    id="heatmap" 
    style="
    display: block;
    height: 150px;
    width: 75%;
    padding: 2px;
    text-align: center;"
></div>
<script src="https://cdn.jsdelivr.net/npm/echarts@5.3.0/dist/echarts.min.js"></script>
<script type="text/javascript">
    var chartDom = document.getElementById('heatmap');
    var myChart = echarts.init(chartDom);
    window.onresize = function() {
        myChart.resize();
    };
    var option;

    // get date range by number of months
    function getDateRange(months){            
        var startDate = new Date();
        var mill = startDate.setMonth((startDate.getMonth() - months));
        var endDate = +new Date();
        startDate = +new Date(mill);

        endDate = echarts.format.formatTime('yyyy-MM-dd', endDate);
        startDate = echarts.format.formatTime('yyyy-MM-dd', startDate);

        var dateRange = [];
        dateRange.push([
            startDate,
            endDate
        ]);
        return dateRange;
    }

    // get number of months by window size
    function getMonthCount(){
        const windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            return 12;
        }
        if (windowWidth >= 400) {
            return 9;
        }
        return 6;
    }

    var postsByDate = new Map();
    {{ range ((where .Site.RegularPages "Type" "posts")) }}
        var date = "{{ .Date.Format "2006-01-02" }}";
        var postObj = new Map();
        postObj.set("title", "{{ .Title }}");
        postObj.set("link", "{{ .RelPermalink }}");
        var wordCount = {{ .WordCount }};

        var data = postsByDate.get(date);
        if (data === undefined) {
            data = new Map();
            data.set("posts", []);
            data.set("totalWordCount", 0);
        }
        var posts = data.get("posts");
        posts.push(postObj);
        var totalWordCount = data.get("totalWordCount");
        totalWordCount += wordCount;
        data.set("totalWordCount", totalWordCount);
        postsByDate.set(date, data);
    {{- end -}}

    var heatmapData = [];
    for (const [date, data] of postsByDate.entries()) {
        heatmapData.push([date, data.get("totalWordCount")]);
    }

    function getHeatmapOptions(isDarkMode) {
        return {
            title: {
    show: true,
    top: 0,
    left: 'center',
    text: 'The House That 小步 Built',
    textStyle: {
        color: isDarkMode ? '#FFF' : '#333', 
       
    },
},

            legend: {
                show: false,
            },
            visualMap: {
                show: false,
                min: 0,
                max: 10000,
                type: 'piecewise',
                showLable: false,
                orient: 'horizontal',
                left: 'center',
                top: 0,
                itemGap: 10,
                inRange: {
                    color: isDarkMode ? ['#687EFF', '#80B3FF', '#98E4FF'] : ['#CDE8E5', '#7AB2B2', '#4D869C'],
                },
            },
            calendar: {
                top: 50,
                left: 30,
                right: 30,
                cellSize: ['auto', 'auto'],
                range: getDateRange(getMonthCount()),
                itemStyle: {
                    color: isDarkMode ? '#333' : '#fff',
                    borderWidth: 0.5,
                    borderColor: isDarkMode ? '#555' : '#eee',
                },
                yearLabel: { 
                    show: false,
                },
                dayLabel: {
                    align: 'center',
                    nameMap: 'ZH',
                },
                monthLabel: {
                    nameMap: 'EN',
                },
                splitLine: {
                    show: false,
                },
            },
            tooltip: {
                hideDelay: 1000,
                enterable: true,
                formatter: function(params) {
                    const date = params.data[0];
                    const posts = postsByDate.get(date).get("posts");
                    var content = `${date}`;
                    for (const [i, post] of posts.entries()) {
                        content += "<br>";
                        var link = post.get("link");
                        var title = post.get("title");
                        content += `<a href="${link}" target="_blank">${title}</a>`;
                    }
                    return content;
                }
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: heatmapData
            }
        };
    }

    // 检测当前颜色模式
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    option = getHeatmapOptions(isDarkMode);
    myChart.setOption(option);

    // 监听颜色模式变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        option = getHeatmapOptions(event.matches);
        myChart.setOption(option);
    });
</script>


{{< /details >}}

## 图片轮播

教程配置文件是.yaml，.toml记得更改语法。
出于未知原因无法显示，之后再修改。
