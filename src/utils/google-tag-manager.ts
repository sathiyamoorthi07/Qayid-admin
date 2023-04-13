import { calculateLocalPaymentSummary } from "@contexts/cart/cart.utils";
import get from "lodash/get";
import moment from "moment";
import { getDiscountPriceValue } from "./get-discount-price-value";

declare global {
  interface Window {
    FB: any;
    dataLayer: any;
  }
}

const PAYMENT_OPTIONS: any = {
  0: "COD",
  1: "MADA",
  2: "BANK_TRANSFER",
  3: "VISA/MASTER",
  7: "WEB_APPLE_PAY",
  8: "TAMARA_INSTALLMENT",
  9: "TAMARA_PAY_LATER",
};

class GoogleTagManagers {
  log(...arg: any) {
    //console.log(...arg);
  }

  viewItemListing(Items: any, currency: any, user) {
    this.log("VIEW ITEMS ", Items, currency);

    const dataLayer = window.dataLayer;

    if (typeof dataLayer == "undefined") {
      return false;
    }

    const defaultParams = this.getCommonParams(user);

    let finalData = [];

    for (let index = 0; index < Items.length; index++) {
      const element = Items[index];

      finalData.push({
        item_id: element.item_key,
        item_name: element.item_name,
        item_category: element?.category_name,
      });
    }

    window.dataLayer.push(function () {
      this.reset();
    });

    window.dataLayer.push({
      event: "view_item_list",
      items: finalData,
      currency: currency?.code,
      ...defaultParams,
    });
  }

  viewSearchEvent(keywords: any, currency: any, user) {
    this.log("Search Event", keywords);

    if (typeof dataLayer == "undefined") {
      return false;
    }

    const defaultParams = this.getCommonParams(user);

    window.dataLayer.push(function () {
      this.reset();
    });

    if (typeof webengage != "undefined") {
      const we_finalpayload = {
        search_keyword: keywords,
        item_count: "",
      };

      this.log("Search Event", "PRODUCT_SEARCHED", we_finalpayload);
    }
    window.dataLayer.push({
      event: "search",
      search_term: keywords,
      ...defaultParams,
    });

    //gtag("event","search",{search_term:keywords})
  }

  viewSearchResult(keywords: any, items: any) {
    //Not Implemented
    this.log("Search Result", keywords, items);

    if (typeof webengage != "undefined") {
      if (keywords.text != "") {
        const we_finalpayload = {
          search_keyword: keywords.text,
          item_count: items.length,
        };

        window.webengage.track("PRODUCT_SEARCHED", we_finalpayload);
        this.log("Search Event", "PRODUCT_SEARCHED", we_finalpayload);
      }
    }
  }

  selectPromotion(code) {}

  sharelink(link, item) {}

  addToWishlistEvent(itemId, itemName) {}

  couponCodeFailed(couponCode: string) {
    this.log("couponCodeFailed", "COUPON_CODE_FAILED", couponCode);

    let finalPayload = {
      coupon_code: couponCode,
    };
    if (typeof webengage != "undefined") {
      window.webengage.track("COUPON_CODE_FAILED", finalPayload);
    }
  }
  UserSignedUp(mode: string) {
    let finalPayload = {
      mode: mode,
    };
    if (typeof webengage != "undefined") {
      window.webengage.track("USER_SIGNED_UP", finalPayload);
    }
    this.log("UserSignedUp", "USER_SIGNED_UP", finalPayload);
  }
  LanguageSelected(language: string) {
    let finalPayload = {
      language: language,
    };
    if (typeof webengage != "undefined") {
      window.webengage.track("LANGUAGE_SELECTED", finalPayload);
    }
    this.log("UserSignedUp", "LANGUAGE_SELECTED", finalPayload);
  }
  categoryViewed(categoryKey: string, categoryName: string) {
    let finalPayload = {
      category_id: categoryKey,
      category_name: categoryName,
    };

    if (typeof webengage != "undefined") {
      window.webengage.track("CATEGORY_VIEWED", finalPayload);
    }

    this.log("categoryViewed", "CATEGORY_VIEWED", finalPayload);
  }

  subCategoryViewed(
    categoryKey: string,
    categoryName: string,
    subcategoryKey: string,
    subcategoryName: string
  ) {
    let finalPayload = {
      category_id: categoryKey,
      category_name: categoryName,
      sub_category_id: subcategoryKey,
      sub_category_name: subcategoryName,
    };

    if (typeof webengage != "undefined") {
      window.webengage.track("SUBCATEGORY_VIEWED", finalPayload);
    }

    this.log("subCategoryViewed", "SUBCATEGORY_VIEWED", finalPayload);
  }

  shippingDetailsUpdated(address: string, city: string, country: string) {
    let finalPayload = {
      shipping_address: address,
      city: city,
      country: country,
    };

    if (typeof webengage != "undefined") {
      window.webengage.track("SHIPPING_DETAILS_UPDATED", finalPayload);
    }

    this.log(
      "ShippingDetailsUpdated",
      "SHIPPING_DETAILS_UPDATED",
      finalPayload
    );
  }

  couponCodeApplied(couponCode: string, discount: number) {
    this.log("couponCodeApplied", "COUPON_CODE_APPLIED", couponCode, discount);

    let finalPayload = {
      coupon_code: couponCode,
      discount_amount: discount,
    };

    if (typeof webengage != "undefined") {
      window.webengage.track("COUPON_CODE_APPLIED", finalPayload);
    }
  }

  paymentFailure(reason: string, paymentMode: string, total: number) {
    this.log("couponCodeFailed", "COUPON_CODE_APPLIED");

    let finalPayload = {
      reason: reason,
      payment_mode: get(PAYMENT_OPTIONS, paymentMode, "MADA"),
      total_amount: Number(total),
    };

    if (typeof webengage != "undefined") {
      window.webengage.track("PAYMENT_FAILURE", finalPayload);
    }
  }

  viewItemDetails(item, currency: any, user) {
    this.log("SHOW ITEM DETAILS", item);

    if (typeof dataLayer == "undefined") {
      return false;
    }
    const defaultParams = this.getCommonParams(user);

    let items = [];
    items.push({
      item_id: item.item_key,
      item_name: item.item_name,
      item_category: item?.category_name,
    });

    let item_ids = [];
    item_ids.push(item.item_code);
    let item_keys = [];
    item_keys.push(item.item_key);

    const finalPrice =
      item.offer_status == "0" ? item.sale_price : item.offer_price;

    let discount =
      item.offer_status != "0"
        ? getDiscountPriceValue(
            Number(item.sale_price),
            Number(item.offer_price)
          )
        : 0;

    window.dataLayer.push(function () {
      this.reset();
    });

    if (typeof webengage != "undefined") {
      let images: any = {};

      for (let index = 0; index < item.item_image.length; index++) {
        const element = item.item_image[index];
        images["image_" + index] = element;
      }

      const we_finalPayload = {
        product_id: item.item_key,
        product_name: item.item_name,
        category_name: item.category_name,
        category_id: item.category_key,
        sub_category_name: item.subcategory_name,
        sub_category_id: item.subcategory_key,
        brand: item.brand_name,
        retail_price: Number(item.sale_price),
        discount: Number(discount),
        price: Number(finalPrice),
        currency: item?.currency,
        color: item.color_name,
        image: images,
      };

      window.webengage.track("PRODUCT_VIEWED", we_finalPayload);
      this.log("SHOW ITEM DETAILS WE", we_finalPayload);
    }

    window.dataLayer.push({
      event: "view_item",
      items: items,
      // item_id: item.item_key,
      // item_name: item.item_name,
      item_keys: item_keys,
      item_ids: item_ids,
      currency: currency?.code,
      price: Number(finalPrice),
      value: Number(finalPrice),
      item_category: item?.category_name,
      ...defaultParams,
    });
  }

  addBannerClicked(bannerName: string, bannerCategory: string, offer: string) {
    if (typeof webengage != "undefined") {
      //Final Build

      const we_finalPayload = {
        banner_name: bannerName,
        banner_category: bannerCategory,
        offer: offer,
      };

      window.webengage.track("BANNER_CLICKED", we_finalPayload);

      this.log("We", "BANNER_CLICKED", we_finalPayload);
    }
  }
  addToCartEvent(item: any, currency: any, user: any) {
    this.log("ADD TO CART", item);

    if (typeof dataLayer == "undefined") {
      return false;
    }
    const defaultParams = this.getCommonParams(user);

    const _items = [];

    _items.push({
      item_id: item.item_key,
      item_name: item.item_name,
      quantity: 1,
      item_category: item?.category_name,
    });

    const item_ids = [];
    item_ids.push(item.item_code);
    const item_keys = [];
    item_keys.push(item.item_key);

    const finalPrice =
      item.offer_status == "0" ? item.sale_price : item.offer_price;

    let discount =
      item.offer_status != "0"
        ? getDiscountPriceValue(
            Number(item.sale_price),
            Number(item.offer_price)
          )
        : 0;

    const _f_data = {
      event: "add_to_cart",
      items: _items,
      item_keys: item_keys,
      item_ids: item_ids,
      currency: currency?.code,
      price: Number(finalPrice),
      value: Number(finalPrice),
      item_category: item?.category_name,
      number_of_items: 1,
      ...defaultParams,
    };

    if (typeof webengage != "undefined") {
      //Final Build

      const we_finalPayload = {
        product_id: item.item_key,
        product_name: item.item_name,
        category_name: item.category_name,
        category_id: item.category_key,
        sub_category_name: item.subcategory_name,
        sub_category_id: item.subcategory_key,
        brand: item.brand_name,
        size: item.size_label,
        item_option_id: item?.item_option_id, //Not In Docs
        retail_price: Number(item.sale_price),
        quantity: Number(item.quantity),
        currency: currency?.code,
        color: item.color_name,
        discount: Number(discount), //Pending
        price: Number(finalPrice),
        image: {
          image_0: item.image_path,
        },
      };

      window.webengage.track("ADDED_TO_CART", we_finalPayload);

      this.log("We Chat", we_finalPayload);
    }

    window.dataLayer.push(function () {
      this.reset();
    });

    window.dataLayer.push(_f_data);
  }

  removeItemFromCart(item, currency: any, user: any) {
    this.log("removeItemFromCart", item, currency, user);

    if (typeof dataLayer == "undefined") {
      return false;
    }

    const defaultParams = this.getCommonParams(user);

    const items = [];
    items.push({
      item_id: item.item_key,
      item_name: item.item_name,
      quantity: Number(item.quantity),
      item_category: item?.category_name,
    });

    const finalPrice =
      item.offer_status == "0" ? item.sale_price : item.offer_price;

    let discount =
      item.offer_status != "0"
        ? getDiscountPriceValue(
            Number(item.sale_price),
            Number(item.offer_price)
          )
        : 0;

    window.dataLayer.push(function () {
      this.reset();
    });

    if (typeof webengage != "undefined") {
      const we_payload = {
        product_id: item.item_key,
        product_name: item.item_name,
        category_name: item.category_name,
        category_id: item.category_key,
        sub_category_name: item.subcategory_name,
        sub_category_id: item.subcategory_key,
        brand: item.brand_name,
        size: item.size_label,
        item_option_id: item?.item_option_id, //Not In Docs
        retail_price: Number(item.sale_price),
        quantity: Number(item.quantity),
        currency: currency?.code,
        color: item.color_name,
        discount: Number(discount), //Pending
        price: Number(finalPrice),
        image: {
          image_0: item.image_path,
        },
      };

      window.webengage.track("REMOVED_FROM_CART", we_payload);
      this.log("REMOVED_FROM_CART", we_payload);
    }

    window.dataLayer.push({
      event: "remove_from_cart",
      items: items,
      currency: currency?.code,
      value: Number(finalPrice),
      price: Number(finalPrice),
      quantity: Number(item.quantity),
      ...defaultParams,
    });
  }

  addPaymentInfo(totalPrice, paymentType, cartItems, currency: any, user: any) {
    this.log("addPaymentInfo", totalPrice, paymentType, cartItems);

    if (typeof dataLayer == "undefined") {
      return false;
    }
    const defaultParams = this.getCommonParams(user);

    const items = [];
    let numberItem = 0;

    for (let index = 0; index < cartItems.length; index++) {
      const element = cartItems[index];

      items.push({
        item_id: element.item_key,
        item_name: element.item_name,
        quantity: Number(element.quantity),
      });
      numberItem = numberItem + parseInt(element.quantity);
    }

    window.dataLayer.push(function () {
      this.reset();
    });

    window.dataLayer.push({
      event: "add_payment_info",
      currency: currency?.code,
      value: Number(totalPrice),
      payment_type: get(PAYMENT_OPTIONS, paymentType, "MADA"),
      ...defaultParams,
    });

    this.log("addPaymentInfo", {
      event: "add_payment_info",
      currency: currency?.code,
      value: Number(totalPrice),
      payment_type: get(PAYMENT_OPTIONS, paymentType, "MADA"),
    });
  }
  cartUpdated(CartItems: any[], totalPrice: any, currency: any, user: any) {
    const finalPrice = calculateLocalPaymentSummary(CartItems);

    let productNames = [];
    let productIds = [];
    let categoryIds = [];
    let categoryNames = [];
    let prices = [];
    let numberItem = 0;

    let webengage_items: any = {};

    for (let index = 0; index < CartItems.length; index++) {
      const element = CartItems[index];

      const itemFinalPrice =
        element.offer_status == "0" ? element.sale_price : element.offer_price;

      // const discount =
      // element.offer_status == "0"
      //   ? getDiscountPriceValue(
      //       Number(element.sale_price),
      //       Number(element.offer_price)
      //     )
      //   : 0;

      productIds.push(element.item_key);
      productNames.push(element.item_name);
      categoryIds.push(element.category_key);
      categoryNames.push(element.category_name);
      prices.push(itemFinalPrice);

      webengage_items["item_" + index] = {
        product_name: element.item_name,
        product_id: element.item_key,
        category_id: element.category_key,
        category_name: element.category_name,
        sub_category_id: element.subcategory_key,
        sub_category_name: element.subcategory_name,
        price: itemFinalPrice,
      };

      numberItem = numberItem + parseInt(element.quantity);
    }

    if (typeof webengage != "undefined") {
      const we_payload = {
        category_id: categoryIds.join(","),
        category_name: categoryNames.join(","),
        no_of_products: numberItem,
        price: prices.join(","),
        product_details: webengage_items,
        product_id: productIds.join(","),
        product_name: productNames.join(","),
        total_amount: Number(finalPrice),
      };

      window.webengage.track("CART_UPDATED", we_payload);
      this.log("we", "CART_UPDATED", we_payload);
    }
  }
  updateItemFromCart(item, action, currency, user) {
    this.log("Update Item", item, action);

    if (typeof dataLayer == "undefined") {
      return false;
    }

    const defaultParams = this.getCommonParams(user);

    window.dataLayer.push(function () {
      this.reset();
    });

    const items = [];
    items.push({
      item_id: item.item_key,
      item_name: item.item_name,
      quantity: 1,
      item_category: item?.category_name,
    });

    const finalPrice =
      item.offer_status == "0" ? item.sale_price : item.offer_price;

    if (action == 1) {
      window.dataLayer.push({
        event: "add_to_cart",
        items: items,
        value: Number(finalPrice),
        quantity: Number(item.quantity),
        currency: currency?.code,
        price: Number(finalPrice),
      });
    }

    if (action == 2) {
      window.dataLayer.push({
        event: "remove_from_cart",
        items: items,
        value: Number(finalPrice),
        quantity: Number(item.quantity),
        currency: currency?.code,
        price: Number(finalPrice),
        ...defaultParams,
      });
    }
  }

  viewCartItems(CartItems, finalPrice, currency, user) {
    this.log("viewCartItems", CartItems, finalPrice, currency, user);

    if (typeof dataLayer == "undefined") {
      return false;
    }

    const defaultParams = this.getCommonParams(user);

    const items = [];

    const item_ids = [];

    const item_keys = [];

    let numberItem = 0;

    let productNames = [];
    let productIds = [];
    let categoryIds = [];
    let categoryNames = [];
    let prices = [];

    let webengage_items: any = {};

    for (let index = 0; index < CartItems.length; index++) {
      const element = CartItems[index];

      const itemFinalPrice =
        element.offer_status == "0" ? element.sale_price : element.offer_price;

      // const discount =
      // element.offer_status == "0"
      //   ? getDiscountPriceValue(
      //       Number(element.sale_price),
      //       Number(element.offer_price)
      //     )
      //   : 0;

      productIds.push(element.item_key);
      productNames.push(element.item_name);
      categoryIds.push(element.category_key);
      categoryNames.push(element.category_name);
      prices.push(itemFinalPrice);

      webengage_items["item_" + index] = {
        product_name: element.item_name,
        product_id: element.item_key,
        category_id: element.category_key,
        category_name: element.category_name,
        sub_category_id: element.subcategory_key,
        sub_category_name: element.subcategory_name,
        price: itemFinalPrice,
      };

      items.push({
        item_id: element.item_key,
        item_name: element.item_name,
        quantity: Number(element.quantity),
      });

      item_ids.push(element.cart_item_key);
      item_keys.push(element.item_key);

      numberItem = numberItem + parseInt(element.quantity);
    }

    window.dataLayer.push(function () {
      this.reset();
    });

    if (typeof webengage != "undefined") {
      const we_payload = {
        category_id: categoryIds.join(","),
        category_name: categoryNames.join(","),
        no_of_products: numberItem,
        price: prices.join(","),
        product_details: webengage_items,
        product_id: productIds.join(","),
        product_name: productNames.join(","),
        total_amount: finalPrice,
      };

      window.webengage.track("CART_VIEWED", we_payload);
      this.log("FINAL PAYLOAD", we_payload);
    }

    window.dataLayer.push({
      event: "view_cart",
      items: items,
      currency: currency?.code,
      value: Number(finalPrice),
      price: Number(finalPrice),
      number_of_items: numberItem,
      ...defaultParams,
    });
  }

  initiateCheckoutWebEngage(
    CartItems,
    subTaotal,
    discount,
    coupon_code,
    finalPrice,
    currency,
    user
  ) {
    this.log("initiateCheckout", coupon_code);

    if (typeof dataLayer == "undefined") {
      return false;
    }

    const defaultParams = this.getCommonParams(user);

    const items = [];

    const item_ids = [];

    const item_keys = [];

    let numberItem = 0;

    let productNames = [];
    let productIds = [];
    let categoryIds = [];
    let categoryNames = [];
    let prices = [];

    let webengage_items = {};

    for (let index = 0; index < CartItems.length; index++) {
      const element = CartItems[index];

      const itemFinalPrice =
        element.offer_status == "0" ? element.sale_price : element.offer_price;

      productIds.push(element.item_key);
      productNames.push(element.item_name);
      categoryIds.push(element.category_key);
      categoryNames.push(element.category_name);
      prices.push(itemFinalPrice);

      webengage_items["item_" + index] = {
        product_name: element.item_name,
        product_id: element.item_key,
        category_id: element.category_key,
        category_name: element.category_name,
        sub_category_id: element.subcategory_key,
        sub_category_name: element.subcategory_name,
        price: itemFinalPrice,
      };

      items.push({
        item_id: element.item_key,
        item_name: element.item_name,
        quantity: Number(element.quantity),
        price: itemFinalPrice,
        currency: currency?.code,
      });

      item_ids.push(element.cart_item_key);
      item_keys.push(element.item_key);

      numberItem = numberItem + parseInt(element.quantity);
    }

    if (typeof webengage != "undefined") {
      const payload = {
        category_id: categoryIds.join(","),
        category_name: categoryNames.join(","),
        coupon_code: coupon_code,
        discount_amount: Number(discount),
        no_of_products: numberItem,
        price: prices.join(","),
        product_details: webengage_items,
        product_id: productIds.join(","),
        product_name: productNames.join(","),
        sub_total: Number(subTaotal),
        total_amount: Number(finalPrice),
      };

      window.webengage.track("CHECKOUT_STARTED", payload);

      this.log("FINAL PAYLOAD", payload);
    }

    window.dataLayer.push(function () {
      this.reset();
    });

    window.dataLayer.push({
      event: "begin_checkout",
      items: items,
      coupon: coupon_code,
      currency: currency?.code,
      value: Number(finalPrice),
      price: Number(finalPrice),
      number_of_items: numberItem,
      item_keys: item_keys,
      item_ids: item_ids,
      ...defaultParams,
    });
  }

  initiateCheckout(CartItems, finalPrice, currency, user, coupon_code) {
    this.log("initiateCheckout", coupon_code);

    if (typeof dataLayer == "undefined") {
      return false;
    }

    const defaultParams = this.getCommonParams(user);

    const items = [];

    const item_ids = [];

    const item_keys = [];

    let numberItem = 0;

    let productNames = [];
    let productIds = [];
    let categoryIds = [];
    let categoryNames = [];
    let prices = [];

    let webengage_items = {};

    for (let index = 0; index < CartItems.length; index++) {
      const element = CartItems[index];

      const itemFinalPrice =
        element.offer_status == "0" ? element.sale_price : element.offer_price;

      productIds.push(element.item_key);
      productNames.push(element.item_name);
      categoryIds.push(element.category_key);
      categoryNames.push(element.category_name);
      prices.push(itemFinalPrice);

      webengage_items["item_" + index] = {
        product_name: element.item_name,
        product_id: element.item_key,
        category_id: element.category_key,
        category_name: element.category_name,
        sub_category_id: element.subcategory_key,
        sub_category_name: element.subcategory_name,
        price: itemFinalPrice,
      };

      items.push({
        item_id: element.item_key,
        item_name: element.item_name,
        quantity: Number(element.quantity),
        price: itemFinalPrice,
        currency: currency?.code,
      });

      item_ids.push(element.cart_item_key);
      item_keys.push(element.item_key);

      numberItem = numberItem + parseInt(element.quantity);
    }

    if (typeof webengage != "undefined") {
      const payload = {
        category_id: categoryIds.join(","),
        category_name: categoryNames.join(","),
        coupon_code: coupon_code,
        discount_amount: "",
        no_of_products: numberItem,
        price: prices.join(","),
        product_details: webengage_items,
        product_id: productIds.join(","),
        product_name: productNames.join(","),
        sub_total: "",
        total_amount: finalPrice,
      };

      window.webengage.track("CHECKOUT_STARTED", payload);

      this.log("FINAL PAYLOAD", payload);
    }

    window.dataLayer.push(function () {
      this.reset();
    });

    window.dataLayer.push({
      event: "begin_checkout",
      items: items,
      coupon: coupon_code,
      currency: currency?.code,
      value: Number(finalPrice),
      price: Number(finalPrice),
      number_of_items: numberItem,
      item_keys: item_keys,
      item_ids: item_ids,
      ...defaultParams,
    });
  }

  completeRegistrationEvent(type, user: any = {}, currency = null) {
    if (typeof dataLayer == "undefined") {
      return false;
    }

    const defaultParams = this.getCommonParams(user);

    window.dataLayer.push(function () {
      this.reset();
    });

    if (type == "LOGIN") {
      if (typeof webengage != "undefined") {
        console.log("completeRegistrationEvent", type, user);
        this.setUserData(user, currency);
      }

      dataLayer.push({
        event: "login",
        method: type,
        signup_method: "phone",
        ...defaultParams,
      });
    }

    if (type == "REGISTER") {
      if (typeof webengage != "undefined") {
        console.log("completeRegistrationEvent", type, user);
        this.setUserData(user, currency);
        window.webengage.track("USER_SIGNED_UP", { mode: "1" });
      }

      dataLayer.push({
        event: "sign_up",
        method: type,
        signup_method: "phone",
        ...defaultParams,
      });
    }
  }

  addPurchaseEvent(
    CartItems,
    coupon_code,
    orderNumber,
    totalPrice,
    currency,
    user,
    payment_mode = "",
    sub_total = 0,
    discount = 0
  ) {
    this.log("addPurchaseEvent", orderNumber, totalPrice);

    if (typeof dataLayer == "undefined") {
      return false;
    }
    const defaultParams = this.getCommonParams(user);

    const items = [];

    const item_ids = [];

    const item_keys = [];

    let numberItem = 0;

    let productNames = [];
    let productIds = [];
    let categoryIds = [];
    let categoryNames = [];
    let prices = [];

    let webengage_items: any = {};

    for (let index = 0; index < CartItems.length; index++) {
      const element = CartItems[index];

      const itemFinalPrice =
        element.offer_status == "0" ? element.sale_price : element.offer_price;

      items.push({
        item_id: element.item_key,
        item_name: element.item_name,
        quantity: Number(element.quantity),
        price: itemFinalPrice,
        currency: currency?.code,
      });

      productIds.push(element.item_key);
      productNames.push(element.item_name);
      categoryIds.push(element.category_key);
      categoryNames.push(element.category_name);
      prices.push(itemFinalPrice);

      webengage_items["item_" + index] = {
        product_name: element.item_name,
        product_id: element.item_key,
        category_id: element.category_key,
        category_name: element.category_name,
        sub_category_id: element.subcategory_key,
        sub_category_name: element.subcategory_name,
        price: itemFinalPrice,
      };

      item_ids.push(element.cart_item_key);
      item_keys.push(element.item_key);

      numberItem = numberItem + parseInt(element.quantity);
    }

    if (typeof webengage != "undefined") {
      const we_payload = {
        category_id: categoryIds.join(","),
        category_name: categoryNames.join(","),
        coupon_code: coupon_code,
        no_of_products: numberItem,
        price: prices.join(","),
        product_details: webengage_items,
        product_id: productIds.join(","),
        product_name: productNames.join(","),
        order_id: orderNumber,
        discount_amount: Number(discount),
        sub_total: Number(sub_total),
        total_amount: Number(totalPrice),
        payment_mode: get(PAYMENT_OPTIONS, payment_mode, "MADA"),
      };

      window.webengage.track("CHECKOUT_COMPLETED", we_payload);
      this.log("FINAL PAYLOAD", we_payload);
    }

    window.dataLayer.push(function () {
      this.reset();
    });

    const payload = {
      event: "purchase",
      coupon: coupon_code,
      currency: currency?.code,
      transaction_id: orderNumber,
      affiliation: "daanah",
      order_number: orderNumber,
      value: Number(totalPrice),
      price: Number(totalPrice),
      number_of_items: Number(numberItem),
      item_keys: item_keys,
      item_ids: item_ids,
      ...defaultParams,
    };
    dataLayer.push(payload);
  }
  getCommonParams(user) {
    let newEmailId = get(user, "email", "");
    let mobileNumber = get(user, "mobile_number", "");

    if (newEmailId == "") {
      newEmailId = mobileNumber + "@daanah.com";
    }

    return {
      timestamp: Math.floor(Date.now() / 1000),
      mobile_ad_id: "",
      idfv: "",
      ip_address: get(user, "clientIp", ""),
      email: newEmailId,
      phone_number: mobileNumber,
    };
  }

  setUserData(user, currency) {
    if (typeof webengage != "undefined") {
      window.webengage.user.login(user.user_key);
      window.webengage.user.setAttribute("we_first_name", user.first_name);
      window.webengage.user.setAttribute("we_last_name", user.last_name);
      window.webengage.user.setAttribute("we_email", user.email);
      window.webengage.user.setAttribute("we_company", "daanah");

      if (user.date_of_birth != "") {
        window.webengage.user.setAttribute(
          "we_birth_date",
          moment(user.date_of_birth).format("YYYY-MM-DD")
        );
      } else {
        //  window.webengage.user.setAttribute("we_birth_date", "");
      }

      window.webengage.user.setAttribute(
        "we_phone",
        user.country_code + "" + user.mobile_number
      );

      if (user.gender == 2) {
        window.webengage.user.setAttribute("we_gender", "female");
        //FEMALE
      }

      if (user.gender == 1) {
        window.webengage.user.setAttribute("we_gender", "male");
        //FEMALE
      }

      let lastOrderData = get(user, "user_data[0].last_order_date", "");
      if (lastOrderData != "") {
        //User Data
        window.webengage.user.setAttribute(
          "last_order_date",
          moment(lastOrderData).format("YYYY-MM-DD")
        );
      }

      window.webengage.user.setAttribute(
        "order_value",
        Number(get(user, "user_data[0].order_value", 0))
      );

      window.webengage.user.setAttribute(
        "city",
        get(user, "user_data[0].city", "")
      );

      let address = get(user, "user_data[0].address", null);

      if (address) {
        window.webengage.user.setAttribute("address", address);
      }

      window.webengage.user.setAttribute(
        "total_no_of_orders",
        Number(get(user, "user_data[0].order_count", 0))
      );
      window.webengage.user.setAttribute(
        "wallet_amount",
        Number(get(user, "user_data[0].wallet", 0))
      );

      window.webengage.user.setAttribute(
        "language",
        get(currency, "currency", "")
      );

      window.webengage.user.setAttribute(
        "loyalty_points",
        Number(get(user, "user_data[0].loyalty_points", 0))
      );
    }
  }
}

export const GoogleTagManager = new GoogleTagManagers();
