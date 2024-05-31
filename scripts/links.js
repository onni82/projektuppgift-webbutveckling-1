$(document).ready(function () {
	// Hanterar klickhändelsen på ett a-element
	$('a').click(function (event) {
		event.preventDefault();

		// Tar bort aria-current="page" från alla a-element
		$('a').removeAttr('aria-current');

		// Lägger till aria-current="page" på det klickade a-elementet
		$(this).attr('aria-current', 'page');

		// Hämtar klassen från det klickade elementet
		var className = $(this).attr('class');

		// Skapar sökvägen till filen baserat på klassnamn
		var filePath = className + '.html';

		// Laddar in innehållet från filen till en dold behållare/element
		$.get(filePath, function (data) {
			// Skapar ett temporärt div-element som håller den laddade datan
			var tempDiv = $("<div>").html(data);

			// Hittar det specifika div-elementet i den laddade filen
			var specificContent = tempDiv.find("#page").html();

			// Infogar det specifika innehållet i behållaren som är målet
			$("#page").html(specificContent);

			// Updatera URL:en utan att ladda om sidan
			var newUrl = window.location.protocol + "//" + window.location.host + "/" + className + ".html";
			history.pushState({ path: newUrl }, '', newUrl);
		}).fail(function () {
			$("#page").html("Sorry, there was an error loading the content.");
		});
	});

	// Hanterar navigering bakåt/framåt
	window.onpopstate = function (event) {
		if (event.state && event.state.path) {
			// Extrahera sidans namn (utan ledande snedstreck och avslutande filändelse)
			var page = window.location.pathname.slice(1, -5);

			if (page) {
				// Skapar sökvägen till filen baserat på pathname
				var filePath = window.location.pathname;

				// Laddar in innehållet från filen till en dold behållare/element
				$.get(filePath, function (data) {
					// Skapar ett temporärt div-element som håller den laddade datan
					var tempDiv = $('<div>').html(data);

					// Hittar det specifika div-elementet i den laddade filen
					var specificContent = tempDiv.find('#page').html();

					// Infogar det specifika innehållet i behållaren som är målet
					$('#page').html(specificContent);

					// Uppdatera aria-current-attributet
					$('a').removeAttr('aria-current');
					$('a.' + page).attr('aria-current', 'page');
				}).fail(function () {
					$('#page').html("Sorry, there was an error loading the content.");
				});
			}
		}
	};
});