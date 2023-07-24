// event listener
const addMatchEl = document.querySelector(".lws-addMatch");
const incrementEl = document.querySelector(".lws-increment");
const decrementEl = document.querySelector(".lws-decrement");
const incrementForm = document.querySelector(".incrementForm");
const decrementForm = document.querySelector(".decrementForm");
const singleResult = document.querySelector(".lws-singleResult");

// action identifier
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// action creation function
const increment = (value) => {
  return {
    type: INCREMENT,
    value: value,
  };
};

const decrement = (value) => {
  return {
    type: DECREMENT,
    value: value,
  };
};

// initial state
const initialState = {
  id: 1,
  value: 140,
};

incrementForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const incrementValue = incrementEl.value;
  store.dispatch(increment(incrementValue));
  incrementForm.reset();
});

decrementForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const decrementValue = decrementEl.value;
  store.dispatch(decrement(decrementValue));
  decrementForm.reset();
});

// reducer function business logic
const scoreboardReducer = (state = initialState, action) => {
  console.log(action);
  if (action.type === INCREMENT) {
    return {
      ...state,
      value: state.value + parseInt(action.value),
    };
  } else if (action.type === DECREMENT) {
    if (state.value === 0) {
      return 0;
    }
    return {
      ...state,
      value: state.value - parseInt(action.value),
    };
  } else {
    return state;
  }
};

// create store
const store = Redux.createStore(scoreboardReducer);

const render = () => {
  const state = store.getState();
  singleResult.innerText = state.value;
};

render();

store.subscribe(render);
