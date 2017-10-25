
# 周边搜索及结果展示
### 插件使用
```
AMap.PlaceSearch           //地点搜索服务插件
```
### 核心代码
```
    map.plugin(['AMap.PlaceSearch'], function () {   // 地点搜索服务插件
                let pla = new AMap.PlaceSearch({
                    extensions: 'all'   //all，返回基本+详细信息
                });
                pla.searchNearBy(val, map.getCenter(), 3000);   //参数：（关键字，中心点，半径）
                AMap.event.addListener(pla, 'complete', function (e) {  //当查询成功时触发此事件
                    let pois = e.poiList.pois;   // 数据
                    let len = e.poiList.pois.length > 5 ? 5 : e.poiList.pois.length;  // 最多只显示五条
                    for (let i = 0; i < len; i++) {
                        items.push(pois[i]['name']);
                    }
                    new Render(items).showUI();
                })
            })
```
### 效果图
![Image text](https://raw.githubusercontent.com/zhao-bi-han/AMAP/master/%E5%91%A8%E8%BE%B9%E6%90%9C%E7%B4%A2%E5%8F%8A%E7%BB%93%E6%9E%9C%E5%B1%95%E7%A4%BA/%E6%95%88%E6%9E%9C%E5%9B%BE.GIF)
