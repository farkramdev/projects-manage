import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
declare let $;
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  constructor(private session: AuthenticationService) { }

  ngOnInit() {
    this.initialize_dataload();
  }

  public initialize_dataload() {
    this.session.storage.removeItem('DataTables_data_student_/');
    var dataSource = [
      {
        "StudentID": "Garrett Winters",
        "StudentName": "Accountant",
        "PhoneNo": "$170,750",
        "Email": "mailmm@gg.com"
      },
      {
        "StudentID": "Ashton Cox",
        "StudentName": "Junior Technical Author",
        "PhoneNo": "$86,000",
        "Email": "mailmm@gg.com"
      },
      {
        "StudentID": "Cedric Kelly",
        "StudentName": "Senior Javascript Developer",
        "PhoneNo": "$433,060",
        "Email": "mailmm@gg.com"
      }
    ]

    $(document).ready(() => {
      $('#result_std').DataTable({
        "oLanguage": {
          "sProcessing": "กำลังดำเนินการ...",
          "sLengthMenu": "แสดง _MENU_ เร็คคอร์ด ต่อหน้า",
          "sZeroRecords": "ไม่เจอข้อมูลที่ค้นหา",
          "sInfo": "แสดง _START_ ถึง _END_ ของ _TOTAL_ เร็คคอร์ด",
          "sInfoEmpty": "แสดง 0 ถึง 0 ของ 0 เร็คคอร์ด",
          "sInfoFiltered": "(จากเร็คคอร์ดทั้งหมด _MAX_ เร็คคอร์ด)",
          "emptyTable": "ไม่มีข้อมูล",
          "sSearch": "ค้นหา",
          "oPaginate": {
            "sFirst": "เริ่มต้น",
            "sPrevious": "ก่อนหน้า",
            "sNext": "ถัดไป",
            "sLast": "สุดท้าย"
          }
        },
        "pagingType": "full_numbers",
        "responsive": true,
        "processing": true,
        "info": true,
        "stateSave": true,
        data: dataSource,
        "columns": [
          {
            "data": (data, type, row, meta) => {
              return meta.row + meta.settings._iDisplayStart + 1;
            }
          },
          { "data": "StudentID" },
          { "data": "StudentName" },
          { "data": "PhoneNo" },
          { "data": "Email" }//,
          // {
          //   "data": (data) => {
          //     return '<button class="btn btn-danger" type="button">Delete</button>'
          //   }
          // }
        ]
      });
    });

    // Server Side Call using Url
    // var table = $('#example').DataTable({
    //    //"responsive": true,
    //    "processing": true,
    //    "serverSide": true,
    //    "info": true,
    //    "stateSave": true,
    //    "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
    //    "ajax": {
    //        "url": "/DatatableAdvance/AjaxGetJsonData",
    //        "type": "GET"
    //    },
    //    "columns": [
    //        {
    //            "classStudentID": 'details-control',
    //            "orderable": false,
    //            "data": null,
    //            "orderable": true,
    //            "defaultContent": ''
    //        },
    //        {
    //            "data": "Inquiry", "orderable": false,
    //            "data": function (data) {
    //                return '<input type="hidden" id="hiddenTextInquiry" StudentID="hiddenTextInquiry" value="' + data.InquiryId + '">' + data.InquiryId
    //            }
    //        },
    //        { "data": "ReferencesDetails", "orderable": false },
    //        { "data": "ReferencesNumber", "orderable": true },
    //        { "data": "Remark", "orderable": true },
    //        { "data": "TelephoneNumber", "orderable": true },
    //        { "data": "Date", "orderable": true },
    //        {
    //            "data": "Inquiry", "bSearchable": false, "bSortable": false, "sWidth": "40px",
    //            "data": function (data) {
    //                return '<button class="btn btn-danger" type="button">' + data.InquiryId + 'Delete</button>'
    //            }
    //        }
    //    ],
    //    "order": [[0, 'asc']]
    // });

  }

}
