$(function(){
	
           $("a[id=bnav1]").click(function(even){                                                
                                     var pos=$(this).offset();
                                     $(".bnavlist1").css({left:10+"%",bottom:pos.bottom+20+"px"}).toggle();
                                     });									 
            document.onclick=function(e){     
                   var e=e?e:window.event;
                   var tar = e.srcElement||e.target;
                   if(tar.id!="bnav1"){
                       if($(tar).attr("class")=="bnavlist1"){
                           $(".bnavlist1").css("display","block")
                       }else{
                           $(".bnavlist1").css("display","none");
                       }
                   }
                 }
				 
				 /*
		   $("a[id=bnav2]").click(function(even){                                                
                                     var pos=$(this).offset();
                                     $(".bnavlist2").css({left:10+"%",bottom:pos.bottom+20+"px"}).toggle();
                                     });									 
            document.onclick=function(e){     
                   var e=e?e:window.event;
                   var tar = e.srcElement||e.target;
                   if(tar.id!="bnav2"){
                       if($(tar).attr("class")=="bnavlist2"){
                           $(".bnavlist2").css("display","block")
                       }else{
                           $(".bnavlist2").css("display","none");
                       }
                   }
                 }
				 */
           });