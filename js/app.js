var const_app_name = "Webix demo";

webix.ready(function(){
  webix.ui({
    id: "layout_main",
    rows: [
      {   view: "toolbar", padding:3, elements: [
        {view: "button", type: "icon", icon: "bars",
          width: 37, align: "left", css: "app_button", click: function(){
            $$("sidebar_menu").toggle()
          }
        },
        { view: "label", id: "lbl_header", label: const_app_name},
        {},
        { view: "button", type: "icon", width: 45, css: "app_button", icon: "envelope-o",  badge:4},
        { view: "button", type: "icon", width: 45, css: "app_button", icon: "bell-o",  badge:10}
      ]
      },
      {
        cols:[
          {
            view: "sidebar",
            height: "auto",
            css: "webix_sidebar",
            id: "sidebar_menu",
            data: menu_data,
            on:{
              onAfterSelect: function(id){
                webix.message("Selected: "+this.getItem(id).value);
                //remove current views
                $$("lbl_header").setValue(const_app_name + " - " + this.getItem(id).value);
                $$("content_container").removeView("layout_content");
                //add new views
                if (this.getItem(id).id == "menu_dashboard") { $$("content_container").addView(dashboard); };
                if (this.getItem(id).id == "menu_datatable") {
                  $$("content_container").addView(datatable);
                  $$("datatable1").adjust();
                  $$("datatable1").refreshColumns();
                };
                if (this.getItem(id).id == "menu_documentation") { $$("content_container").addView(documentation); };
              }
            }
          },
          {
            id: "content_container_scrollview",
            view: "scrollview",
            scroll:"y", //vertical scrolling
            body:{
              id: "content_container",
              rows:[
                {id:"layout_content", template:"<p>Click on the sidebar menu to load test widgets</p>"}
              ]
            }
          }
        ]
      }
    ]
  });

});
