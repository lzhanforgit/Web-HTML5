import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PositionsService} from './../../services/positions.service';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.css'],
  providers: [PositionsService]
})
export class PositionDetailComponent implements OnInit {


  _positon:any;
  constructor(

    private route: ActivatedRoute,
    private ps: PositionsService
  ) { }

  ngOnInit() {

    let id=this.route.snapshot.paramMap.get('id');
    let that=this;
    that.ps.getPositionById(id,function (position) {

      console.log(position);
      that._positon=position[0];
    })
  }

}
