import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

/**
 * Directive to highlight elements on hover
 * Usage: <button appHighlight="yellow">Hover me</button>
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = 'yellow';
  @Input() highlightColor: string = '#fff';

  private originalBackgroundColor: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.originalBackgroundColor =
      this.el.nativeElement.style.backgroundColor || 'transparent';
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = this.originalBackgroundColor;
  }
}
