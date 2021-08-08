import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  PRODUCTS_LOADED,
} from "../../appconstants";

const initialState = {
  campaigns: [],
  selectedCampaign: null,
  loading: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CAMPAIGNS:
      return {
        ...state,
        loading: true,
      };

    case CAMPAIGNS_LOADED:
      return {
        ...state,
        loading: false,
        products: action.prductList,
      };

    case LOAD_CAMPAIGN:
      return {
        ...state,
        selectedProduct: state.products.find(
          (product) => product.id === +action.productId
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
