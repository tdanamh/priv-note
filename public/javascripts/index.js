$('#create-new-note').submit(function(e){
    e.preventDefault();

    var content = ($($(this).children()[0]).val());

    var noteUrl = "";
    
    $.ajax({url: "save", method:"post", data: {"content" : content}, success: function(result){
        noteUrl = "view/" + result;

        var share = "<a href=" + noteUrl + "> Share this privnote</a>";

        $("#note").text("Your private note is created.");
        
        $("#note").append("<span>" + share + "</span>");
    }});
});