import React from "react";
import styles from "../search/Search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {               /*  these value,onchange will e the props that we pass to it from the parent componenet */
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type="text"
        placeholder="Search products"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
