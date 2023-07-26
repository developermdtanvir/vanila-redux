// event listener
const addMatchEl = document.querySelector(".lws-addMatch");
const incrementEl = document.querySelector(".lws-increment");
const decrementEl = document.querySelector(".lws-decrement");
const incrementForm = document.querySelector(".incrementForm");
const decrementForm = document.querySelector(".decrementForm");
const singleResult = document.querySelector(".lws-singleResult");
const allMatch = document.querySelector(".all-matches");
const resetEl = document.querySelector(".lws-reset");

// action identifier
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET_STATE = "RESET_STATE";
const DELETEMATCH = "score/matchdelete";
const ADDANOTHERMATCH = "score/addanothermatch";
const RESET = "score/reset";

// action creation function
const increment = (payload) => {
  console.log(payload);
  return {
    type: INCREMENT,
    payload,
  };
};

const decrement = (payload) => {
  return {
    type: DECREMENT,
    payload,
  };
};

const resetState = () => {
  return {
    type: RESET_STATE,
  };
};

const deletematch = (payload) => {
  return {
    type: DELETEMATCH,
    payload: {
      id: payload,
    },
  };
};

const addMatch = () => {
  return {
    type: ADDANOTHERMATCH,
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};

// initial state
// const initialState = {
//   id: 1,
//   value: 0,
// };

// initial state
const initialState = [
  {
    id: 1,
    score: 0,
  },
];

const idGenerator = (arr) => {
  const maxId = arr.reduce((maxId, match) => Math.max(maxId, match.id), -1);
  return maxId + 1;
};

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      let incrementState = state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            score: item.score + Number(action.payload.value),
          };
        } else {
          return item;
        }
      });
      return incrementState;
    case DECREMENT:
      let decrementState = state.map((item) => {
        if (item.id === action.payload.id) {
          const itemScore = item.score + Number(action.payload.value);
          return {
            ...item,
            score: itemScore >= 0 ? itemScore : 0,
          };
        } else {
          return item;
        }
      });
      return decrementState;
    case RESET:
      let resetState = state.map((item) => {
        return {
          ...item,
          score: 0,
        };
      });
      return resetState;
    case DELETEMATCH:
      const remanningState = state.filter(
        (item) => item.id !== action.payload.id
      );
      return remanningState;
    case ADDANOTHERMATCH:
      const newId = idGenerator(state);
      return [...state, { id: newId, score: 0 }];
    default:
      return state;
  }
};

const store = Redux.createStore(scoreReducer);

addMatchEl.addEventListener("click", () => {
  store.dispatch(addMatch());
});

resetEl.addEventListener("click", () => {
  store.dispatch(resetState());
});

const deletematchHandler = (id) => {
  store.dispatch(deletematch(id));
};

const resetHandler = () => {
  store.dispatch(reset());
};

const incrementHandler = (id, formElm) => {
  const value = Number(formElm.querySelector(".lws-increment").value);
  store.dispatch(increment({ id, value }));
  formElm.querySelector(".lws-increment").innerHTML = "";
};

const decrementHandler = (id, formElm) => {
  const value = Number(formElm.querySelector(".lws-decrement").value);
  store.dispatch(decrement({ id, value }));
  formElm.querySelector(".lws-decrement").innerHTML = "";
};

document.querySelector(".lws-reset").addEventListener("click", resetHandler);

// incrementForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const value = Number(incrementEl.value);
//   store.dispatch(increment({ id, value }));
//   formElm.querySelector(".lws-increment").innerHTML = "";
// });

// decrementForm.addEventListener("submit", (e) => {
//   const value = Number(decrement.value);
//   store.dispatch(decrement({ id, value }));
//   formElm.querySelector(".lws-decrement").innerHTML = "";
// });

// resetEl.addEventListener("click", (e) => {
//   console.log("hello world");
//   store.dispatch(resetState());
// });

// // reducer function business logic
// const scoreboardReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREMENT:
//       const incrementState = state.map((item) => {
//         // if(item.id === )
//       });
//       return {
//         ...state,
//       };
//   }
// };

// create store

// Render Function
const matchHtml = (match) => {
  console.log(match, "match");
  return `
  <div class="match">
  <div class="wrapper">
      <button class="lws-delete" onclick = "deletematchHandler(${match.id})">
          <img src="./image/delete.svg" alt="" />
      </button>
      <h3 class="lws-matchName">Match ${match.id}</h3>
  </div>
  <div class="inc-dec">
      <form class="incrementForm" onsubmit = "event.preventDefault(); incrementHandler(${match.id}, this)">
          <h4>Increment</h4>
          <input
              type="number"
              name="increment"
              class="lws-increment"
          />
      </form>
      <form class="decrementForm" onsubmit = "event.preventDefault(); decrementHandler(${match.id}, this)">
          <h4>Decrement</h4>
          <input
              type="number"
              name="decrement"
              class="lws-decrement"
          />
      </form>
  </div>
  <div class="numbers">
      <h2 class="lws-singleResult">${match.score}</h2>
  </div>
  </div>
  `;
};

const render = () => {
  const state = store.getState();
  let elm = ``;
  state.map((match) => (elm += matchHtml(match)));
  return (allMatch.innerHTML = elm);
};

render();

store.subscribe(render);
