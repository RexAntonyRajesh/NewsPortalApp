import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleService } from 'src/Services/article.service';
import { CategoryService } from 'src/Services/category.service';
import { IArticle } from '../Interface/article';
import { ICategory } from '../Interface/category';

@Component({
  selector: 'app-article-add-edit',
  templateUrl: './article-add-edit.component.html',
  styleUrls: ['./article-add-edit.component.scss']
})
export class ArticleAddEditComponent implements OnInit {

  articleForm: FormGroup;
  Categories?: ICategory[];

  constructor(
    private _fb: FormBuilder,
    private _articleService: ArticleService,
    private _categoryService: CategoryService,
    private _dialogRef: MatDialogRef<ArticleAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.articleForm = this._fb.group({
      title: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      categoryId: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getCategoryList();
    if(this.data){
        this.articleForm.patchValue(this.data);
    }
  }

  getCategoryList(){
    this._categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.Categories = res
      },
      error: console.log,
    });
  }

  onFormSubmit() {
    if (this.articleForm.valid) {
      if (this.data) {
        var articleUpdateRequest: IArticle = {
          articleId:this.data.articleId ,
          title : this.articleForm.value.title,
          description : this.articleForm.value.description,
          categoryId : this.articleForm.value.categoryId,
          createdDateTime: this.data.createdDateTime
        }
        this._articleService
          .updateArticle(articleUpdateRequest)
          .subscribe({
            next: (val: any) => {
              alert('Article detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        var articleCreateRequest: IArticle = {
          articleId:0 ,
          title : this.articleForm.value.title,
          description : this.articleForm.value.description,
          categoryId : this.articleForm.value.categoryId,
          createdDateTime: new Date()
        }
        
        this._articleService.addArticle(articleCreateRequest).subscribe({
          next: (val: any) => {
            alert('Article added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}