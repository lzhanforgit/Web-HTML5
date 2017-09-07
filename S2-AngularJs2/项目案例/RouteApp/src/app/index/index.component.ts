import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Router} from '@angular/router';


//导入服务

import {PositionsService} from './../services/positions.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [PositionsService]
})
export class IndexComponent implements OnInit {

  text: string = '';

  positions: any;

  constructor(private route: ActivatedRoute,
              private router:Router,
              private ps: PositionsService) {

  }

  ngOnInit() {
    let that = this;
    // let val=that.route.snapshot.paramMap.get('val');
    // that.text=val;

    that.ps.getAllPositions(function (result) {
      that.positions = result;
    })

  }


  toPositionDetail(id) {
    this.router.navigate(['/detail',id]);
  }

}
