import {Component, inject, OnInit} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';
import {FooterContentComponent} from '../footer-content/footer-content.component';
import {MatIconModule} from '@angular/material/icon';
import {SourceListComponent} from '../../../news/components/source-list/source-list.component';
import {Source} from '../../../news/model/source.entity';
import {Article} from '../../../news/model/article.entity';
import {NewsApiService} from '../../../news/services/news-api.service';
import {LogoApiService} from '../../../shared/services/logo-api.service';
import {ArticleListComponent} from '../../../news/components/article-list/article-list.component';

@Component({
  selector: 'app-side-navigation-bar',
  imports: [
    MatSidenavModule,
    MatToolbar,
    LanguageSwitcherComponent,
    FooterContentComponent,
    MatIconModule,
    SourceListComponent,
    ArticleListComponent
  ],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css'
})
export class SideNavigationBarComponent implements OnInit {
  sources: Array<Source> = [];
  articles: Array<Article> = [];
  private newsApi = inject(NewsApiService);
  private logoApiService = inject(LogoApiService);

  ngOnInit(): void {
    this.newsApi.getSources().subscribe(sources => {
      console.log('sources: ', sources);
      this.sources = sources;
      this.sources.forEach(source => source.urlToLogo = this.logoApiService.getUrlToLogo(source));
      console.log('sources: ', this.sources);
      this.searchArticlesForSource(this.sources[0]);
    })
  }
  searchArticlesForSource(source: Source): void {
    console.log('select source is: ', source.id);
    this.newsApi.getArticleBySourceId(source.id)
      .subscribe(articles => {
        this.articles = articles;
        this.articles.forEach((article: { source:{ urlToLogo: any; url: any;};}) => {
          article.source.urlToLogo = source.urlToLogo;
          article.source.url = source.url;
        });
        console.log('articles: ', this.articles);
      });
  }
  onSourceSelected(source: Source): void {
    console.log('onSourceSelected', source.name);
    this.searchArticlesForSource(source);
  }
}
