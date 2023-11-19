import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { parse } from 'path';
import { ArticleService } from 'src/Services/article.service';
import { CategoryService } from 'src/Services/category.service';
import { ArticleAddEditComponent } from './article-add-edit/article-add-edit.component';
import { IArticle } from './Interface/article';
import { ICategory } from './Interface/category';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = [
    'articleId',
    'title',
    'description',
    'categoryId',
    'createdDateTime',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Categories?: ICategory[];

  constructor(
    private _dialog: MatDialog,
    private _articleService: ArticleService,
    private _categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.getArticleList();    
    this.getCategoryList();
  }

  openAddEditArticleForm() {
    const dialogRef = this._dialog.open(ArticleAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getArticleList();
        }
      },
    });
  }

  getArticleList() {
    this._articleService.getArticleList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  getCategoryList(){
    this._categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.Categories = res
      },
      error: console.log,
    });
  }

  getCategoryName(categoryId:number):any{    
      var category =  this.Categories?.find(a=>a.categoryId == categoryId)
      return category?.categoryType;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteArticle(id: number) {
    this._articleService.deleteArticle(id).subscribe({
      next: (res) => {
       alert('Article deleted!');
        this.getArticleList();
      },
      error: console.error,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ArticleAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getArticleList();
        }
      },
    });
  }

  AddRandomArticles(){
    for (var i = 0, len = 20; i < len; i++) {
      var articleCreateRequest: IArticle = {
        articleId:0 ,
        title : 'article '+i,
        description : 'Test Desctiption for the article ' + i,
        categoryId : i%2 ==0 ? '1':'2',
        createdDateTime: new Date()
      }
    
      this._articleService.addArticle(articleCreateRequest).subscribe({
        next: (val: any) => {         
          this.getArticleList();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }
  }
}