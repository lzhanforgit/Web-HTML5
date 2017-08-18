### 一、指令-属性指令
1. 概述

    在 Angular 中有三种类型的指令：

    * 组件 — 拥有模板的指令
    * 结构型指令 — 通过添加和移除 DOM 元素改变 DOM 布局的指令
    * 属性型指令 — 改变元素、组件或其它指令的外观和行为的指令。
    
    >结构型指令修改视图的结构。例如，NgFor 和 NgIf。 要了解更多，参见结构型指令 guide。

    >属性型指令改变一个元素的外观或行为。例如，内置的 NgStyle 指令可以同时修改元素的多个样式。
2. 自定义指令
    属性型指令至少需要一个带有@Directive装饰器的控制器类。该装饰器指定了一个用于标识属性的选择器。 控制器类实现了指令需要的指令行为。
    
    ```
    import { Directive, ElementRef, Input } from '@angular/core';

    @Directive({ selector: '[myStyle]' })
    export class StyleDirective {
      constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
      }
    }
    ```
    import语句指定了从 Angular 的core库导入的一些符号。

    * Directive提供@Directive装饰器功能。
    * ElementRef注入到指令构造函数中。这样代码就可以访问 DOM 元素了。
    * Input将数据从绑定表达式传达到指令中。

    导入指令
    
    ```
    //app.module.ts
    import {StyleDirective} from './directives/attribute-directives/style.directive'

    @NgModule({
  declarations: [
    ...
      //  属性指令
    StyleDirective
  ],
    ```
    
    使用指令
    
    ```
    <!--myStyle为自定义属性指令-->
        <h1 myStyle>
          Welcome to {{title}}!{{mytext}}
        </h1>
    ```

3. 自定义带事件的属性指令-带输入参数
    可以通过标准的JavaScript方式手动给宿主 DOM 元素附加一个事件监听器。 但这种方法至少有三个问题：

    * 必须正确的书写事件监听器。
    * 当指令被销毁的时候，必须拆卸事件监听器，否则会导致内存泄露。
    * 必须直接和 DOM API 打交道，应该避免这样做。

    ```
    import { Directive, ElementRef,HostListener, Input } from '@angular/core';

    @Directive({ selector: '[myEventStyle]' })
    export class EventStyleDirective {
      @Input('myEventStyle') styleColor: string;
      constructor(private el: ElementRef) {
    
      }
      
      @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.styleColor||'red');
      }
    
      @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
      }
    
      private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
      }
    }
    ```
    
    调用
    ```
      <h2 myEventStyle>
      //或者
      <h2 myEventStyle="green">
    ```
4. 自定义带事件的属性指令-带默认参数

    ```
    import { Directive, ElementRef,HostListener, Input } from '@angular/core';

    @Directive({ selector: '[myEventStyle]' })
    export class EventStyleDirective {
      @Input('myEventStyle') styleColor: string;
      //增加了这个
      @Input() defaultColor: string;
      constructor(private el: ElementRef) {
    
      }
      //用在这里
      @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.styleColor||this.defaultColor||'red');
      }
    
      @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
      }
    
      private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
      }
    }
    
    ```
    调用指令
    ```
    <h2 myEventStyle defaultColor="#0000ff">
    ```


### 二、 结构指令
1. 概述
    结构型指令的职责是HTML布局。 它们塑造或重塑DOM的结构，比如添加、移除或维护这些元素。
    
    像其它指令一样，你可以把结构型指令应用到一个宿主元素上。 然后它就可以对宿主元素及其子元素做点什么。
    
    结构型指令非常容易识别。 在这个例子中，星号（*）被放在指令的属性名之前。
    

2.<ng-container>

Angular的<ng-container>是一个分组元素，但它不会污染样式或元素布局，因为 Angular 压根不会把它放进 DOM 中。

```
<div>
  Pick your favorite hero
  (<label><input type="checkbox" checked (change)="showSad = !showSad">show sad</label>)
</div>
<select [(ngModel)]="hero">
  <ng-container *ngFor="let h of heroes">
    <ng-container *ngIf="showSad || h.emotion !== 'sad'">
      <option [ngValue]="h">{{h.name}} ({{h.emotion}})</option>
    </ng-container>
  </ng-container>
</select>
```


