import {Component, inject, Input} from '@angular/core';
import { Article } from '../../model/article.entity';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MatCardModule
} from '@angular/material/card';
import {DatePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {MatAnchor, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-article-item',
  imports: [
    MatCardModule,
    DatePipe,
    TranslatePipe,
    MatIcon,
    MatIconButton,
    MatAnchor,
  ],
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.css'
})
export class ArticleItemComponent {
  @Input() article!: Article;

  constructor(private snackBar: MatSnackBar) {
  }

  async ShareArticle() {
    const articleShareInfo = {
      title: this.article.title,
      url: this.article.url
    };

    if (navigator.share) {
      try {
        await navigator.share(articleShareInfo);
        this.snackBar.open('Article shared successfully!', 'Close', {duration: 3000});
      } catch (error) {
        this.snackBar.open('Article could not be shared!', 'Close', {duration: 3000});
      }
    }
      else {
        try {
          await navigator.clipboard.writeText(articleShareInfo.url);
          this.snackBar.open('Article URL copied to clipboard!', 'Close', {duration: 3000});
        } catch (error) {
          this.snackBar.open('Article URL could not be copied to clipboard!', 'Close', {duration: 3000});
        }
      }
    }
  }


