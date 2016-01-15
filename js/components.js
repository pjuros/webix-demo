var menu_data = [
  {id: "menu_dashboard", icon: "dashboard", value:"Dashboard"},
  {id: "menu_datatable", icon: "table", value:"Datatable"},
  {id: "menu_documentation", icon: "book", value:"Documentation"},
  {id: "menu_test", icon: "puzzle-piece", value: "Test",  data:[
    { id: "menu_test1", value: "Test 1"},
    { id: "menu_test2", value: "Test 2"}
  ]}
];

var form1 = {
  id: "layout_content",
  rows: [
    { view:"template", template:"<h2>Form</h2>", height:"auto"},
    { view:"form", scroll:false, width:300, elements: [
  			{ view:"text", value:'dummy@email.com', label:"Email" },
  			{ view:"text", type:'password', value:'123pass', label:"Password"},
  			{ margin:5, cols:[
  				{ view:"button", value:"Login" , type:"form" },
  				{ view:"button", value:"Cancel" }
  			]}
  		]
    }
  ]
};

var dashboard = {
  id: "layout_content",
  cols:[
                  {
                      rows:[
                          {
                              template:"<div style='width:100%;text-align:center'>Column 1</div>",
                              height:30
                          },
                          {
                              view: "chart",
                              type:"pie",
                              value:"#sales#",
                              color:"#color#",
                              label:"#month#",
                              pieInnerText:"#sales#",
                              shadow:0,
                              data:month_dataset
                          },
                          {
            view:"chart",
            container:"chartDiv",
            type:"area",
            value:"#sales#",
            color:"#36abee",
            alpha:0.8,
            xAxis:{
                template:"'#year#"
            },
            yAxis:{
                start:0,
                end:100,
                step:10,
                template:function(obj){
                    return (obj%20?"":obj)
                }
            },
            tooltip:{
                template: "#sales#"
            },
            data: dataset
        }
                      ]
                  },
                  {
                      rows:[
                          {
                              template:"<div style='width:100%;text-align:center'>Column 2</div>",
                              height:30
                          },
                          {
                            view:"chart",
                            type:"bar",
                            value:"#sales#",
                            label:"#sales#",
                            barWidth:35,
                            radius:0,
                            gradient:"falling",
                            data: dataset
                        },
                          {
            container:"chartDiv",
            view:"chart",
            type:"radar",
			value:"#companyA#",
            disableLines:true,
			item:{
                borderWidth:0,
                radius:2,
				color: "#6633ff"
			},
			xAxis:{
				template:"#month#"
			},
			yAxis:{
				lineShape:"arc",
                bg:"#fff8ea"
			},
			data:companies
        }
                      ]
                  }
              ]

};

var datatable = {
    id: "layout_content",
    rows: [
      {
      view: "datatable",
      id: "datatable1",
      columns:[
        { id:"id",	header:["ID", {content:"numberFilter"}], sort:"int"},
        { id:"rank",	header:["Rank", {content:"numberFilter"}], sort:"int"},
        { id:"rating",	editor:"text",	header:["Rating", {content:"numberFilter"}], sort:"int"},
        { id:"title",	editor:"text",	header:["Film title", {content:"textFilter"}],	sort:"string", width:300},
  			{ id:"year",	editor:"text",	header:["Released", {content:"numberFilter"}], sort:"int"},
        { id:"votes",	editor:"text",	header:["Votes", {content:"numberFilter"}],	sort:"int"},
        { id:"action", header:"Action",  template:"<input type='button' value='edit' class='edit_button'>"}
      ],
      width: "auto",
      autoheight: true,
      resizeColumn:true,
      editable:true,
      pager:"pagerA",
      navigation:"true",
      url:"data/movies.json",
      save:"save_script.php",
      onClick:{
        edit_button:function(id, ev){
          //some_custom_method(id.row, id.column);
          $$("sidebar_menu").unselectAll();
          $$("content_container").removeView("layout_content");
          $$("content_container").addView(form1);
        }
      },
      on:{
         onAfterEditStop: function(state, editor){
           if (state.old != state.value) webix.message("Cell value changed: ID=" +editor.row + ", "+editor.column+ "="+state.value);
         }
       }
     },
     {
       view:"pager",
       id:"pagerA",
       template:"{common.first()} {common.prev()} {common.pages()} {common.next()} {common.last()}",
       size:15,
       group:5
     }
    ]
};

var documentation = {
    id: "layout_content",
    rows: [
      { view:"template", template:"<h2>Documentation</h2>", height:"auto"}
    ]
};
