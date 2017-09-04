### 一、管道
1. 管道概述

    Angular内置了一些管道，比如DatePipe、UpperCasePipe、LowerCasePipe、CurrencyPipe和PercentPipe。 它们全都可以直接用在任何模板中。
    
    **Angular没有FilterPipe或OrderByPipe管道**
    
    >Date和Currency管道需要ECMAScript国际化（I18n）API，但Safari和其它老式浏览器不支持它，该问题可以用垫片（Polyfill）解决。
    
        ```
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
        ```
    
    要学习更多内置管道的知识，参见API参考手册，并用“pipe”为关键词对结果进行过滤。

2. 自定义管道

    定义管道
    
    ```
        //定义一个字符串缩略的管道
        import { Pipe, PipeTransform } from '@angular/core';
        
        @Pipe({name: 'shrinkStringLength'})
        export class ShrinkString implements PipeTransform {
          transform(value: string, exponent: string): string {
            let exp = parseFloat(exponent) || 6;
            return value.substr(0,exp-3)+'...';
          }
        }
    ```
    
    ```
    import { Pipe, PipeTransform } from '@angular/core';
        
        @Pipe({name: 'sarchBooks'})
        export class SearchBooks implements PipeTransform {
          transform(books: any, exponent: string): any {
            var ex=exponent || '';
            if(ex){
              return books.filter(function (book) {
                if(book.name.indexOf(ex)!=-1){
                  return book;
                }
              })
            }else {
              return books;
            }
          }
        }
    ```
    * 管道是一个带有“管道元数据(pipe metadata)”装饰器的类。
    * 这个管道类实现了PipeTransform接口的transform方法，该方法接受一个输入值和一些可选参数，并返回转换后的值。
    * 当每个输入值被传给transform方法时，还会带上另一个参数，比如我们这个管道中的exponent(放大指数)。
    * 我们通过@Pipe装饰器告诉Angular：这是一个管道。该装饰器是从Angular的core库中引入的。
    * 这个@Pipe装饰器允许我们定义管道的名字，这个名字会被用在模板表达式中。它必须是一个有效的JavaScript标识符。 比如，我们这个管道的名字是exponentialStrength。
    
    **使用自定义管道的方式和内置管道完全相同。**
    ***必须在AppModule的declarations数组中包含这个管道。***


    使用管道
    
    ```
     <p>{{book.comments|shrinkStringLength:20}}</p>
    ```

### 二、动画
1. 概述

    Angular的动画系统赋予了制作各种动画效果的能力，以构建出与原生CSS动画性能相同的动画。 我们也获得了额外的让动画逻辑与其它应用代码紧紧集成在一起的能力，这让动画可以被更容易的触发与控制。

### 三、表单
1. 表单事件

    ```
     <input (keyup)="onKey($event)">
    ```
    类型化事件对象揭露了重要的一点，即反对把整个 DOM 事件传到方法中，因为这样组件会知道太多模板的信息。 只有当它知道更多它本不应了解的 HTML 实现细节时，它才能提取信息。 这就违反了模板（用户看到的）和组件（应用如何处理用户数据）之间的分离关注原则。
    
    解决方案
    
    ```
     <input #box (keyup)="0">
     <p>{{box.value}}</p>
    ```
    
    >只有在应用做了些异步事件（如击键），Angular 才更新绑定（并最终影响到屏幕）。

    >本例代码将keyup事件绑定到了数字0，这是可能是最短的模板语句。 虽然这个语句不做什么，但它满足 Angular 的要求，所以 Angular 将更新屏幕。
2. 回车键
    (keyup)事件处理器监听每一次按键。 有时只在意回车键，因为它标志着用户结束输入。
    
    ```
    <input #box (keyup.enter)="onEnter(box.value)">
    ```
    
3. 

