import { animate, AnimationBuilder, style } from '@angular/animations';
import { Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly animationBuilder = inject(AnimationBuilder);
  private readonly ngZone = inject(NgZone);

  @ViewChild('el')
  set el(el: ElementRef<HTMLElement>) {
    this.playAnimation(el.nativeElement);
  }

  private playAnimation(el: HTMLElement): void {
    const animation = this.animationBuilder.build([
      style({ 'transform': `rotate(0deg)`}), animate(`10000ms cubic-bezier(0.32, 0.64, 0.45, 1)`, style({
        'transform': `rotate(360deg)`
      }))
    ]);

    const anim = animation.create(el);

    this.ngZone.runOutsideAngular(() => {
      anim.play();
      anim.setPosition(0.5);
    });
  }
}
