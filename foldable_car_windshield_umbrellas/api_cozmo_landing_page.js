$("#formInfo").submit(function (event) {
  // show loading icon and disable the button
  $("#save_guest_order").prop("disabled", true);
  $("#span_loading").show();

  // Prevent the default form submission
  event.preventDefault();

  // Get the updated data from the form
  var fullname = $('#formInfo input[name="fullname"]').val();
  var phone = $('#formInfo input[name="phone"]').val();
  var adresse = $('#formInfo input[name="adresse"]').val();


  // Create the data object for SheetDB
  var sheetDBData = {
    name: "Foldable Car Windshield Umbrellas",
    date: new Date().toString(),
    customer_name: fullname,
    phone: phone,
    city: adresse,
    address: adresse,
    quantity: "1",
    price: "189 MAD",
    product_notice: "",
    notice: "",
    status: "pending",
    fees_shipping: "",
  };

  // Insert into SheetDB API
  fetch("https://sheetdb.io/api/v1/gismzszep5i95", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: sheetDBData }),
  })
    .then(function (response) {
      console.log("sent");
      if (response.ok) {
        // Handle successful response from SheetDB
        console.log("Order added to SheetDB successfully");

        // To track the purchase event using Facebook Pixel
        fbq("track", "Purchase", {
          value: 20,
          currency: "USD",
          content_name: "Foldable Car Windshield Umbrellas, Large Size Car Windshield Sun Shade Umbrella for Front Windows, Suitable for Windshields of Various Car Models",
          content_type: "Car Accessories",
          product_id: "1124",
        });

        document.location.href = "/foldable_car_windshield_umbrellas/order_success.html";


        // To track the purchase event using Snap Pixel
        // snaptr("track", "PURCHASE", { value: 132, currency: "USD" });
      } else {
        // Handle error response from SheetDB
        console.log("Failed to add order to SheetDB");
        // throw new Error("Failed to add order to SheetDB");

        // hide loading icon and enable the button
        $("#save_guest_order").prop("disabled", false);
        $("#span_loading").hide();
        console.log("Error :", error);
        // Display an error message if the update fails
        alert("وقع حطأ اثناء الطلب , يرجى المحاولة لاحقا ");

      }
    })
    .catch(function (error) {
      console.log("NOT sent");
      console.log("Error:", error);

      // hide loading icon and enable the button
      $("#save_guest_order").prop("disabled", false);
      $("#span_loading").hide();
      console.log("Error :", error);
      // Display an error message if the update fails
      alert("وقع حطأ اثناء الطلب , يرجى المحاولة لاحقا ");

      // Display an error message if the request fails
      // alert("Failed to add order to SheetDB. Please try again later.");
    });



});
