let Tpl = {
  "nav-movieList": "<li>${Name}.</li>",
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
  let $id = "nav-movieList";
  let _data = data || [{ Name: "John Doe" }, { Name: "John Doe2" }];
  renderTpl($id, _data);
  $(`ul#${$id} li`)
    .unbind("click")
    .on("click", function(ev) {
      var $item = $.tmplItem(this);
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

function renderCanvas() {
  let canvas = new fabric.Canvas("main-canvas");
  canvas.setWidth($(".main-section").width());
  canvas.setHeight($(".main-section").height());
  fabric.Image.fromURL("/img/hmi/阀门工艺图.png", function(oImg) {
    // oImg.moveTo(0);
    canvas.add(oImg);
    canvas.moveTo(oImg, 0);
  });
  fabric.Image.fromURL("/img/hmi/工艺流程-1.png", function(oImg) {
    canvas.add(oImg);
    canvas.moveTo(oImg, 1);
  });
  fabric.Image.fromURL("/img/hmi/工艺流程-2.png", function(oImg) {
    canvas.add(oImg);
    canvas.moveTo(oImg, 2);
  });
  // src\public\img\hmi\阀门工艺图.png
}
renderList();
renderHeader();
renderCanvas();
