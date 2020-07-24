var socket = io.connect("http://vietscada.com:8080");

$(document).ready(function() {
  var indexbien = [];
  var tabbien = [];
  socket.emit("data1");
  socket.on("name1", (data) => {
    for (let i = 0; i <= 124; i++) {
      if (i <= 25) {
        createHTML("danhsach1", i, data[i]);
        $(`#${"detailvar" + i}`).css("display", "none");
        $(`#${"plus" + i}`).click(function() {
          $(`#${"detailvar" + i}`).toggle(500);
        });
        indexbien.push($(`#${"plus" + i}`));
        tabbien.push($(`#${"detailvar" + i}`));
      }
      if (i > 25 && i <= 51) {
        createHTML("danhsach2", i, data[i]);
        $(`#${"detailvar" + i}`).css("display", "none");
        $(`#${"plus" + i}`).click(function() {
          $(`#${"detailvar" + i}`).toggle(500);
        });
        indexbien.push($(`#${"plus" + i}`));
        tabbien.push($(`#${"detailvar" + i}`));
      }
      if (i > 51 && i <= 77) {
        createHTML("danhsach3", i, data[i]);
        $(`#${"detailvar" + i}`).css("display", "none");
        $(`#${"plus" + i}`).click(function() {
          $(`#${"detailvar" + i}`).toggle(500);
        });
        indexbien.push($(`#${"plus" + i}`));
        tabbien.push($(`#${"detailvar" + i}`));
      }
      if (i > 77 && i <= 80) {
        createHTML("danhsach4", i, data[i]);
        $(`#${"detailvar" + i}`).css("display", "none");
        $(`#${"plus" + i}`).click(function() {
          $(`#${"detailvar" + i}`).toggle(500);
        });
        indexbien.push($(`#${"plus" + i}`));
        tabbien.push($(`#${"detailvar" + i}`));
      }
      if (i > 80 && i <= 96) {
        createHTML("danhsach5", i, data[i]);
        $(`#${"detailvar" + i}`).css("display", "none");
        $(`#${"plus" + i}`).click(function() {
          $(`#${"detailvar" + i}`).toggle(500);
        });
        indexbien.push($(`#${"plus" + i}`));
        tabbien.push($(`#${"detailvar" + i}`));
      }
      if (i > 96 && i <= 101) {
        createHTML("danhsach6", i, data[i]);
        $(`#${"detailvar" + i}`).css("display", "none");
        $(`#${"plus" + i}`).click(function() {
          $(`#${"detailvar" + i}`).toggle(500);
        });
        indexbien.push($(`#${"plus" + i}`));
        tabbien.push($(`#${"detailvar" + i}`));
      }
      if (i > 101 && i <= 111) {
        createHTML("danhsach7", i, data[i]);
        $(`#${"detailvar" + i}`).css("display", "none");
        $(`#${"plus" + i}`).click(function() {
          $(`#${"detailvar" + i}`).toggle(500);
        });
        indexbien.push($(`#${"plus" + i}`));
        tabbien.push($(`#${"detailvar" + i}`));
      }
      if (i > 111 && i <= 119) {
        createHTML("danhsach8", i, data[i]);
        $(`#${"detailvar" + i}`).css("display", "none");
        $(`#${"plus" + i}`).click(function() {
          $(`#${"detailvar" + i}`).toggle(500);
        });
        indexbien.push($(`#${"plus" + i}`));
        tabbien.push($(`#${"detailvar" + i}`));
      }
      if (i > 119 && i <= 121) {
        createHTML("danhsach10", i, data[i]);
        $(`#${"detailvar" + i}`).css("display", "none");
        $(`#${"plus" + i}`).click(function() {
          $(`#${"detailvar" + i}`).toggle(500);
        });
        indexbien.push($(`#${"plus" + i}`));
        tabbien.push($(`#${"detailvar" + i}`));
      }
      if (i > 121 && i <= 124) {
        createHTML("danhsach11", i, data[i]);
        $(`#${"detailvar" + i}`).css("display", "none");
        $(`#${"plus" + i}`).click(function() {
          $(`#${"detailvar" + i}`).toggle(500);
        });
        indexbien.push($(`#${"plus" + i}`));
        tabbien.push($(`#${"detailvar" + i}`));
      }
    }
  });
  var giatrinew = [];
  var mangvalue = [];
  var info = [];
  var detail = [];
  var objecttab = [
    $("#folder1"),
    $("#folder2"),
    $("#folder3"),
    $("#folder4"),
    $("#folder5"),
    $("#folder6"),
    $("#folder7"),
    $("#folder8"),
    $("#folder9"),
    $("#folder10"),
    $("#folder11"),
  ];
  var listbien = [
    $(".danhsach1"),
    $(".danhsach2"),
    $(".danhsach3"),
    $(".danhsach4"),
    $(".danhsach5"),
    $(".danhsach6"),
    $(".danhsach7"),
    $(".danhsach8"),
    $(".danhsach9"),
    $(".danhsach10"),
    $(".danhsach11"),
  ];
  var id = 500;
  $(".nutnhanplus").each(function(index, value) {
    $(this).attr("id", id);
    indexbien.push($(`#${id}`));
    id++;
  });
  var table = 600;
  $(".banghienplus").each(function(index, value) {
    $(this).attr("id", table);
    tabbien.push($(`#${table}`));
    // giatrinew.push($(`#${table} .giatrinew`));
    table++;
  });
  var id2 = 125;
  $(".motdongbien").each(function(index, value) {
    $(this).attr("id", "chay" + id2);
    // tabbien.push($(`#${id2}`));
    id2++;
  });
  var id_user = 125;
  $(".fa-info-circle").each(function(index, value) {
    $(this).attr("id", "id_user" + id_user);
    info.push($(`#${"id_user" + id_user}`));
    id_user++;
  });
  var detail_user = 125;
  $(".detailinfo1").each(function(index, value) {
    $(this).attr("id", "detailuser" + detail_user);
    detail.push($(`#${"detailuser" + detail_user}`));
    detail_user++;
  });
  var id6 = 125;
  $(".value_db").each(function(index, value) {
    $(this).attr("id", "value" + id6);
    mangvalue.push($(`#${"value" + id6}`));
    id6++;
  });
  $(".banghienplus").addClass("antable");
  function hienthi1(i) {
    indexbien[i].click(function() {
      tabbien[i].toggle(500);
    });
  }
  function hienthi2(i) {
    objecttab[i].click(function() {
      listbien[i].toggle(500);
    });
  }
  function hienthi3(i) {
    info[i].click(function() {
      detail[i].toggle(500);
    });
  }
  for (i = 0; i < indexbien.length; i++) {
    hienthi1(i);
  }
  for (i = 0; i < objecttab.length; i++) {
    hienthi2(i);
  }
  for (i = 0; i < info.length; i++) {
    hienthi3(i);
  }
  $(".nav-link").click(function() {
    $(".nav-link").removeClass("tab");
    $(this).addClass("tab");
  });
  $(".pull-right-1").click(function() {
    var ten = $("#name").val();
    $(
      "#usermanager"
    ).append(`<span><i class="fa fa-user-circle" aria-hidden="true"></i>
        ${ten}</span><br>`);
  });
  ///////////////////////////////////////////////////////////////////////////
  $("#deletevar").click(function() {
    let id = $("#nodeid").val();
    if (id <= 124) {
      $("#thongbaoxoa_loi").css("display", "block");
      $("#thongbaoxoa_loading").css("display", "none");
      $("#delete")[0].reset();
    } else {
      $("#thongbaoxoa_loi").css("display", "none");
      $("#thongbaoxoa_loading").css("display", "block");
      socket.emit("xoabien", id);
      $(`#${id}`).hide(1000, function() {
        $(this).remove();
      });
      $("#delete")[0].reset();
      setTimeout(function() {
        location.reload();
      }, 3000);
    }
  });
  ///////////////////////////////////////////////////////////////////////////
  $("#deleteobject").click(function() {
    let id = $("#nodeid2").val();
    socket.emit("xoaobject", id);
    $(`#${id}`).hide(1000, function() {
      $(this).remove();
    });
    $("#delete1")[0].reset();
  });
  ///////////////////////////////////////////////////////////////////////////
  var m = 2;
  var k = 0;
  var n = 125;

  $("#datatype").change(() => {
    if ($("#datatype").val() == "Bool") {
      $("#choosetruefalse").show(200);
      $("#value_0_").hide(200);
    } else {
      $("#value_0_").show(200);
      $("#choosetruefalse").hide(200);
    }
  });
  $("#addvar").click(function() {
    if ($("#name").val() !== "") {
      var namedev = "Data Simulation";
      var name = $("#name").val();
      var datatype = $("#datatype").val();
      var writable = $("#writable").val();
      var value_0 = $("#value_0").val();
      var value_boolean = $("input[name='truefalse']:checked").val();
      var value;
      if (datatype.toString() == "Bool") {
        if (value_boolean.toString() == "true") {
          value = true;
        } else {
          value = false;
        }
      }

      if (datatype.toString() == "Double") {
        value = parseFloat(value_0);
      }
      if (datatype.toString() == "Int") {
        value = parseFloat(value_0);
      }
      if (datatype.toString() == "String") {
        value = value_0.toString();
      }
      socket.emit("dulieubien", {
        namedev: namedev,
        name: name,
        datatype: datatype,
        writable: writable,
        value: value,
        stt: k,
      });
      setTimeout(function() {
        location.reload();
      }, 2000);
      $("#createvar")[0].reset();
    } else {
      $("#thongbaonhaplai").css("display", "block");
    }
  });
  $("#adduser").click(function() {
    var name_user = $("#name_user").val();
    var pass_user = $("#pass_user").val();
    var pass_user_2 = $("#pass_user_2").val();
    if (
      name_user !== "" &&
      pass_user !== "" &&
      pass_user_2 !== "" &&
      pass_user == pass_user_2
    ) {
      $("#thongbaouser_1").css("display", "none");
      $("#thongbaouser_2").css("display", "none");
      $("#thongbaouser_3").css("display", "none");
      $("#thongbaouser_5").css("display", "none");
      socket.emit("dulieu_user_opc", {
        name_user: name_user,
        pass_user: pass_user,
      });
      $("#hienmodal").empty();
      $("#hienmodal").append(`PLEASE RELOAD PAGE AFTER 10S`);
    } else {
      if (pass_user !== pass_user_2) {
        $("#thongbaouser_3").css("display", "block");
        $("#hienmodal").empty();
        $("#hienmodal")
          .append(`ERROR <i class="fa fa-hand-o-right" aria-hidden="true" style='margin-right:0px'></i>
                PLEASE CHECH FORM AGAIN`);
      }
      if (name_user == "") {
        $("#thongbaouser_1").css("display", "block");
        $("#hienmodal").empty();
        $("#hienmodal")
          .append(`ERROR <i class="fa fa-hand-o-right" aria-hidden="true" style='margin-right:0px'></i>
                PLEASE CHECH FORM AGAIN`);
      }
      if (pass_user == "" || pass_user_2 == "") {
        $("#thongbaouser_2").css("display", "block");
        $("#hienmodal").empty();
        $("#hienmodal")
          .append(`ERROR <i class="fa fa-hand-o-right" aria-hidden="true" style='margin-right:0px'></i>
                PLEASE CHECH FORM AGAIN`);
      }
    }
  });
  $("#confirm").click(function() {
    var mode_sercurity = $("#change_mode").val();
    if (mode_sercurity == "true") {
      socket.emit("change_mode", {
        mode: true,
      });
    } else {
      socket.emit("change_mode", {
        mode: false,
      });
    }
  });
  $("#delete_user").click(function() {
    var name_user = $("#name_user_del").val();
    if (name_user !== "") {
      socket.emit("delete_user_opc", {
        name_user: name_user,
      });
    } else {
      if (name_user == "") {
        $("#thongbaouser_4").css("display", "block");
      }
    }
  });
  $("#changeport").click(function() {
    var port_number = $("#port_number").val();
    socket.emit("change_port", {
      port_number: port_number,
    });
  });
  socket.on("value", function(data) {
    for (i = 0; i <= 124; i++) {
      $(`#${"value" + i}`).empty();
      $(`#${"value" + i}`).append(`${data[i]}`);
    }
  });
  socket.on("update", function(data) {
    for (i = 0; i < mangvalue.length; i++) {
      mangvalue[i].html(`${data[i + 125]}`); //attention
    }
  });
  socket.on("dinhdanh", function(data) {
    for (i = 0; i <= 124; i++) {
      $(`#${"dinhdanh" + i}`).empty();
      $(`#${"dinhdanh" + i}`).append(`${data[i]}`);
    }
  });
  socket.on("datatype", function(data) {
    for (i = 0; i <= 124; i++) {
      $(`#${"datatype" + i}`).empty();
      $(`#${"datatype" + i}`).append(`${data[i]}`);
    }
  });
  socket.on("name", function(data) {
    for (i = 0; i <= 124; i++) {
      $(`#${"name" + i}`).empty();
      $(`#${"name" + i}`).append(`${data[i]}`);
    }
  });
  socket.on("access", function(data) {
    for (i = 0; i <= 124; i++) {
      $(`#${"access" + i}`).empty();
      $(`#${"access" + i}`).append(`${data[i]}`);
    }
  });
  socket.on("new_user", function(data) {
    $("#new_after").empty();
    for (i = 0; i < data.length; i++) {
      $("#new_after").append(`
            <tr>
                <th> <i class="fa fa-plus" aria-hidden="true"> ${data[i]}</i>
                </th>               
            </tr>  
        `);
    }
  });
  socket.on("deleted_user", function(data) {
    $("#thongbaouser_6").css("display", "none");
    $("#deleted_after").empty();
    for (i = 0; i < data.length; i++) {
      $("#deleted_after").append(`
            <tr>
                <th> 
                <i class="fa fa-minus" aria-hidden="true">${data[i]}</i>
                </th>               
            </tr>  
        `);
    }
  });
  /////////////////////
  socket.on("cer_trust_before", function(data) {
    $("#trusted").html("");
    for (i = 0; i < data.length; i++) {
      $("#trusted").append(`
                <tr>
                    <th> 
                    <img src="assets/images/certificate_1.png"  style="cursor:pointer;width: 20px;height: 20px;margin-bottom: 3px;"><p style="font-weight: initial;display: inline;"class ="c">${data[i]}</p></img>
                    </th>               
                </tr>  
            `);
    }
    $(".c").click(function() {
      var name = $(this).text();
      socket.emit("open_file_trust", name);
    });
  });
  socket.on("noidung_reject", function(data) {
    $("#info_cer").empty();
    $("#info_cer").append(`
                <tbody>
                <tr>
                    <th>Valid From</th>
                    <th>${data[0]}</th>
                </tr>
                <tr>
                    <th>Valid To</th>
                    <th>${data[1]}</th>
                </tr>
                <tr>
                    <th>Serial Number</th>
                    <th>${data[3]}</th>
                </tr>
                <tr>
                    <th>Issuer</th>
                    <th>${data[4]}</th>   
                </tr>
                <tr>
                    <th>Subject</th>
                    <th>${data[5]}</th>   
                </tr>
                <tr>
                    <th>Subject Alternative Name</th>
                    <th>${data[2]}</th> 
                </tr>
                </tbody>  
        `);
    $("#show_cer").toggle(500);
  });

  socket.on("cer_reject_before", function(data) {
    $("#rejected").html("");
    for (i = 0; i < data.length; i++) {
      $("#rejected").append(`
                <tr>
                    <th>
                    <img src="assets/images/certificate_1.png"  style="cursor:pointer;width: 20px;height: 20px;margin-bottom: 3px;"><p style="font-weight: initial;display: inline;"class ="d">${data[i]}</p></img>
                    
                    </th>               
                </tr>
            `);
    }
    $(".d").click(function() {
      var name = $(this).text();
      socket.emit("open_file_reject", name);
    });
  });
  socket.on("name_cer_trusted", function(data) {
    $("#trusted_after").html("");
    for (i = 0; i < data.length; i++) {
      $("#trusted_after").append(`
                <tr>
                    <th> 
                    <img src="assets/images/certificate_1.png"  style="cursor:pointer;width: 20px;height: 20px;margin-bottom: 3px;"><p style="font-weight: initial;display: inline;"class ="a">${data[i]}</p></img> 
                    </th>               
                </tr>  
            `);
    }
    $(".a").click(function() {
      var name = $(this).text();
      socket.emit("move_trusted", name);
      location.reload();
    });
  });
  socket.on("name_cer_rejected", function(data) {
    $("#rejected_after").html("");
    for (i = 0; i < data.length; i++) {
      $("#rejected_after").append(`
                <tr>
                    <th>
                    <img src="assets/images/certificate_1.png"  style="cursor:pointer;width: 20px;height: 20px;margin-bottom: 3px;"><p style="font-weight: initial;display: inline;"class ="b">${data[i]}</p></img>
                    </th>               
                </tr>
            `);
    }
    $(".b").click(function() {
      var ten = $(this).text();
      socket.emit("move_rejected", ten);
      location.reload();
    });
  });
  ///////////////////////////////////////////////////////////////////////////
  socket.on("clientin", function(data) {
    $("#lichsuclient").append(`
            <tr>
                <th>${data[0]}</th>
                <th>${data[1]}</th>
                <th>${data[2]}</th>
                <th>${data[3]}</th>
                <th>${data[4]}</th>
                <th>${data[5]}</th>
            </tr>  
        `);
  });
  socket.on("clientout", function(data) {
    $("#lichsuclient").append(`
            <tr>
                <th>${data[0]}</th>
                <th>${data[1]}</th>
                <th>${data[2]}</th>
                <th>${data[3]}</th>
                <th>${data[4]}</th>
                <th>${data[5]}</th>
            </tr> 
        `);
  });
  socket.on("lstruycap", function(data) {
    for (i = 0; i < data.length; i++) {
      $("#lichsuclient").append(`
            <tr>
                <th>${data[i].timestamps}</th>
                <th>${data[i].eventtype}</th>
                <th>${data[i].sessionname}</th>
                <th>${data[i].sessionid}</th>
                <th>${data[i].clientidentity}</th>
                <th>${data[i].security}</th>
            </tr> 
        `);
    }
  });
  socket.on("trung_add_user", function() {
    $("#thongbaouser_5").css("display", "block");
    $("#hienmodal").empty();
    $(
      "#hienmodal"
    ).append(`ERROR <i class="fa fa-hand-o-right" aria-hidden="true" style='margin-right:0px'></i>
                PLEASE CHECH FORM AGAIN`);
  });
  socket.on("delete_user_not_valid", function() {
    $("#thongbaouser_4").css("display", "none");
    $("#thongbaouser_6").css("display", "block");
  });
  socket.on("cannotadd", function() {
    $("#thongbaonhaplai").css("display", "none");
    $("#thongbaotaomoi").css("display", "block");
  });
  socket.on("adding", function() {
    $("#thongbaonhaplai").css("display", "none");
    $("#thongbaotaobien").css("display", "block");
  });
  socket.on("sessioncurrent", function(data) {
    $("#sessioncount").empty();
    $("#sessioncount").append(`${data}`);
  });
  socket.on("thongtin_server", function(data) {
    $(".icononoff").css("color", "green");
    $("#port").empty();
    $("#port").append(`${data[1]}`);
    $("#connectaddress").empty();
    $("#connectaddress").append(`${data[2]}`);
    $("#allowanony").empty();
    $("#allowanony").append(`${data[3]}`);
  });
  $("#dropinfo").click(function() {
    $("#detailinfo").toggle(500);
  });
  $("#newusericon").click(function() {
    $("#newuser").toggle(500);
  });
  $("#tieudeadd").click(function() {
    $("#form1").toggle(500);
  });
  $("#tieudeadd4").click(function() {
    $("#form4").toggle(500);
  });
  $("#tieudeadd1").click(function() {
    $("#form2").toggle(500);
  });
  $("#tieudeadd2").click(function() {
    $("#form3").toggle(500);
  });
  $(".cer_after").click(function() {
    $("#detail_cer_after").toggle(500);
  });
  $(".user_after").click(function() {
    $("#detail_user_after").toggle(500);
    socket.emit("user");
  });

  setInterval(() => {
    socket.emit("data");
  }, 1000);
  $("#refresh").click(function() {
    socket.emit("update_to_database");
  });
  $("#refresh_1").click(function() {
    socket.emit("click");
  });
  $(".demnguoc").click(() => {
    demnguoc();
    function demnguoc() {
      var time = 9;
      setInterval(() => {
        console.log(time);
        $("#timedown").empty();
        $("#timedown").append(`${time}S`);
        time = time - 1;
        if (time == 0) {
          location.reload();
        }
      }, 1000);
    }
  });
  $("#restart").click(() => {
    socket.emit("khoidonglai");
  });
  function createHTML(danhsach, i, name) {
    let texhtml = `
        <div class="row">
        <div class="col-md-4 col-sm-4">
            <div>          
                <span id="dich"><p class ="square">${i}</p><i class="fa fa-plus-square" id="${"plus" +
      i}" class="plus"></i>${name}</span><br>         
            </div>
        </div>    
        <div class="col-md-8 col-sm-8" id="${"detailvar" + i}">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                   </thead>
                   <tbody>
                    <tr>
                        <th>NodeID</th>
                        <th id="${"dinhdanh" + i}">s="",ns=""</th>
                    </tr>
                    <tr>
                        <th>Display Name</th>
                        <th id="${"name" + i}">None</th>
                    </tr>
                    <tr>
                        <th>Data Type</th>
                        <th id="${"datatype" + i}">None</th>
                    </tr>
                    <tr>
                        <th>Value</th>
                        <th id="${"value" + i}">None</th>
                    </tr>
                    <tr>
                        <th>AccesLevel</th>
                        <th id="${"access" + i}">Write/Read</th>
                    </tr>
                    </tbody>
                </table>
        </div>
        </div>
        `;

    $(`.${danhsach}`).append(texhtml);
  }

  ///////////////////////////////////////////////////////////////////////////
});
