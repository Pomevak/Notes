window.onresize = window.onload = waterfall;

function waterfall() {
    let containers = document.querySelectorAll('.waterfall');
    containers.forEach(function (container) {
        let gap = 10;
        let items = container.querySelectorAll('img');
        let width = items[0].width;
        let containerWidth = Number.parseInt(getStyle('width', container));
        let colCount = Number.parseInt(containerWidth / (width + gap));

        let heights = [];
        items.forEach(function (item, key) {
            if (key < colCount) {
                heights.push(item.offsetHeight + gap);
                item.style.left = key * (width + gap) + 'px';
                item.style.top = 0 + 'px';
            } else {
                let index = indexOfMin(heights);
                item.style.left = index * (width + gap) + 'px';
                item.style.top = heights[index];
                heights[index] = heights[index] + item.offsetHeight + gap;
            }
        });

        container.style.height = Math.max.apply(null, heights) + 'px';
    })
}

function indexOfMin(arr) {
    let index = 0;
    for (let i = 0; i < arr.length; ++i) {
        if (arr[i] < arr[index])
            index = i;
    }
    return index;
}

// clientWidth 处理兼容性
function getClientSize() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}

// scrollTop兼容性处理
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
}

function getStyle(styleName, el, pseudoEl = null) {
    return window.getComputedStyle(el, pseudoEl).getPropertyValue(styleName);
}