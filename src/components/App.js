import React, { useEffect, useReducer, useCallback, useRef } from "react";
import axios from "axios";

import SearchBar from "./SearchBar";
import ImageList from "./ImageList";
import "./App.css";

const App = () => {
  // const [pics, setPics] = useState([]);
  // const [reachedBtm, setReachedBtm] = useState(false);
  // const [term, setTerm] = useState("");
  // const [page, setPage] = useState(1);
  const termReducer = (state, action) => {
    switch (action.type) {
      case "SET_TERM":
        return { ...state, term: action.term };
      default:
        return state;
    }
  };

  const imgReducer = (state, action) => {
    switch (action.type) {
      case "STACK_IMAGES":
        return { ...state, images: state.images.concat(action.images) };
      case "FETCHING_IMAGES":
        return { ...state, fetching: action.fetching };
      case "REPLACE_IMAGES":
        return { ...state, images: action.images };
      default:
        return state;
    }
  };

  const pageReducer = (state, action) => {
    switch (action.type) {
      case "ADVANCE_PAGE":
        return { ...state, page: state.page + 1 };
      default:
        return state;
    }
  };

  const [term, termDispatch] = useReducer(termReducer, {
    term: "",
  });
  const [imgData, imgDispatch] = useReducer(imgReducer, {
    images: [],
    fetching: true,
  });
  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });

  const onSearchSubmit = (searchTerm) => {
    termDispatch({ type: "SET_TERM", term: searchTerm });
    console.log(term.term);
    imgDispatch({ type: "FETCHING_IMAGES", fetching: true });
    axios
      .get("https://api.unsplash.com/search/photos", {
        params: { query: searchTerm, per_page: 20 },
        headers: {
          Authorization:
            "Client-ID Nb8LsYcDEwp60Eb9OIJ6IoidWkYW3y3H0PjgrVWvzfM",
        },
      })
      .then((data) => {
        imgDispatch({ type: "REPLACE_IMAGES", images: data.data.results });
        imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
      })
      .catch((err) => {
        imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
        console.log("Error happened during fetching!", err);
      });
  };

  useEffect(() => {
    imgDispatch({ type: "FETCHING_IMAGES", fetching: true });
    axios
      .get("https://api.unsplash.com/search/photos", {
        params: { query: term.term, per_page: 20, page: pager.page },
        headers: {
          Authorization:
            "Client-ID Nb8LsYcDEwp60Eb9OIJ6IoidWkYW3y3H0PjgrVWvzfM",
        },
      })
      .then((data) => {
        imgDispatch({ type: "STACK_IMAGES", images: data.data.results });
        imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
      })
      .catch((err) => {
        imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
        console.log("Error happened during fetching!", err);
      });
  }, [pager.page]);

  let bottomBoundaryRef = useRef(null);
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            pagerDispatch({ type: "ADVANCE_PAGE" });
          }
        });
      }).observe(node);
    },
    [pagerDispatch]
  );
  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  return (
    <div className="App">
      <SearchBar onSubmit={onSearchSubmit} />
      <ImageList
        images={imgData.images}
        bottomBoundaryRef={bottomBoundaryRef}
      />
    </div>
  );
};

export default App;
