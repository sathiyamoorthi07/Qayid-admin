import querystring from "querystring";

export function generateHomePageLink(item: any) {

  let result: any = "";
  let queryParams: any = {};

  if(item == null){
return null
  }

  switch (item.links_to) {
    case "0":
      result = null;
      break;
    case "1":
      queryParams["category"] = item.link_slug;
      result = "/products";
      break;
    case "2":
      queryParams["subcategory"] = item.link_slug;
      result = "/products";
      break;
    case "3":
      result = "products/" + item.link_slug;
      break;
    case "4":
      result = "products/" + item.link_slug;
      break;
    case "5":
      result = "collections/" + item.link_slug;
      break;
    case "6":
      if (item.link_key != "") {
        result = item.link_key;
        return item.link_key;
      } else {
        result = "/";
      }
      break;
    case "7":
      result = null;
      break;
    case "8":
      queryParams["item_set"] = item.link_slug;
      result = "/products";
      break;
    default:
      result = "/products";
      break;
  }
  switch (item.filter_type) {
    case "1":
      queryParams["filter_upto"] = item.filter_upto;
      break;
    case "2":
      queryParams["size"] = item.filter_value;
      break;
    case "3":
      queryParams["brand"] = item.filter_value;
      break;
    case "4":
      queryParams["price_range"] = item.filter_value;
      break;
    case "5":
      queryParams["filter_above"] = item.filter_value;
      break;
    case "6":
      queryParams = null;
      break;
  }
  if (queryParams == null) {
    queryParams = [];
  } else {
    queryParams["special_offer_key"] = item.special_offer_key;
    queryParams["filter_type"] = item.filter_type;
    queryParams["filter_value"] = item.filter_value;
  }
  if (result) {
    return {
      pathname: result,
      query: queryParams,
    };
  } else {
    return null;
  }
}
