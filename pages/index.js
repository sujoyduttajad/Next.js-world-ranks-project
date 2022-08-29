import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../src/components/Layout/Layout";
import SearchInput from "../src/components/SearchInput/SearchInput";
import CountriesTable from "../src/components/CountriesTable/CountriesTable";

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries && countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput
        placeholder="Filter by Name, Region or Subregion"
        onChange={onInputChange}
      />
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}


