import React from 'react';

const initialState = {
  categories:[],
  subCategories: [],
  products:[],
  
};

function reducer(state, action) {
  switch (action.type) {
    case 'STORE_CATEGORIES':
    return { ...state,categories: action.payload };
      case 'STORE_SUBCATEGORIES':
        return { ...state,subCategories: action.payload };
          case 'STORE_PRODUCTS':
            return { ...state,products:action.payload };
    default:
      return state;
  }
}

const defaultDispatch = () => initialState;

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
