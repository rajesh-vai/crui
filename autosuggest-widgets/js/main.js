

/*scroll to top*/

$(document).ready(function(){

	$(function () {

				var params = {
					login: "salt",
					api_key: "salt",
					query: " ",
					rows:"117",
					start:"0",
					sort_by:"price",
				   sort_order:"asc"

				};

				var rootURL = "http://13.82.183.113/searchpage/search";

				$.ajax({
						type: 'POST',
						contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
						url: rootURL,
						dataType: "json",
						data: $.param(params),
						success: function(data, textStatus, jqXHR){
							var snsData = [];
							snsData.push(data);
							snsData = snsData.reduce(function(sArr, item){ console.log(item[2]);
								item[2].map(function(p , i){
									var newObj = {};
									newObj.title = p.title;
									newObj.category = p.category;
									newObj.price = p.price;
									newObj.currency = p.currency;
									sArr.push(newObj)
									})
								return sArr;
								},[]);

							triggerAutosuggest(snsData);
						},
						error: function(jqXHR, textStatus, errorThrown){
							alert('Connection error: ' + textStatus);
						}
				});



				function triggerAutosuggest(snsData){
					function showResults(staticText, dynamicText, context){
						if($('.easy-autocomplete-container').siblings().val().length > 3){
							context.html( staticText +' <strong>'+ dynamicText +'</strong>').show();
							}else{
								context.hide();
							}
						}

				    $('#template-custom').keydown(function(e) {
						var key = e.which;
						if (key == 13) // the enter key code
						{
						  options.loadPageOnSuggestion($("#template-custom").val(), options.searchKeyWords);
						  $('.easy-autocomplete-container > div, .easy-autocomplete-container > ul').hide();
						  return false;
						}
					  });

					var options = {
						data: snsData,

						getValue: "title",
					//	requestDelay: 500,

						template: {
							type: "custom",
							method: function(value, item) {
								return value + " in <span class='select-cat'>"+ item.category + "</span><span class='s-currency'>" +item.currency + " " + item.price +"</span> <a class='sns-list-cart' href='#'><i class='fa fa-shopping-cart'></i> Add to Cart</a>" ;
							}

						},
						minCharNumber: 3,
						searchKeyWords: "",
						list: {
							match: {
								enabled: true
							},
							maxNumberOfElements: 10,
							onShowListEvent: function() { options.searchKeyWords = $("#template-custom").val();
								showResults('Showing results for', $('.easy-autocomplete-container').siblings().val(), $('.alert-text'));
								},
							onHideListEvent: function() {
									$('.alert-text').hide();
								},
							onClickEvent: function() { options.loadPageOnSuggestion($("#template-custom").val(), options.searchKeyWords)}
						},

						theme: "plate-light",

						loadPageOnSuggestion: function(opt, keySuggestion){
                            var params = {
								login: "salt",
								api_key: "salt",
								query: opt + " " + keySuggestion,
								rows:"10",
								start:"0",
								sort_by:"price",
							   sort_order:"asc"

							};

							$.post(rootURL,$.param(params),function(data){
								var LeftNavData = JSON.parse("[" + data + "]"),
								productsSns = JSON.parse("[" + data + "]");

									LeftNavData = LeftNavData.reduce(function(sArr, item){ console.log(item[1]);
											return item[1]
										},[]);
									productsSns = productsSns.reduce(function(sArr, item){ console.log(item[2]);
											return item[2]
										},[]);

							})

						}
					};

					$("#template-custom").easyAutocomplete(options);
					var $easyautocompletecontainer = $('.easy-autocomplete-container');
								//console.log($('.easy-autocomplete-container').siblings().val())
					$easyautocompletecontainer.append('<div class="alert-text"></div>');

				}

	});
});
