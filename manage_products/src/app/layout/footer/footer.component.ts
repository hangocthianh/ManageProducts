import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <blockquote class="blockquote fixed-bottom m-1">
      <footer class="blockquote-footer ">
        <cite title="Source Title">Thank you very much</cite>
      </footer>
    </blockquote>
  `,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
