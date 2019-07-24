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
renderList();
renderHeader();
