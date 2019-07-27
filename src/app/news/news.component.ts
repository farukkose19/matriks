import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {NewsHeader} from '../model/NewsHeader';
import {WebService} from '../service/web.service';
import {NewsCategory} from '../model/NewsCategory';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material';
import {DetailDialogComponent} from '../dialog/detail-dialog/detail-dialog.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;  selectedCategory = '';
  displayedColumns: string[] = ['time', 'date', 'headline', 'category'];
  dataSource: MatTableDataSource < NewsHeader >;
  selectedHeader = '';
  categories: NewsCategory[];

  constructor(
    private service: WebService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.service.getHeader().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate =
        (data: NewsHeader, filter: string) => {
          const searchTerms: NewsHeader = JSON.parse(filter);
          return (data.category === searchTerms.category || searchTerms.category === '')
            && data.headline.toLowerCase().indexOf(searchTerms.headline) !== -1;
        };
    }, error1 => {
      console.log(error1);
    });
    this.service.getCategory().subscribe(res => {
      this.categories = res;
    }, error1 => {
      console.log(error1);
    });
  }

  applyFilter() {
    this.dataSource.filter = JSON.stringify({
      category: this.selectedCategory,
      headline: this.selectedHeader.toLowerCase()
    });
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(news): void {
    localStorage.setItem(news.id.toString(), 'true');
    this.service.getDetail(news.id).subscribe(res => {
      const dialogRef = this.dialog.open(DetailDialogComponent, {
        width: '600px',
        height: '300px',
        data: {
          detail: res,
          header: news.headline
        }
      });
    }, error1 => {
      console.log(error1);
    });
  }

  getLocalData(id) {
    if (localStorage.getItem(id.toString())) {
      return { 'text-decoration': 'line-through' };
    }
    return '';
  }
}

