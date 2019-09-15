let canvas;
let Tpl = {
  "nav-imgList":
    "<li class='img-item'><img src='${img}'></img><span>${Name}</span></li>",
  header: "<span>${Name}</span>"
};
for (let key in Tpl) {
  $.template(key, Tpl[key]);
}

function renderTpl(id, data) {
  $(`#${id}`).empty();
  $.tmpl(id, data).appendTo(`#${id}`);
}

function renderList(data) {
  let $id = "nav-imgList";
  let _data = data || [
    { Name: "阀门", img: "/img/hmi/阀门工艺图.png", index: 0 },
    { Name: "工艺流程", img: "/img/hmi/工艺流程-1.png", index: 1 },
    { Name: "工艺流程2", img: "/img/hmi/工艺流程-2.png", index: 2 }
  ];
  renderTpl($id, _data);
  $(`ul#${$id} li`)
    .unbind("click")
    .on("click", function(ev) {
      let $item = $.tmplItem(this);
      let { img, index } = $item.data;
      fabric.Image.fromURL(img, function(oImg) {
        // oImg.moveTo(0);
        canvas.add(oImg);
        canvas.moveTo(oImg, index);
      });

      console.log($item.data.Name);
    });
}

function renderHeader(data) {
  let $id = "header";
  let _data = data || { Name: "HMI" };
  renderTpl($id, _data);
  $(`#${$id} span`)
    .unbind("click")
    .on("click", function() {
      var item = $.tmplItem(this);
      console.log(item.data.Name);
    });
}

function renderBtn() {
  let btnId = "main-btn-save";
  $(`#${btnId}`).on("click", () => {
    let data = canvas.toObject();

    console.log(
      `mutation{
          addAssembly(version:"${data.version}",objects:${JSON.stringify(
        JSON.stringify(data.objects)
      )}){
            version,
            objects
          }
        }`
    );
    $.ajax({
      method: "POST",
      url: "/graphql",
      data: {
        query: `mutation{
          addAssembly(version:"${data.version}",objects:${JSON.stringify(
          data.objects
        )}){
            version,
            objects
          }
        }`
      },
      success: function(res) {
        console.log(res);
      },
      error: function(r) {
        console.log(r);
      }
    });
  });
}

function renderCanvas() {
  canvas = new fabric.Canvas("main-canvas");
  canvas.setWidth($(".main-section").width());
  canvas.setHeight($(".main-section").height());
  // fabric.Image.fromURL("/img/hmi/阀门工艺图.png", function(oImg) {
  //   // oImg.moveTo(0);
  //   canvas.add(oImg);
  //   canvas.moveTo(oImg, 0);
  // });
  // fabric.Image.fromURL("/img/hmi/工艺流程-1.png", function(oImg) {
  //   canvas.add(oImg);
  //   canvas.moveTo(oImg, 1);
  // });
  // fabric.Image.fromURL("/img/hmi/工艺流程-2.png", function(oImg) {
  //   canvas.add(oImg);
  //   canvas.moveTo(oImg, 2);
  // });
  // src\public\img\hmi\阀门工艺图.png
}
renderList();
renderHeader();
renderCanvas();
renderBtn();
