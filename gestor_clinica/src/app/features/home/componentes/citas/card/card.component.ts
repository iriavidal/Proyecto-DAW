import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card: any | null = null;
  carta: any;

  ngOnInit(): void {
    this.carta = this.card;
  }
}
