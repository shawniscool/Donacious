$(function(){
	$('#submit').on('click',function(e){
		e.preventDefault();
		console.log("submitting");

		Parse.initialize("GwdN8Kf6cSteivzdHgNoxwR6kKZucoWnKOd0dXKr", "aZMBOI6U6P6wJFBzvpVDAlsSaQUzqNpMfTrMBWEM");
		console.log("aaaa")
		var Campaign = Parse.Object.extend("Campaign");
		var campaign = new Campaign;
		campaign.set('username',$('#username').val());
		campaign.set('name',$('#name').val());
		campaign.set('usercontact',$('#usercontact').val());
		var favorite = new Array();
		// campaign.set('items',$('input[name="items"]:checked').val());
		$.each($("input[name='items']:checked"), function(){
			favorite.push($(this).val());
        });
        // alert("My favourite sports are: " + favorite.join(", "));
		// console.log("checked are " + $('input[name="items"]:checked').val());
		campaign.set("items",favorite);
		campaign.set('description',$('#description').val());
		campaign.set('address',$('#address').val());
		campaign.set('city',$('#city').val());
		campaign.set('state',$('#state').val());
		campaign.set('zipcode',$('#zipcode').val());
		console.log(campaign);
		console.log("aaa2");
		campaign.save(null,{
			success: function(result){
			alert('New object created');
			// location.reload();

		},
		error:function(result,error){
			alert('Failed to create new object, with error code: ' + error.message);
		}
		});
	});
});
